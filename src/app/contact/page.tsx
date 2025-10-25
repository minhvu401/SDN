"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Footer } from '../../components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';

interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.message) {
      setError('Vui lòng nhập đầy đủ họ tên, email và nội dung liên hệ.');
      return;
    }

    console.log('Nội dung liên hệ:', formData);
    setSuccess('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.');
    setFormData({ fullName: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 py-10 text-center">
        <h1 className="text-3xl font-bold text-emerald-700 font-display">Liên hệ với EV Care</h1>
        <p className="text-gray-600 mt-2">
          Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn 24/7
        </p>
      </div>

      {/* Contact Form Section */}
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

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
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

          {/* Số điện thoại */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Số điện thoại (không bắt buộc)
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

          {/* Nội dung */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Nội dung liên hệ <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              id="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Nhập nội dung bạn muốn trao đổi..."
            ></textarea>
          </div>

          {/* Thông báo */}
          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          {/* Nút gửi */}
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition"
          >
            Gửi liên hệ
          </button>
        </form>

        {/* Info Section */}
        <div className="mt-12 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Thông tin liên hệ</h2>
          <p className="text-gray-600">📍 123 Đường Trần Hưng Đạo, TP. Bắc Ninh</p>
          <p className="text-gray-600">📞 0123 456 789</p>
          <p className="text-gray-600">✉️ support@evcare.vn</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a
              href="https://facebook.com"
              className="text-emerald-600 hover:text-emerald-700 transition"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
            <a
              href="https://zalo.me"
              className="text-emerald-600 hover:text-emerald-700 transition"
              target="_blank"
              rel="noreferrer"
            >
              Zalo
            </a>
            <a
              href="mailto:support@evcare.vn"
              className="text-emerald-600 hover:text-emerald-700 transition"
            >
              Email
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
