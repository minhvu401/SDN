'use client';
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  Car,
  Wrench,
  CalendarDays,
  BadgeCheck,
  Clock,
  Battery,
  ArrowLeft,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CustomerVehiclesPage() {
  const router = useRouter();

  // Dữ liệu giả lập xe đã đăng ký
  const vehicles = [
    {
      id: 1,
      name: 'VinFast Feliz S',
      model: 'VFES-2025',
      vin: 'VFES2025A9VN12345',
      odo: '7.850 km',
      battery: '82%',
      registered: '20/02/2024',
      image:
        'https://shop.vinfastauto.com/on/demandware.static/-/Sites-app_vinfast_vn-Library/default/dwc0b282c1/images/PDP-XMD/felizs/img-product-01-sp.webp',
      services: [
        { date: '12/09/2025', type: 'Bảo dưỡng định kỳ', status: 'Hoàn tất' },
        { date: '25/10/2025', type: 'Kiểm tra hệ thống điện', status: 'Đang xử lý' },
      ],
    },
    {
      id: 2,
      name: 'VinFast Klara A2',
      model: 'VFKL-2023',
      vin: 'VFKL2023B7VN67890',
      odo: '12.430 km',
      battery: '68%',
      registered: '05/09/2023',
      image:
        'https://khbike.com.vn/wp-content/uploads/2022/06/BUT.png',
      services: [
        { date: '10/07/2025', type: 'Thay thế pin', status: 'Hoàn tất' },
        { date: '15/09/2025', type: 'Kiểm tra phanh & lốp', status: 'Hoàn tất' },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="relative bg-white border-b border-gray-200 py-10 text-center">
        {/* Nút back góc trái */}
        <button
          onClick={() => router.push('/')}
          className="absolute top-5 left-6 flex items-center text-emerald-700 hover:text-emerald-800 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span className="text-sm font-medium">Quay lại Trang chủ</span>
        </button>

        <h1 className="text-3xl font-bold text-emerald-700 font-display">
          Danh sách xe đã đăng ký
        </h1>
        <p className="text-gray-600 mt-2">
          Quản lý các xe điện của bạn và xem nhanh lịch sử dịch vụ tại EV Care
        </p>
      </div>

      {/* Main content */}
      <div className="flex-1 container mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100 flex flex-col"
          >
            {/* Ảnh xe */}
            <div className="relative">
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute bottom-3 left-4 bg-emerald-600 text-white px-3 py-1 rounded-md text-sm font-medium shadow">
                {vehicle.model}
              </div>
            </div>

            {/* Thông tin xe */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center mb-3">
                  <Car className="w-5 h-5 text-emerald-600 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-800">
                    {vehicle.name}
                  </h2>
                </div>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>
                    <strong>VIN:</strong> {vehicle.vin}
                  </li>
                  <li className="flex items-center gap-2">
                    <Battery className="w-4 h-4 text-emerald-600" />
                    <span>Pin: {vehicle.battery}</span>
                  </li>
                  <li>
                    <strong>Quãng đường:</strong> {vehicle.odo}
                  </li>
                  <li>
                    <strong>Ngày đăng ký:</strong> {vehicle.registered}
                  </li>
                </ul>
              </div>

              {/* Lịch sử dịch vụ */}
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-emerald-600" /> Lịch sử dịch vụ gần đây
                </h3>
                <div className="bg-gray-50 rounded-lg border border-gray-100 p-3 text-sm space-y-2">
                  {vehicle.services.map((srv, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between border-b last:border-0 border-gray-100 pb-2"
                    >
                      <div>
                        <p className="font-medium text-gray-800">{srv.type}</p>
                        <p className="text-xs text-gray-500">{srv.date}</p>
                      </div>
                      {srv.status === 'Hoàn tất' ? (
                        <BadgeCheck className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <Clock className="w-5 h-5 text-amber-500" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Nút hành động */}
            <div className="flex justify-between items-center px-5 py-4 bg-gray-50 border-t border-gray-100">
              <a
                href={`/customer/vehicle/${vehicle.id}`}
                className="text-sm text-emerald-600 font-medium hover:underline"
              >
                Xem chi tiết →
              </a>
              <a
                href="/booking"
                className="inline-flex items-center text-sm bg-emerald-600 text-white px-4 py-1.5 rounded-md hover:bg-emerald-700 transition"
              >
                <CalendarDays className="w-4 h-4 mr-1" />
                Đặt lịch bảo dưỡng
              </a>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
