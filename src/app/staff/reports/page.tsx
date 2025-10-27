'use client';
import React, { useState } from 'react';
import {
  ArrowLeft,
  BarChart3,
  Calendar,
  Car,
  Wrench,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Clock,
  Users,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function StaffReportsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<'day' | 'week' | 'month'>('day');

  // Dữ liệu mô phỏng theo chu kỳ thời gian
  const dataSets = {
    day: [
      { label: 'T2', vehicles: 18, services: 12, revenue: 24, completed: 10, pending: 8 },
      { label: 'T3', vehicles: 22, services: 17, revenue: 30, completed: 15, pending: 7 },
      { label: 'T4', vehicles: 19, services: 14, revenue: 26, completed: 12, pending: 7 },
      { label: 'T5', vehicles: 25, services: 20, revenue: 34, completed: 18, pending: 7 },
      { label: 'T6', vehicles: 28, services: 23, revenue: 38, completed: 20, pending: 8 },
      { label: 'T7', vehicles: 20, services: 18, revenue: 29, completed: 15, pending: 5 },
      { label: 'CN', vehicles: 12, services: 9, revenue: 15, completed: 8, pending: 4 },
    ],
    week: [
      { label: 'Tuần 1', vehicles: 110, services: 80, revenue: 150, completed: 70, pending: 40 },
      { label: 'Tuần 2', vehicles: 130, services: 100, revenue: 170, completed: 85, pending: 45 },
      { label: 'Tuần 3', vehicles: 125, services: 95, revenue: 165, completed: 80, pending: 45 },
      { label: 'Tuần 4', vehicles: 140, services: 110, revenue: 180, completed: 95, pending: 45 },
    ],
    month: [
      { label: 'T1', vehicles: 480, services: 360, revenue: 720, completed: 320, pending: 160 },
      { label: 'T2', vehicles: 510, services: 390, revenue: 760, completed: 340, pending: 170 },
      { label: 'T3', vehicles: 550, services: 420, revenue: 810, completed: 370, pending: 180 },
      { label: 'T4', vehicles: 600, services: 460, revenue: 880, completed: 400, pending: 200 },
      { label: 'T5', vehicles: 620, services: 480, revenue: 900, completed: 420, pending: 200 },
      { label: 'T6', vehicles: 670, services: 520, revenue: 960, completed: 450, pending: 220 },
    ],
  };

  // Dữ liệu chi tiết theo dịch vụ
  const serviceData = [
    { name: 'Bảo dưỡng định kỳ', count: 45, revenue: 180, percentage: 35 },
    { name: 'Thay thế pin', count: 12, revenue: 240, percentage: 15 },
    { name: 'Kiểm tra hệ thống điện', count: 28, revenue: 84, percentage: 25 },
    { name: 'Sửa chữa phanh', count: 15, revenue: 60, percentage: 15 },
    { name: 'Khác', count: 8, revenue: 24, percentage: 10 },
  ];

  // Dữ liệu hiệu suất kỹ thuật viên
  const technicianData = [
    { name: 'Nguyễn Văn A', completed: 25, efficiency: 95, rating: 4.8 },
    { name: 'Trần Thị B', completed: 22, efficiency: 88, rating: 4.6 },
    { name: 'Phạm Minh C', completed: 20, efficiency: 85, rating: 4.5 },
    { name: 'Lê Văn D', completed: 18, efficiency: 82, rating: 4.3 },
    { name: 'Hoàng Thị E', completed: 15, efficiency: 78, rating: 4.1 },
  ];

  const data = dataSets[filter];

  const totals = {
    vehicles: data.reduce((sum, d) => sum + d.vehicles, 0),
    services: data.reduce((sum, d) => sum + d.services, 0),
    revenue: data.reduce((sum, d) => sum + d.revenue, 0),
    completed: data.reduce((sum, d) => sum + d.completed, 0),
    pending: data.reduce((sum, d) => sum + d.pending, 0),
  };

  const completionRate = totals.vehicles > 0 ? Math.round((totals.completed / totals.vehicles) * 100) : 0;
  const avgRevenuePerService = totals.services > 0 ? Math.round(totals.revenue / totals.services) : 0;

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
            <BarChart3 className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-gray-500">Báo cáo thống kê EV Care</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-6 py-6 max-w-6xl flex flex-col gap-6">
        {/* Bộ lọc */}
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-600" />
            Báo cáo {filter === 'day' ? 'theo ngày' : filter === 'week' ? 'theo tuần' : 'theo tháng'}
          </h1>

          <div className="flex items-center gap-2">
            {(['day', 'week', 'month'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-md text-sm border transition ${
                  filter === f
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {f === 'day' ? 'Ngày' : f === 'week' ? 'Tuần' : 'Tháng'}
              </button>
            ))}
          </div>
        </div>

        {/* Tổng quan */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-xl border shadow-sm flex items-center gap-3">
            <div className="p-3 bg-emerald-100 rounded-full">
              <Car className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Tổng số xe</p>
              <p className="text-lg font-semibold text-gray-800">{totals.vehicles}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border shadow-sm flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-full">
              <Wrench className="w-6 h-6 text-blue-700" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Dịch vụ thực hiện</p>
              <p className="text-lg font-semibold text-gray-800">{totals.services}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border shadow-sm flex items-center gap-3">
            <div className="p-3 bg-yellow-100 rounded-full">
              <DollarSign className="w-6 h-6 text-yellow-700" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Doanh thu (triệu VNĐ)</p>
              <p className="text-lg font-semibold text-gray-800">{totals.revenue}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border shadow-sm flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle2 className="w-6 h-6 text-green-700" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Hoàn thành</p>
              <p className="text-lg font-semibold text-gray-800">{totals.completed}</p>
              <p className="text-xs text-green-600">{completionRate}%</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border shadow-sm flex items-center gap-3">
            <div className="p-3 bg-orange-100 rounded-full">
              <Clock className="w-6 h-6 text-orange-700" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Đang chờ</p>
              <p className="text-lg font-semibold text-gray-800">{totals.pending}</p>
              <p className="text-xs text-orange-600">TB: {avgRevenuePerService}M/đơn</p>
            </div>
          </div>
        </div>

        {/* Biểu đồ tổng hợp */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              Biểu đồ hoạt động tổng hợp
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={data} />
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Phân bố dịch vụ
            </h2>

            <div className="space-y-3">
              {serviceData.map((service, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{service.name}</span>
                    <span className="text-sm text-gray-500">{service.count} đơn</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${service.percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{service.percentage}%</span>
                    <span>{service.revenue}M VNĐ</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hiệu suất kỹ thuật viên */}
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            Hiệu suất kỹ thuật viên
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 border-b">
                <tr>
                  <th className="text-left py-2 px-3">Kỹ thuật viên</th>
                  <th className="text-center py-2 px-3">Đã hoàn thành</th>
                  <th className="text-center py-2 px-3">Hiệu suất</th>
                  <th className="text-center py-2 px-3">Đánh giá</th>
                  <th className="text-center py-2 px-3">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {technicianData.map((tech, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-3 font-medium text-gray-800">{tech.name}</td>
                    <td className="py-2 px-3 text-center text-gray-700">{tech.completed}</td>
                    <td className="py-2 px-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              tech.efficiency >= 90 ? 'bg-green-500' :
                              tech.efficiency >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${tech.efficiency}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600">{tech.efficiency}%</span>
                      </div>
                    </td>
                    <td className="py-2 px-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${
                              i < Math.floor(tech.rating) ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                        <span className="text-xs text-gray-500 ml-1">{tech.rating}</span>
                      </div>
                    </td>
                    <td className="py-2 px-3 text-center">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        tech.efficiency >= 90 ? 'bg-green-100 text-green-700' :
                        tech.efficiency >= 80 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {tech.efficiency >= 90 ? 'Xuất sắc' :
                         tech.efficiency >= 80 ? 'Tốt' : 'Cần cải thiện'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}

/* ======= COMPONENT: ComposedChart ======= */
function ComposedChart({ data }: { data: any[] }) {
  return (
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
      <XAxis dataKey="label" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="vehicles" fill="#10b981" name="Xe đến" />
      <Bar dataKey="services" fill="#3b82f6" name="Dịch vụ" />
      <Bar dataKey="completed" fill="#22c55e" name="Hoàn thành" />
      <Line
        type="monotone"
        dataKey="revenue"
        stroke="#f59e0b"
        strokeWidth={2}
        dot={{ r: 3 }}
        name="Doanh thu (M VNĐ)"
      />
    </BarChart>
  );
}
