"use client";
import React, { useEffect, useState } from "react";
import { Wrench, CheckCircle2, Clock, ArrowLeft, Eye, X, User, Car, MapPin, Calendar, DollarSign } from "lucide-react";
import { useRouter } from "next/navigation";
import { getStaffBookings } from "../../../lib/api/staff/booking";

export default function StaffDashboardPage() {
  const router = useRouter();

  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'confirmed' | 'completed'>('all');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await getStaffBookings();
        if (res && res.success) {
          setBookings(res.data || []);
          setError(null);
        } else {
          setBookings([]);
          setError("Không thể tải booking");
        }
      } catch (err: any) {
        console.error(err);
        setError(err?.message || "Lỗi khi gọi API");
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const pending = bookings.filter((b) => (b.status || "").toString().toLowerCase() === "pending");
  const confirmed = bookings.filter((b) => (b.status || "").toString().toLowerCase() === "confirmed");
  const completed = bookings.filter((b) => (b.status || "").toString().toLowerCase() === "completed");

  const getFilteredBookings = () => {
    switch (activeTab) {
      case 'pending': return pending;
      case 'confirmed': return confirmed;
      case 'completed': return completed;
      default: return bookings;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusLower = (status || "").toString().toLowerCase();
    switch (statusLower) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </span>
        );
      case 'confirmed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            <Wrench className="w-3 h-3 mr-1" />
            Confirmed
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Completed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="relative bg-white border-b border-gray-200 py-8 text-center">
        <button
          onClick={() => router.push('/')}
          className="absolute top-4 left-6 flex items-center text-emerald-700 hover:text-emerald-800 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span className="text-sm font-medium">Trang chủ</span>
        </button>

        <h1 className="text-2xl font-bold text-emerald-700">Staff Dashboard</h1>
        <p className="text-gray-600 mt-1 text-sm">Quản lý danh sách booking</p>
      </div>

      <div className="container mx-auto px-6 py-6 max-w-7xl">
        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng</p>
                <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-md">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Pending</p>
                <p className="text-2xl font-bold text-gray-600">{pending.length}</p>
              </div>
              <div className="p-2 bg-gray-100 rounded-md">
                <Clock className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Confirmed</p>
                <p className="text-2xl font-bold text-amber-600">{confirmed.length}</p>
              </div>
              <div className="p-2 bg-amber-100 rounded-md">
                <Wrench className="w-5 h-5 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Completed</p>
                <p className="text-2xl font-bold text-emerald-600">{completed.length}</p>
              </div>
              <div className="p-2 bg-emerald-100 rounded-md">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { key: 'all', label: 'Tất cả', count: bookings.length },
                { key: 'pending', label: 'Pending', count: pending.length },
                { key: 'confirmed', label: 'Confirmed', count: confirmed.length },
                { key: 'completed', label: 'Completed', count: completed.length }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.key
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>

          {/* Table */}
          <div className="overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Đang tải booking...</p>
              </div>
            ) : error ? (
              <div className="p-6 text-center text-red-600">{error}</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Booking ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Khách hàng
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trạng thái
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ngày đặt
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kỹ thuật viên
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hành động
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getFilteredBookings().length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                          Không có booking nào
                        </td>
                      </tr>
                    ) : (
                      getFilteredBookings().map((booking: any) => (
                        <tr key={booking.bookingId} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {booking.bookingId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{booking.customer?.fullName}</div>
                            <div className="text-sm text-gray-500">{booking.customer?.phone}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(booking.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString('vi-VN') : '—'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {booking.technician?.fullName || 'Chưa phân công'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => setSelectedBooking(booking)}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-emerald-600 bg-emerald-50 hover:bg-emerald-100 transition-colors"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Chi tiết
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Chi tiết Booking #{selectedBooking.bookingId}
              </h3>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Trạng thái:</span>
                {getStatusBadge(selectedBooking.status)}
              </div>

              {/* Customer Info */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <User className="w-5 h-5 text-gray-400 mr-2" />
                  <h4 className="text-sm font-medium text-gray-900">Thông tin khách hàng</h4>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Họ tên:</span>
                    <p className="font-medium">{selectedBooking.customer?.fullName || '—'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Số điện thoại:</span>
                    <p className="font-medium">{selectedBooking.customer?.phone || '—'}</p>
                  </div>
                </div>
              </div>

              {/* Vehicle Info */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Car className="w-5 h-5 text-gray-400 mr-2" />
                  <h4 className="text-sm font-medium text-gray-900">Thông tin xe</h4>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Biển số:</span>
                  <p className="font-medium">{selectedBooking.licensePlates?.[0] || '—'}</p>
                </div>
              </div>

              {/* Center Info */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                  <h4 className="text-sm font-medium text-gray-900">Trung tâm</h4>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Tên trung tâm:</span>
                  <p className="font-medium">{selectedBooking.center?.name || '—'}</p>
                </div>
              </div>

              {/* Booking Details */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                  <h4 className="text-sm font-medium text-gray-900">Chi tiết đặt lịch</h4>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Ngày đặt:</span>
                    <p className="font-medium">
                      {selectedBooking.bookingDate ? new Date(selectedBooking.bookingDate).toLocaleString('vi-VN') : '—'}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Kỹ thuật viên:</span>
                    <p className="font-medium">{selectedBooking.technician?.fullName || 'Chưa phân công'}</p>
                  </div>
                </div>
              </div>

              {/* Services & Price */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <DollarSign className="w-5 h-5 text-gray-400 mr-2" />
                  <h4 className="text-sm font-medium text-gray-900">Dịch vụ & Giá</h4>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Tổng tiền:</span>
                  <p className="text-lg font-bold text-emerald-600">
                    {selectedBooking.totalPrice ? `${selectedBooking.totalPrice.toLocaleString()} VNĐ` : 'Chưa xác định'}
                  </p>
                </div>
                {selectedBooking.service && selectedBooking.service.length > 0 && (
                  <div className="mt-3">
                    <span className="text-gray-500">Dịch vụ:</span>
                    <ul className="mt-1 space-y-1">
                      {selectedBooking.service.map((s: any, index: number) => (
                        <li key={index} className="text-sm bg-gray-50 px-2 py-1 rounded">
                          {s.name || s.serviceName || 'Dịch vụ không xác định'}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedBooking(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
