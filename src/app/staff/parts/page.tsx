'use client';
import React, { useState } from 'react';
import {
  Package,
  AlertTriangle,
  TrendingUp,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  ArrowLeft,
  Brain,
  Zap,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function StaffPartsPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Tất cả');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPart, setSelectedPart] = useState(null);

  const [parts, setParts] = useState([
    {
      id: 'P001',
      name: 'Pin Lithium-ion 40kWh',
      category: 'Pin',
      brand: 'VinFast',
      model: 'VF8',
      currentStock: 5,
      minStock: 10,
      maxStock: 50,
      unitPrice: 15000000,
      lastRestocked: '2025-10-20',
      status: 'Cần nhập',
      aiSuggestion: {
        recommended: 15,
        reason: 'Dự báo nhu cầu cao trong tháng tới',
        confidence: 85
      }
    },
    {
      id: 'P002',
      name: 'Motor điện 150kW',
      category: 'Động cơ',
      brand: 'VinFast',
      model: 'VF9',
      currentStock: 8,
      minStock: 5,
      maxStock: 30,
      unitPrice: 25000000,
      lastRestocked: '2025-10-18',
      status: 'Đủ',
      aiSuggestion: {
        recommended: 12,
        reason: 'Tăng trưởng bán hàng 20%',
        confidence: 78
      }
    },
    {
      id: 'P003',
      name: 'Bộ sạc nhanh 22kW',
      category: 'Sạc',
      brand: 'ABB',
      model: 'Terra AC',
      currentStock: 2,
      minStock: 8,
      maxStock: 25,
      unitPrice: 8000000,
      lastRestocked: '2025-10-15',
      status: 'Thiếu hụt',
      aiSuggestion: {
        recommended: 12,
        reason: 'Nhu cầu tăng đột biến',
        confidence: 92
      }
    },
    {
      id: 'P004',
      name: 'Bộ điều khiển BMS',
      category: 'Điện tử',
      brand: 'Bosch',
      model: 'BMS-400',
      currentStock: 15,
      minStock: 10,
      maxStock: 40,
      unitPrice: 5000000,
      lastRestocked: '2025-10-22',
      status: 'Đủ',
      aiSuggestion: {
        recommended: 18,
        reason: 'Dự báo ổn định',
        confidence: 65
      }
    },
    {
      id: 'P005',
      name: 'Dây cáp sạc Type 2',
      category: 'Phụ kiện',
      brand: 'Schneider',
      model: 'EV-Link',
      currentStock: 1,
      minStock: 15,
      maxStock: 50,
      unitPrice: 1200000,
      lastRestocked: '2025-10-10',
      status: 'Thiếu hụt',
      aiSuggestion: {
        recommended: 25,
        reason: 'Hàng bán chạy nhất',
        confidence: 95
      }
    }
  ]);

  const filtered = parts.filter(part => {
    const matchesSearch = part.name.toLowerCase().includes(search.toLowerCase()) ||
                         part.category.toLowerCase().includes(search.toLowerCase()) ||
                         part.brand.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'Tất cả' || part.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Đủ': return 'text-green-700 bg-green-100';
      case 'Cần nhập': return 'text-yellow-700 bg-yellow-100';
      case 'Thiếu hụt': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Đủ': return <CheckCircle2 className="w-4 h-4" />;
      case 'Cần nhập': return <Clock className="w-4 h-4" />;
      case 'Thiếu hụt': return <AlertTriangle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
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
                  Quản lý phụ tùng EV
                </h1>
                <p className="text-gray-600 text-sm">
                  Theo dõi tồn kho và AI gợi ý nhu cầu phụ tùng
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-500">Tổng phụ tùng</p>
                <p className="text-xl font-bold text-emerald-600">{parts.length}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Cần nhập</p>
                <p className="text-xl font-bold text-amber-600">
                  {parts.filter(p => p.status === 'Cần nhập' || p.status === 'Thiếu hụt').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Suggestions Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 py-4">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Brain className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900">AI Gợi ý nhu cầu phụ tùng</h3>
              <p className="text-sm text-blue-700">
                Hệ thống AI đã phân tích dữ liệu bán hàng và dự báo nhu cầu phụ tùng cho tháng tới
              </p>
            </div>
            <button className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium">
              Xem chi tiết
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-2">
              {['Tất cả', 'Đủ', 'Cần nhập', 'Thiếu hụt'].map((tab) => (
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

            <div className="flex gap-4 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-80">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tìm kiếm phụ tùng..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition text-sm font-medium flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Thêm phụ tùng
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Parts List */}
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Danh sách phụ tùng</h3>
              <div className="text-sm text-gray-500">
                Hiển thị {filtered.length} / {parts.length} phụ tùng
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 text-gray-700 border-b">
                <tr>
                  <th className="text-left px-6 py-3 font-medium">Phụ tùng</th>
                  <th className="text-left px-6 py-3 font-medium">Danh mục</th>
                  <th className="text-center px-6 py-3 font-medium">Tồn kho</th>
                  <th className="text-center px-6 py-3 font-medium">Giá</th>
                  <th className="text-center px-6 py-3 font-medium">Trạng thái</th>
                  <th className="text-center px-6 py-3 font-medium">AI Gợi ý</th>
                  <th className="text-right px-6 py-3 font-medium">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((part) => (
                  <tr key={part.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{part.name}</div>
                        <div className="text-sm text-gray-500">{part.brand} - {part.model}</div>
                        <div className="text-xs text-gray-400">ID: {part.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {part.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="font-medium text-gray-900">{part.currentStock}</div>
                      <div className="text-xs text-gray-500">Min: {part.minStock} | Max: {part.maxStock}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="font-medium text-gray-900">
                        {(part.unitPrice / 1000000).toFixed(1)}M VNĐ
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(part.status)}`}>
                        {getStatusIcon(part.status)}
                        <span className="ml-1">{part.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="text-center">
                          <div className="font-medium text-emerald-600">{part.aiSuggestion.recommended}</div>
                          <div className="text-xs text-gray-500">{part.aiSuggestion.confidence}%</div>
                        </div>
                        <button
                          onClick={() => setSelectedPart(part)}
                          className="p-1 text-blue-600 hover:bg-blue-100 rounded transition"
                          title="Xem chi tiết AI gợi ý"
                        >
                          <Brain className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedPart(part)}
                          className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded hover:bg-blue-200 transition">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="px-3 py-1 text-sm font-medium text-red-700 bg-red-100 rounded hover:bg-red-200 transition">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* AI Suggestion Modal */}
      {selectedPart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Brain className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">AI Gợi ý nhu cầu</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">{selectedPart.name}</h4>
                <p className="text-sm text-gray-600">Tồn kho hiện tại: {selectedPart.currentStock} | Tồn kho tối thiểu: {selectedPart.minStock}</p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-blue-900">Đề xuất nhập thêm</span>
                  <span className="text-2xl font-bold text-blue-600">{selectedPart.aiSuggestion.recommended}</span>
                </div>
                <p className="text-sm text-blue-700 mb-2">{selectedPart.aiSuggestion.reason}</p>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-blue-600">Độ tin cậy: {selectedPart.aiSuggestion.confidence}%</span>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="font-medium text-gray-900 mb-2">Phân tích dữ liệu</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Lịch sử bán hàng 6 tháng qua</li>
                  <li>• Xu hướng theo mùa</li>
                  <li>• Tỷ lệ hỏng hóc dự kiến</li>
                  <li>• Thời gian giao hàng từ nhà cung cấp</li>
                </ul>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setSelectedPart(null)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              >
                Đóng
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Tạo đơn nhập hàng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
