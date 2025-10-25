'use client';
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  ArrowLeft,
  Settings,
  Shield,
  Sliders,
  Bot,
  Bell,
  Save,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminSettingsPage() {
  const router = useRouter();

  // ===== DỮ LIỆU MẪU =====
  const [permissions, setPermissions] = useState({
    admin: true,
    staff: true,
    technician: false,
  });

  const [serviceSettings, setServiceSettings] = useState({
    defaultWarrantyMonths: 12,
    minServiceIntervalDays: 90,
    autoReminder: true,
  });

  const [aiSettings, setAiSettings] = useState({
    aiEnabled: true,
    suggestParts: true,
    predictService: false,
  });

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Cập nhật phiên bản EV Care 3.2', active: true },
    { id: 2, title: 'Bảo trì hệ thống vào 27/10/2025', active: false },
  ]);

  // ===== HÀM XỬ LÝ =====
  const togglePermission = (key: keyof typeof permissions) =>
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));

  const toggleAiSetting = (key: keyof typeof aiSettings) =>
    setAiSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  const toggleNotification = (id: number) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, active: !n.active } : n))
    );

  const handleSave = () => {
    alert('✅ Đã lưu thay đổi cài đặt hệ thống!');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

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
            <Settings className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-gray-500">Cài đặt & AI hệ thống</span>
          </div>
        </div>
      </div>

      {/* NỘI DUNG CHÍNH */}
      <div className="container mx-auto px-6 py-6 max-w-6xl flex flex-col gap-6">
        {/* 1️⃣ QUẢN LÝ QUYỀN TRUY CẬP */}
        <div className="bg-white border rounded-xl shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-600" />
            Quyền truy cập người dùng
          </h2>

          <ul className="space-y-2 text-sm text-gray-700">
            {Object.entries(permissions).map(([key, value]) => (
              <li
                key={key}
                className="flex justify-between items-center border-b pb-1"
              >
                <span className="capitalize">
                  {key === 'admin'
                    ? 'Quản trị viên'
                    : key === 'staff'
                    ? 'Nhân viên trung tâm'
                    : 'Kỹ thuật viên'}
                </span>
                <button
                  onClick={() => togglePermission(key as keyof typeof permissions)}
                  className="text-emerald-600"
                >
                  {value ? (
                    <ToggleRight className="w-6 h-6 text-emerald-600" />
                  ) : (
                    <ToggleLeft className="w-6 h-6 text-gray-400" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* 2️⃣ CÀI ĐẶT DỊCH VỤ */}
        <div className="bg-white border rounded-xl shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-blue-600" />
            Thông số dịch vụ
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <label className="flex flex-col">
              Thời hạn bảo hành mặc định (tháng)
              <input
                type="number"
                value={serviceSettings.defaultWarrantyMonths}
                onChange={(e) =>
                  setServiceSettings({
                    ...serviceSettings,
                    defaultWarrantyMonths: parseInt(e.target.value) || 0,
                  })
                }
                className="border rounded-md px-3 py-2 mt-1 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </label>

            <label className="flex flex-col">
              Khoảng cách giữa 2 lần bảo dưỡng (ngày)
              <input
                type="number"
                value={serviceSettings.minServiceIntervalDays}
                onChange={(e) =>
                  setServiceSettings({
                    ...serviceSettings,
                    minServiceIntervalDays: parseInt(e.target.value) || 0,
                  })
                }
                className="border rounded-md px-3 py-2 mt-1 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </label>

            <label className="flex items-center justify-between mt-4">
              <span>Tự động nhắc bảo dưỡng</span>
              <button
                onClick={() =>
                  setServiceSettings({
                    ...serviceSettings,
                    autoReminder: !serviceSettings.autoReminder,
                  })
                }
              >
                {serviceSettings.autoReminder ? (
                  <ToggleRight className="w-6 h-6 text-emerald-600" />
                ) : (
                  <ToggleLeft className="w-6 h-6 text-gray-400" />
                )}
              </button>
            </label>
          </div>
        </div>

        {/* 3️⃣ AI GỢI Ý */}
        <div className="bg-white border rounded-xl shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Bot className="w-5 h-5 text-purple-600" />
            AI gợi ý & dự đoán
          </h2>

          <ul className="space-y-2 text-sm text-gray-700">
            {Object.entries(aiSettings).map(([key, value]) => (
              <li
                key={key}
                className="flex justify-between items-center border-b pb-1"
              >
                <span>
                  {key === 'aiEnabled'
                    ? 'Bật AI tổng thể'
                    : key === 'suggestParts'
                    ? 'Đề xuất phụ tùng thay thế'
                    : 'Dự đoán thời gian bảo dưỡng'}
                </span>
                <button
                  onClick={() => toggleAiSetting(key as keyof typeof aiSettings)}
                >
                  {value ? (
                    <ToggleRight className="w-6 h-6 text-emerald-600" />
                  ) : (
                    <ToggleLeft className="w-6 h-6 text-gray-400" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* 4️⃣ THÔNG BÁO HỆ THỐNG */}
        <div className="bg-white border rounded-xl shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Bell className="w-5 h-5 text-yellow-500" />
            Thông báo hệ thống
          </h2>

          <ul className="space-y-2 text-sm text-gray-700">
            {notifications.map((n) => (
              <li
                key={n.id}
                className="flex justify-between items-center border-b pb-1"
              >
                <span>{n.title}</span>
                <button onClick={() => toggleNotification(n.id)}>
                  {n.active ? (
                    <ToggleRight className="w-6 h-6 text-emerald-600" />
                  ) : (
                    <ToggleLeft className="w-6 h-6 text-gray-400" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* NÚT LƯU */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="inline-flex items-center bg-emerald-600 text-white px-5 py-2 rounded-md hover:bg-emerald-700 transition"
          >
            <Save className="w-4 h-4 mr-1" />
            Lưu thay đổi
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
