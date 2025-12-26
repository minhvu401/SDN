'use client';
import React, { useState } from 'react';
import {
  Activity,
  TrendingUp,
  Clock,
  CheckCircle2,
  Star,
  Users,
  Car,
  Wrench,
  Calendar,
  ArrowLeft,
  Filter,
  Download,
  Eye,
  Award,
  Target,
  Zap,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function StaffPerformancePage() {
  const router = useRouter();
  const [filter, setFilter] = useState('Tháng này');
  const [selectedTechnician, setSelectedTechnician] = useState(null);

  const [performanceData, setPerformanceData] = useState([
    {
      id: 'T001',
      name: 'Trần Văn B',
      position: 'Kỹ thuật viên chính',
      avatar: 'TB',
      currentMonth: {
        completedJobs: 24,
        totalHours: 180,
        efficiency: 92,
        quality: 96,
        punctuality: 88,
        customerSatisfaction: 94,
        revenue: 45000000
      },
      lastMonth: {
        completedJobs: 22,
        totalHours: 176,
        efficiency: 89,
        quality: 94,
        punctuality: 85,
        customerSatisfaction: 91,
        revenue: 42000000
      },
      trends: {
        efficiency: '+3%',
        quality: '+2%',
        punctuality: '+3%',
        customerSatisfaction: '+3%',
        revenue: '+7%'
      },
      achievements: [
        { title: 'KTV xuất sắc tháng', date: '2025-09', type: 'award' },
        { title: 'Hoàn thành 100% mục tiêu', date: '2025-10', type: 'target' },
        { title: 'Đánh giá 5 sao liên tiếp', date: '2025-10', type: 'star' }
      ],
      skills: ['Pin EV', 'Motor điện', 'Hệ thống sạc', 'BMS', 'Chẩn đoán lỗi'],
      currentTasks: 3,
      upcomingTasks: 2
    },
    {
      id: 'T002',
      name: 'Phạm Văn C',
      position: 'Kỹ thuật viên',
      avatar: 'PC',
      currentMonth: {
        completedJobs: 18,
        totalHours: 160,
        efficiency: 85,
        quality: 90,
        punctuality: 92,
        customerSatisfaction: 88,
        revenue: 32000000
      },
      lastMonth: {
        completedJobs: 16,
        totalHours: 152,
        efficiency: 82,
        quality: 88,
        punctuality: 90,
        customerSatisfaction: 85,
        revenue: 30000000
      },
      trends: {
        efficiency: '+3%',
        quality: '+2%',
        punctuality: '+2%',
        customerSatisfaction: '+3%',
        revenue: '+7%'
      },
      achievements: [
        { title: 'Cải thiện hiệu suất', date: '2025-10', type: 'trend' },
        { title: 'Đánh giá khách hàng tốt', date: '2025-09', type: 'star' }
      ],
      skills: ['Motor điện', 'Hệ thống sạc', 'Chẩn đoán lỗi', 'Thay thế phụ tùng'],
      currentTasks: 2,
      upcomingTasks: 1
    },
    {
      id: 'T003',
      name: 'Lê Thị D',
      position: 'Kỹ thuật viên cao cấp',
      avatar: 'LD',
      currentMonth: {
        completedJobs: 28,
        totalHours: 200,
        efficiency: 96,
        quality: 98,
        punctuality: 95,
        customerSatisfaction: 97,
        revenue: 68000000
      },
      lastMonth: {
        completedJobs: 26,
        totalHours: 192,
        efficiency: 94,
        quality: 96,
        punctuality: 93,
        customerSatisfaction: 95,
        revenue: 65000000
      },
      trends: {
        efficiency: '+2%',
        quality: '+2%',
        punctuality: '+2%',
        customerSatisfaction: '+2%',
        revenue: '+5%'
      },
      achievements: [
        { title: 'KTV xuất sắc quý', date: '2025-Q3', type: 'award' },
        { title: 'Mentor của năm', date: '2025', type: 'award' },
        { title: '100% hài lòng khách hàng', date: '2025-10', type: 'star' }
      ],
      skills: ['Pin EV', 'Motor điện', 'Hệ thống sạc', 'BMS', 'Chẩn đoán lỗi', 'Quản lý dự án', 'Đào tạo'],
      currentTasks: 1,
      upcomingTasks: 3
    },
    {
      id: 'T004',
      name: 'Nguyễn Văn E',
      position: 'Kỹ thuật viên tập sự',
      avatar: 'NE',
      currentMonth: {
        completedJobs: 12,
        totalHours: 120,
        efficiency: 78,
        quality: 82,
        punctuality: 90,
        customerSatisfaction: 85,
        revenue: 18000000
      },
      lastMonth: {
        completedJobs: 8,
        totalHours: 96,
        efficiency: 75,
        quality: 80,
        punctuality: 88,
        customerSatisfaction: 82,
        revenue: 15000000
      },
      trends: {
        efficiency: '+3%',
        quality: '+2%',
        punctuality: '+2%',
        customerSatisfaction: '+3%',
        revenue: '+20%'
      },
      achievements: [
        { title: 'Học viên tích cực', date: '2025-10', type: 'trend' },
        { title: 'Hoàn thành khóa đào tạo', date: '2025-09', type: 'target' }
      ],
      skills: ['Thay thế phụ tùng', 'Kiểm tra cơ bản'],
      currentTasks: 1,
      upcomingTasks: 1
    }
  ]);

  const [centerStats, setCenterStats] = useState({
    totalTechnicians: 4,
    activeTechnicians: 4,
    totalJobsCompleted: 82,
    averageEfficiency: 88,
    averageQuality: 92,
    averageCustomerSatisfaction: 91,
    totalRevenue: 163000000,
    topPerformer: 'Lê Thị D',
    improvementAreas: ['Punctuality', 'Training', 'Skill Development']
  });

  const getTrendColor = (trend) => {
    return trend.startsWith('+') ? 'text-green-600' : 'text-red-600';
  };

  const getPerformanceColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
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
                  Theo dõi hiệu suất
                </h1>
                <p className="text-gray-600 text-sm">
                  Quản lý và đánh giá hiệu suất làm việc của kỹ thuật viên
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition text-sm font-medium flex items-center gap-2">
                <Download className="w-4 h-4" />
                Xuất báo cáo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Center Overview */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="container mx-auto px-6 max-w-7xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tổng quan trung tâm</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-blue-600 font-medium">Tổng KTV</p>
                  <p className="text-xl font-bold text-blue-700">{centerStats.totalTechnicians}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-emerald-600 font-medium">Công việc hoàn thành</p>
                  <p className="text-xl font-bold text-emerald-700">{centerStats.totalJobsCompleted}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-purple-600 font-medium">Hiệu suất TB</p>
                  <p className="text-xl font-bold text-purple-700">{centerStats.averageEfficiency}%</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500 rounded-lg">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-yellow-600 font-medium">Hài lòng TB</p>
                  <p className="text-xl font-bold text-yellow-700">{centerStats.averageCustomerSatisfaction}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex gap-2">
            {['Tháng này', 'Quý này', 'Năm nay', 'Tùy chỉnh'].map((tab) => (
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
        </div>
      </div>

      {/* Performance List */}
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="space-y-6">
          {performanceData.map((tech) => (
            <div key={tech.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-emerald-700">{tech.avatar}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{tech.name}</h3>
                    <p className="text-sm text-gray-500">{tech.position}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm text-gray-500">{tech.currentMonth.completedJobs} công việc</span>
                      <span className="text-sm text-gray-500">{tech.currentMonth.totalHours}h làm việc</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-600">
                    {formatCurrency(tech.currentMonth.revenue)}
                  </div>
                  <div className="text-sm text-gray-500">Doanh thu tháng</div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Hiệu quả</span>
                    <span className={`text-sm font-bold ${getPerformanceColor(tech.currentMonth.efficiency).split(' ')[0]}`}>
                      {tech.currentMonth.efficiency}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-emerald-600 h-2 rounded-full"
                      style={{ width: `${tech.currentMonth.efficiency}%` }}
                    ></div>
                  </div>
                  <div className={`text-xs mt-1 ${getTrendColor(tech.trends.efficiency)}`}>
                    {tech.trends.efficiency} so với tháng trước
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Chất lượng</span>
                    <span className={`text-sm font-bold ${getPerformanceColor(tech.currentMonth.quality).split(' ')[0]}`}>
                      {tech.currentMonth.quality}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${tech.currentMonth.quality}%` }}
                    ></div>
                  </div>
                  <div className={`text-xs mt-1 ${getTrendColor(tech.trends.quality)}`}>
                    {tech.trends.quality} so với tháng trước
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Đúng giờ</span>
                    <span className={`text-sm font-bold ${getPerformanceColor(tech.currentMonth.punctuality).split(' ')[0]}`}>
                      {tech.currentMonth.punctuality}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-600 h-2 rounded-full"
                      style={{ width: `${tech.currentMonth.punctuality}%` }}
                    ></div>
                  </div>
                  <div className={`text-xs mt-1 ${getTrendColor(tech.trends.punctuality)}`}>
                    {tech.trends.punctuality} so với tháng trước
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Hài lòng KH</span>
                    <span className={`text-sm font-bold ${getPerformanceColor(tech.currentMonth.customerSatisfaction).split(' ')[0]}`}>
                      {tech.currentMonth.customerSatisfaction}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${tech.currentMonth.customerSatisfaction}%` }}
                    ></div>
                  </div>
                  <div className={`text-xs mt-1 ${getTrendColor(tech.trends.customerSatisfaction)}`}>
                    {tech.trends.customerSatisfaction} so với tháng trước
                  </div>
                </div>
              </div>

              {/* Achievements and Skills */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Thành tích gần đây</h4>
                  <div className="space-y-2">
                    {tech.achievements.slice(0, 3).map((achievement, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        {achievement.type === 'award' && <Award className="w-4 h-4 text-yellow-500" />}
                        {achievement.type === 'target' && <Target className="w-4 h-4 text-green-500" />}
                        {achievement.type === 'star' && <Star className="w-4 h-4 text-blue-500" />}
                        {achievement.type === 'trend' && <TrendingUp className="w-4 h-4 text-purple-500" />}
                        <span className="text-gray-700">{achievement.title}</span>
                        <span className="text-gray-400 text-xs">({achievement.date})</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Kỹ năng</h4>
                  <div className="flex flex-wrap gap-2">
                    {tech.skills.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Current Status */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-emerald-600">{tech.currentTasks}</div>
                    <div className="text-xs text-gray-500">Công việc hiện tại</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{tech.upcomingTasks}</div>
                    <div className="text-xs text-gray-500">Sắp tới</div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTechnician(tech)}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition text-sm font-medium flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Xem chi tiết
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
              <h3 className="text-xl font-semibold text-gray-900">Chi tiết hiệu suất - {selectedTechnician.name}</h3>
              <button
                onClick={() => setSelectedTechnician(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Comparison */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">So sánh hiệu suất</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-3">
                    {Object.keys(selectedTechnician.currentMonth).map((key) => {
                      if (key === 'revenue') return null;
                      const current = selectedTechnician.currentMonth[key];
                      const previous = selectedTechnician.lastMonth[key];
                      const change = ((current - previous) / previous * 100).toFixed(1);
                      
                      return (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{current}%</span>
                            <span className={`text-xs ${change.startsWith('-') ? 'text-red-600' : 'text-green-600'}`}>
                              ({change.startsWith('-') ? '' : '+'}{change}%)
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Revenue Chart */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Doanh thu</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Tháng này:</span>
                      <span className="font-medium text-emerald-600">
                        {formatCurrency(selectedTechnician.currentMonth.revenue)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Tháng trước:</span>
                      <span className="font-medium text-gray-700">
                        {formatCurrency(selectedTechnician.lastMonth.revenue)}
                      </span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-sm font-medium text-gray-700">Tăng trưởng:</span>
                      <span className="font-bold text-green-600">
                        {selectedTechnician.trends.revenue}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* All Achievements */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Tất cả thành tích</h4>
                <div className="space-y-2">
                  {selectedTechnician.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                      {achievement.type === 'award' && <Award className="w-5 h-5 text-yellow-500" />}
                      {achievement.type === 'target' && <Target className="w-5 h-5 text-green-500" />}
                      {achievement.type === 'star' && <Star className="w-5 h-5 text-blue-500" />}
                      {achievement.type === 'trend' && <TrendingUp className="w-5 h-5 text-purple-500" />}
                      <div>
                        <div className="font-medium text-gray-900">{achievement.title}</div>
                        <div className="text-sm text-gray-500">{achievement.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Improvement Suggestions */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Gợi ý cải thiện</h4>
                <div className="space-y-2">
                  {selectedTechnician.currentMonth.punctuality < 90 && (
                    <div className="p-3 bg-yellow-50 rounded border border-yellow-200">
                      <div className="flex items-center gap-2 text-sm text-yellow-700">
                        <Clock className="w-4 h-4" />
                        <span>Cải thiện tính đúng giờ</span>
                      </div>
                    </div>
                  )}
                  {selectedTechnician.currentMonth.efficiency < 85 && (
                    <div className="p-3 bg-blue-50 rounded border border-blue-200">
                      <div className="flex items-center gap-2 text-sm text-blue-700">
                        <Zap className="w-4 h-4" />
                        <span>Tăng cường hiệu quả làm việc</span>
                      </div>
                    </div>
                  )}
                  {selectedTechnician.skills.length < 5 && (
                    <div className="p-3 bg-purple-50 rounded border border-purple-200">
                      <div className="flex items-center gap-2 text-sm text-purple-700">
                        <Wrench className="w-4 h-4" />
                        <span>Mở rộng kỹ năng chuyên môn</span>
                      </div>
                    </div>
                  )}
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
                Tạo kế hoạch phát triển
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
