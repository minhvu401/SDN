"use client";
import React, { useState, useEffect, useCallback } from "react";
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
  Phone,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  getActiveTechnicians,
  getStaffBookings,
  setBookingStatus,
  assignTechnicianToBooking,
  completeStaffBooking,
} from "@/lib/api/staff/booking";

export default function StaffRequestsPage() {
  const router = useRouter();

  const [requests, setRequests] = useState<any[]>([]);
  const [activeTechnicians, setActiveTechnicians] = useState<any[]>([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignBooking, setAssignBooking] = useState<any | null>(null);
  const [selectedTechnicianId, setSelectedTechnicianId] = useState<
    string | null
  >(null);
  const [loadingBookings, setLoadingBookings] = useState(false);

  const [filter, setFilter] = useState("Tất cả");
  const [search, setSearch] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  const safeString = (v: any) => {
    if (!v) return "";
    if (typeof v === "string") return v;
    if (typeof v === "number") return String(v);
    if (typeof v === "object")
      return (
        (v.fullName ||
          v.name ||
          v.customerName ||
          v.username ||
          JSON.stringify(v)) ??
        ""
      );
    return "";
  };

  const filtered = requests.filter((r) => {
    const mapTabToStatus = (tab: string) => {
      if (tab === "Chờ duyệt") return "pending";
      if (tab === "Đã duyệt") return "confirmed";
      if (tab === "Đã từ chối") return "rejected";
      return "";
    };
    const statusMatch =
      filter === "Tất cả" || r.status === mapTabToStatus(filter);
    const q = search.trim().toLowerCase();
    if (!q) return statusMatch;
    const customer = safeString(r.customer).toLowerCase();
    const vehicle = safeString(r.vehicle).toLowerCase();
    const plate = safeString(r.plate).toLowerCase();
    const service = safeString(r.service).toLowerCase();
    return (
      statusMatch &&
      (customer.includes(q) ||
        vehicle.includes(q) ||
        plate.includes(q) ||
        service.includes(q))
    );
  });

  const mapApiStatusToUi = (apiStatus: string) => {
    // map backend status strings to UI Vietnamese labels
    switch (apiStatus) {
      case "confirmed":
        return "Đã duyệt";
      case "rejected":
        return "Đã từ chối";
      case "completed":
        return "Đã hoàn thành";
      default:
        return apiStatus;
    }
  };

  const loadBookings = useCallback(async () => {
    try {
      setLoadingBookings(true);
      const res = await getStaffBookings();
      if (res && res.success) {
        // Normalize backend bookings to a UI-friendly shape and keep only pending bookings
        const normalized = (res.data || [])
          .map((b: any) => ({
            id: b.bookingId,
            customer: b.customer?.fullName ?? "",
            phone: b.customer?.phone ?? "",
            vehicle:
              b.service && b.service.length > 0
                ? b.service.map((s: any) => s.name || s).join(", ")
                : "",
            plate:
              b.licensePlates && b.licensePlates.length > 0
                ? b.licensePlates[0]
                : "",
            service:
              b.service && b.service.length > 0
                ? b.service.map((s: any) => s.name || s).join(", ")
                : "",
            center: b.center?.name ?? "",
            date: b.bookingDate,
            time: b.bookingDate,
            estimatedDuration: b.estimatedEndTime
              ? `${new Date(b.bookingDate).toLocaleString()} - ${new Date(
                  b.estimatedEndTime
                ).toLocaleString()}`
              : "",
            cost: b.totalPrice
              ? `${b.totalPrice.toLocaleString("vi-VN")} VNĐ`
              : "",
            status: b.status, // keep backend status ('pending' | 'confirmed' | 'completed')
            raw: b,
          }))
          .filter((x: any) => x.status === "pending");

        setRequests(normalized);
      }
    } catch (err) {
      console.error("loadBookings", err);
    } finally {
      setLoadingBookings(false);
    }
  }, []);

  const loadActiveTechnicians = useCallback(async () => {
    try {
      const res = await getActiveTechnicians();
      if (res && res.success) {
        setActiveTechnicians(res.data || []);
      }
    } catch (err) {
      console.error("loadActiveTechnicians", err);
    }
  }, []);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const updateStatus = async (
    bookingId: string,
    action: "reject" | "confirm"
  ) => {
    try {
      if (action === "reject") {
        // backend expects a status change - use PATCH /bookings/{id}/status to 'rejected'
        await setBookingStatus(bookingId, "rejected");
        // remove from pending list
        setRequests((prev) => prev.filter((r) => r.id !== bookingId));
      }

      if (action === "confirm") {
        // Confirm booking: pending -> confirmed
        await setBookingStatus(bookingId, "confirmed");
        // remove from pending list (now moved to confirmed and will be available to schedule page)
        setRequests((prev) => prev.filter((r) => r.id !== bookingId));
      }
    } catch (err) {
      console.error("updateStatus", err);
      const msg = err instanceof Error ? err.message : "Không thể cập nhật trạng thái.";
      alert(msg);
    }
  };

  // For requests page we only "duyệt" (confirm) here. Assignment happens in the Schedule page.
  const openAssignModal = async (booking: any) => {
    // treat opening assign as a confirm action for this page
    await updateStatus(booking.id, "confirm");
  };

  const handleAssign = async () => {
    if (!assignBooking || !selectedTechnicianId)
      return alert("Vui lòng chọn kỹ thuật viên");
    try {
      // 1) PHẢI PHÊ DUYỆT TRƯỚC: Set booking status to confirmed (PATCH /bookings/{id}/status { status: 'confirmed' })
      await setBookingStatus(assignBooking.id, 'confirmed');
      
      // 2) SAU ĐÓ MỚI GÁN: assign technician (PATCH /staff/bookings/{id}/assign-technician)
      await assignTechnicianToBooking(assignBooking.id, selectedTechnicianId);
      
      // remove processed booking from pending list
      setRequests((prev) => prev.filter((r) => r.id !== assignBooking.id));
      setShowAssignModal(false);
      setAssignBooking(null);
      setSelectedTechnicianId(null);
      alert("Đã gán kỹ thuật viên thành công!");
    } catch (err) {
      console.error("handleAssign", err);
      const errorMessage = err instanceof Error ? err.message : "Lỗi không xác định";
      alert("Gán kỹ thuật viên thất bại: " + errorMessage);
    }
  };

  const handleComplete = async (bookingId: string) => {
    try {
      await completeStaffBooking(bookingId);
      setRequests((prev) =>
        prev.map((r) =>
          r.id === bookingId ? { ...r, status: "Đã hoàn thành" } : r
        )
      );
    } catch (err) {
      console.error("handleComplete", err);
      alert("Không thể đánh dấu hoàn thành");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
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
                Quản lý yêu cầu
              </h1>
              <p className="text-gray-600 text-sm">
                Duyệt và xử lý yêu cầu đặt lịch bảo dưỡng
              </p>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Tổng yêu cầu</p>
              <p className="text-xl font-bold text-emerald-600">
                {requests.length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Chờ duyệt</p>
              <p className="text-xl font-bold text-amber-600">
                {requests.filter((r) => r.status === "pending").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bộ lọc và tìm kiếm */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-2">
              {["Tất cả", "Chờ duyệt", "Đã duyệt", "Đã từ chối"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    filter === tab
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tab}
                  {tab !== "Tất cả" && (
                    <span
                      className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                        tab === "Chờ duyệt"
                          ? "bg-amber-200 text-amber-800"
                          : tab === "Đã duyệt"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {tab === "Chờ duyệt"
                        ? requests.filter((r) => r.status === "pending").length
                        : tab === "Đã duyệt"
                        ? requests.filter((r) => r.status === "confirmed")
                            .length
                        : requests.filter((r) => r.status === "rejected")
                            .length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Danh sách */}
      <div className="container mx-auto px-6 pb-10 max-w-7xl">
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">
                Danh sách yêu cầu
              </h3>
              <div className="text-sm text-gray-500">
                Hiển thị {filtered.length} / {requests.length} yêu cầu
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 text-gray-700 border-b">
                <tr>
                  <th className="text-left px-6 py-3 font-medium">
                    STT
                  </th>
                  <th className="text-left px-6 py-3 font-medium">
                    Khách hàng
                  </th>
                  <th className="text-left px-6 py-3 font-medium">
                    Xe / Biển số
                  </th>
                  <th className="text-left px-6 py-3 font-medium">Dịch vụ</th>
                  <th className="text-left px-6 py-3 font-medium">Trung tâm</th>
                  <th className="text-left px-6 py-3 font-medium">Thời gian</th>
                  <th className="text-center px-6 py-3 font-medium">Ưu tiên</th>
                  <th className="text-center px-6 py-3 font-medium">Chi phí</th>
                  <th className="text-center px-6 py-3 font-medium">
                    Trạng thái
                  </th>
                  <th className="text-right px-6 py-3 font-medium">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={10} className="py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <ClipboardList className="w-12 h-12 text-gray-300" />
                        <p className="text-gray-500 text-lg">
                          Không có yêu cầu nào
                        </p>
                        <p className="text-gray-400 text-sm">
                          Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                        </p>
                      </div>
                    </td>
                  </tr>
                )}

                {filtered.map((r, idx) => (
                  <tr
                    key={r.id ?? r.bookingId ?? idx}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{idx + 1}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">
                          {safeString(r.customer)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {safeString(r.phone)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">
                          {safeString(r.vehicle)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {safeString(r.plate)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">
                        {safeString(r.service)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">
                        {safeString(r.center)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">
                          {safeString(r.date)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {safeString(r.time)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          r.priority === "Cao"
                            ? "text-red-700 bg-red-100"
                            : r.priority === "Bình thường"
                            ? "text-blue-700 bg-blue-100"
                            : "text-gray-700 bg-gray-100"
                        }`}
                      >
                        {safeString(r.priority)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="font-medium text-gray-900">
                        {safeString(r.cost)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {safeString(r.estimatedDuration)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {r.status === "pending" && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-amber-700 bg-amber-100">
                          <Clock className="w-3 h-3 mr-1" />
                          Chờ duyệt
                        </span>
                      )}
                      {r.status === "confirmed" && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-emerald-700 bg-emerald-100">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Đã duyệt
                        </span>
                      )}
                      {r.status === "rejected" && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-red-700 bg-red-100">
                          <XCircle className="w-3 h-3 mr-1" />
                          Đã từ chối
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedRequest(r)}
                          className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {r.status === "pending" && (
                          <>
                            <button
                              onClick={() => openAssignModal(r)}
                              className="px-3 py-1 text-sm font-medium text-white bg-emerald-600 rounded hover:bg-emerald-700 transition"
                            >
                              Duyệt
                            </button>
                          </>
                        )}
                        {r.status === "confirmed" && (
                          <button
                            onClick={() => handleComplete(r.id)}
                            className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition"
                          >
                            <Wrench className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal chi tiết yêu cầu */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Chi tiết yêu cầu #{selectedRequest.id}
                </h3>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Khách hàng
                    </label>
                    <p className="text-gray-800">
                      {safeString(selectedRequest.customer)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Số điện thoại
                    </label>
                    <p className="text-gray-800">
                      {safeString(selectedRequest.phone)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Xe
                    </label>
                    <p className="text-gray-800">
                      {safeString(selectedRequest.vehicle)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Biển số
                    </label>
                    <p className="text-gray-800">
                      {safeString(selectedRequest.plate)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Dịch vụ
                    </label>
                    <p className="text-gray-800">
                      {safeString(selectedRequest.service)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Trung tâm
                    </label>
                    <p className="text-gray-800">
                      {safeString(selectedRequest.center)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Ngày hẹn
                    </label>
                    <p className="text-gray-800">
                      {safeString(selectedRequest.date)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Giờ hẹn
                    </label>
                    <p className="text-gray-800">
                      {safeString(selectedRequest.time)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Ưu tiên
                    </label>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                        safeString(selectedRequest.priority) === "Cao"
                          ? "text-red-700 bg-red-50 border border-red-200"
                          : safeString(selectedRequest.priority) ===
                            "Bình thường"
                          ? "text-blue-700 bg-blue-50 border border-blue-200"
                          : "text-gray-700 bg-gray-50 border border-gray-200"
                      }`}
                    >
                      {safeString(selectedRequest.priority)}
                    </span>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Thời gian dự kiến
                    </label>
                    <p className="text-gray-800">
                      {safeString(selectedRequest.estimatedDuration)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Chi phí ước tính
                    </label>
                    <p className="text-gray-800 font-medium">
                      {safeString(selectedRequest.cost)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Trạng thái
                    </label>
                    <div>
                      {selectedRequest.status === "pending" && (
                        <span className="inline-flex items-center gap-1 text-gray-700 bg-gray-100 border border-gray-200 px-2 py-1 rounded-full text-xs">
                          <Clock className="w-3 h-3" /> Chờ duyệt
                        </span>
                      )}
                      {selectedRequest.status === "confirmed" && (
                        <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-full text-xs">
                          <CheckCircle2 className="w-3 h-3" /> Đã duyệt
                        </span>
                      )}
                      {selectedRequest.status === "rejected" && (
                        <span className="inline-flex items-center gap-1 text-rose-700 bg-rose-50 border border-rose-200 px-2 py-1 rounded-full text-xs">
                          <XCircle className="w-3 h-3" /> Đã từ chối
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Ghi chú
                  </label>
                  <p className="text-gray-800 bg-gray-50 p-3 rounded-md mt-1">
                    {selectedRequest.note}
                  </p>
                </div>

                {selectedRequest.status === "pending" && (
                  <div className="flex gap-3 pt-4 border-t">
                    <button
                      onClick={() => {
                        openAssignModal(selectedRequest);
                        setSelectedRequest(null);
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Duyệt yêu cầu
                    </button>
                    <button
                      onClick={() => {
                        // chỉ đóng modal — không gọi API từ chối
                        setSelectedRequest(null);
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition"
                    >
                      <XCircle className="w-4 h-4" /> Thoát
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assign technician modal */}
      {showAssignModal && assignBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                  Gán kỹ thuật viên cho {assignBooking.id}
                </h3>
                <button
                  onClick={() => {
                    setShowAssignModal(false);
                    setAssignBooking(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                {activeTechnicians.length === 0 ? (
                  <div className="text-center text-gray-500">
                    Không có kỹ thuật viên hoạt động
                  </div>
                ) : (
                  <div className="grid gap-2">
                    {activeTechnicians.map((t) => (
                      <label
                        key={t.id}
                        className={`flex items-center gap-3 p-3 border rounded ${
                          selectedTechnicianId === t.id
                            ? "border-emerald-500 bg-emerald-50"
                            : "border-gray-200"
                        }`}
                      >
                        <input
                          type="radio"
                          name="tech"
                          value={t.id}
                          checked={selectedTechnicianId === t.id}
                          onChange={() => setSelectedTechnicianId(t.id)}
                        />
                        <div>
                          <div className="font-medium">
                            {t.fullName || t.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {t.phone || t.contact || ""}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                )}

                <div className="flex gap-3 pt-4 border-t">
                  <button
                    onClick={handleAssign}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition"
                  >
                    Gán và Duyệt
                  </button>
                  <button
                    onClick={() => {
                      setShowAssignModal(false);
                      setAssignBooking(null);
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
