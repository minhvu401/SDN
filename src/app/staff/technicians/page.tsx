'use client';
import React, { useState } from 'react';
import {
  UserCheck,
  Award,
  Clock,
  Star,
  Plus,
  Search,
  Filter,
  Edit,
  Eye,
  ArrowLeft,
  Calendar,
  Wrench,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Users,
  Activity,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function StaffTechniciansPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Tất cả');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTechnician, setSelectedTechnician] = useState(null);

  const [technicians, setTechnicians] = useState([
    {
      id: 'T001',
      name: 'Trần Văn B',
      email: 'tranvanb@evcare.com',
      phone: '0987654321',
      position: 'Kỹ thuật viên chính',
      department: 'Bảo dưỡng EV',
      experience: '5 năm',
      status: 'Hoạt động',
      rating: 4.8,
      completedJobs: 156,
      currentJobs: 3,
      certifications: [
        { name: 'Chứng chỉ EV Level 3', issuer: 'VinFast', expiry: '2026-12-31', status: 'Valid' },
        { name: 'Bảo dưỡng Pin Lithium', issuer: 'CATL', expiry: '2025-08-15', status: 'Valid' },
        { name: 'An toàn điện cao áp', issuer: 'EV Safety Board', expiry: '2025-06-30', status: 'Expiring' }
      ],
      skills: ['Pin EV', 'Motor điện', 'Hệ thống sạc', 'BMS', 'Chẩn đoán lỗi'],
      schedule: {
        monday: '08:00-17:00',
        tuesday: '08:00-17:00',
        wednesday: '08:00-17:00',
        thursday: '08:00-17:00',
        friday: '08:00-17:00',
        saturday: '08:00-12:00',
        sunday: 'Nghỉ'
      },
      performance: {
        efficiency: 92,
        quality: 96,
        punctuality: 88,
        customerSatisfaction: 94
      },
      currentTasks: [
        { id: 'V002', customer: 'Trần Thị B', service: 'Bảo dưỡng định kỳ', priority: 'Bình thường' },
        { id: 'V005', customer: 'Lê Văn F', service: 'Kiểm tra hệ thống điện', priority: 'Cao' }
      ]
    },
    {
      id: 'T002',
      name: 'Phạm Văn C',
      email: 'phamvanc@evcare.com',
      phone: '0911222333',
      position: 'Kỹ thuật viên',
      department: 'Bảo dưỡng EV',
      experience: '3 năm',
      status: 'Hoạt động',
      rating: 4.5,
      completedJobs: 89,
      currentJobs: 2,
      certifications: [
        { name: 'Chứng chỉ EV Level 2', issuer: 'VinFast', expiry: '2025-10-20', status: 'Valid' },
        { name: 'Bảo dưỡng Motor điện', issuer: 'Bosch', expiry: '2025-12-15', status: 'Valid' }
      ],
      skills: ['Motor điện', 'Hệ thống sạc', 'Chẩn đoán lỗi', 'Thay thế phụ tùng'],
      schedule: {
        monday: '14:00-22:00',
        tuesday: '14:00-22:00',
        wednesday: '14:00-22:00',
        thursday: '14:00-22:00',
        friday: '14:00-22:00',
        saturday: 'Nghỉ',
        sunday: 'Nghỉ'
      },
      performance: {
        efficiency: 85,
        quality: 90,
        punctuality: 92,
        customerSatisfaction: 88
      },
      currentTasks: [
        { id: 'V003', customer: 'Phạm Văn C', service: 'Thay thế pin', priority: 'Cao' }
      ]
    },
    {
      id: 'T003',
      name: 'Lê Thị D',
      email: 'lethid@evcare.com',
      phone: '0933444555',
      position: 'Kỹ thuật viên cao cấp',
      department: 'Bảo dưỡng EV',
      experience: '7 năm',
      status: 'Hoạt động',
      rating: 4.9,
      completedJobs: 234,
      currentJobs: 1,
      certifications: [
        { name: 'Chứng chỉ EV Level 4', issuer: 'VinFast', expiry: '2027-03-15', status: 'Valid' },
        { name: 'Chuyên gia Pin Lithium', issuer: 'CATL', expiry: '2026-09-30', status: 'Valid' },
        { name: 'An toàn điện cao áp', issuer: 'EV Safety Board', expiry: '2026-01-20', status: 'Valid' },
        { name: 'Quản lý chất lượng', issuer: 'ISO', expiry: '2025-11-10', status: 'Valid' }
      ],
      skills: ['Pin EV', 'Motor điện', 'Hệ thống sạc', 'BMS', 'Chẩn đoán lỗi', 'Quản lý dự án', 'Đào tạo'],
      schedule: {
        monday: '07:00-16:00',
        tuesday: '07:00-16:00',
        wednesday: '07:00-16:00',
        thursday: '07:00-16:00',
        friday: '07:00-16:00',
        saturday: 'Nghỉ',
        sunday: 'Nghỉ'
      },
      performance: {
        efficiency: 96,
        quality: 98,
        punctuality: 95,
        customerSatisfaction: 97
      },
      currentTasks: [
        { id: 'V001', customer: 'Nguyễn Văn A', service: 'Kiểm tra hệ thống điện', priority: 'Cao' }
      ]
    },
    {
      id: 'T004',
      name: 'Nguyễn Văn E',
      email: 'nguyenvane@evcare.com',
      phone: '0944555666',
      position: 'Kỹ thuật viên tập sự',
      department: 'Bảo dưỡng EV',
      experience: '6 tháng',
      status: 'Hoạt động',
      rating: 4.2,
      completedJobs: 23,
      currentJobs: 1,
      certifications: [
        { name: 'Chứng chỉ EV Level 1', issuer: 'VinFast', expiry: '2025-12-31', status: 'Valid' }
      ],
      skills: ['Thay thế phụ tùng', 'Kiểm tra cơ bản'],
      schedule: {
        monday: '08:00-17:00',
        tuesday: '08:00-17:00',
        wednesday: '08:00-17:00',
        thursday: '08:00-17:00',
        friday: '08:00-17:00',
        saturday: 'Nghỉ',
        sunday: 'Nghỉ'
      },
      performance: {
        efficiency: 78,
        quality: 82,
        punctuality: 90,
        customerSatisfaction: 85
      },
      currentTasks: [
        { id: 'V004', customer: 'Lê Thị D', service: 'Kiểm tra hệ thống sạc', priority: 'Thấp' }
      ]
    }
  ]);

  const filtered = technicians.filter(tech => {
    const matchesSearch = tech.name.toLowerCase().includes(search.toLowerCase()) ||
                         tech.position.toLowerCase().includes(search.toLowerCase()) ||
                         tech.department.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'Tất cả' || tech.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Hoạt động': return 'text-green-700 bg-green-100';
      case 'Nghỉ phép': return 'text-yellow-700 bg-yellow-100';
      case 'Tạm nghỉ': return 'text-gray-700 bg-gray-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getCertificationStatusColor = (status) => {
    switch (status) {
      case 'Valid': return 'text-green-700 bg-green-100';
      case 'Expiring': return 'text-yellow-700 bg-yellow-100';
      case 'Expired': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
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
                  Quản lý kỹ thuật viên
                </h1>
                <p className="text-gray-600 text-sm">
                  Quản lý nhân sự, chứng chỉ và hiệu suất kỹ thuật viên
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-sm text-gray-500">Tổng KTV</p>
                <p className="text-xl font-bold text-emerald-600">{technicians.length}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Đang hoạt động</p>
                <p className="text-xl font-bold text-green-600">
                  {technicians.filter(t => t.status === 'Hoạt động').length}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Đánh giá TB</p>
                <p className="text-xl font-bold text-blue-600">
                  {(technicians.reduce((acc, t) => acc + t.rating, 0) / technicians.length).toFixed(1)}
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
              {['Tất cả', 'Hoạt động', 'Nghỉ phép', 'Tạm nghỉ'].map((tab) => (
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

            <div className="flex gap-4 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-80">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tìm kiếm kỹ thuật viên..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition text-sm font-medium flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Thêm KTV
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Technicians List */}
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((tech) => (
            <div key={tech.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{tech.name}</h3>
                    <p className="text-sm text-gray-500">{tech.position}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tech.status)}`}>
                  {tech.status}
                </span>
              </div>

              {/* Contact Info */}
              <div className="mb-4 space-y-1">
                <p className="text-sm text-gray-600">{tech.email}</p>
                <p className="text-sm text-gray-600">{tech.phone}</p>
                <p className="text-sm text-gray-500">Kinh nghiệm: {tech.experience}</p>
              </div>

              {/* Rating & Stats */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-medium text-gray-900">{tech.rating}</span>
                </div>
                <div className="text-sm text-gray-500">
                  {tech.completedJobs} công việc
                </div>
              </div>

              {/* Performance */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Hiệu suất</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span>Hiệu quả</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-emerald-600 h-1.5 rounded-full"
                          style={{ width: `${tech.performance.efficiency}%` }}
                        ></div>
                      </div>
                      <span>{tech.performance.efficiency}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Chất lượng</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-blue-600 h-1.5 rounded-full"
                          style={{ width: `${tech.performance.quality}%` }}
                        ></div>
                      </div>
                      <span>{tech.performance.quality}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Tasks */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Công việc hiện tại ({tech.currentJobs})</h4>
                <div className="space-y-1">
                  {tech.currentTasks.map((task, index) => (
                    <div key={index} className="text-xs text-gray-600 bg-gray-50 rounded p-2">
                      <div className="font-medium">{task.customer}</div>
                      <div>{task.service}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications Alert */}
              {tech.certifications.some(cert => cert.status === 'Expiring' || cert.status === 'Expired') && (
                <div className="mb-4 p-2 bg-yellow-50 rounded border border-yellow-200">
                  <div className="flex items-center gap-2 text-xs text-yellow-700">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Chứng chỉ sắp hết hạn</span>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedTechnician(tech)}
                  className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Chi tiết
                </button>
                <button className="px-3 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded hover:bg-blue-200 transition">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technician Detail Modal */}
      {selectedTechnician && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Chi tiết kỹ thuật viên</h3>
              <button
                onClick={() => setSelectedTechnician(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Personal Info */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Thông tin cá nhân</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Tên:</span>
                      <span className="font-medium">{selectedTechnician.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Email:</span>
                      <span className="font-medium">{selectedTechnician.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">SĐT:</span>
                      <span className="font-medium">{selectedTechnician.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Vị trí:</span>
                      <span className="font-medium">{selectedTechnician.position}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Phòng ban:</span>
                      <span className="font-medium">{selectedTechnician.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Kinh nghiệm:</span>
                      <span className="font-medium">{selectedTechnician.experience}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Kỹ năng</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTechnician.skills.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Lịch làm việc</h4>
                  <div className="space-y-1 text-sm">
                    {Object.entries(selectedTechnician.schedule).map(([day, time]) => (
                      <div key={day} className="flex justify-between">
                        <span className="text-gray-500 capitalize">{day}:</span>
                        <span className="font-medium">{time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Performance & Certifications */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Hiệu suất</h4>
                  <div className="space-y-3">
                    {Object.entries(selectedTechnician.performance).map(([key, value]) => (
                      <div key={key} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                          <span className="font-medium">{value}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-emerald-600 h-2 rounded-full"
                            style={{ width: `${value}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Chứng chỉ</h4>
                  <div className="space-y-2">
                    {selectedTechnician.certifications.map((cert, index) => (
                      <div key={index} className="p-3 bg-white rounded border">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">{cert.name}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getCertificationStatusColor(cert.status)}`}>
                            {cert.status}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          <div>Nhà cấp: {cert.issuer}</div>
                          <div>Hết hạn: {cert.expiry}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Thống kê</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">{selectedTechnician.completedJobs}</div>
                      <div className="text-gray-500">Công việc hoàn thành</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{selectedTechnician.currentJobs}</div>
                      <div className="text-gray-500">Công việc hiện tại</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setSelectedTechnician(null)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              >
                Đóng
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Chỉnh sửa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
