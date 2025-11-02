'use client';
import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Lock, Save, ArrowLeft, Eye, EyeOff, CheckCircle2, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { getProfile } from '@/lib/api/auth';
import { updateCustomerPassword } from '@/lib/api/customer/change-password';

export default function ChangePasswordPage() {
  const [userId, setUserId] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getProfile();
        setUserId(user._id);
      } catch (err) {
        toast.error('Vui lòng đăng nhập lại.');
        router.push('/login');
      }
    };
    fetchUser();
  }, [router]);

  // 🟡 Tính độ khớp giữa mật khẩu mới và nhập lại
  const isMatch = confirmPassword.length > 0 && confirmPassword === newPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error('Vui lòng nhập đầy đủ các trường.');
      return;
    }

    if (newPassword === oldPassword) {
      toast.error('Mật khẩu mới không được trùng với mật khẩu cũ.');
      return;
    }

    if (!isMatch) {
      toast.error('Mật khẩu nhập lại không khớp.');
      return;
    }

    try {
      setLoading(true);
      await updateCustomerPassword(userId, newPassword);
      toast.success('Đổi mật khẩu thành công!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      console.error(err);
      const msg =
        err?.response?.data?.message || 'Không thể đổi mật khẩu. Vui lòng thử lại.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="relative bg-white border-b border-gray-200 py-10 text-center">
        <button
          onClick={() => router.push('/customer/dashboard')}
          className="absolute top-5 left-6 flex items-center text-emerald-700 hover:text-emerald-800 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span className="text-sm font-medium">Về bảng điều khiển</span>
        </button>
        <h1 className="text-3xl font-bold text-emerald-700 font-display">
          Đổi mật khẩu
        </h1>
        <p className="text-gray-600 mt-2">
          Nhập mật khẩu cũ và thiết lập mật khẩu mới của bạn.
        </p>
      </div>

      <div className="flex-1 container mx-auto px-6 py-12 max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg space-y-6"
        >
          {/* Mật khẩu cũ */}
          <div>
            <label className="flex items-center text-gray-800 font-semibold mb-2">
              <Lock className="w-5 h-5 mr-2 text-emerald-600" /> Mật khẩu hiện tại
            </label>
            <div className="relative">
              <input
                type={show.old ? 'text' : 'password'}
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Nhập mật khẩu hiện tại"
                className="w-full border-gray-300 rounded-md p-2 pr-10 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={() => setShow({ ...show, old: !show.old })}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                {show.old ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mật khẩu mới */}
          <div>
            <label className="flex items-center text-gray-800 font-semibold mb-2">
              <Lock className="w-5 h-5 mr-2 text-emerald-600" /> Mật khẩu mới
            </label>
            <div className="relative">
              <input
                type={show.new ? 'text' : 'password'}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nhập mật khẩu mới"
                className="w-full border-gray-300 rounded-md p-2 pr-10 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={() => setShow({ ...show, new: !show.new })}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                {show.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Gợi ý độ mạnh */}
            {newPassword && (
              <p
                className={`text-sm mt-1 ${
                  newPassword.length < 6
                    ? 'text-red-500'
                    : newPassword.length < 10
                    ? 'text-yellow-500'
                    : 'text-emerald-600'
                }`}
              >
                {newPassword.length < 6
                  ? 'Mật khẩu quá ngắn (ít nhất 6 ký tự)'
                  : newPassword.length < 10
                  ? 'Mức trung bình'
                  : 'Mật khẩu mạnh ✅'}
              </p>
            )}
          </div>

          {/* Nhập lại mật khẩu mới */}
          <div>
            <label className="flex items-center text-gray-800 font-semibold mb-2">
              <Lock className="w-5 h-5 mr-2 text-emerald-600" /> Nhập lại mật khẩu mới
            </label>
            <div className="relative">
              <input
                type={show.confirm ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Nhập lại mật khẩu mới"
                className="w-full border-gray-300 rounded-md p-2 pr-10 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={() => setShow({ ...show, confirm: !show.confirm })}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                {show.confirm ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Báo độ chính xác */}
            {confirmPassword.length > 0 && (
              <div className="flex items-center mt-2 text-sm">
                {isMatch ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-1" />
                    <span className="text-emerald-600">Mật khẩu khớp ✅</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-red-500 mr-1" />
                    <span className="text-red-500">Chưa khớp với mật khẩu mới ❌</span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 transition disabled:opacity-50"
            >
              <Save className="w-5 h-5 mr-2" />
              {loading ? 'Đang đổi...' : 'Đổi mật khẩu'}
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}
