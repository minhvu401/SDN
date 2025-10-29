'use client';
import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Package,
  Warehouse,
  ShoppingCart,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Save,
  Bot,
  PlusCircle,
  Search,
  BarChart3,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { listInventories, type InventoryItem } from '@/lib/api/admin/inventories';

export default function AdminPartsPage() {
  const router = useRouter();

  const [parts, setParts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await listInventories();
        if (!mounted) return;
        setParts(data);
      } catch (e) {
        setError('Không thể tải danh sách phụ tùng');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const [newPart, setNewPart] = useState({
    name: '',
    model: '',
    stock: 0,
    minStock: 1,
    usedMonthly: 0,
  });

  const [search, setSearch] = useState('');

  const addPart = () => {
    if (!newPart.name || !newPart.model) {
      alert('⚠️ Nhập đầy đủ thông tin phụ tùng!');
      return;
    }
    const id = 'P' + (parts.length + 1).toString().padStart(3, '0');
    setParts((prev) => [...prev, { id, ...newPart, status: 'Đủ tồn' }]);
    setNewPart({ name: '', model: '', stock: 0, minStock: 1, usedMonthly: 0 });
  };

  const handleOrder = (part: any) => {
    alert(`🛒 Đã gửi yêu cầu đặt hàng bổ sung cho "${part.name}"`);
  };

  // ===== GỢI Ý AI: lượng tồn tối thiểu =====
  const suggestMinStock = (quantity: number) => {
    // Gợi ý tối thiểu dựa trên tồn hiện tại (placeholder)
    return Math.max(1, Math.ceil((quantity || 0) / 10));
  };

  const updateSuggestions = () => {
    setParts((prev) => prev.map((p) => ({ ...p, minStock: suggestMinStock(p.quantity ?? 0) })));
    alert('🤖 AI đã cập nhật lượng tồn tối thiểu đề xuất!');
  };

  const filtered = parts.filter(
    (p) =>
      (p.partName || '').toLowerCase().includes(search.toLowerCase()) ||
      (p.category || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="relative bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-6 max-w-6xl flex items-center gap-3">
          <button
            onClick={() => router.push('/admin/dashboard')}
            className="flex items-center text-emerald-700 hover:text-emerald-800 transition"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span className="text-sm font-medium">Trang quản trị</span>
          </button>

          <div className="ml-auto flex items-center gap-2">
            <Warehouse className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-gray-500">Quản lý kho phụ tùng</span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-6 py-6 max-w-6xl flex flex-col gap-6">
        {/* Thêm phụ tùng */}
        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <h2 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-emerald-600" />
            Thêm phụ tùng mới
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-sm">
            <input
              type="text"
              placeholder="Tên phụ tùng"
              value={newPart.name}
              onChange={(e) => setNewPart({ ...newPart, name: e.target.value })}
              className="border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            <input
              type="text"
              placeholder="Model xe"
              value={newPart.model}
              onChange={(e) => setNewPart({ ...newPart, model: e.target.value })}
              className="border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            <input
              type="number"
              placeholder="Tồn kho"
              value={newPart.stock}
              onChange={(e) =>
                setNewPart({ ...newPart, stock: parseInt(e.target.value) || 0 })
              }
              className="border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            <input
              type="number"
              placeholder="Tối thiểu"
              value={newPart.minStock}
              onChange={(e) =>
                setNewPart({ ...newPart, minStock: parseInt(e.target.value) || 1 })
              }
              className="border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            <input
              type="number"
              placeholder="SL dùng/tháng"
              value={newPart.usedMonthly}
              onChange={(e) =>
                setNewPart({
                  ...newPart,
                  usedMonthly: parseInt(e.target.value) || 0,
                })
              }
              className="border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <div className="mt-3 flex justify-end">
            <button
              onClick={addPart}
              className="inline-flex items-center bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition text-sm"
            >
              <Save className="w-4 h-4 mr-1" />
              Lưu phụ tùng
            </button>
          </div>
        </div>

        {/* Thanh tìm kiếm + AI */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-gray-200 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Tìm theo tên hoặc model..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="text-sm text-gray-700 outline-none"
            />
          </div>
          <button
            onClick={updateSuggestions}
            className="inline-flex items-center gap-2 text-sm bg-emerald-100 text-emerald-700 px-3 py-2 rounded-md hover:bg-emerald-200 transition"
          >
            <Bot className="w-4 h-4" />
            Gợi ý tồn tối thiểu (AI)
          </button>
        </div>

        {/* Danh sách phụ tùng */}
        <div className="bg-white rounded-xl border shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-600" />
            Theo dõi tồn kho & đặt hàng
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 border-b">
                <tr>
                  <th className="text-left py-2 px-3">Mã</th>
                  <th className="text-left py-2 px-3">Tên phụ tùng</th>
                  <th className="text-left py-2 px-3">Danh mục</th>
                  <th className="text-left py-2 px-3">Tồn kho</th>
                  <th className="text-left py-2 px-3">Tối thiểu</th>
                  <th className="text-left py-2 px-3">SL dùng/tháng</th>
                  <th className="text-left py-2 px-3">Trạng thái</th>
                  <th className="text-left py-2 px-3">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr><td colSpan={8} className="py-6 text-center text-gray-600">Đang tải...</td></tr>
                )}
                {error && !loading && (
                  <tr><td colSpan={8} className="py-6 text-center text-red-600">{error}</td></tr>
                )}
                {!loading && !error && filtered.map((p) => (
                  <tr
                    key={p._id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-2 px-3 font-medium text-gray-800">{p.partCode}</td>
                    <td className="py-2 px-3">{p.partName}</td>
                    <td className="py-2 px-3">{p.category || '—'}</td>
                    <td className="py-2 px-3">{p.quantity ?? 0}</td>
                    <td className="py-2 px-3">{p.quantity ? Math.max(1, Math.ceil((p.quantity as number)/10)) : 1}</td>
                    <td className="py-2 px-3">{p.unitPrice ? p.unitPrice.toLocaleString('vi-VN') : '—'}</td>
                    <td className="py-2 px-3">
                      <StatusBadge stock={p.quantity ?? 0} min={p.quantity ? Math.max(1, Math.ceil((p.quantity as number)/10)) : 1} />
                    </td>
                    <td className="py-2 px-3">
                      <button
                        onClick={() => handleOrder(p)}
                        className="inline-flex items-center gap-1 bg-emerald-600 text-white px-3 py-1 rounded-md hover:bg-emerald-700 text-xs"
                      >
                        <ShoppingCart className="w-3 h-3" />
                        Đặt hàng
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}

/* ===== COMPONENT: StatusBadge ===== */
function StatusBadge({ stock, min }: { stock: number; min: number }) {
  const status =
    stock === 0
      ? 'Hết hàng'
      : stock < min
      ? 'Thiếu hàng'
      : stock === min
      ? 'Cần nhập thêm'
      : 'Đủ tồn';

  const { color, icon } =
    status === 'Hết hàng'
      ? { color: 'bg-red-100 text-red-600', icon: <AlertTriangle className="w-3 h-3" /> }
      : status === 'Thiếu hàng'
      ? { color: 'bg-yellow-100 text-yellow-700', icon: <AlertTriangle className="w-3 h-3" /> }
      : status === 'Cần nhập thêm'
      ? { color: 'bg-orange-100 text-orange-700', icon: <Clock className="w-3 h-3" /> }
      : { color: 'bg-emerald-100 text-emerald-700', icon: <CheckCircle2 className="w-3 h-3" /> };

  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1 ${color}`}
    >
      {icon}
      {status}
    </span>
  );
}
