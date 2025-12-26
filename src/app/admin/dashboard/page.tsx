'use client';
import React, { useState, useEffect } from 'react';
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
import { getDashboardStats, getRevenueStats, getServiceStats, type RevenueDataPoint, type ServiceStats } from '@/lib/api/admin/statistics';

export default function AdminDashboardPage() {
  const router = useRouter();

  const [filter, setFilter] = useState<'day' | 'week' | 'month'>('week');
  const [loading, setLoading] = useState(true);
  const [revenueData, setRevenueData] = useState<{
    day: RevenueDataPoint[];
    week: RevenueDataPoint[];
    month: RevenueDataPoint[];
  }>({
    day: [],
    week: [],
    month: [],
  });
  const [serviceStats, setServiceStats] = useState<ServiceStats[]>([]);
  const [dashboardStats, setDashboardStats] = useState({
    totalRevenue: 0,
    totalServices: 0,
    totalBookings: 0,
    completionRate: 0,
    growth: 0,
  });

  useEffect(() => {
    loadDashboardData();
  }, [filter]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [stats, revenue, services] = await Promise.all([
        getDashboardStats(),
        getRevenueStats(filter),
        getServiceStats(),
      ]);

      setDashboardStats(stats);
      setServiceStats(services.slice(0, 4)); // Top 4

      // Load tất cả các period để có thể switch nhanh
      if (filter === 'day') {
        const [dayData, weekData, monthData] = await Promise.all([
          getRevenueStats('day'),
          getRevenueStats('week'),
          getRevenueStats('month'),
        ]);
        setRevenueData({ day: dayData, week: weekData, month: monthData });
      } else if (filter === 'week') {
        const [dayData, weekData, monthData] = await Promise.all([
          getRevenueStats('day'),
          getRevenueStats('week'),
          getRevenueStats('month'),
        ]);
        setRevenueData({ day: dayData, week: weekData, month: monthData });
      } else {
        const [dayData, weekData, monthData] = await Promise.all([
          getRevenueStats('day'),
          getRevenueStats('week'),
          getRevenueStats('month'),
        ]);
        setRevenueData({ day: dayData, week: weekData, month: monthData });
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalRevenue = dashboardStats.totalRevenue;
  const completionRate = dashboardStats.completionRate;
  const growth = dashboardStats.growth;

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
            value={dashboardStats.totalBookings + ' lượt'}
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

          {loading ? (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              Đang tải dữ liệu...
            </div>
          ) : revenueData[filter].length === 0 ? (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              Chưa có dữ liệu
            </div>
          ) : (
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
          )}
        </div>

        {/* BIỂU ĐỒ DỊCH VỤ PHỔ BIẾN */}
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Car className="w-5 h-5 text-emerald-600" />
            Dịch vụ phổ biến nhất
          </h2>

          {loading ? (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              Đang tải dữ liệu...
            </div>
          ) : serviceStats.length === 0 ? (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              Chưa có dữ liệu
            </div>
          ) : (
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
          )}
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
