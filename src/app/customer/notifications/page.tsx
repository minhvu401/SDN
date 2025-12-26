'use client';
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  Bell,
  Gift,
  Wrench,
  BatteryWarning,
  CalendarDays,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Trash2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CustomerNotificationsPage() {
  const router = useRouter();

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Nhắc lịch bảo dưỡng định kỳ',
      content: 'Xe VinFast Feliz S của bạn đã đạt 8.000 km. Vui lòng đặt lịch bảo dưỡng trong tuần này để đảm bảo hiệu suất.',
      type: 'maintenance',
      date: '25/10/2025 - 09:00',
      read: false,
    },
    {
      id: 2,
      title: 'Ưu đãi 20% cho gói “Bảo dưỡng toàn diện” 🎁',
      content: 'Từ 25/10 đến 05/11/2025, EV Care giảm 20% cho khách hàng đặt gói bảo dưỡng toàn diện. Đặt ngay để tiết kiệm chi phí!',
      type: 'promo',
      date: '24/10/2025 - 15:00',
      read: false,
    },
    {
      id: 3,
      title: 'Thông báo hoàn tất bảo dưỡng',
      content: 'Xe VinFast Klara A2 của bạn đã hoàn tất quá trình bảo dưỡng vào lúc 10:30 ngày 22/10/2025. Cảm ơn bạn đã sử dụng EV Care!',
      type: 'success',
      date: '22/10/2025 - 10:30',
      read: true,
    },
    {
      id: 4,
      title: 'Cảnh báo hệ thống điện áp thấp ⚡',
      content: 'Phát hiện điện áp pin thấp bất thường trên xe Feliz S. Khuyến nghị bạn mang xe đến trung tâm kiểm tra trong 24h tới.',
      type: 'alert',
      date: '20/10/2025 - 07:15',
      read: true,
    },
  ]);

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const deleteAll = () => setNotifications([]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'maintenance':
        return <Wrench className="w-5 h-5 text-emerald-600" />;
      case 'promo':
        return <Gift className="w-5 h-5 text-pink-500" />;
      case 'alert':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="relative bg-white border-b border-gray-200 py-10 text-center">
        {/* Back */}
        <button
          onClick={() => router.push('/customer/dashboard')}
          className="absolute top-5 left-6 flex items-center text-emerald-700 hover:text-emerald-800 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span className="text-sm font-medium">Về bảng điều khiển</span>
        </button>

        <h1 className="text-3xl font-bold text-emerald-700 font-display">
          Thông báo từ EV Care
        </h1>
        <p className="text-gray-600 mt-2">
          Xem các thông tin quan trọng về bảo dưỡng, khuyến mãi và hệ thống xe
        </p>

        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            onClick={markAllRead}
            className="text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-200 transition"
          >
            Đánh dấu đã đọc tất cả
          </button>
          <button
            onClick={deleteAll}
            className="text-sm bg-rose-100 text-rose-700 px-3 py-1.5 rounded-md hover:bg-rose-200 transition"
          >
            Xóa tất cả
          </button>
        </div>
      </div>

      {/* Nội dung */}
      <div className="container mx-auto px-6 py-10 max-w-4xl">
        {notifications.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <Bell className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p>Không có thông báo nào.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`flex items-start gap-4 p-5 rounded-xl shadow-sm border transition ${
                  n.read ? 'bg-white border-gray-100' : 'bg-emerald-50 border-emerald-100'
                }`}
              >
                <div className="flex-shrink-0 mt-1">{getIcon(n.type)}</div>
                <div className="flex-1">
                  <h3
                    className={`font-semibold ${
                      n.read ? 'text-gray-800' : 'text-emerald-700'
                    }`}
                  >
                    {n.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{n.content}</p>
                  <div className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                    <CalendarDays className="w-3 h-3" /> {n.date}
                  </div>
                </div>
                {!n.read && (
                  <button
                    onClick={() =>
                      setNotifications((prev) =>
                        prev.map((m) =>
                          m.id === n.id ? { ...m, read: true } : m
                        )
                      )
                    }
                    className="text-xs text-emerald-600 hover:underline"
                  >
                    Đánh dấu đã đọc
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
