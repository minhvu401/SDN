'use client';
import React, { useState } from 'react';
import {
  BarChart3,
  DollarSign,
  Wrench,
  CheckCircle2,
  TrendingUp,
  Calendar,
  ArrowUpRight,
  Percent,
  Car,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  LineChart,
} from 'recharts';
import { useRouter } from 'next/navigation';

export default function AdminDashboardPage() {
  const router = useRouter();

  const [filter, setFilter] = useState<'day' | 'week' | 'month'>('week');

  // ===== DỮ LIỆU MÔ PHỎNG =====
  const revenueData = {
    day: [
      { label: 'T2', revenue: 24 },
      { label: 'T3', revenue: 30 },
      { label: 'T4', revenue: 28 },
      { label: 'T5', revenue: 35 },
      { label: 'T6', revenue: 40 },
      { label: 'T7', revenue: 22 },
      { label: 'CN', revenue: 15 },
    ],
    week: [
      { label: 'Tuần 1', revenue: 160 },
      { label: 'Tuần 2', revenue: 180 },
      { label: 'Tuần 3', revenue: 210 },
      { label: 'Tuần 4', revenue: 230 },
    ],
    month: [
      { label: 'T1', revenue: 720 },
      { label: 'T2', revenue: 760 },
      { label: 'T3', revenue: 810 },
      { label: 'T4', revenue: 880 },
      { label: 'T5', revenue: 930 },
      { label: 'T6', revenue: 960 },
    ],
  };

  const serviceStats = [
    { name: 'Bảo dưỡng định kỳ', count: 120 },
    { name: 'Thay pin & kiểm tra sạc', count: 95 },
    { name: 'Kiểm tra điện & đèn', count: 80 },
    { name: 'Thay phanh / lốp', count: 75 },
  ];

  const totalRevenue =
    revenueData[filter].reduce((sum, d) => sum + d.revenue, 0) * 1_000_000;

  const completionRate = 92; // %
  const growth = 8.5; // %

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="relative bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 max-w-6xl flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3 bg-emerald-600">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">EV Care</h1>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-gray-500 mr-2">Bảng điều khiển</span>
            <Calendar className="w-4 h-4 text-gray-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'day' | 'week' | 'month')}
              className="text-sm border rounded-md px-2 py-1 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="day">Ngày</option>
              <option value="week">Tuần</option>
              <option value="month">Tháng</option>
            </select>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-6 py-6 max-w-6xl flex flex-col gap-6">
        {/* THẺ TỔNG QUAN */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <DashboardCard
            icon={<DollarSign className="w-6 h-6 text-emerald-700" />}
            label="Tổng doanh thu"
            value={totalRevenue.toLocaleString('vi-VN') + ' ₫'}
            trend={growth}
          />
          <DashboardCard
            icon={<Wrench className="w-6 h-6 text-blue-700" />}
            label="Dịch vụ thực hiện"
            value={serviceStats.reduce((s, x) => s + x.count, 0) + ' lượt'}
          />
          <DashboardCard
            icon={<CheckCircle2 className="w-6 h-6 text-yellow-600" />}
            label="Tỉ lệ hoàn thành"
            value={completionRate + '%'}
          />
        </div>

        {/* BIỂU ĐỒ DOANH THU */}
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            Biểu đồ doanh thu ({filter === 'day' ? 'ngày' : filter === 'week' ? 'tuần' : 'tháng'})
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData[filter]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Doanh thu (triệu đồng)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* BIỂU ĐỒ DỊCH VỤ PHỔ BIẾN */}
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Car className="w-5 h-5 text-emerald-600" />
            Dịch vụ phổ biến nhất
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={serviceStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#3b82f6" name="Số lượt dịch vụ" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

/* ===== COMPONENT: DashboardCard ===== */
function DashboardCard({
  icon,
  label,
  value,
  trend,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: number;
}) {
  return (
    <div className="bg-white p-4 rounded-xl border shadow-sm flex items-center gap-3">
      <div className="p-3 bg-emerald-100 rounded-full">{icon}</div>
      <div className="flex-1">
        <p className="text-gray-500 text-sm">{label}</p>
        <p className="text-lg font-semibold text-gray-800">{value}</p>
      </div>
      {trend !== undefined && (
        <div
          className={`flex items-center gap-1 text-sm ${
            trend >= 0 ? 'text-emerald-600' : 'text-red-500'
          }`}
        >
          <ArrowUpRight className="w-4 h-4" />
          {trend >= 0 ? '+' : ''}
          {trend}%
        </div>
      )}
    </div>
  );
}
