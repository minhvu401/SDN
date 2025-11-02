'use client';
import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  User,
  Mail,
  Phone,
  ArrowLeft,
  Save,
  CheckCircle2,
  Car,
  ShieldCheck,
  Wrench,
  RefreshCw,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getProfile } from '@/lib/api/auth';
import {
  getCustomerProfile,
  updateCustomerProfile,
  updateCustomerMaintenanceDate,
} from '@/lib/api/customer/profile';
import { toast } from 'react-hot-toast';

type Vehicle = {
  _id?: string;
  carModel?: string;
  licensePlate?: string;
};

type CustomerProfile = {
  email: string;
  username: string;
  fullName: string;
  phone: string;
  role: string;
  vehicles: Vehicle[];
  isActive: boolean;
  maintenanceCount: number;
  address: string;
  paymentMethod: string;
  bankName: string;
  cardNumber: string;
};

export default function CustomerProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<CustomerProfile>({
    email: '',
    username: '',
    fullName: '',
    phone: '',
    role: '',
    vehicles: [],
    isActive: false,
    maintenanceCount: 0,
    address: '',
    paymentMethod: 'Ví Momo',
    bankName: '',
    cardNumber: '',
  });

  const [saved, setSaved] = useState(false);
  const [userId, setUserId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // 🟢 Load thông tin khách hàng
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const authData = await getProfile();
        if (!mounted) return;
        setUserId(authData._id);
        setProfile((prev) => ({
          ...prev,
          email: authData.email || '',
        }));

        const customer = await getCustomerProfile(authData._id);
        if (!mounted) return;
        setProfile((prev) => ({
          ...prev,
          username: customer.username || '',
          fullName: customer.fullName || '',
          phone: customer.phone || '',
          vehicles: customer.vehicles || [],
          isActive: customer.isActive ?? false,
          maintenanceCount: Number(customer.maintenanceCount ?? 0), // ✅ ép về số
          address: customer.address || '',
          paymentMethod: customer.paymentMethod || prev.paymentMethod,
          bankName: customer.bankName || '',
          cardNumber: customer.cardNumber || '',
        }));
      } catch {
        setError('Không thể tải hồ sơ. Vui lòng đăng nhập lại.');
        router.push('/login');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [router]);

  const handleChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  // 🟢 Lưu hồ sơ
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    try {
      await updateCustomerProfile(userId, {
        fullName: profile.fullName,
        phone: profile.phone,
        address: profile.address,
        paymentMethod: profile.paymentMethod,
        bankName: profile.bankName,
        cardNumber: profile.cardNumber,
      });
      setSaved(true);
      toast.success('Cập nhật thành công!');
      setTimeout(() => setSaved(false), 2500);
    } catch {
      toast.error('Cập nhật thất bại. Vui lòng thử lại.');
      setError('Cập nhật thất bại. Vui lòng thử lại.');
    }
  };

  // // 🧩 Cập nhật ngày bảo dưỡng
  // const handleMaintenanceUpdate = async () => {
  //   if (!userId) return;
  //   try {
  //     const now = new Date().toISOString();
  //     await updateCustomerMaintenanceDate(userId, now);
  //     toast.success('Đã cập nhật bảo dưỡng!');
  //     const refreshed = await getCustomerProfile(userId);
  //     setProfile((prev) => ({
  //       ...prev,
  //       maintenanceCount: Number(refreshed.maintenanceCount ?? 0),
  //     }));
  //   } catch (err) {
  //     console.error(err);
  //     toast.error('Không thể cập nhật lịch bảo dưỡng.');
  //   }
  // };

  if (loading) return <p className="text-center mt-10 text-gray-600">Đang tải hồ sơ...</p>;

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
        <p className="text-gray-600 mt-2">Xem và cập nhật hồ sơ của bạn.</p>
      </div>

      {/* Nội dung */}
      <div className="container mx-auto px-6 py-10 max-w-3xl">
        {error && <p className="text-center text-red-600">{error}</p>}
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
                <label className="text-sm text-gray-700 font-medium">Tên đăng nhập</label>
                <input
                  type="text"
                  value={profile.username}
                  disabled
                  className="w-full border rounded-md p-2 mt-1 bg-gray-100 text-gray-700 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700 font-medium">Email</label>
                <div className="flex items-center border rounded-md mt-1 px-2 bg-gray-100">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={profile.email}
                    disabled
                    className="flex-1 p-2 bg-gray-100 text-gray-700 cursor-not-allowed outline-none"
                  />
                </div>
              </div>
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
                    className="flex-1 p-2 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Trạng thái & bảo dưỡng */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 items-center">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <ShieldCheck
                  className={`w-5 h-5 ${
                    profile.isActive ? 'text-emerald-600' : 'text-gray-400'
                  }`}
                />
                <span>
                  Trạng thái:{' '}
                  <b>{profile.isActive ? 'Đang hoạt động' : 'Ngừng hoạt động'}</b>
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                {/* <Wrench className="w-5 h-5 text-emerald-600" /> */}
                {/* <span>
                  Bảo dưỡng đã thực hiện: <b>{profile.maintenanceCount}</b>
                </span> */}
                {/* <button
                  type="button"
                  onClick={handleMaintenanceUpdate}
                  className="flex items-center gap-1 px-3 py-1 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition text-xs"
                >
                  <RefreshCw className="w-4 h-4" /> Cập nhật
                </button> */}
              </div>
            </div>

            {/* Danh sách xe */}
            {profile.vehicles?.length > 0 && (
              <div className="mt-5">
                <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                  <Car className="w-4 h-4 text-emerald-600" /> Phương tiện đã đăng ký
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-gray-700">
                  {profile.vehicles.map((v, i) => (
                    <li key={i} className="flex justify-between border-b pb-1">
                      <span>{v.carModel}</span>
                      <span className="text-gray-500">{v.licensePlate}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
