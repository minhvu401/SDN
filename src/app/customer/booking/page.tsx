'use client';
import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MapPin, Wrench, CalendarDays, Clock, Send, Car, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { fetchServices, Service } from '@/lib/api/services';
import { fetchCenters, Center } from '@/lib/api/center';
import { createBooking } from '@/lib/api/customer/booking';

export default function CustomerBookingPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [centers, setCenters] = useState<Center[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    centerId: '',
    serviceId: '',
    date: '',
    time: '',
    licensePlate: '',
  });

  const times = ['08:00', '09:00', '10:00', '13:30', '14:30', '15:30'];

  // 🟢 Lấy danh sách dịch vụ & trung tâm khi load trang
  useEffect(() => {
    const loadData = async () => {
      try {
        const [servicesData, centersData] = await Promise.all([
          fetchServices(),
          fetchCenters(),
        ]);
        setServices(servicesData);
        setCenters(centersData);
      } catch (err) {
        toast.error('Không thể tải dữ liệu dịch vụ hoặc trung tâm.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // 🟢 Gửi form đặt lịch
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.centerId || !form.serviceId || !form.date || !form.time) {
      toast.error('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    const bookingDate = `${form.date}T${form.time}:00.000Z`;

    const payload = {
      serviceIds: [form.serviceId],
      centerId: form.centerId,
      bookingDate,
      licensePlates: [form.licensePlate || 'Không rõ'],
      parts: [],
    };

    console.log('📦 Payload gửi lên:', payload);

    const bookingPromise = createBooking(payload);

    toast.promise(bookingPromise, {
      loading: 'Đang gửi yêu cầu đặt lịch...',
      success: 'Đặt lịch thành công!',
      error: 'Không thể đặt lịch. Vui lòng thử lại.',
    });

    try {
      await bookingPromise;
      setSubmitted(true);
    } catch (err) {
      console.error('❌ Lỗi đặt lịch:', err);
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-600">Đang tải dữ liệu...</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="bg-white border-b border-gray-200 py-10 text-center">
        <h1 className="text-3xl font-bold text-emerald-700 font-display">Đặt lịch bảo dưỡng xe điện</h1>
        <p className="text-gray-600 mt-2">
          Chọn trung tâm, dịch vụ và thời gian phù hợp để EV Care phục vụ bạn
        </p>
      </div>

      <div className="flex-1 container mx-auto px-6 py-12 max-w-3xl">
        {submitted ? (
          <div className="bg-white p-10 rounded-xl shadow-lg text-center">
            <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Đặt lịch thành công!</h2>
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
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-6">
            {/* Chọn trung tâm */}
            <div>
              <label className="flex items-center text-gray-800 font-semibold mb-2">
                <MapPin className="w-5 h-5 mr-2 text-emerald-600" /> Trung tâm bảo dưỡng
              </label>
              <select
                required
                value={form.centerId}
                onChange={(e) => setForm({ ...form, centerId: e.target.value })}
                className="w-full border-gray-300 rounded-md p-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">-- Chọn trung tâm --</option>
                {centers.map((center) => (
                  <option key={center._id} value={center._id}>
                    {center.name} ({center.address})
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
                value={form.serviceId}
                onChange={(e) => setForm({ ...form, serviceId: e.target.value })}
                className="w-full border-gray-300 rounded-md p-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">-- Chọn loại dịch vụ --</option>
                {services.map((srv) => (
                  <option key={srv._id} value={srv._id}>
                    {srv.name} — {srv.basePrice.toLocaleString()}đ
                  </option>
                ))}
              </select>
            </div>

            {/* Ngày và giờ */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-gray-800 font-semibold mb-2">
                  <CalendarDays className="w-5 h-5 mr-2 text-emerald-600" /> Ngày
                </label>
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full border-gray-300 rounded-md p-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="flex items-center text-gray-800 font-semibold mb-2">
                  <Clock className="w-5 h-5 mr-2 text-emerald-600" /> Giờ
                </label>
                <select
                  required
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="w-full border-gray-300 rounded-md p-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">-- Chọn giờ --</option>
                  {times.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Biển số xe */}
            <div>
              <label className="flex items-center text-gray-800 font-semibold mb-2">
                <Car className="w-5 h-5 mr-2 text-emerald-600" /> Biển số xe
              </label>
              <input
                type="text"
                placeholder="VD: 51K-56789"
                value={form.licensePlate}
                onChange={(e) => setForm({ ...form, licensePlate: e.target.value })}
                className="w-full border-gray-300 rounded-md p-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            {/* Nút gửi */}
            <div className="text-center pt-4">
              <button
                type="submit"
                className="inline-flex items-center bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 transition"
              >
                <Send className="w-5 h-5 mr-2" /> Xác nhận đặt lịch
              </button>
            </div>
          </form>
        )}
      </div>

      <Footer />
    </div>
  );
}
