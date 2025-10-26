'use client';
import React, { useState } from 'react';
import {
  ArrowLeft,
  BarChart3,
  TrendingUp,
  Wrench,
  AlertTriangle,
  ClipboardCheck,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

export default function AdminReportsPage() {
  const router = useRouter();

  // ====== DATA MẪU ======
  const revenueData = [
    { month: 'Th1', income: 35 },
    { month: 'Th2', income: 42 },
    { month: 'Th3', income: 51 },
    { month: 'Th4', income: 63 },
    { month: 'Th5', income: 59 },
    { month: 'Th6', income: 70 },
    { month: 'Th7', income: 64 },
    { month: 'Th8', income: 75 },
    { month: 'Th9', income: 90 },
    { month: 'Th10', income: 120 },
  ];

  const errorData = [
    { name: 'Lỗi pin', value: 24 },
    { name: 'Hệ thống điện', value: 18 },
    { name: 'Phanh', value: 12 },
    { name: 'Đèn & chiếu sáng', value: 8 },
    { name: 'Khác', value: 5 },
  ];

  const serviceData = [
    { name: 'Bảo dưỡng định kỳ', count: 42 },
    { name: 'Thay pin', count: 25 },
    { name: 'Sửa điện', count: 20 },
    { name: 'Rửa xe & vệ sinh', count: 14 },
  ];

  const COLORS = ['#10b981', '#3b82f6', '#facc15', '#f97316', '#ef4444'];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="relative bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-6 max-w-6xl flex items-center gap-3">
          <button
            onClick={() => router.push('/admin/dashboard')}
            className="flex items-center text-emerald-700 hover:text-emerald-800 transition"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span className="text-sm font-medium">Trang quản trị</span>
          </button>

          <div className="ml-auto flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-gray-500">Báo cáo & thống kê tổng hợp</span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-6 py-6 max-w-6xl flex flex-col gap-6">
        {/* === 1. DOANH THU THEO THÁNG === */}
        <div className="bg-white border rounded-xl shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            Biểu đồ doanh thu theo tháng (triệu VNĐ)
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* === 2. XU HƯỚNG LỖI KỸ THUẬT === */}
        <div className="bg-white border rounded-xl shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            Xu hướng lỗi kỹ thuật phổ biến
          </h2>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={errorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <ul className="flex-1 space-y-2 text-sm text-gray-700">
              {errorData.map((err, i) => (
                <li key={i} className="flex justify-between border-b pb-1">
                  <span>{err.name}</span>
                  <span className="font-medium text-yellow-700">{err.value} lượt</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* === 3. LOẠI DỊCH VỤ PHỔ BIẾN === */}
        <div className="bg-white border rounded-xl shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-blue-600" />
            Tỷ lệ dịch vụ phổ biến
          </h2>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={serviceData}
                    dataKey="count"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {serviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <ul className="flex-1 space-y-2 text-sm text-gray-700">
              {serviceData.map((srv, i) => (
                <li key={i} className="flex justify-between border-b pb-1">
                  <span>{srv.name}</span>
                  <span className="font-medium text-emerald-700">{srv.count} lượt</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
