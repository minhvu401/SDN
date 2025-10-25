"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Footer } from '../../components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
interface BookingFormData {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  time: string;
  note: string;
}

export default function BookingPage() {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    time: '',
    note: '',
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.fullName || !formData.phone || !formData.service || !formData.date || !formData.time) {
      setError('Vui lòng điền đầy đủ thông tin bắt buộc.');
      return;
    }

    console.log('Dữ liệu đặt lịch:', formData);
    setSuccess('Đặt lịch thành công! Chúng tôi sẽ liên hệ sớm để xác nhận.');
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      service: '',
      date: '',
      time: '',
      note: '',
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 py-10 text-center">
        <h1 className="text-3xl font-bold text-emerald-700 font-display">Đặt lịch bảo dưỡng</h1>
        <p className="text-gray-600 mt-2">
          Chọn dịch vụ, thời gian và để lại thông tin để chúng tôi phục vụ bạn tốt nhất
        </p>
      </div>

      {/* Form Section */}
      <div className="flex-1 container mx-auto px-6 py-12 max-w-3xl">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-8 space-y-6 border border-gray-100"
        >
          {/* Họ tên */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Họ và tên <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Nguyễn Văn A"
            />
          </div>

          {/* Số điện thoại */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="0123 456 789"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email (không bắt buộc)
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="example@gmail.com"
            />
          </div>

          {/* Loại dịch vụ */}
          <div>
            <label htmlFor="service" className="block text-sm font-medium text-gray-700">
              Dịch vụ cần đặt <span className="text-red-500">*</span>
            </label>
            <select
              name="service"
              id="service"
              value={formData.service}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">-- Chọn dịch vụ --</option>
              <option value="Bảo dưỡng định kỳ">Bảo dưỡng định kỳ</option>
              <option value="Thay thế pin">Thay thế pin</option>
              <option value="Kiểm tra phanh & lốp">Kiểm tra phanh & lốp</option>
              <option value="Vệ sinh & rửa xe">Vệ sinh & rửa xe</option>
              <option value="Kiểm tra hệ thống điện">Kiểm tra hệ thống điện</option>
              <option value="Cứu hộ xe điện">Cứu hộ xe điện</option>
            </select>
          </div>

          {/* Ngày và Giờ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Ngày đặt <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                Giờ đặt <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="time"
                id="time"
                value={formData.time}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Ghi chú */}
          <div>
            <label htmlFor="note" className="block text-sm font-medium text-gray-700">
              Ghi chú thêm
            </label>
            <textarea
              name="note"
              id="note"
              rows={3}
              value={formData.note}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Ví dụ: Tôi cần bảo dưỡng nhanh vì sắp có chuyến đi xa..."
            ></textarea>
          </div>

          {/* Thông báo */}
          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition"
          >
            Xác nhận đặt lịch
          </button>
        </form>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
