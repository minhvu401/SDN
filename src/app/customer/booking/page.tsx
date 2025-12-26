'use client';
import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MapPin, Wrench, CalendarDays, Send, Car, CheckCircle2 } from 'lucide-react';
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
    serviceIds: [] as string[],
    bookingDate: '',
    licensePlates: [] as string[],
  });

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
        console.error(err);
        toast.error('Không thể tải dữ liệu dịch vụ hoặc trung tâm. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // 🟢 Toggle chọn dịch vụ (chọn nhiều)
  const handleServiceToggle = (id: string) => {
    setForm((prev) => {
      const exists = prev.serviceIds.includes(id);
      return {
        ...prev,
        serviceIds: exists
          ? prev.serviceIds.filter((sid) => sid !== id)
          : [...prev.serviceIds, id],
      };
    });
  };

  // 🟢 Xử lý biển số (cách nhau dấu phẩy)
  const handleLicenseChange = (val: string) => {
    const plates = val
      .split(',')
      .map((p) => p.trim())
      .filter((p) => p !== '');
    setForm({ ...form, licensePlates: plates });
  };

  // 🟢 Gửi form đặt lịch
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.centerId || form.serviceIds.length === 0 || !form.bookingDate) {
      toast.error('Vui lòng điền đầy đủ thông tin trước khi đặt lịch.');
      return;
    }

    // ✅ Chuyển sang múi giờ Việt Nam (UTC+7)
    const bookingDate = new Date(`${form.bookingDate}+07:00`).toISOString();

    const payload = {
      serviceIds: form.serviceIds,
      centerId: form.centerId,
      bookingDate,
      licensePlates: form.licensePlates.length > 0 ? form.licensePlates : ['Không rõ'],
      parts: [],
    };

    console.log('📦 Payload gửi lên:', payload);

    try {
      const bookingPromise = createBooking(payload);

      toast.promise(bookingPromise, {
        loading: 'Đang gửi yêu cầu đặt lịch...',
        success: 'Đặt lịch thành công!',
        error: 'Không thể đặt lịch. Vui lòng thử lại.',
      });

      await bookingPromise;
      setSubmitted(true);
    } catch (err: any) {
      console.error('❌ Lỗi đặt lịch:', err);
      const serverMessage =
        err?.response?.data?.message ||
        err?.message ||
        'Đặt lịch thất bại! Vui lòng thử lại sau.';
      toast.error(serverMessage);
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-600">Đang tải dữ liệu...</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="bg-white border-b border-gray-200 py-10 text-center">
        <h1 className="text-3xl font-bold text-emerald-700 font-display">
          Đặt lịch bảo dưỡng xe điện
        </h1>
        <p className="text-gray-600 mt-2">
          Chọn trung tâm, dịch vụ và thời gian phù hợp để EV Care phục vụ bạn
        </p>
      </div>

      <div className="flex-1 container mx-auto px-6 py-12 max-w-3xl">
        {submitted ? (
          <div className="bg-white p-10 rounded-xl shadow-lg text-center animate-fadeIn">
            <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Đặt lịch thành công!</h2>
            <p className="text-gray-600 mb-6">
              EV Care đã nhận được yêu cầu của bạn. Nhân viên sẽ liên hệ xác nhận trong ít phút.
            </p>

            <div className="space-y-3">
              <a
                href="/customer/dashboard"
                className="inline-block bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 transition"
              >
                Về bảng điều khiển →
              </a>
              <br />
              <a
                href="/customer/appointments"
                className="inline-block text-emerald-700 font-medium hover:underline hover:text-emerald-800 transition"
              >
                Xem lịch hẹn của tôi →
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-6">
            {/* Trung tâm */}
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

            {/* Dịch vụ */}
            <div>
              <label className="flex items-center text-gray-800 font-semibold mb-2">
                <Wrench className="w-5 h-5 mr-2 text-emerald-600" /> Chọn dịch vụ
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {services.map((srv) => (
                  <label key={srv._id} className="flex items-center border p-2 rounded-md">
                    <input
                      type="checkbox"
                      checked={form.serviceIds.includes(srv._id)}
                      onChange={() => handleServiceToggle(srv._id)}
                      className="mr-2 accent-emerald-600"
                    />
                    <span>
                      {srv.name} — {srv.basePrice.toLocaleString()}đ
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Ngày & giờ (gộp) */}
            <div>
              <label className="flex items-center text-gray-800 font-semibold mb-2">
                <CalendarDays className="w-5 h-5 mr-2 text-emerald-600" /> Ngày và giờ
              </label>
              <input
                type="datetime-local"
                required
                value={form.bookingDate}
                onChange={(e) => setForm({ ...form, bookingDate: e.target.value })}
                className="w-full border-gray-300 rounded-md p-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            {/* Biển số xe */}
            <div>
              <label className="flex items-center text-gray-800 font-semibold mb-2">
                <Car className="w-5 h-5 mr-2 text-emerald-600" /> Biển số xe
              </label>
              <input
                type="text"
                placeholder="VD: 51K-56789, 60K-99999"
                value={form.licensePlates.join(', ')}
                onChange={(e) => handleLicenseChange(e.target.value)}
                className="w-full border-gray-300 rounded-md p-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            {/* Submit */}
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
