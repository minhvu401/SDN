'use client';
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import {
  Wrench,
  BatteryCharging,
  Disc,
  Sparkles,
  Zap,
  LifeBuoy,
} from 'lucide-react'; // 👈 import icon từ lucide-react

export default function ServicesPage() {
  const services = [
    {
      title: 'Bảo dưỡng định kỳ',
      description:
        'Kiểm tra tổng thể, thay dầu, vệ sinh và cân chỉnh các bộ phận của xe điện để đảm bảo hiệu suất vận hành ổn định.',
      icon: <Wrench className="w-10 h-10 text-emerald-600" strokeWidth={2} />,
    },
    {
      title: 'Thay thế pin',
      description:
        'Đánh giá tình trạng pin, thay pin mới chính hãng, tối ưu tuổi thọ và hiệu suất năng lượng.',
      icon: <BatteryCharging className="w-10 h-10 text-emerald-600" strokeWidth={2} />,
    },
    {
      title: 'Kiểm tra phanh & lốp',
      description:
        'Kiểm tra độ mòn phanh, áp suất lốp, và cân chỉnh bánh xe giúp di chuyển an toàn và êm ái.',
      icon: <Disc className="w-10 h-10 text-emerald-600" strokeWidth={2} />,
    },
    {
      title: 'Vệ sinh & rửa xe',
      description:
        'Dịch vụ rửa xe trong và ngoài, phủ nano bảo vệ bề mặt sơn và các chi tiết kim loại.',
      icon: <Sparkles className="w-10 h-10 text-emerald-600" strokeWidth={2} />,
    },
    {
      title: 'Kiểm tra hệ thống điện',
      description:
        'Phát hiện và sửa chữa các lỗi liên quan đến hệ thống điện, dây dẫn, cảm biến và bộ điều khiển.',
      icon: <Zap className="w-10 h-10 text-emerald-600" strokeWidth={2} />,
    },
    {
      title: 'Cứu hộ xe điện',
      description:
        'Hỗ trợ 24/7 khi xe gặp sự cố giữa đường – sạc pin khẩn cấp, thay bánh xe hoặc kéo xe về trạm dịch vụ.',
      icon: <LifeBuoy className="w-10 h-10 text-emerald-600" strokeWidth={2} />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Header section */}
      <div className="bg-white border-b border-gray-200 py-10 text-center">
        <h1 className="text-3xl font-bold text-emerald-700 font-display">
          Dịch vụ bảo dưỡng xe điện
        </h1>
        <p className="text-gray-600 mt-2">
          EV Care – Hệ thống bảo dưỡng, kiểm tra và chăm sóc xe điện toàn diện
        </p>
      </div>

      {/* Services grid */}
      <div className="flex-1 container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="mb-4">{service.icon}</div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="mt-4">
                <a
                  href={`/services/${service.title
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/&/g, 'va')}`}
                  className="inline-block text-emerald-600 font-medium hover:underline"
                >
                  Xem chi tiết →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
