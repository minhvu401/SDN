'use client';
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  ArrowLeft,
  Car,
  Filter,
  Calendar,
  ClipboardCheck,
  CheckCircle2,
  AlertTriangle,
  Wrench,
  Clock,
  Save,
  Search,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminVehiclesPage() {
  const router = useRouter();

  // ===== DỮ LIỆU GIẢ LẬP =====
  const [vehicles, setVehicles] = useState([
    {
      id: 'V001',
      customer: 'Nguyễn Văn A',
      model: 'VinFast Feliz S',
      plate: '99A-123.45',
      year: 2023,
      lastService: '15/09/2025',
      nextService: '15/12/2025',
      status: 'Hoàn tất',
    },
    {
      id: 'V002',
      customer: 'Trần Thị B',
      model: 'VinFast Klara A2',
      plate: '30B-456.78',
      year: 2022,
      lastService: '12/10/2025',
      nextService: '12/01/2026',
      status: 'Đang bảo dưỡng',
    },
    {
      id: 'V003',
      customer: 'Phạm Minh C',
      model: 'VinFast Evo 200',
      plate: '22C-789.12',
      year: 2023,
      lastService: '05/08/2025',
      nextService: '05/11/2025',
      status: 'Hoạt động',
    },
  ]);

  const [filterModel, setFilterModel] = useState('');
  const [search, setSearch] = useState('');

  const uniqueModels = [...new Set(vehicles.map((v) => v.model))];

  const filtered = vehicles.filter(
    (v) =>
      (filterModel ? v.model === filterModel : true) &&
      (v.customer.toLowerCase().includes(search.toLowerCase()) ||
        v.plate.includes(search))
  );

  const handleSave = () => {
    alert('✅ Dữ liệu xe đã được lưu!');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Header */}
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
            <Car className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-gray-500">Theo dõi & phân loại xe</span>
          </div>
        </div>
      </div>

      {/* Nội dung */}
      <div className="container mx-auto px-6 py-6 max-w-6xl flex flex-col gap-6">
        {/* Bộ lọc */}
        <div className="bg-white p-5 rounded-xl border shadow-sm flex flex-wrap items-center gap-3">
          <Filter className="w-5 h-5 text-gray-600" />
          <select
            value={filterModel}
            onChange={(e) => setFilterModel(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="">Tất cả model</option>
            {uniqueModels.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-2 py-1 ml-auto">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Tìm theo tên KH hoặc biển số..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="text-sm text-gray-700 outline-none"
            />
          </div>
        </div>

        {/* Bảng danh sách xe */}
        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-emerald-600" />
            Danh sách xe & lịch bảo dưỡng
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 border-b">
                <tr>
                  <th className="text-left py-2 px-3">Mã xe</th>
                  <th className="text-left py-2 px-3">Chủ sở hữu</th>
                  <th className="text-left py-2 px-3">Model</th>
                  <th className="text-left py-2 px-3">Biển số</th>
                  <th className="text-left py-2 px-3">Năm SX</th>
                  <th className="text-left py-2 px-3">Bảo dưỡng gần nhất</th>
                  <th className="text-left py-2 px-3">Bảo dưỡng kế tiếp</th>
                  <th className="text-left py-2 px-3">Tình trạng</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((v) => (
                  <tr key={v.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-3 font-medium text-gray-800">{v.id}</td>
                    <td className="py-2 px-3">{v.customer}</td>
                    <td className="py-2 px-3">{v.model}</td>
                    <td className="py-2 px-3">{v.plate}</td>
                    <td className="py-2 px-3">{v.year}</td>
                    <td className="py-2 px-3 flex items-center gap-1 text-gray-700">
                      <Clock className="w-4 h-4 text-gray-500" /> {v.lastService}
                    </td>
                    <td className="py-2 px-3 flex items-center gap-1 text-gray-700">
                      <Calendar className="w-4 h-4 text-emerald-600" /> {v.nextService}
                    </td>
                    <td className="py-2 px-3">
                      <StatusBadge status={v.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Nút lưu */}
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-5 py-2 rounded-md hover:bg-emerald-700 transition"
            >
              <Save className="w-4 h-4" />
              Lưu cập nhật
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

/* ===== COMPONENT: StatusBadge ===== */
function StatusBadge({ status }: { status: string }) {
  const color =
    status === 'Hoàn tất'
      ? 'bg-emerald-100 text-emerald-700'
      : status === 'Đang bảo dưỡng'
      ? 'bg-yellow-100 text-yellow-700'
      : 'bg-gray-100 text-gray-600';
  const icon =
    status === 'Hoàn tất' ? (
      <CheckCircle2 className="w-3 h-3" />
    ) : status === 'Đang bảo dưỡng' ? (
      <AlertTriangle className="w-3 h-3" />
    ) : (
      <Wrench className="w-3 h-3" />
    );

  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1 ${color}`}
    >
      {icon}
      {status}
    </span>
  );
}
