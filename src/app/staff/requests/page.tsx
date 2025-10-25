'use client';
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  ClipboardList,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  Car,
  CalendarDays,
  Wrench,
  MapPin,
  ArrowLeft,
  Search,
  Eye,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function StaffRequestsPage() {
  const router = useRouter();

  const [requests, setRequests] = useState([
    {
      id: 'REQ001',
      customer: 'Nguyễn Văn A',
      phone: '0987654321',
      vehicle: 'VinFast Feliz S',
      plate: '99A-123.45',
      service: 'Bảo dưỡng định kỳ',
      center: 'EV Care Bắc Ninh',
      date: '27/10/2025',
      time: '09:00',
      note: 'Kiểm tra hệ thống phanh và thay dầu',
      status: 'Chờ duyệt',
    },
    {
      id: 'REQ002',
      customer: 'Trần Thị B',
      phone: '0911222333',
      vehicle: 'VinFast Klara A2',
      plate: '30B-456.78',
      service: 'Thay thế pin',
      center: 'EV Care Hà Nội',
      date: '28/10/2025',
      time: '10:30',
      note: 'Xe yếu pin, cần thay gấp',
      status: 'Đã duyệt',
    },
    {
      id: 'REQ003',
      customer: 'Phạm Văn C',
      phone: '0933444555',
      vehicle: 'VinFast Vento',
      plate: '51H-889.22',
      service: 'Kiểm tra hệ thống điện',
      center: 'EV Care TP.HCM',
      date: '26/10/2025',
      time: '14:00',
      note: 'Xe báo lỗi cảm biến điện áp',
      status: 'Đã từ chối',
    },
  ]);

  const [filter, setFilter] = useState('Tất cả');
  const [search, setSearch] = useState('');

  const filtered = requests.filter(
    (r) =>
      (filter === 'Tất cả' || r.status === filter) &&
      (r.customer.toLowerCase().includes(search.toLowerCase()) ||
        r.vehicle.toLowerCase().includes(search.toLowerCase()) ||
        r.plate.toLowerCase().includes(search.toLowerCase()))
  );

  const updateStatus = (id: string, status: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="relative bg-white border-b border-gray-200 py-10 text-center">
        <button
          onClick={() => router.push('/staff/dashboard')}
          className="absolute top-5 left-6 flex items-center text-emerald-700 hover:text-emerald-800 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span className="text-sm font-medium">Về bảng điều khiển</span>
        </button>

        <h1 className="text-3xl font-bold text-emerald-700 font-display">
          Tiếp nhận & Duyệt yêu cầu khách hàng
        </h1>
        <p className="text-gray-600 mt-2">
          Quản lý các yêu cầu đặt lịch bảo dưỡng, sửa chữa từ khách hàng EV Care
        </p>
      </div>

      {/* Bộ lọc */}
      <div className="container mx-auto px-6 max-w-6xl my-6 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex gap-2">
          {['Tất cả', 'Chờ duyệt', 'Đã duyệt', 'Đã từ chối'].map((tab) => (
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
            placeholder="Tìm theo khách hàng, xe, biển số..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-3 py-2 border rounded-md text-sm focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Danh sách */}
      <div className="container mx-auto px-6 pb-10 max-w-6xl">
        <div className="overflow-x-auto bg-white shadow border border-gray-100 rounded-xl">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-700 border-b">
              <tr>
                <th className="text-left px-4 py-3">Mã yêu cầu</th>
                <th className="text-left px-4 py-3">Khách hàng</th>
                <th className="text-left px-4 py-3">Xe / Biển số</th>
                <th className="text-left px-4 py-3">Dịch vụ</th>
                <th className="text-left px-4 py-3">Trung tâm</th>
                <th className="text-left px-4 py-3">Thời gian</th>
                <th className="text-center px-4 py-3">Trạng thái</th>
                <th className="text-right px-4 py-3">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-gray-500">
                    Không có yêu cầu nào.
                  </td>
                </tr>
              )}

              {filtered.map((r) => (
                <tr key={r.id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-medium text-gray-800">{r.id}</td>
                  <td className="px-4 py-3 text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" /> {r.customer}
                  </td>
                  <td className="px-4 py-3 text-gray-700 flex items-center gap-2">
                    <Car className="w-4 h-4 text-gray-500" /> {r.vehicle} – {r.plate}
                  </td>
                  <td className="px-4 py-3 text-gray-700 flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-gray-500" /> {r.service}
                  </td>
                  <td className="px-4 py-3 text-gray-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" /> {r.center}
                  </td>
                  <td className="px-4 py-3 text-gray-700 flex items-center gap-1">
                    <CalendarDays className="w-4 h-4 text-gray-500" /> {r.date}, {r.time}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {r.status === 'Chờ duyệt' && (
                      <span className="inline-flex items-center gap-1 text-gray-700 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-full text-xs">
                        <Clock className="w-3 h-3" /> Chờ duyệt
                      </span>
                    )}
                    {r.status === 'Đã duyệt' && (
                      <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full text-xs">
                        <CheckCircle2 className="w-3 h-3" /> Đã duyệt
                      </span>
                    )}
                    {r.status === 'Đã từ chối' && (
                      <span className="inline-flex items-center gap-1 text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full text-xs">
                        <XCircle className="w-3 h-3" /> Đã từ chối
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right flex justify-end gap-2">
                    <button
                      onClick={() => alert(`Ghi chú: ${r.note}`)}
                      className="text-sm inline-flex items-center gap-1 px-2 py-1 border rounded-md text-gray-600 hover:bg-gray-50"
                    >
                      <Eye className="w-4 h-4" /> Chi tiết
                    </button>
                    {r.status === 'Chờ duyệt' && (
                      <>
                        <button
                          onClick={() => updateStatus(r.id, 'Đã duyệt')}
                          className="text-sm inline-flex items-center gap-1 px-2 py-1 border rounded-md text-emerald-700 hover:bg-emerald-50"
                        >
                          <CheckCircle2 className="w-4 h-4" /> Duyệt
                        </button>
                        <button
                          onClick={() => updateStatus(r.id, 'Đã từ chối')}
                          className="text-sm inline-flex items-center gap-1 px-2 py-1 border rounded-md text-rose-700 hover:bg-rose-50"
                        >
                          <XCircle className="w-4 h-4" /> Từ chối
                        </button>
                      </>
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
