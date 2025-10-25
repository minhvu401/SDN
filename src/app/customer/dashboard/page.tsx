'use client';
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Battery, CalendarClock, Wrench, MapPin, Gauge } from 'lucide-react';

export default function CustomerDashboardPage() {
  const vehicle = {
    name: 'VinFast Feliz S',
    vin: 'VFES2025A9VN12345',
    odo: '7.850 km',
    battery: '82%',
    lastService: '12/09/2025',
    nextService: '12/12/2025',
    location: 'Bắc Ninh, Việt Nam',
    image:
      'https://shop.vinfastauto.com/on/demandware.static/-/Sites-app_vinfast_vn-Library/default/dwc0b282c1/images/PDP-XMD/felizs/img-product-01-sp.webp', // ảnh xe mẫu (xe điện)
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-10 text-center">
        <h1 className="text-3xl font-bold text-emerald-700 font-display">
          Bảng điều khiển khách hàng
        </h1>
        <p className="text-gray-600 mt-2">
          Theo dõi tình trạng xe và lịch bảo dưỡng của bạn tại EV Care
        </p>
      </div>

      {/* Card thông tin xe */}
      <div className="container mx-auto px-6 py-10">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden relative">
          {/* Ảnh xe */}
          <div className="relative">
            <img
              src={vehicle.image}
              alt={vehicle.name}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-800/10 to-transparent"></div>
            <div className="absolute bottom-4 left-6 text-white">
              <h2 className="text-2xl font-semibold">{vehicle.name}</h2>
              <p className="text-sm text-gray-200">{vehicle.vin}</p>
            </div>
          </div>

          {/* Nội dung chi tiết */}
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center gap-3 text-gray-700">
              <Gauge className="w-5 h-5 text-emerald-600" />
              <p>
                <strong>Quãng đường:</strong> {vehicle.odo}
              </p>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <Battery className="w-5 h-5 text-emerald-600" />
              <p>
                <strong>Pin hiện tại:</strong> {vehicle.battery}
              </p>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <CalendarClock className="w-5 h-5 text-emerald-600" />
              <p>
                <strong>Lần bảo dưỡng gần nhất:</strong> {vehicle.lastService}
              </p>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <Wrench className="w-5 h-5 text-emerald-600" />
              <p>
                <strong>Lịch bảo dưỡng kế tiếp:</strong> {vehicle.nextService}
              </p>
            </div>

            <div className="flex items-center gap-3 text-gray-700 sm:col-span-2">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <p>
                <strong>Vị trí hiện tại:</strong> {vehicle.location}
              </p>
            </div>
          </div>

          {/* Nút hành động */}
          <div className="px-6 pb-6 text-center">
            <a
              href="/booking"
              className="inline-flex items-center justify-center bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 transition"
            >
              Đặt lịch bảo dưỡng →
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
