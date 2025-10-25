'use client';
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  ArrowLeft,
  BarChart3,
  Calendar,
  Car,
  Wrench,
  DollarSign,
  TrendingUp,
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
      { label: 'T2', vehicles: 18, services: 12, revenue: 24 },
      { label: 'T3', vehicles: 22, services: 17, revenue: 30 },
      { label: 'T4', vehicles: 19, services: 14, revenue: 26 },
      { label: 'T5', vehicles: 25, services: 20, revenue: 34 },
      { label: 'T6', vehicles: 28, services: 23, revenue: 38 },
      { label: 'T7', vehicles: 20, services: 18, revenue: 29 },
      { label: 'CN', vehicles: 12, services: 9, revenue: 15 },
    ],
    week: [
      { label: 'Tuần 1', vehicles: 110, services: 80, revenue: 150 },
      { label: 'Tuần 2', vehicles: 130, services: 100, revenue: 170 },
      { label: 'Tuần 3', vehicles: 125, services: 95, revenue: 165 },
      { label: 'Tuần 4', vehicles: 140, services: 110, revenue: 180 },
    ],
    month: [
      { label: 'T1', vehicles: 480, services: 360, revenue: 720 },
      { label: 'T2', vehicles: 510, services: 390, revenue: 760 },
      { label: 'T3', vehicles: 550, services: 420, revenue: 810 },
      { label: 'T4', vehicles: 600, services: 460, revenue: 880 },
      { label: 'T5', vehicles: 620, services: 480, revenue: 900 },
      { label: 'T6', vehicles: 670, services: 520, revenue: 960 },
    ],
  };

  const data = dataSets[filter];

  const totals = {
    vehicles: data.reduce((sum, d) => sum + d.vehicles, 0),
    services: data.reduce((sum, d) => sum + d.services, 0),
    revenue: data.reduce((sum, d) => sum + d.revenue, 0),
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <p className="text-gray-500 text-sm">Doanh thu (triệu đồng)</p>
              <p className="text-lg font-semibold text-gray-800">{totals.revenue}</p>
            </div>
          </div>
        </div>

        {/* Biểu đồ doanh thu */}
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            Biểu đồ tổng hợp hoạt động
          </h2>

          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={data} />
          </ResponsiveContainer>
        </div>
      </div>

      <Footer />
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
      <Line
        type="monotone"
        dataKey="revenue"
        stroke="#f59e0b"
        strokeWidth={2}
        dot={{ r: 3 }}
        name="Doanh thu"
      />
    </BarChart>
  );
}
