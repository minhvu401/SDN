'use client';
import React, { useState } from 'react';
import {
  Car,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Wrench,
  User,
  Calendar,
  MapPin,
  Search,
  Filter,
  Eye,
  Play,
  Pause,
  RotateCcw,
  ArrowLeft,
  Activity,
  Zap,
  Battery,
  Gauge,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function StaffVehicleTrackingPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Tất cả');
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const [vehicles, setVehicles] = useState([
    {
      id: 'V001',
      customer: 'Nguyễn Văn A',
      phone: '0987654321',
      model: 'VinFast Feliz S',
      plate: '99A-123.45',
      vin: 'VF8FELIZS2024001',
      service: 'Kiểm tra hệ thống điện',
      technician: 'Trần Văn B',
      status: 'Chờ tiếp nhận',
      priority: 'Cao',
      startTime: '2025-10-27 09:00',
      estimatedEnd: '2025-10-27 11:00',
      actualStart: null,
      actualEnd: null,
      progress: 0,
      issues: [],
      checklist: [
        { item: 'Kiểm tra pin', status: 'pending', notes: '' },
        { item: 'Kiểm tra motor', status: 'pending', notes: '' },
        { item: 'Kiểm tra hệ thống sạc', status: 'pending', notes: '' },
        { item: 'Kiểm tra BMS', status: 'pending', notes: '' },
        { item: 'Test lái thử', status: 'pending', notes: '' },
      ],
      condition: {
        battery: 85,
        motor: 'Tốt',
        charging: 'Bình thường',
        overall: 'Khá tốt'
      }
    },
    {
      id: 'V002',
      customer: 'Trần Thị B',
      phone: '0911222333',
      model: 'VinFast Klara A2',
      plate: '30B-456.78',
      vin: 'VF9KLARA2024002',
      service: 'Bảo dưỡng định kỳ',
      technician: 'Phạm Văn C',
      status: 'Đang bảo dưỡng',
      priority: 'Bình thường',
      startTime: '2025-10-27 08:30',
      estimatedEnd: '2025-10-27 12:00',
      actualStart: '2025-10-27 08:35',
      actualEnd: null,
      progress: 65,
      issues: ['Pin có dấu hiệu suy giảm nhẹ'],
      checklist: [
        { item: 'Kiểm tra pin', status: 'completed', notes: 'Pin còn 85%, cần theo dõi' },
        { item: 'Kiểm tra motor', status: 'completed', notes: 'Hoạt động bình thường' },
        { item: 'Kiểm tra hệ thống sạc', status: 'in_progress', notes: 'Đang test' },
        { item: 'Kiểm tra BMS', status: 'pending', notes: '' },
        { item: 'Test lái thử', status: 'pending', notes: '' },
      ],
      condition: {
        battery: 85,
        motor: 'Tốt',
        charging: 'Cần kiểm tra',
        overall: 'Khá tốt'
      }
    },
    {
      id: 'V003',
      customer: 'Phạm Văn C',
      phone: '0933444555',
      model: 'VinFast Vento',
      plate: '51H-889.22',
      vin: 'VF7VENTO2024003',
      service: 'Thay thế pin',
      technician: 'Lê Thị D',
      status: 'Hoàn tất',
      priority: 'Cao',
      startTime: '2025-10-26 10:00',
      estimatedEnd: '2025-10-26 16:00',
      actualStart: '2025-10-26 10:05',
      actualEnd: '2025-10-26 15:45',
      progress: 100,
      issues: ['Pin cũ đã hết hạn sử dụng'],
      checklist: [
        { item: 'Kiểm tra pin', status: 'completed', notes: 'Đã thay pin mới' },
        { item: 'Kiểm tra motor', status: 'completed', notes: 'Hoạt động tốt' },
        { item: 'Kiểm tra hệ thống sạc', status: 'completed', notes: 'Tương thích tốt' },
        { item: 'Kiểm tra BMS', status: 'completed', notes: 'Cập nhật firmware' },
        { item: 'Test lái thử', status: 'completed', notes: 'Vận hành mượt mà' },
      ],
      condition: {
        battery: 100,
        motor: 'Tốt',
        charging: 'Tốt',
        overall: 'Tuyệt vời'
      }
    },
    {
      id: 'V004',
      customer: 'Lê Thị D',
      phone: '0944555666',
      model: 'VinFast VF8',
      plate: '43C-111.22',
      vin: 'VF8VF82024004',
      service: 'Kiểm tra hệ thống sạc',
      technician: 'Nguyễn Văn E',
      status: 'Chờ tiếp nhận',
      priority: 'Thấp',
      startTime: '2025-10-27 14:00',
      estimatedEnd: '2025-10-27 16:00',
      actualStart: null,
      actualEnd: null,
      progress: 0,
      issues: [],
      checklist: [
        { item: 'Kiểm tra pin', status: 'pending', notes: '' },
        { item: 'Kiểm tra motor', status: 'pending', notes: '' },
        { item: 'Kiểm tra hệ thống sạc', status: 'pending', notes: '' },
        { item: 'Kiểm tra BMS', status: 'pending', notes: '' },
        { item: 'Test lái thử', status: 'pending', notes: '' },
      ],
      condition: {
        battery: 0,
        motor: 'Chưa kiểm tra',
        charging: 'Chưa kiểm tra',
        overall: 'Chưa đánh giá'
      }
    }
  ]);

  const filtered = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.customer.toLowerCase().includes(search.toLowerCase()) ||
                         vehicle.plate.toLowerCase().includes(search.toLowerCase()) ||
                         vehicle.model.toLowerCase().includes(search.toLowerCase()) ||
                         vehicle.technician.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'Tất cả' || vehicle.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Chờ tiếp nhận': return 'text-blue-700 bg-blue-100';
      case 'Đang bảo dưỡng': return 'text-yellow-700 bg-yellow-100';
      case 'Hoàn tất': return 'text-green-700 bg-green-100';
      case 'Tạm dừng': return 'text-gray-700 bg-gray-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Chờ tiếp nhận': return <Clock className="w-4 h-4" />;
      case 'Đang bảo dưỡng': return <Wrench className="w-4 h-4" />;
      case 'Hoàn tất': return <CheckCircle2 className="w-4 h-4" />;
      case 'Tạm dừng': return <Pause className="w-4 h-4" />;
      default: return <Car className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Cao': return 'text-red-700 bg-red-100';
      case 'Bình thường': return 'text-blue-700 bg-blue-100';
      case 'Thấp': return 'text-gray-700 bg-gray-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setVehicles(prev => prev.map(v => 
      v.id === id 
        ? { 
            ...v, 
            status: newStatus,
            actualStart: newStatus === 'Đang bảo dưỡng' && !v.actualStart ? new Date().toLocaleString('vi-VN') : v.actualStart,
            actualEnd: newStatus === 'Hoàn tất' ? new Date().toLocaleString('vi-VN') : v.actualEnd
          }
        : v
    ));
  };

  const handleProgressUpdate = (id, progress) => {
    setVehicles(prev => prev.map(v => 
      v.id === id ? { ...v, progress: Math.min(100, Math.max(0, progress)) } : v
    ));
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
                  Theo dõi tiến độ xe
                </h1>
                <p className="text-gray-600 text-sm">
                  Quản lý quy trình bảo dưỡng từ tiếp nhận đến hoàn tất
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-sm text-gray-500">Tổng xe</p>
                <p className="text-xl font-bold text-emerald-600">{vehicles.length}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Đang làm</p>
                <p className="text-xl font-bold text-amber-600">
                  {vehicles.filter(v => v.status === 'Đang bảo dưỡng').length}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Hoàn tất</p>
                <p className="text-xl font-bold text-green-600">
                  {vehicles.filter(v => v.status === 'Hoàn tất').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-2">
              {['Tất cả', 'Chờ tiếp nhận', 'Đang bảo dưỡng', 'Hoàn tất'].map((tab) => (
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

            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm kiếm xe..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Vehicles List */}
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Car className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{vehicle.model}</h3>
                    <p className="text-sm text-gray-500">{vehicle.plate}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
                  {getStatusIcon(vehicle.status)}
                  <span className="ml-1">{vehicle.status}</span>
                </span>
              </div>

              {/* Customer Info */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="font-medium text-gray-900">{vehicle.customer}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>{vehicle.phone}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${getPriorityColor(vehicle.priority)}`}>
                    {vehicle.priority}
                  </span>
                </div>
              </div>

              {/* Service Info */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Wrench className="w-4 h-4 text-gray-400" />
                  <span className="font-medium text-gray-900">{vehicle.service}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <User className="w-4 h-4" />
                  <span>KTV: {vehicle.technician}</span>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Tiến độ</span>
                  <span className="text-sm text-gray-500">{vehicle.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${vehicle.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Time Info */}
              <div className="mb-4 space-y-1">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>Bắt đầu: {vehicle.startTime}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>Dự kiến: {vehicle.estimatedEnd}</span>
                </div>
                {vehicle.actualStart && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <Play className="w-4 h-4" />
                    <span>Thực tế: {vehicle.actualStart}</span>
                  </div>
                )}
              </div>

              {/* Condition */}
              {vehicle.condition.overall !== 'Chưa đánh giá' && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Tình trạng xe</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <Battery className="w-3 h-3 text-gray-400" />
                      <span>Pin: {vehicle.condition.battery}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Gauge className="w-3 h-3 text-gray-400" />
                      <span>Motor: {vehicle.condition.motor}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="w-3 h-3 text-gray-400" />
                      <span>Sạc: {vehicle.condition.charging}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Activity className="w-3 h-3 text-gray-400" />
                      <span>Tổng: {vehicle.condition.overall}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedVehicle(vehicle)}
                  className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Chi tiết
                </button>
                {vehicle.status === 'Chờ tiếp nhận' && (
                  <button
                    onClick={() => handleStatusChange(vehicle.id, 'Đang bảo dưỡng')}
                    className="px-3 py-2 text-sm font-medium text-white bg-emerald-600 rounded hover:bg-emerald-700 transition"
                  >
                    <Play className="w-4 h-4" />
                  </button>
                )}
                {vehicle.status === 'Đang bảo dưỡng' && (
                  <button
                    onClick={() => handleStatusChange(vehicle.id, 'Hoàn tất')}
                    className="px-3 py-2 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700 transition"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vehicle Detail Modal */}
      {selectedVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Chi tiết xe {selectedVehicle.plate}</h3>
              <button
                onClick={() => setSelectedVehicle(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Vehicle Info */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Thông tin xe</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Model:</span>
                      <span className="font-medium">{selectedVehicle.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Biển số:</span>
                      <span className="font-medium">{selectedVehicle.plate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">VIN:</span>
                      <span className="font-medium text-xs">{selectedVehicle.vin}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Khách hàng</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Tên:</span>
                      <span className="font-medium">{selectedVehicle.customer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">SĐT:</span>
                      <span className="font-medium">{selectedVehicle.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Dịch vụ</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Loại:</span>
                      <span className="font-medium">{selectedVehicle.service}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Kỹ thuật viên:</span>
                      <span className="font-medium">{selectedVehicle.technician}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Ưu tiên:</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(selectedVehicle.priority)}`}>
                        {selectedVehicle.priority}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress & Checklist */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Tiến độ</h4>
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Hoàn thành</span>
                      <span className="text-sm text-gray-500">{selectedVehicle.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-emerald-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${selectedVehicle.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Bắt đầu:</span>
                      <span className="font-medium">{selectedVehicle.startTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Dự kiến kết thúc:</span>
                      <span className="font-medium">{selectedVehicle.estimatedEnd}</span>
                    </div>
                    {selectedVehicle.actualStart && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Thực tế bắt đầu:</span>
                        <span className="font-medium text-green-600">{selectedVehicle.actualStart}</span>
                      </div>
                    )}
                    {selectedVehicle.actualEnd && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Thực tế kết thúc:</span>
                        <span className="font-medium text-green-600">{selectedVehicle.actualEnd}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Checklist</h4>
                  <div className="space-y-2">
                    {selectedVehicle.checklist.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                        <span className="text-sm">{item.item}</span>
                        <div className="flex items-center gap-2">
                          {item.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                          {item.status === 'in_progress' && <Clock className="w-4 h-4 text-yellow-600" />}
                          {item.status === 'pending' && <Clock className="w-4 h-4 text-gray-400" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedVehicle.issues.length > 0 && (
                  <div className="bg-red-50 rounded-lg p-4">
                    <h4 className="font-medium text-red-900 mb-2">Vấn đề phát hiện</h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      {selectedVehicle.issues.map((issue, index) => (
                        <li key={index}>• {issue}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setSelectedVehicle(null)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              >
                Đóng
              </button>
              {selectedVehicle.status === 'Đang bảo dưỡng' && (
                <button
                  onClick={() => {
                    handleProgressUpdate(selectedVehicle.id, Math.min(100, selectedVehicle.progress + 20));
                    setSelectedVehicle({...selectedVehicle, progress: Math.min(100, selectedVehicle.progress + 20)});
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Cập nhật tiến độ
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
