'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  Car,
  Battery,
  Gauge,
  CalendarDays,
  Wrench,
  BadgeCheck,
  Clock,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react';

export default function VehicleDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  // Giả lập dữ liệu chi tiết theo id (sau này có thể fetch từ API)
  const vehicles = [
    {
      id: '1',
      name: 'VinFast Feliz S',
      model: 'VFES-2025',
      vin: 'VFES2025A9VN12345',
      odo: '7.850 km',
      battery: '82%',
      registered: '20/02/2024',
      image:
        'https://images.unsplash.com/photo-1626716490300-18f2b8e72d18?auto=format&fit=crop&w=1400&q=80',
      services: [
        {
          date: '12/09/2025',
          type: 'Bảo dưỡng định kỳ',
          status: 'Hoàn tất',
          cost: '650.000 VNĐ',
          notes: 'Thay dầu hộp số, kiểm tra hệ thống điện.',
        },
        {
          date: '25/10/2025',
          type: 'Kiểm tra hệ thống điện',
          status: 'Đang xử lý',
          cost: '-',
          notes: 'Phát hiện điện áp bất thường, đang chẩn đoán thêm.',
        },
      ],
    },
    {
      id: '2',
      name: 'VinFast Klara A2',
      model: 'VFKL-2023',
      vin: 'VFKL2023B7VN67890',
      odo: '12.430 km',
      battery: '68%',
      registered: '05/09/2023',
      image:
        'https://images.unsplash.com/photo-1616594039964-ae2b2a4eb2f7?auto=format&fit=crop&w=1400&q=80',
      services: [
        {
          date: '10/07/2025',
          type: 'Thay thế pin',
          status: 'Hoàn tất',
          cost: '4.800.000 VNĐ',
          notes: 'Thay pin chính hãng VinFast, bảo hành 18 tháng.',
        },
        {
          date: '15/09/2025',
          type: 'Kiểm tra phanh & lốp',
          status: 'Hoàn tất',
          cost: '450.000 VNĐ',
          notes: 'Vệ sinh cụm phanh, cân chỉnh bánh xe.',
        },
      ],
    },
  ];

  const vehicle = vehicles.find((v) => v.id === id);

  if (!vehicle) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50">
        <Navbar />
        <h1 className="text-2xl font-semibold text-gray-700 mb-4">
          Không tìm thấy xe 🚗
        </h1>
        <button
          onClick={() => router.push('/customer/vehicles')}
          className="text-emerald-600 hover:underline"
        >
          Quay lại danh sách xe
        </button>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-10 text-center">
        <h1 className="text-3xl font-bold text-emerald-700 font-display">
          Thông tin chi tiết xe
        </h1>
        <p className="text-gray-600 mt-2">
          Xem toàn bộ thông tin và lịch sử bảo dưỡng của xe {vehicle.name}
        </p>
      </div>

      {/* Nội dung chính */}
      <div className="container mx-auto px-6 py-10 max-w-5xl">
        {/* Nút quay lại */}
        <button
          onClick={() => router.push('/customer/vehicle')}
          className="flex items-center text-emerald-600 mb-6 hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại danh sách xe
        </button>

        {/* Card thông tin xe */}
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100 mb-10">
          <div className="relative">
            <img
              src={vehicle.image}
              alt={vehicle.name}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-800/10 to-transparent"></div>
            <div className="absolute bottom-4 left-6 text-white">
              <h2 className="text-2xl font-semibold">{vehicle.name}</h2>
              <p className="text-sm text-gray-200">{vehicle.model}</p>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
            <div className="flex items-center gap-3">
              <Car className="w-5 h-5 text-emerald-600" />
              <p>
                <strong>VIN:</strong> {vehicle.vin}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Gauge className="w-5 h-5 text-emerald-600" />
              <p>
                <strong>Quãng đường:</strong> {vehicle.odo}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Battery className="w-5 h-5 text-emerald-600" />
              <p>
                <strong>Pin hiện tại:</strong> {vehicle.battery}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <CalendarDays className="w-5 h-5 text-emerald-600" />
              <p>
                <strong>Ngày đăng ký:</strong> {vehicle.registered}
              </p>
            </div>
          </div>
        </div>

        {/* Lịch sử bảo dưỡng */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Wrench className="w-6 h-6 text-emerald-600" /> Lịch sử bảo dưỡng
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border-t border-gray-100">
              <thead className="bg-gray-50 text-gray-700 font-semibold border-b">
                <tr>
                  <th className="px-4 py-3 text-left">Ngày</th>
                  <th className="px-4 py-3 text-left">Dịch vụ</th>
                  <th className="px-4 py-3 text-left">Chi phí</th>
                  <th className="px-4 py-3 text-left">Ghi chú</th>
                  <th className="px-4 py-3 text-center">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {vehicle.services.map((srv, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{srv.date}</td>
                    <td className="px-4 py-3">{srv.type}</td>
                    <td className="px-4 py-3">{srv.cost}</td>
                    <td className="px-4 py-3 text-gray-600">{srv.notes}</td>
                    <td className="px-4 py-3 text-center">
                      {srv.status === 'Hoàn tất' ? (
                        <BadgeCheck className="w-5 h-5 mx-auto text-emerald-600" />
                      ) : srv.status === 'Đang xử lý' ? (
                        <Clock className="w-5 h-5 mx-auto text-amber-500" />
                      ) : (
                        <AlertCircle className="w-5 h-5 mx-auto text-gray-400" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Nút hành động */}
        <div className="text-center mt-10">
          <a
            href="/booking"
            className="inline-flex items-center bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 transition"
          >
            <Wrench className="w-5 h-5 mr-2" /> Đặt lịch bảo dưỡng mới
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
