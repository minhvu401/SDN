'use client';
import React, { useState, useEffect, useMemo } from 'react';
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
  Filter,
  Search,
  PlusCircle,
  XCircle,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { getMyBookings,  Booking } from '@/lib/api/customer/booking';

export default function CustomerAppointmentsPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Booking[]>([]);
  const [filterStatus, setFilterStatus] = useState('Tất cả');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // 🟢 Lấy danh sách lịch hẹn từ API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getMyBookings();
        setAppointments(data || []);
      } catch (err) {
        console.error('❌ Lỗi tải danh sách lịch hẹn:', err);
        toast.error('Không thể tải danh sách lịch hẹn.');
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  // 🧮 Lọc & tìm kiếm
  const filteredAppointments = useMemo(() => {
    return appointments.filter((a) => {
      const matchStatus = filterStatus === 'Tất cả' || a.status === filterStatus;

      const centerName = a.center?.name?.toLowerCase() || '';
      const serviceNames =
        a.services?.map((s) => s.name.toLowerCase()).join(', ') || '';
      const licensePlates =
        a.licensePlates?.join(', ')?.toLowerCase() || '';
      const id =
        a.bookingId?.toLowerCase() || a._id?.toLowerCase() || '';

      const matchSearch =
        search.trim() === '' ||
        centerName.includes(search.toLowerCase()) ||
        serviceNames.includes(search.toLowerCase()) ||
        licensePlates.includes(search.toLowerCase()) ||
        id.includes(search.toLowerCase());

      return matchStatus && matchSearch;
    });
  }, [appointments, filterStatus, search]);

  // 🟢 Hiển thị trạng thái
  const statusBadge = (status?: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 border border-gray-200">
            <Clock className="w-3 h-3" /> Chờ xử lý
          </span>
        );
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-amber-50 text-amber-700 border border-amber-200">
            <Loader2 className="w-3 h-3 animate-spin" /> Đang bảo dưỡng
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" /> Hoàn tất
          </span>
        );
      case 'canceled':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3 h-3" /> Đã hủy
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 border border-gray-200">
            <Clock className="w-3 h-3" /> Chờ xử lý
          </span>
        );
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Đang tải lịch hẹn...
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="relative bg-white border-b border-gray-200 py-10 text-center">
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
            {['Tất cả', 'pending', 'confirmed', 'completed', 'canceled'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterStatus(tab)}
                className={`px-3 py-1.5 rounded-full border text-sm transition ${
                  filterStatus === tab
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {tab === 'pending'
                  ? 'Chờ'
                  : tab === 'confirmed'
                  ? 'Đang bảo dưỡng'
                  : tab === 'completed'
                  ? 'Hoàn tất'
                  : tab === 'canceled'
                  ? 'Đã hủy'
                  : 'Tất cả'}
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
                <th className="text-left px-4 py-3">Thời gian</th>
                <th className="text-left px-4 py-3">Trung tâm</th>
                <th className="text-left px-4 py-3">Dịch vụ</th>
                <th className="text-left px-4 py-3">Biển số xe</th>
                <th className="text-center px-4 py-3">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    Không có lịch hẹn phù hợp.
                  </td>
                </tr>
              )}

              {filteredAppointments.map((a) => (
                <tr key={a.bookingId} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-700">
                    <CalendarDays className="inline w-4 h-4 mr-1 text-gray-500" />
                    {a.bookingDate
                      ? new Date(a.bookingDate).toLocaleString('vi-VN')
                      : '—'}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    <MapPin className="inline w-4 h-4 mr-1 text-gray-500" />
                    {a.center?.name || '—'}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    <Wrench className="inline w-4 h-4 mr-1 text-gray-500" />
                    {a.services?.map((s) => s.name).join(', ') || '—'}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    <Car className="inline w-4 h-4 mr-1 text-gray-500" />
                    {a.licensePlates?.join(', ') || '—'}
                  </td>
                  <td className="px-4 py-3 text-center">{statusBadge(a.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-center text-gray-500 text-sm mt-8">
          Hệ thống sẽ tự động cập nhật trạng thái khi xe hoàn tất bảo dưỡng.
        </p>
      </div>

      <Footer />
    </div>
  );
}
