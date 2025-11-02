'use client';
import React, { useState, useMemo, useEffect } from 'react';
import {
  ArrowLeft,
  CreditCard,
  Wallet,
  FileText,
  TrendingUp,
  TrendingDown,
  PlusCircle,
  Trash2,
  Save,
  BarChart3,
  DollarSign,
  Search,
  Calendar,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { listTransactions, getTransactionStats, type Transaction, type TransactionStats } from '@/lib/api/admin/transactions';
import { ToastContainer, type Toast } from '@/components/ui/Toast';

export default function AdminFinancePage() {
  const router = useRouter();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<TransactionStats>({
    totalIncome: 0,
    totalExpense: 0,
    profit: 0,
  });

  const [newTxn, setNewTxn] = useState({
    type: 'Thu' as 'Thu' | 'Chi',
    description: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    method: 'Tiền mặt',
  });

  const [search, setSearch] = useState('');
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: Toast['type'] = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const [txns, transactionStats] = await Promise.all([
        listTransactions(),
        getTransactionStats(),
      ]);
      setTransactions(txns);
      setStats(transactionStats);
    } catch (error) {
      console.error('Error loading transactions:', error);
      showToast('Không thể tải danh sách giao dịch', 'error');
    } finally {
      setLoading(false);
    }
  };

  // ===== THÊM GIAO DỊCH =====
  // Note: Hiện tại API chỉ lấy từ bookings, chưa có API để tạo transaction mới
  // Nên hàm này sẽ chỉ hiển thị thông báo
  const addTxn = () => {
    if (!newTxn.description || newTxn.amount <= 0) {
      showToast('⚠️ Vui lòng nhập đầy đủ thông tin giao dịch!', 'error');
      return;
    }
    // TODO: Implement API call to create transaction
    showToast('Tính năng thêm giao dịch thủ công đang được phát triển', 'info');
  };

  // ===== XÓA GIAO DỊCH =====
  // Note: Transactions được lấy từ bookings, không thể xóa trực tiếp
  const deleteTxn = (id: string) => {
    showToast('Giao dịch từ bookings không thể xóa', 'info');
  };

  // ===== TÍNH TOÁN TỔNG =====
  const totalIncome = stats.totalIncome;
  const totalExpense = stats.totalExpense;
  const profit = stats.profit;

  // ===== LỌC =====
  const filtered = transactions.filter(
    (t) =>
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.method.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="relative bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 max-w-6xl flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="flex items-center text-emerald-700 hover:text-emerald-800 transition"
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              <span className="text-sm font-medium">Trang quản trị</span>
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3 bg-emerald-600">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">EV Care</h1>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-gray-500">Quản lý tài chính & hóa đơn</span>
          </div>
        </div>
      </div>

      {/* TỔNG QUAN */}
      <div className="container mx-auto px-6 py-6 max-w-6xl flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            icon={<TrendingUp className="w-5 h-5 text-emerald-600" />}
            title="Tổng thu"
            value={totalIncome}
            color="text-emerald-700"
          />
          <StatCard
            icon={<TrendingDown className="w-5 h-5 text-red-600" />}
            title="Tổng chi"
            value={totalExpense}
            color="text-red-600"
          />
          <StatCard
            icon={<DollarSign className="w-5 h-5 text-blue-600" />}
            title="Lợi nhuận"
            value={profit}
            color={profit >= 0 ? 'text-blue-700' : 'text-red-700'}
          />
        </div>

        {/* FORM THÊM GIAO DỊCH */}
        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <h2 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-emerald-600" />
            Thêm giao dịch mới
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-sm">
            <select
              value={newTxn.type}
              onChange={(e) => setNewTxn({ ...newTxn, type: e.target.value })}
              className="border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="Thu">Thu</option>
              <option value="Chi">Chi</option>
            </select>
            <input
              type="text"
              placeholder="Mô tả giao dịch"
              value={newTxn.description}
              onChange={(e) => setNewTxn({ ...newTxn, description: e.target.value })}
              className="border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            <input
              type="number"
              placeholder="Số tiền (VNĐ)"
              value={newTxn.amount}
              onChange={(e) => setNewTxn({ ...newTxn, amount: parseInt(e.target.value) || 0 })}
              className="border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            <input
              type="date"
              value={newTxn.date}
              onChange={(e) => setNewTxn({ ...newTxn, date: e.target.value })}
              className="border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            <select
              value={newTxn.method}
              onChange={(e) => setNewTxn({ ...newTxn, method: e.target.value })}
              className="border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="Tiền mặt">Tiền mặt</option>
              <option value="Chuyển khoản">Chuyển khoản</option>
              <option value="Ví điện tử">Ví điện tử</option>
            </select>
          </div>
          <div className="mt-3 flex justify-end">
            <button
              onClick={addTxn}
              className="inline-flex items-center bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition text-sm"
            >
              <Save className="w-4 h-4 mr-1" />
              Lưu giao dịch
            </button>
          </div>
        </div>

        {/* TÌM KIẾM */}
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-3">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Tìm theo mô tả hoặc phương thức thanh toán..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none text-sm text-gray-700"
          />
        </div>

        {/* DANH SÁCH GIAO DỊCH */}
        <div className="bg-white rounded-xl border shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            Danh sách giao dịch & hóa đơn
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 border-b">
                <tr>
                  <th className="text-left py-2 px-3">Mã GD</th>
                  <th className="text-left py-2 px-3">Loại</th>
                  <th className="text-left py-2 px-3">Mô tả</th>
                  <th className="text-left py-2 px-3">Số tiền (VNĐ)</th>
                  <th className="text-left py-2 px-3">Ngày</th>
                  <th className="text-left py-2 px-3">Phương thức</th>
                  <th className="text-left py-2 px-3">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-gray-600">
                      Đang tải...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-gray-500">
                      Chưa có giao dịch nào
                    </td>
                  </tr>
                ) : (
                  filtered.map((t) => (
                  <tr key={t.id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-2 px-3 font-medium text-gray-800">{t.id}</td>
                    <td className="py-2 px-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          t.type === 'Thu'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {t.type}
                      </span>
                    </td>
                    <td className="py-2 px-3">{t.description}</td>
                    <td className="py-2 px-3">{t.amount.toLocaleString('vi-VN')}</td>
                    <td className="py-2 px-3">{t.date}</td>
                    <td className="py-2 px-3">{t.method}</td>
                    <td className="py-2 px-3">
                      <button
                        onClick={() => deleteTxn(t.id)}
                        className="p-1.5 rounded-md hover:bg-gray-100 text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onClose={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />
    </div>
  );
}

/* ===== COMPONENT: StatCard ===== */
function StatCard({
  icon,
  title,
  value,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  value: number;
  color: string;
}) {
  return (
    <div className="bg-white border rounded-xl shadow-sm p-4 flex items-center justify-between">
      <div>
        <p className="text-xs text-gray-500">{title}</p>
        <h3 className={`text-xl font-semibold ${color}`}>
          {value.toLocaleString('vi-VN')} ₫
        </h3>
      </div>
      <div className="p-3 bg-gray-50 rounded-full">{icon}</div>
    </div>
  );
}
