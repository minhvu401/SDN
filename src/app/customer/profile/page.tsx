'use client';
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  User,
  Mail,
  Phone,
  Home,
  CreditCard,
  Wallet,
  Building,
  ArrowLeft,
  Save,
  CheckCircle2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CustomerProfilePage() {
  const router = useRouter();

  const [profile, setProfile] = useState({
    fullName: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0987654321',
    address: '123 Lý Thái Tổ, Bắc Ninh',
    paymentMethod: 'Ví Momo',
    bankName: 'Vietcombank',
    cardNumber: '**** **** **** 1245',
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="relative bg-white border-b border-gray-200 py-10 text-center">
        <button
          onClick={() => router.push('/customer/dashboard')}
          className="absolute top-5 left-6 flex items-center text-emerald-700 hover:text-emerald-800 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span className="text-sm font-medium">Về bảng điều khiển</span>
        </button>

        <h1 className="text-3xl font-bold text-emerald-700 font-display">
          Thông tin cá nhân
        </h1>
        <p className="text-gray-600 mt-2">
          Cập nhật hồ sơ và phương thức thanh toán mặc định của bạn
        </p>
      </div>

      {/* Nội dung */}
      <div className="container mx-auto px-6 py-10 max-w-3xl">
        <form
          onSubmit={handleSave}
          className="bg-white shadow-md rounded-xl border border-gray-100 p-8 space-y-8"
        >
          {/* Thông tin cá nhân */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-600" /> Thông tin cá nhân
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm text-gray-700 font-medium">Họ và tên</label>
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  className="w-full border rounded-md p-2 mt-1 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700 font-medium">Số điện thoại</label>
                <div className="flex items-center border rounded-md mt-1 px-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="flex-1 p-2 focus:ring-0 focus:border-0 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-700 font-medium">Email</label>
                <div className="flex items-center border rounded-md mt-1 px-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="flex-1 p-2 focus:ring-0 focus:border-0 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-700 font-medium">Địa chỉ</label>
                <div className="flex items-center border rounded-md mt-1 px-2">
                  <Home className="w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={profile.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    className="flex-1 p-2 focus:ring-0 focus:border-0 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Phương thức thanh toán */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-600" /> Phương thức thanh toán
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm text-gray-700 font-medium">Phương thức</label>
                <select
                  value={profile.paymentMethod}
                  onChange={(e) => handleChange('paymentMethod', e.target.value)}
                  className="w-full border rounded-md p-2 mt-1 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option>Thẻ tín dụng</option>
                  <option>Ví Momo</option>
                  <option>Ví ZaloPay</option>
                  <option>Chuyển khoản ngân hàng</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-700 font-medium">Ngân hàng / Ví</label>
                <div className="flex items-center border rounded-md mt-1 px-2">
                  <Building className="w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={profile.bankName}
                    onChange={(e) => handleChange('bankName', e.target.value)}
                    className="flex-1 p-2 focus:ring-0 focus:border-0 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-700 font-medium">Số thẻ / Tài khoản</label>
                <div className="flex items-center border rounded-md mt-1 px-2">
                  <Wallet className="w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={profile.cardNumber}
                    onChange={(e) => handleChange('cardNumber', e.target.value)}
                    className="flex-1 p-2 focus:ring-0 focus:border-0 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Nút lưu */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="inline-flex items-center bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 transition"
            >
              <Save className="w-4 h-4 mr-2" />
              Lưu thay đổi
            </button>

            {saved && (
              <div className="flex items-center justify-center mt-4 text-emerald-700 text-sm">
                <CheckCircle2 className="w-4 h-4 mr-1" /> Cập nhật thành công!
              </div>
            )}
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}
