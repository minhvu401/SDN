'use client';
import React, { useState } from 'react';
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
      priority: 'Bình thường',
      estimatedDuration: '2-3 giờ',
      cost: '1,500,000 VNĐ',
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
      priority: 'Cao',
      estimatedDuration: '4-5 giờ',
      cost: '8,500,000 VNĐ',
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
      priority: 'Thấp',
      estimatedDuration: '1-2 giờ',
      cost: '800,000 VNĐ',
    },
    {
      id: 'REQ004',
      customer: 'Lê Thị D',
      phone: '0944555666',
      vehicle: 'VinFast VF8',
      plate: '43A-999.88',
      service: 'Bảo dưỡng toàn diện',
      center: 'EV Care Đà Nẵng',
      date: '29/10/2025',
      time: '08:00',
      note: 'Bảo dưỡng 20,000km, kiểm tra toàn bộ hệ thống',
      status: 'Chờ duyệt',
      priority: 'Bình thường',
      estimatedDuration: '6-8 giờ',
      cost: '3,200,000 VNĐ',
    },
  ]);

  const [filter, setFilter] = useState('Tất cả');
  const [search, setSearch] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  const filtered = requests.filter(
    (r) =>
      (filter === 'Tất cả' || r.status === filter) &&
      (r.customer.toLowerCase().includes(search.toLowerCase()) ||
        r.vehicle.toLowerCase().includes(search.toLowerCase()) ||
        r.plate.toLowerCase().includes(search.toLowerCase()) ||
        r.service.toLowerCase().includes(search.toLowerCase()))
  );

  const updateStatus = (id: string, status: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
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
              <p className="text-xl font-bold text-emerald-600">{requests.length}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Chờ duyệt</p>
              <p className="text-xl font-bold text-amber-600">
                {requests.filter(r => r.status === 'Chờ duyệt').length}
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
              {['Tất cả', 'Chờ duyệt', 'Đã duyệt', 'Đã từ chối'].map((tab) => (
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
                  {tab !== 'Tất cả' && (
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                      tab === 'Chờ duyệt' ? 'bg-amber-200 text-amber-800' :
                      tab === 'Đã duyệt' ? 'bg-green-200 text-green-800' :
                      'bg-red-200 text-red-800'
                    }`}>
                      {tab === 'Chờ duyệt' ? requests.filter(r => r.status === 'Chờ duyệt').length :
                       tab === 'Đã duyệt' ? requests.filter(r => r.status === 'Đã duyệt').length :
                       requests.filter(r => r.status === 'Đã từ chối').length}
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
              <h3 className="text-lg font-semibold text-gray-800">Danh sách yêu cầu</h3>
              <div className="text-sm text-gray-500">
                Hiển thị {filtered.length} / {requests.length} yêu cầu
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 text-gray-700 border-b">
                <tr>
                  <th className="text-left px-6 py-3 font-medium">Mã yêu cầu</th>
                  <th className="text-left px-6 py-3 font-medium">Khách hàng</th>
                  <th className="text-left px-6 py-3 font-medium">Xe / Biển số</th>
                  <th className="text-left px-6 py-3 font-medium">Dịch vụ</th>
                  <th className="text-left px-6 py-3 font-medium">Trung tâm</th>
                  <th className="text-left px-6 py-3 font-medium">Thời gian</th>
                  <th className="text-center px-6 py-3 font-medium">Ưu tiên</th>
                  <th className="text-center px-6 py-3 font-medium">Chi phí</th>
                  <th className="text-center px-6 py-3 font-medium">Trạng thái</th>
                  <th className="text-right px-6 py-3 font-medium">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={10} className="py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <ClipboardList className="w-12 h-12 text-gray-300" />
                        <p className="text-gray-500 text-lg">Không có yêu cầu nào</p>
                        <p className="text-gray-400 text-sm">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                      </div>
                    </td>
                  </tr>
                )}

                {filtered.map((r) => (
                  <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{r.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{r.customer}</div>
                        <div className="text-sm text-gray-500">{r.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{r.vehicle}</div>
                        <div className="text-sm text-gray-500">{r.plate}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">{r.service}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">{r.center}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{r.date}</div>
                        <div className="text-sm text-gray-500">{r.time}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        r.priority === 'Cao' 
                          ? 'text-red-700 bg-red-100' 
                          : r.priority === 'Bình thường'
                          ? 'text-blue-700 bg-blue-100'
                          : 'text-gray-700 bg-gray-100'
                      }`}>
                        {r.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="font-medium text-gray-900">{r.cost}</div>
                      <div className="text-xs text-gray-500">{r.estimatedDuration}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {r.status === 'Chờ duyệt' && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-amber-700 bg-amber-100">
                          <Clock className="w-3 h-3 mr-1" />
                          Chờ duyệt
                        </span>
                      )}
                      {r.status === 'Đã duyệt' && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-emerald-700 bg-emerald-100">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Đã duyệt
                        </span>
                      )}
                      {r.status === 'Đã từ chối' && (
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
                        {r.status === 'Chờ duyệt' && (
                          <>
                            <button
                              onClick={() => updateStatus(r.id, 'Đã duyệt')}
                              className="px-3 py-1 text-sm font-medium text-white bg-emerald-600 rounded hover:bg-emerald-700 transition"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => updateStatus(r.id, 'Đã từ chối')}
                              className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 transition"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
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
                    <label className="text-sm font-medium text-gray-600">Khách hàng</label>
                    <p className="text-gray-800">{selectedRequest.customer}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Số điện thoại</label>
                    <p className="text-gray-800">{selectedRequest.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Xe</label>
                    <p className="text-gray-800">{selectedRequest.vehicle}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Biển số</label>
                    <p className="text-gray-800">{selectedRequest.plate}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Dịch vụ</label>
                    <p className="text-gray-800">{selectedRequest.service}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Trung tâm</label>
                    <p className="text-gray-800">{selectedRequest.center}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Ngày hẹn</label>
                    <p className="text-gray-800">{selectedRequest.date}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Giờ hẹn</label>
                    <p className="text-gray-800">{selectedRequest.time}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Ưu tiên</label>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                      selectedRequest.priority === 'Cao' 
                        ? 'text-red-700 bg-red-50 border border-red-200' 
                        : selectedRequest.priority === 'Bình thường'
                        ? 'text-blue-700 bg-blue-50 border border-blue-200'
                        : 'text-gray-700 bg-gray-50 border border-gray-200'
                    }`}>
                      {selectedRequest.priority}
                    </span>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Thời gian dự kiến</label>
                    <p className="text-gray-800">{selectedRequest.estimatedDuration}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Chi phí ước tính</label>
                    <p className="text-gray-800 font-medium">{selectedRequest.cost}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Trạng thái</label>
                    <div>
                      {selectedRequest.status === 'Chờ duyệt' && (
                        <span className="inline-flex items-center gap-1 text-gray-700 bg-gray-100 border border-gray-200 px-2 py-1 rounded-full text-xs">
                          <Clock className="w-3 h-3" /> Chờ duyệt
                        </span>
                      )}
                      {selectedRequest.status === 'Đã duyệt' && (
                        <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-full text-xs">
                          <CheckCircle2 className="w-3 h-3" /> Đã duyệt
                        </span>
                      )}
                      {selectedRequest.status === 'Đã từ chối' && (
                        <span className="inline-flex items-center gap-1 text-rose-700 bg-rose-50 border border-rose-200 px-2 py-1 rounded-full text-xs">
                          <XCircle className="w-3 h-3" /> Đã từ chối
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Ghi chú</label>
                  <p className="text-gray-800 bg-gray-50 p-3 rounded-md mt-1">
                    {selectedRequest.note}
                  </p>
                </div>

                {selectedRequest.status === 'Chờ duyệt' && (
                  <div className="flex gap-3 pt-4 border-t">
                    <button
                      onClick={() => {
                        updateStatus(selectedRequest.id, 'Đã duyệt');
                        setSelectedRequest(null);
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Duyệt yêu cầu
                    </button>
                    <button
                      onClick={() => {
                        updateStatus(selectedRequest.id, 'Đã từ chối');
                        setSelectedRequest(null);
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                    >
                      <XCircle className="w-4 h-4" /> Từ chối
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
