'use client';
import React, { useState, useMemo } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  CalendarDays,
  MapPin,
  Wrench,
  Car,
  Clock,
  Loader2,
  CheckCircle2,
  ArrowLeft,
  Eye,
  XCircle,
  Filter,
  Search,
  PlusCircle,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CustomerAppointmentsPage() {
  const router = useRouter();

  const [appointments, setAppointments] = useState([
    {
      id: 'AP001',
      date: '25/10/2025',
      time: '09:00',
      center: 'EV Care Bắc Ninh – Lý Thái Tổ',
      service: 'Kiểm tra hệ thống điện',
      vehicle: 'VinFast Feliz S – 99A-123.45',
      note: 'Phát hiện cảnh báo điện áp bất thường.',
      status: 'Chờ',
    },
    {
      id: 'AP002',
      date: '22/10/2025',
      time: '08:30',
      center: 'EV Care Hà Nội – Cầu Giấy',
      service: 'Thay thế pin',
      vehicle: 'VinFast Klara A2 – 30B-456.78',
      note: 'Thay pin chính hãng, kiểm tra sạc nhanh.',
      status: 'Đang bảo dưỡng',
    },
    {
      id: 'AP003',
      date: '10/10/2025',
      time: '13:30',
      center: 'EV Care TP. Hồ Chí Minh – Quận 7',
      service: 'Bảo dưỡng định kỳ',
      vehicle: 'VinFast Vento – 51H-889.22',
      status: 'Hoàn tất',
    },
  ]);

  const [filterStatus, setFilterStatus] = useState('Tất cả');
  const [search, setSearch] = useState('');

  const filteredAppointments = useMemo(() => {
    return appointments.filter((a) => {
      const matchStatus = filterStatus === 'Tất cả' || a.status === filterStatus;
      const matchSearch =
        search.trim() === '' ||
        a.center.toLowerCase().includes(search.toLowerCase()) ||
        a.service.toLowerCase().includes(search.toLowerCase()) ||
        a.vehicle.toLowerCase().includes(search.toLowerCase()) ||
        a.id.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [appointments, filterStatus, search]);

  const statusBadge = (status: string) => {
    switch (status) {
      case 'Chờ':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 border border-gray-200">
            <Clock className="w-3 h-3" /> Chờ xử lý
          </span>
        );
      case 'Đang bảo dưỡng':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-amber-50 text-amber-700 border border-amber-200">
            <Loader2 className="w-3 h-3 animate-spin" /> Đang bảo dưỡng
          </span>
        );
      case 'Hoàn tất':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" /> Hoàn tất
          </span>
        );
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="relative bg-white border-b border-gray-200 py-10 text-center">
        {/* Back button */}
        <button
          onClick={() => router.push('/customer/dashboard')}
          className="absolute top-5 left-6 flex items-center text-emerald-700 hover:text-emerald-800 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span className="text-sm font-medium">Về bảng điều khiển</span>
        </button>

        <h1 className="text-3xl font-bold text-emerald-700 font-display">
          Theo dõi lịch hẹn bảo dưỡng
        </h1>
        <p className="text-gray-600 mt-2">
          Quản lý các lịch hẹn: <b>Chờ</b>, <b>Đang bảo dưỡng</b>, <b>Hoàn tất</b>
        </p>

        <div className="mt-4">
          <a
            href="/customer/booking"
            className="inline-flex items-center bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Đặt lịch mới
          </a>
        </div>
      </div>

      {/* Bộ lọc */}
      <div className="container mx-auto px-6 pt-8 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {['Tất cả', 'Chờ', 'Đang bảo dưỡng', 'Hoàn tất'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterStatus(tab)}
                className={`px-3 py-1.5 rounded-full border text-sm transition ${
                  filterStatus === tab
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              placeholder="Tìm theo trung tâm, dịch vụ, xe..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-md py-2 px-3 text-sm focus:ring-emerald-500 focus:border-emerald-500"
            />
            <Filter className="w-4 h-4 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Danh sách lịch hẹn */}
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="overflow-x-auto bg-white border border-gray-100 rounded-xl shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr className="border-b">
                <th className="text-left px-4 py-3">Mã lịch</th>
                <th className="text-left px-4 py-3">Thời gian</th>
                <th className="text-left px-4 py-3">Trung tâm</th>
                <th className="text-left px-4 py-3">Dịch vụ</th>
                <th className="text-left px-4 py-3">Xe</th>
                <th className="text-center px-4 py-3">Trạng thái</th>
                <th className="text-right px-4 py-3">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    Không có lịch hẹn phù hợp.
                  </td>
                </tr>
              )}

              {filteredAppointments.map((a) => (
                <tr key={a.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{a.id}</td>
                  <td className="px-4 py-3 text-gray-700">
                    <CalendarDays className="inline w-4 h-4 mr-1 text-gray-500" />
                    {a.date}, {a.time}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    <MapPin className="inline w-4 h-4 mr-1 text-gray-500" />
                    {a.center}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    <Wrench className="inline w-4 h-4 mr-1 text-gray-500" />
                    {a.service}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    <Car className="inline w-4 h-4 mr-1 text-gray-500" />
                    {a.vehicle}
                  </td>
                  <td className="px-4 py-3 text-center">{statusBadge(a.status)}</td>
                  <td className="px-4 py-3 text-right flex items-center justify-end gap-2">
                    <a
                      href={`/customer/appointments/${a.id}`}
                      className="inline-flex items-center gap-1 px-2 py-1 border rounded-md text-gray-700 hover:bg-gray-50 text-xs"
                    >
                      <Eye className="w-4 h-4" /> Xem
                    </a>
                    {a.status === 'Chờ' && (
                      <button
                        onClick={() =>
                          setAppointments((prev) =>
                            prev.map((ap) =>
                              ap.id === a.id ? { ...ap, status: 'Đang bảo dưỡng' } : ap
                            )
                          )
                        }
                        className="inline-flex items-center gap-1 px-2 py-1 border rounded-md text-amber-700 hover:bg-amber-50 text-xs"
                      >
                        <Loader2 className="w-4 h-4" /> Bắt đầu
                      </button>
                    )}
                    {a.status === 'Đang bảo dưỡng' && (
                      <button
                        onClick={() =>
                          setAppointments((prev) =>
                            prev.map((ap) =>
                              ap.id === a.id ? { ...ap, status: 'Hoàn tất' } : ap
                            )
                          )
                        }
                        className="inline-flex items-center gap-1 px-2 py-1 border rounded-md text-emerald-700 hover:bg-emerald-50 text-xs"
                      >
                        <CheckCircle2 className="w-4 h-4" /> Hoàn tất
                      </button>
                    )}
                    {a.status === 'Chờ' && (
                      <button
                        onClick={() =>
                          setAppointments((prev) =>
                            prev.map((ap) =>
                              ap.id === a.id ? { ...ap, status: 'Đã hủy' } : ap
                            )
                          )
                        }
                        className="inline-flex items-center gap-1 px-2 py-1 border rounded-md text-rose-700 hover:bg-rose-50 text-xs"
                      >
                        <XCircle className="w-4 h-4" /> Hủy
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-center text-gray-500 text-sm mt-8">
          Hệ thống tự động cập nhật trạng thái dịch vụ khi xe hoàn tất bảo dưỡng.
        </p>
      </div>

      <Footer />
    </div>
  );
}
