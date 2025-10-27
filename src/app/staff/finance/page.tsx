'use client';
import React, { useState } from 'react';
import {
  DollarSign,
  CreditCard,
  Receipt,
  TrendingUp,
  TrendingDown,
  Plus,
  Search,
  Filter,
  Eye,
  Download,
  ArrowLeft,
  Calendar,
  User,
  Car,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Banknote,
  Wallet,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function StaffFinancePage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Tất cả');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [activeTab, setActiveTab] = useState('invoices');

  const [invoices, setInvoices] = useState([
    {
      id: 'INV001',
      customer: 'Nguyễn Văn A',
      vehicle: 'VinFast Feliz S - 99A-123.45',
      service: 'Kiểm tra hệ thống điện',
      amount: 1500000,
      tax: 150000,
      total: 1650000,
      status: 'Đã thanh toán',
      paymentMethod: 'Chuyển khoản',
      issueDate: '2025-10-27',
      dueDate: '2025-10-27',
      paidDate: '2025-10-27',
      technician: 'Trần Văn B',
      description: 'Kiểm tra toàn diện hệ thống điện, pin, motor và BMS'
    },
    {
      id: 'INV002',
      customer: 'Trần Thị B',
      vehicle: 'VinFast Klara A2 - 30B-456.78',
      service: 'Bảo dưỡng định kỳ',
      amount: 2500000,
      tax: 250000,
      total: 2750000,
      status: 'Chờ thanh toán',
      paymentMethod: 'Tiền mặt',
      issueDate: '2025-10-26',
      dueDate: '2025-10-28',
      paidDate: null,
      technician: 'Phạm Văn C',
      description: 'Bảo dưỡng định kỳ 6 tháng, thay dầu, kiểm tra hệ thống'
    },
    {
      id: 'INV003',
      customer: 'Phạm Văn C',
      vehicle: 'VinFast Vento - 51H-889.22',
      service: 'Thay thế pin',
      amount: 8500000,
      tax: 850000,
      total: 9350000,
      status: 'Đã thanh toán',
      paymentMethod: 'Thẻ tín dụng',
      issueDate: '2025-10-25',
      dueDate: '2025-10-27',
      paidDate: '2025-10-26',
      technician: 'Lê Thị D',
      description: 'Thay thế pin Lithium-ion 40kWh, bảo hành 2 năm'
    },
    {
      id: 'INV004',
      customer: 'Lê Thị D',
      vehicle: 'VinFast VF8 - 43C-111.22',
      service: 'Kiểm tra hệ thống sạc',
      amount: 800000,
      tax: 80000,
      total: 880000,
      status: 'Quá hạn',
      paymentMethod: 'Chuyển khoản',
      issueDate: '2025-10-20',
      dueDate: '2025-10-25',
      paidDate: null,
      technician: 'Nguyễn Văn E',
      description: 'Kiểm tra và sửa chữa hệ thống sạc nhanh 22kW'
    }
  ]);

  const [payments, setPayments] = useState([
    {
      id: 'PAY001',
      invoiceId: 'INV001',
      amount: 1650000,
      method: 'Chuyển khoản',
      status: 'Thành công',
      date: '2025-10-27 10:30',
      reference: 'TXN123456789',
      customer: 'Nguyễn Văn A'
    },
    {
      id: 'PAY002',
      invoiceId: 'INV003',
      amount: 9350000,
      method: 'Thẻ tín dụng',
      status: 'Thành công',
      date: '2025-10-26 15:45',
      reference: 'CC987654321',
      customer: 'Phạm Văn C'
    }
  ]);

  const [revenue, setRevenue] = useState({
    today: 11000000,
    thisMonth: 45000000,
    thisYear: 520000000,
    pending: 2750000,
    overdue: 880000
  });

  const filtered = invoices.filter(invoice => {
    const matchesSearch = invoice.customer.toLowerCase().includes(search.toLowerCase()) ||
                         invoice.id.toLowerCase().includes(search.toLowerCase()) ||
                         invoice.service.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'Tất cả' || invoice.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Đã thanh toán': return 'text-green-700 bg-green-100';
      case 'Chờ thanh toán': return 'text-yellow-700 bg-yellow-100';
      case 'Quá hạn': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Đã thanh toán': return <CheckCircle2 className="w-4 h-4" />;
      case 'Chờ thanh toán': return <Clock className="w-4 h-4" />;
      case 'Quá hạn': return <AlertTriangle className="w-4 h-4" />;
      default: return <Receipt className="w-4 h-4" />;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Quản lý tài chính
                </h1>
                <p className="text-gray-600 text-sm">
                  Quản lý hóa đơn, thanh toán và báo cáo doanh thu
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition text-sm font-medium flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Tạo hóa đơn
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium flex items-center gap-2">
                <Download className="w-4 h-4" />
                Xuất báo cáo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Overview */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="container mx-auto px-6 max-w-7xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tổng quan doanh thu</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-emerald-600 font-medium">Hôm nay</p>
                  <p className="text-xl font-bold text-emerald-700">{formatCurrency(revenue.today)}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-blue-600 font-medium">Tháng này</p>
                  <p className="text-xl font-bold text-blue-700">{formatCurrency(revenue.thisMonth)}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <Banknote className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-purple-600 font-medium">Năm nay</p>
                  <p className="text-xl font-bold text-purple-700">{formatCurrency(revenue.thisYear)}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500 rounded-lg">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-yellow-600 font-medium">Chờ thanh toán</p>
                  <p className="text-xl font-bold text-yellow-700">{formatCurrency(revenue.pending)}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-red-600 font-medium">Quá hạn</p>
                  <p className="text-xl font-bold text-red-700">{formatCurrency(revenue.overdue)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('invoices')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'invoices'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Hóa đơn
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'payments'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Thanh toán
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'reports'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Báo cáo
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-2">
              {['Tất cả', 'Đã thanh toán', 'Chờ thanh toán', 'Quá hạn'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    filter === tab
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm kiếm hóa đơn..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {activeTab === 'invoices' && (
          <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Danh sách hóa đơn</h3>
                <div className="text-sm text-gray-500">
                  Hiển thị {filtered.length} / {invoices.length} hóa đơn
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50 text-gray-700 border-b">
                  <tr>
                    <th className="text-left px-6 py-3 font-medium">Mã hóa đơn</th>
                    <th className="text-left px-6 py-3 font-medium">Khách hàng</th>
                    <th className="text-left px-6 py-3 font-medium">Dịch vụ</th>
                    <th className="text-right px-6 py-3 font-medium">Số tiền</th>
                    <th className="text-center px-6 py-3 font-medium">Trạng thái</th>
                    <th className="text-center px-6 py-3 font-medium">Ngày tạo</th>
                    <th className="text-right px-6 py-3 font-medium">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{invoice.id}</div>
                        <div className="text-sm text-gray-500">{invoice.paymentMethod}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{invoice.customer}</div>
                          <div className="text-sm text-gray-500">{invoice.vehicle}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900">{invoice.service}</div>
                        <div className="text-sm text-gray-500">KTV: {invoice.technician}</div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="font-medium text-gray-900">{formatCurrency(invoice.total)}</div>
                        <div className="text-sm text-gray-500">Chưa VAT: {formatCurrency(invoice.amount)}</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                          {getStatusIcon(invoice.status)}
                          <span className="ml-1">{invoice.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="text-sm text-gray-900">{invoice.issueDate}</div>
                        <div className="text-xs text-gray-500">Hạn: {invoice.dueDate}</div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedInvoice(invoice)}
                            className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded hover:bg-blue-200 transition">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Lịch sử thanh toán</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50 text-gray-700 border-b">
                  <tr>
                    <th className="text-left px-6 py-3 font-medium">Mã thanh toán</th>
                    <th className="text-left px-6 py-3 font-medium">Hóa đơn</th>
                    <th className="text-left px-6 py-3 font-medium">Khách hàng</th>
                    <th className="text-right px-6 py-3 font-medium">Số tiền</th>
                    <th className="text-center px-6 py-3 font-medium">Phương thức</th>
                    <th className="text-center px-6 py-3 font-medium">Trạng thái</th>
                    <th className="text-center px-6 py-3 font-medium">Ngày</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-medium text-gray-900">{payment.id}</td>
                      <td className="px-6 py-4 text-gray-900">{payment.invoiceId}</td>
                      <td className="px-6 py-4 text-gray-900">{payment.customer}</td>
                      <td className="px-6 py-4 text-right font-medium text-gray-900">{formatCurrency(payment.amount)}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {payment.method}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-500">{payment.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Doanh thu theo tháng</h3>
              <div className="space-y-3">
                {['Tháng 10/2025', 'Tháng 9/2025', 'Tháng 8/2025', 'Tháng 7/2025'].map((month, index) => (
                  <div key={month} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <span className="text-sm font-medium text-gray-700">{month}</span>
                    <span className="text-sm font-bold text-emerald-600">
                      {formatCurrency(45000000 - (index * 5000000))}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Dịch vụ phổ biến</h3>
              <div className="space-y-3">
                {[
                  { service: 'Bảo dưỡng định kỳ', count: 45, revenue: 125000000 },
                  { service: 'Kiểm tra hệ thống điện', count: 32, revenue: 48000000 },
                  { service: 'Thay thế pin', count: 8, revenue: 68000000 },
                  { service: 'Sửa chữa motor', count: 12, revenue: 36000000 }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <div className="text-sm font-medium text-gray-700">{item.service}</div>
                      <div className="text-xs text-gray-500">{item.count} lần</div>
                    </div>
                    <span className="text-sm font-bold text-emerald-600">
                      {formatCurrency(item.revenue)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Chi tiết hóa đơn {selectedInvoice.id}</h3>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Thông tin khách hàng</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Tên:</span>
                      <span className="font-medium">{selectedInvoice.customer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Xe:</span>
                      <span className="font-medium">{selectedInvoice.vehicle}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Thông tin hóa đơn</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Ngày tạo:</span>
                      <span className="font-medium">{selectedInvoice.issueDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Hạn thanh toán:</span>
                      <span className="font-medium">{selectedInvoice.dueDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Phương thức:</span>
                      <span className="font-medium">{selectedInvoice.paymentMethod}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Dịch vụ</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm">
                    <div className="font-medium text-gray-900 mb-1">{selectedInvoice.service}</div>
                    <div className="text-gray-600">{selectedInvoice.description}</div>
                    <div className="text-gray-500 mt-2">Kỹ thuật viên: {selectedInvoice.technician}</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Chi tiết thanh toán</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Số tiền dịch vụ:</span>
                      <span className="font-medium">{formatCurrency(selectedInvoice.amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">VAT (10%):</span>
                      <span className="font-medium">{formatCurrency(selectedInvoice.tax)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 font-bold text-lg">
                      <span>Tổng cộng:</span>
                      <span className="text-emerald-600">{formatCurrency(selectedInvoice.total)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  {getStatusIcon(selectedInvoice.status)}
                  <span className="font-medium text-gray-900">Trạng thái: {selectedInvoice.status}</span>
                </div>
                {selectedInvoice.paidDate && (
                  <div className="text-sm text-gray-500">
                    Đã thanh toán: {selectedInvoice.paidDate}
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setSelectedInvoice(null)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              >
                Đóng
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                In hóa đơn
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
