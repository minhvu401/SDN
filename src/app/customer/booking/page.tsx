'use client';
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  MapPin,
  Wrench,
  CalendarDays,
  Clock,
  Send,
  Car,
  CheckCircle2,
} from 'lucide-react';

export default function CustomerBookingPage() {
  const [form, setForm] = useState({
    center: '',
    service: '',
    date: '',
    time: '',
    note: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const centers = [
    'EV Care Bắc Ninh – Đường Lý Thái Tổ',
    'EV Care Hà Nội – Cầu Giấy',
    'EV Care Đà Nẵng – Hải Châu',
    'EV Care TP. Hồ Chí Minh – Quận 7',
  ];

  const services = [
    'Bảo dưỡng định kỳ',
    'Thay thế pin',
    'Kiểm tra phanh & lốp',
    'Vệ sinh & rửa xe',
    'Kiểm tra hệ thống điện',
    'Cứu hộ xe điện 24/7',
  ];

  const times = [
    '08:00 – 09:00',
    '09:00 – 10:00',
    '10:00 – 11:00',
    '13:30 – 14:30',
    '14:30 – 15:30',
    '15:30 – 16:30',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-10 text-center relative">
        <h1 className="text-3xl font-bold text-emerald-700 font-display">
          Đặt lịch bảo dưỡng xe điện
        </h1>
        <p className="text-gray-600 mt-2">
          Chọn trung tâm, dịch vụ và thời gian phù hợp để EV Care phục vụ bạn
        </p>
      </div>

      {/* Form booking */}
      <div className="flex-1 container mx-auto px-6 py-12 max-w-3xl">
        {submitted ? (
          <div className="bg-white p-10 rounded-xl shadow-lg text-center">
            <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Đặt lịch thành công!
            </h2>
            <p className="text-gray-600 mb-6">
              EV Care đã nhận được yêu cầu của bạn. Nhân viên sẽ liên hệ xác nhận trong ít phút.
            </p>
            <a
              href="/customer/dashboard"
              className="inline-block bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 transition"
            >
              Về bảng điều khiển →
            </a>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 space-y-6"
          >
            {/* Chọn trung tâm */}
            <div>
              <label className="flex items-center text-gray-800 font-semibold mb-2">
                <MapPin className="w-5 h-5 mr-2 text-emerald-600" /> Trung tâm bảo dưỡng
              </label>
              <select
                required
                value={form.center}
                onChange={(e) => setForm({ ...form, center: e.target.value })}
                className="w-full border-gray-300 rounded-md p-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">-- Chọn trung tâm --</option>
                {centers.map((center, idx) => (
                  <option key={idx} value={center}>
                    {center}
                  </option>
                ))}
              </select>
            </div>

            {/* Chọn dịch vụ */}
            <div>
              <label className="flex items-center text-gray-800 font-semibold mb-2">
                <Wrench className="w-5 h-5 mr-2 text-emerald-600" /> Loại dịch vụ
              </label>
              <select
                required
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="w-full border-gray-300 rounded-md p-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">-- Chọn loại dịch vụ --</option>
                {services.map((srv, idx) => (
                  <option key={idx} value={srv}>
                    {srv}
                  </option>
                ))}
              </select>
            </div>

            {/* Chọn ngày */}
            <div>
              <label className="flex items-center text-gray-800 font-semibold mb-2">
                <CalendarDays className="w-5 h-5 mr-2 text-emerald-600" /> Ngày bảo dưỡng
              </label>
              <input
                type="date"
                required
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full border-gray-300 rounded-md p-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            {/* Chọn giờ */}
            <div>
              <label className="flex items-center text-gray-800 font-semibold mb-2">
                <Clock className="w-5 h-5 mr-2 text-emerald-600" /> Khung giờ
              </label>
              <select
                required
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                className="w-full border-gray-300 rounded-md p-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">-- Chọn thời gian --</option>
                {times.map((t, idx) => (
                  <option key={idx} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Ghi chú */}
            <div>
              <label className="flex items-center text-gray-800 font-semibold mb-2">
                <Car className="w-5 h-5 mr-2 text-emerald-600" /> Ghi chú / Biển số xe
              </label>
              <textarea
                rows={3}
                placeholder="Ví dụ: Xe Feliz S – biển 99A-123.45, cần kiểm tra phanh sau..."
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                className="w-full border-gray-300 rounded-md p-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            {/* Nút gửi */}
            <div className="text-center pt-4">
              <button
                type="submit"
                className="inline-flex items-center bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 transition"
              >
                <Send className="w-5 h-5 mr-2" />
                Xác nhận đặt lịch
              </button>
            </div>
          </form>
        )}
      </div>

      <Footer />
    </div>
  );
}
