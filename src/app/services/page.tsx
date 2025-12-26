'use client';
import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { fetchServices } from '@/lib/api/services';
import * as LucideIcons from 'lucide-react';

// 🟢 1️⃣ Định nghĩa type dữ liệu Service khớp với backend
interface Service {
  _id: string;
  name: string;
  serviceType: string;
  description: string;
  basePrice: number;
  estimatedDuration: number;
  duration?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// 🟢 2️⃣ Component chính
export default function ServicesPage() {
  // Gán kiểu cho state:
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getIconByType = (serviceType = '', name = '') => {
    const lower = (serviceType + name).toLowerCase();

    if (lower.includes('pin')) return LucideIcons.BatteryCharging;
    if (lower.includes('phanh') || lower.includes('lốp')) return LucideIcons.Disc;
    if (lower.includes('điện')) return LucideIcons.Zap;
    if (lower.includes('rửa') || lower.includes('vệ sinh')) return LucideIcons.Sparkles;
    if (lower.includes('cứu hộ')) return LucideIcons.LifeBuoy;
    if (lower.includes('bảo dưỡng')) return LucideIcons.Wrench;

    return LucideIcons.Wrench;
  };

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchServices();
        setServices(data);
      } catch (err) {
        setError('Không thể tải danh sách dịch vụ. Vui lòng thử lại sau.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, []);

  if (loading) return <p className="text-center py-20 text-gray-500">Đang tải...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
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
          {services.map((service) => {
            const IconComponent = getIconByType(service.serviceType, service.name);
            return (
              <div
                key={service._id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="mb-4">
                    <IconComponent className="w-10 h-10 text-emerald-600" strokeWidth={2} />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {service.name}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <p className="mt-3 text-emerald-700 font-medium">
                    Giá: {service.basePrice.toLocaleString('vi-VN')} ₫
                  </p>
                  <p className="text-gray-500 text-sm">
                    Thời gian ước tính: {service.estimatedDuration} phút
                  </p>
                </div>
                <div className="mt-4">
                  <a
                    href={`/services/${service._id}`}
                    className="inline-block text-emerald-600 font-medium hover:underline"
                  >
                    Xem chi tiết →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}
