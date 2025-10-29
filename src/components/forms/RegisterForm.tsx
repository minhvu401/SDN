'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { register as registerApi, type VehicleInput, ALLOWED_CAR_MODELS } from '../../lib/api/auth';


interface RegisterFormData {
  username: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  vehicles: VehicleInput[];
}

export function RegisterForm() {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    vehicles: [
      { carModel: '', licensePlate: '' },
    ],
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Khai báo rõ kiểu cho e: ChangeEvent<HTMLInputElement>
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleVehicleChange = (
    index: number,
    field: keyof VehicleInput,
    value: string
  ) => {
    const updated = formData.vehicles.map((v, i) =>
      i === index ? { ...v, [field]: value } : v
    );
    setFormData({ ...formData, vehicles: updated });
  };

  const addVehicle = () => {
    setFormData({
      ...formData,
      vehicles: [...formData.vehicles, { carModel: '', licensePlate: '' }],
    });
  };

  const removeVehicle = (index: number) => {
    const updated = formData.vehicles.filter((_, i) => i !== index);
    setFormData({ ...formData, vehicles: updated.length ? updated : [{ carModel: '', licensePlate: '' }] });
  };

  // Khai báo rõ kiểu cho e: FormEvent<HTMLFormElement>
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.username || !formData.fullName || !formData.email || !formData.password || !formData.confirmPassword || !formData.phone) {
      setError('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const vehicles = formData.vehicles
        .map(v => ({ carModel: v.carModel.trim(), licensePlate: v.licensePlate.trim() }))
        .filter(v => v.carModel && v.licensePlate);

      await registerApi({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        phone: formData.phone,
        role: 'customer',
        vehicles: vehicles.length ? vehicles : undefined,
      });
      setSuccess('Đăng ký thành công! Vui lòng đăng nhập.');
      setFormData({
        username: '',
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        vehicles: [{ carModel: '', licensePlate: '' }],
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Đăng ký thất bại. Vui lòng thử lại.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tên đăng nhập */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Tên đăng nhập
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-emerald-500 focus:ring-emerald-500"
            placeholder="username_123"
          />
        </div>
        {/* Họ và tên */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Họ và tên
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-emerald-500 focus:ring-emerald-500"
            placeholder="Nguyễn Văn A"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-emerald-500 focus:ring-emerald-500"
            placeholder="example@gmail.com"
          />
        </div>

        {/* Số điện thoại */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Số điện thoại
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-emerald-500 focus:ring-emerald-500"
            placeholder="0367005443"
          />
        </div>

        {/* Vehicles */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">Phương tiện</label>
            <button
              type="button"
              onClick={addVehicle}
              className="text-sm text-emerald-600 hover:underline"
            >
              Thêm xe
            </button>
          </div>
          <div className="space-y-3">
            {formData.vehicles.map((v, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                <div>
                  <label className="block text-xs text-gray-600">Mẫu xe</label>
                  <select
                    value={v.carModel}
                    onChange={(e) => handleVehicleChange(index, 'carModel', e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-emerald-500 focus:ring-emerald-500 bg-white"
                  >
                    <option value="">-- Chọn mẫu xe --</option>
                    {ALLOWED_CAR_MODELS.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-600">Biển số</label>
                  <input
                    type="text"
                    value={v.licensePlate}
                    onChange={(e) => handleVehicleChange(index, 'licensePlate', e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-emerald-500 focus:ring-emerald-500"
                    placeholder="30A-12345"
                  />
                </div>
                <div className="flex md:justify-end">
                  <button
                    type="button"
                    onClick={() => removeVehicle(index)}
                    className="px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mật khẩu */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Mật khẩu
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-emerald-500 focus:ring-emerald-500"
            placeholder="********"
          />
        </div>

        {/* Xác nhận mật khẩu */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Xác nhận mật khẩu
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-emerald-500 focus:ring-emerald-500"
            placeholder="********"
          />
        </div>

        {/* Hiển thị thông báo */}
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        {/* Nút submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition disabled:opacity-60"
        >
          {loading ? 'Đang xử lý...' : 'Đăng ký'}
        </button>

        <button
          type="button"
          onClick={() => { window.location.href = '/'; }}
          className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition"
        >
         Back to Home
        </button>

        <p className="text-center text-sm text-gray-600 mt-3">
          Đã có tài khoản?{' '}
          <a href="/login" className="text-emerald-600 hover:underline">
            Đăng nhập ngay
          </a>
        </p>
      </form>
    </>
  );
}
