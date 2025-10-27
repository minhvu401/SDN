'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Calendar,
  ClipboardCheck,
  MessageSquare,
  BarChart3,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

const quickActions = [
  {
    title: 'Bảng điều khiển',
    description: 'Xem tổng quan hoạt động trung tâm',
    href: '/staff/dashboard',
    icon: LayoutDashboard,
    color: 'bg-emerald-500',
  },
  {
    title: 'Quản lý khách hàng',
    description: 'Xem thông tin và lịch sử khách hàng',
    href: '/staff/customers',
    icon: Users,
    color: 'bg-blue-500',
  },
  {
    title: 'Yêu cầu khách hàng',
    description: 'Duyệt và xử lý yêu cầu đặt lịch',
    href: '/staff/requests',
    icon: ClipboardList,
    color: 'bg-yellow-500',
  },
  {
    title: 'Lịch làm việc',
    description: 'Quản lý ca làm và phân công nhân viên',
    href: '/staff/schedule',
    icon: Calendar,
    color: 'bg-purple-500',
  },
  {
    title: 'Phiếu dịch vụ',
    description: 'Tạo và theo dõi phiếu bảo dưỡng',
    href: '/staff/service-orders',
    icon: ClipboardCheck,
    color: 'bg-indigo-500',
  },
  {
    title: 'Chat hỗ trợ',
    description: 'Hỗ trợ khách hàng trực tuyến',
    href: '/staff/chat',
    icon: MessageSquare,
    color: 'bg-green-500',
  },
  {
    title: 'Báo cáo & Thống kê',
    description: 'Xem báo cáo hiệu suất và doanh thu',
    href: '/staff/reports',
    icon: BarChart3,
    color: 'bg-red-500',
  },
];

const stats = [
  { label: 'Xe đang chờ', value: '12', icon: Clock, color: 'text-gray-600' },
  { label: 'Đang bảo dưỡng', value: '8', icon: AlertTriangle, color: 'text-amber-600' },
  { label: 'Hoàn tất hôm nay', value: '24', icon: CheckCircle2, color: 'text-emerald-600' },
];

export default function StaffPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-emerald-700 font-display mb-4">
              Chào mừng đến với EV Care Staff
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Hệ thống quản lý trung tâm bảo dưỡng xe điện chuyên nghiệp
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 flex items-center gap-3">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  <div className="text-left">
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Truy cập nhanh</h2>
          <p className="text-gray-600">Chọn chức năng bạn muốn sử dụng</p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <div
              key={index}
              onClick={() => router.push(action.href)}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-emerald-300 transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${action.color} group-hover:scale-110 transition-transform duration-200`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-emerald-700 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{action.description}</p>
                  <div className="flex items-center text-emerald-600 text-sm font-medium group-hover:text-emerald-700">
                    <span>Truy cập</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Hoạt động gần đây</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">Xe VinFast Feliz S - 99A-123.45 đã hoàn tất bảo dưỡng</p>
                  <p className="text-xs text-gray-500">2 phút trước</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">Yêu cầu mới từ khách hàng Nguyễn Văn A</p>
                  <p className="text-xs text-gray-500">15 phút trước</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">Ca chiều đã được phân công 2 kỹ thuật viên</p>
                  <p className="text-xs text-gray-500">1 giờ trước</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-16 bg-emerald-50 rounded-xl p-8 text-center">
          <h3 className="text-xl font-semibold text-emerald-800 mb-2">Cần hỗ trợ?</h3>
          <p className="text-emerald-700 mb-4">
            Nếu bạn gặp khó khăn trong việc sử dụng hệ thống, hãy liên hệ với quản trị viên
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
              Liên hệ hỗ trợ
            </button>
            <button className="px-6 py-2 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-100 transition">
              Xem hướng dẫn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
