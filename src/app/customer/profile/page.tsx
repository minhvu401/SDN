'use client';
import React, { useEffect, useState } from 'react';
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
  Car,
  ShieldCheck,
  Wrench,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getProfile } from '@/lib/api/auth';
import {
  getCustomerProfile,
  updateCustomerProfile,
} from '@/lib/api/customer/profile';
import { toast } from 'react-hot-toast';  

type Vehicle = {
  // Define the properties of Vehicle here
};

type CustomerProfile = {
  email: string;
  username: string;
  fullName: string;
  phone: string;
  role: string; // Ensure this is defined
  vehicles: Vehicle[]; // Ensure this is an array of Vehicle
  isActive: boolean; // Ensure this is defined
  maintenanceCount: number; // Ensure this is defined
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

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const authData = await getProfile();
        if (!mounted) return;
        setUserId(authData._id);
        // Set email from authData immediately
        setProfile(prev => ({
          ...prev,
          email: authData.email || ''
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
          maintenanceCount: customer.maintenanceCount ?? 0,
          address: customer.address || '',
          paymentMethod: customer.paymentMethod || prev.paymentMethod,
          bankName: customer.bankName || '',
          cardNumber: customer.cardNumber || '',
        }));
      } catch (err: unknown) {
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
        {loading && <p className="text-center text-gray-600">Đang tải hồ sơ...</p>}
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
                <label className="text-sm text-gray-700 font-medium">
                  Tên đăng nhập
                </label>
                <input
                  type="text"
                  value={profile.username}
                  disabled
                  className="w-full border rounded-md p-2 mt-1 bg-gray-100 text-gray-700 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700 font-medium">
                  Email
                </label>
                <div className="flex items-center border rounded-md mt-1 px-2 bg-gray-100">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={profile.email}
                    disabled
                    className="flex-1 p-2 focus:ring-0 focus:border-0 outline-none bg-gray-100 text-gray-700 cursor-not-allowed"
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
                <label className="text-sm text-gray-700 font-medium">
                  Số điện thoại
                </label>
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

              
            </div>

            {/* Trạng thái & số lần bảo dưỡng */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
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
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Wrench className="w-5 h-5 text-emerald-600" />
                <span>Bảo dưỡng đã thực hiện: <b>{profile.maintenanceCount}</b></span>
              </div>
            </div>

            {/* Thông tin xe */}
            {profile.vehicles?.length > 0 && (
              <div className="mt-5">
                <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                  <Car className="w-4 h-4 text-emerald-600" /> Phương tiện đã đăng ký
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-gray-700">
                  {profile.vehicles.map((v: any) => (
                    <li key={v._id} className="flex justify-between border-b pb-1">
                      <span>{v.carModel}</span>
                      <span className="text-gray-500">{v.licensePlate}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
                <label className="text-sm text-gray-700 font-medium">
                  Số thẻ / Tài khoản
                </label>
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
