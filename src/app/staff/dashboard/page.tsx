'use client';
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  Wrench,
  CheckCircle2,
  Clock,
  Car,
  User,
  AlertTriangle,
  RefreshCcw,
  ArrowLeft,
  Search,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function StaffDashboardPage() {
  const router = useRouter();

  const [vehicles, setVehicles] = useState([
    {
      id: 'V001',
      customer: 'Nguyễn Văn A',
      model: 'VinFast Feliz S',
      plate: '99A-123.45',
      service: 'Kiểm tra hệ thống điện',
      status: 'Chờ tiếp nhận',
      time: '25/10/2025 - 09:00',
    },
    {
      id: 'V002',
      customer: 'Trần Thị B',
      model: 'VinFast Klara A2',
      plate: '30B-456.78',
      service: 'Bảo dưỡng định kỳ',
      status: 'Đang bảo dưỡng',
      time: '25/10/2025 - 08:30',
    },
    {
      id: 'V003',
      customer: 'Phạm Văn C',
      model: 'VinFast Vento',
      plate: '51H-889.22',
      service: 'Thay thế pin',
      status: 'Hoàn tất',
      time: '24/10/2025 - 10:15',
    },
  ]);

  const [filter, setFilter] = useState('Tất cả');
  const [search, setSearch] = useState('');

  const filtered = vehicles.filter(
    (v) =>
      (filter === 'Tất cả' || v.status === filter) &&
      (v.customer.toLowerCase().includes(search.toLowerCase()) ||
        v.plate.toLowerCase().includes(search.toLowerCase()) ||
        v.model.toLowerCase().includes(search.toLowerCase()))
  );

  const handleStatusChange = (id: string, next: string) => {
    setVehicles((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: next } : v))
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="relative bg-white border-b border-gray-200 py-10 text-center">
        <button
          onClick={() => router.push('/')}
          className="absolute top-5 left-6 flex items-center text-emerald-700 hover:text-emerald-800 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span className="text-sm font-medium">Trang chủ</span>
        </button>

        <h1 className="text-3xl font-bold text-emerald-700 font-display">
          Bảng điều khiển trung tâm EV Care
        </h1>
        <p className="text-gray-600 mt-2">
          Theo dõi trạng thái xe đang chờ, đang bảo dưỡng và đã hoàn tất
        </p>
      </div>

      {/* Tổng quan */}
      <div className="container mx-auto px-6 py-8 max-w-6xl grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-xl border border-gray-100 p-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Xe đang chờ</p>
            <h2 className="text-2xl font-bold text-gray-800">
              {vehicles.filter((v) => v.status === 'Chờ tiếp nhận').length}
            </h2>
          </div>
          <Clock className="w-8 h-8 text-gray-500" />
        </div>

        <div className="bg-white shadow rounded-xl border border-gray-100 p-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Đang bảo dưỡng</p>
            <h2 className="text-2xl font-bold text-amber-600">
              {vehicles.filter((v) => v.status === 'Đang bảo dưỡng').length}
            </h2>
          </div>
          <Wrench className="w-8 h-8 text-amber-500" />
        </div>

        <div className="bg-white shadow rounded-xl border border-gray-100 p-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Đã hoàn tất</p>
            <h2 className="text-2xl font-bold text-emerald-600">
              {vehicles.filter((v) => v.status === 'Hoàn tất').length}
            </h2>
          </div>
          <CheckCircle2 className="w-8 h-8 text-emerald-600" />
        </div>
      </div>

      {/* Bộ lọc và tìm kiếm */}
      <div className="container mx-auto px-6 max-w-6xl mb-4 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex gap-2">
          {['Tất cả', 'Chờ tiếp nhận', 'Đang bảo dưỡng', 'Hoàn tất'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-full border text-sm transition ${
                filter === tab
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo tên khách, xe, biển số..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-3 py-2 border rounded-md text-sm focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Danh sách xe */}
      <div className="container mx-auto px-6 pb-10 max-w-6xl">
        <div className="overflow-x-auto bg-white shadow border border-gray-100 rounded-xl">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-700 border-b">
              <tr>
                <th className="text-left px-4 py-3">Mã xe</th>
                <th className="text-left px-4 py-3">Khách hàng</th>
                <th className="text-left px-4 py-3">Xe / Biển số</th>
                <th className="text-left px-4 py-3">Dịch vụ</th>
                <th className="text-left px-4 py-3">Thời gian</th>
                <th className="text-center px-4 py-3">Trạng thái</th>
                <th className="text-right px-4 py-3">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500">
                    Không có xe nào phù hợp.
                  </td>
                </tr>
              )}

              {filtered.map((v) => (
                <tr key={v.id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-medium text-gray-800">{v.id}</td>
                  <td className="px-4 py-3 text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" /> {v.customer}
                  </td>
                  <td className="px-4 py-3 text-gray-700 flex items-center gap-2">
                    <Car className="w-4 h-4 text-gray-500" /> {v.model} – {v.plate}
                  </td>
                  <td className="px-4 py-3 text-gray-700">{v.service}</td>
                  <td className="px-4 py-3 text-gray-600">{v.time}</td>
                  <td className="px-4 py-3 text-center">
                    {v.status === 'Chờ tiếp nhận' && (
                      <span className="inline-flex items-center gap-1 text-gray-700 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-full text-xs">
                        <Clock className="w-3 h-3" /> Chờ tiếp nhận
                      </span>
                    )}
                    {v.status === 'Đang bảo dưỡng' && (
                      <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full text-xs">
                        <Wrench className="w-3 h-3" /> Đang bảo dưỡng
                      </span>
                    )}
                    {v.status === 'Hoàn tất' && (
                      <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full text-xs">
                        <CheckCircle2 className="w-3 h-3" /> Hoàn tất
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right flex justify-end gap-2">
                    {v.status === 'Chờ tiếp nhận' && (
                      <button
                        onClick={() => handleStatusChange(v.id, 'Đang bảo dưỡng')}
                        className="text-sm inline-flex items-center gap-1 px-2 py-1 border rounded-md text-amber-700 hover:bg-amber-50"
                      >
                        <Wrench className="w-4 h-4" /> Nhận xe
                      </button>
                    )}
                    {v.status === 'Đang bảo dưỡng' && (
                      <button
                        onClick={() => handleStatusChange(v.id, 'Hoàn tất')}
                        className="text-sm inline-flex items-center gap-1 px-2 py-1 border rounded-md text-emerald-700 hover:bg-emerald-50"
                      >
                        <CheckCircle2 className="w-4 h-4" /> Hoàn tất
                      </button>
                    )}
                    {v.status === 'Hoàn tất' && (
                      <button
                        onClick={() => handleStatusChange(v.id, 'Chờ tiếp nhận')}
                        className="text-sm inline-flex items-center gap-1 px-2 py-1 border rounded-md text-gray-600 hover:bg-gray-50"
                      >
                        <RefreshCcw className="w-4 h-4" /> Làm mới
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
}
