'use client';
import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Calendar,
  UserPlus,
  PlusCircle,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  getActiveTechnicians,
  getStaffBookings,
  assignTechnicianToBooking,
  completeStaffBooking,
} from '../../../lib/api/staff/booking';

export default function StaffSchedulePage() {
  const router = useRouter();

  // --- API-driven assignment state (confirmed bookings + active technicians)
  // We keep two lists:
  // - confirmedAssignedBookings: status === 'confirmed' && technician != null (shown in table)
  // - confirmedUnassignedBookings: status === 'confirmed' && technician == null (shown in assign dropdown)
  const [confirmedAssignedBookings, setConfirmedAssignedBookings] = useState<any[]>([]);
  const [confirmedUnassignedBookings, setConfirmedUnassignedBookings] = useState<any[]>([]);
  const [schedActiveTechnicians, setSchedActiveTechnicians] = useState<any[]>([]);
  const [selectedBookingToAssign, setSelectedBookingToAssign] = useState('');
  const [selectedTechForBooking, setSelectedTechForBooking] = useState('');
  const [loadingAssign, setLoadingAssign] = useState(false);
  const [completingBookingId, setCompletingBookingId] = useState<string | null>(null);

  // Load confirmed bookings (status === 'confirmed') for assignment
  const loadConfirmedBookings = async () => {
    try {
      const res = await getStaffBookings();
      if (res && res.success) {
        const confirmed = (res.data || []).filter((b: any) => b.status === 'confirmed');

        const assigned = confirmed.filter((b: any) => !!b.technician);
        const unassigned = confirmed.filter((b: any) => !b.technician);

        setConfirmedAssignedBookings(
          assigned.map((b: any) => ({
            id: b.bookingId,
            label: `${b.customer?.fullName ?? 'Khách hàng'} • ${b.licensePlates?.[0] ?? ''}`,
            raw: b,
          }))
        );

        setConfirmedUnassignedBookings(
          unassigned.map((b: any) => ({
            id: b.bookingId,
            label: `${b.customer?.fullName ?? 'Khách hàng'} • ${b.licensePlates?.[0] ?? ''}`,
            raw: b,
          }))
        );
      }
    } catch (err) {
      console.error('loadConfirmedBookings', err);
    }
  };

  const loadSchedActiveTechnicians = async () => {
    try {
      // Fetch active technicians and all bookings to determine which
      // technicians are already referenced in bookings (by fullName).
      const [techRes, bookingsRes] = await Promise.all([getActiveTechnicians(), getStaffBookings()]);

      const activeTechs = techRes && techRes.success ? (techRes.data || []) : [];

      // Build a set of fullNames found in any booking. Use normalized lower-case trim for comparison.
      const bookedNames = new Set<string>();
      if (bookingsRes && bookingsRes.success) {
        // Only treat a technician as "booked" if the booking is NOT completed.
        // If a booking.status === 'completed' we should still allow that technician
        // to appear in the "Chọn kỹ thuật viên" dropdown per your requirement.
        (bookingsRes.data || []).forEach((b: any) => {
          const fn = b?.technician?.fullName;
          const status = (b?.status || '').toString().trim().toLowerCase();
          if (fn && status !== 'completed') {
            bookedNames.add(String(fn).trim().toLowerCase());
          }
        });
      }

      // Filter out technicians whose fullName appears in any booking's technician field
      const filtered = activeTechs.filter((t: any) => {
        const name = (t?.fullName || '').toString().trim().toLowerCase();
        return name && !bookedNames.has(name);
      });

      setSchedActiveTechnicians(filtered);
    } catch (err) {
      console.error('loadSchedActiveTechnicians', err);
    }
  };

  useEffect(() => {
    // load confirmed bookings and active technicians for schedule assignment
    loadConfirmedBookings();
    loadSchedActiveTechnicians();
  }, []);

  const handleAssignBookingToTech = async () => {
    if (!selectedBookingToAssign || !selectedTechForBooking) return alert('Vui lòng chọn booking và kỹ thuật viên');
    try {
      setLoadingAssign(true);
      await assignTechnicianToBooking(selectedBookingToAssign, selectedTechForBooking);
      alert('Gán kỹ thuật viên cho booking thành công');
      // refresh confirmed bookings
        await loadConfirmedBookings();
        // refresh available technicians (so assigned techs are removed)
        await loadSchedActiveTechnicians();
      setSelectedBookingToAssign('');
      setSelectedTechForBooking('');
    } catch (err) {
      console.error('handleAssignBookingToTech', err);
      const message = err instanceof Error ? err.message : 'Gán thất bại';
      alert(message);
    } finally {
      setLoadingAssign(false);
    }
  };

  const handleCompleteBooking = async (bookingId: string) => {
    if (!bookingId) return;
    try {
      setCompletingBookingId(bookingId);
      await completeStaffBooking(bookingId);
      alert('Đã đánh dấu hoàn thành booking');
      // refresh confirmed bookings list
        await loadConfirmedBookings();
        // a completion may free up a technician; refresh active tech list
        await loadSchedActiveTechnicians();
    } catch (err) {
      console.error('handleCompleteBooking', err);
      const message = err instanceof Error ? err.message : 'Hoàn thành thất bại';
      alert(message);
    } finally {
      setCompletingBookingId(null);
    }
  };



  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="relative bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-6 max-w-6xl flex items-center gap-3">
          <button
            onClick={() => router.push('/staff/dashboard')}
            className="flex items-center text-emerald-700 hover:text-emerald-800 transition"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span className="text-sm font-medium">Trang nhân viên</span>
          </button>

          <div className="ml-auto flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-gray-500">Quản lý ca làm & phân công</span>
          </div>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="container mx-auto px-6 py-6 max-w-6xl flex flex-col gap-6">
        {/* Controls */}
        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-emerald-600" />
                Quản lý phân công kỹ thuật viên
              </h2>
            </div>
          </div>

          {/* Phân công kỹ thuật viên */}
          <div className="mt-4 pt-4 border-t">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Phân công kỹ thuật viên (Gán booking đã được duyệt)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <select
                value={selectedBookingToAssign}
                onChange={(e) => setSelectedBookingToAssign(e.target.value)}
                className="border rounded-md px-3 py-2 text-sm focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">-- Chọn booking đã duyệt --</option>
                {confirmedUnassignedBookings.map((b: any) => (
                  <option key={b.id} value={b.id}>
                    {b.label}
                  </option>
                ))}
              </select>

              <select
                value={selectedTechForBooking}
                onChange={(e) => setSelectedTechForBooking(e.target.value)}
                className="border rounded-md px-3 py-2 text-sm focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">-- Chọn kỹ thuật viên --</option>
                {schedActiveTechnicians.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.fullName} • {t.phone}
                  </option>
                ))}
              </select>

              <div className="flex">
                <button
                  onClick={handleAssignBookingToTech}
                  disabled={loadingAssign}
                  className="inline-flex items-center justify-center bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition text-sm w-full"
                >
                  {loadingAssign ? 'Đang gán...' : (
                    <>
                      <PlusCircle className="w-4 h-4 mr-1" />
                      Gán kỹ thuật viên
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Danh sách booking đã duyệt (Confirmed Bookings) */}
        <div className="bg-white rounded-xl border shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Danh sách booking đã duyệt</h2>
          {confirmedAssignedBookings.length === 0 ? (
            <div className="text-gray-500">Không có booking đã duyệt</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-600 border-b">
                  <tr>
                    <th className="text-left py-2 px-3">STT</th>
                    <th className="text-left py-2 px-3">Mã booking</th>
                    <th className="text-left py-2 px-3">Khách hàng</th>
                    <th className="text-left py-2 px-3">Biển số</th>
                    <th className="text-left py-2 px-3">Kỹ thuật viên</th>
                    <th className="text-left py-2 px-3">Thời gian</th>
                    <th className="text-center py-2 px-3">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {confirmedAssignedBookings.map((b: any, i: number) => (
                    <tr key={b.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-3">{i + 1}</td>
                      <td className="py-2 px-3 font-medium">{b.id}</td>
                      <td className="py-2 px-3">{b.raw?.customer?.fullName ?? '—'}</td>
                      <td className="py-2 px-3">{b.raw?.licensePlates?.[0] ?? '—'}</td>
                      <td className="py-2 px-3">{b.raw?.technician ? (b.raw.technician.fullName || b.raw.technician.name) : 'Chưa gán'}</td>
                      <td className="py-2 px-3">{b.raw?.bookingDate ? new Date(b.raw.bookingDate).toLocaleString() : '—'}</td>
                      <td className="py-2 px-3 text-center">
                        <button
                          onClick={() => handleCompleteBooking(b.id)}
                          disabled={completingBookingId === b.id}
                          className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition"
                        >
                          {completingBookingId === b.id ? 'Đang...' : 'Hoàn thành'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
