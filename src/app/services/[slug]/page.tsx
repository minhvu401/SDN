'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { fetchServiceById, type Service } from '@/lib/api/services';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadService = async () => {
      try {
        setLoading(true);
        setError(null);
        const serviceId = slug as string;
        const data = await fetchServiceById(serviceId);
        setService(data);
      } catch (err: any) {
        console.error('Error loading service:', err);
        setError(err.message || 'Không thể tải thông tin dịch vụ');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadService();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải thông tin dịch vụ...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl font-semibold text-gray-700 mb-4">
            {error?.includes('not found') || error?.includes('404') ? 'Dịch vụ không tồn tại' : 'Có lỗi xảy ra'} 😢
          </h1>
          <p className="text-gray-600 mb-6">{error || 'Không tìm thấy dịch vụ'}</p>
          <button
            onClick={() => router.push('/services')}
            className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 transition"
          >
            Quay lại danh sách dịch vụ
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  // Format thời gian
  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} phút`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours} giờ ${mins} phút` : `${hours} giờ`;
  };

  // Format giá
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  // Icon theo loại dịch vụ
  const getServiceIcon = (serviceType: string) => {
    const icons: Record<string, string> = {
      'Bảo dưỡng định kì': '🔧',
      'Thay thế pin': '🔋',
      'Kiểm tra phanh': '🛞',
      'Vệ sinh': '🧼',
      'Kiểm tra điện': '⚡',
      'Cứu hộ': '🚨',
    };
    return icons[serviceType] || '🔧';
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Navbar />

      {/* Hero Header */}
      <div className="relative bg-white border-b border-gray-200 overflow-hidden">
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-emerald-100 opacity-30"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full bg-emerald-100 opacity-30"></div>
        <div className="relative container mx-auto px-6 py-16 text-center">
          <div className="inline-block mb-6 p-4 bg-emerald-600 rounded-2xl">
            <div className="text-6xl mb-2">{getServiceIcon(service.serviceType)}</div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-display">
            {service.name}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6 leading-relaxed">
            {service.description}
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <span className="inline-flex items-center px-5 py-2 bg-emerald-600 text-white rounded-full text-sm font-medium">
              {service.serviceType}
            </span>
            {service.isActive === false ? (
              <span className="inline-flex items-center px-5 py-2 bg-red-100 text-red-700 rounded-full text-sm border border-red-200">
                Tạm ngưng
              </span>
            ) : (
              <span className="inline-flex items-center px-5 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm border border-emerald-200">
                Đang hoạt động
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 container mx-auto px-6 py-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description Card */}
            <section className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Mô tả dịch vụ</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">{service.description}</p>
            </section>

            {/* Service Details Card */}
            <section className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Chi tiết dịch vụ</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group flex items-start gap-4 p-5 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl hover:from-emerald-100 hover:to-emerald-200 transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Thời gian ước tính</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatDuration(service.estimatedDuration || service.duration || 60)}
                    </p>
                  </div>
                </div>
                <div className="group flex items-start gap-4 p-5 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl hover:from-emerald-100 hover:to-emerald-200 transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Giá dịch vụ</p>
                    <p className="text-2xl font-bold text-emerald-600">
                      {formatPrice(service.basePrice)}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - CTA Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <section className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-emerald-600 flex items-center justify-center border-4 border-emerald-100">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Sẵn sàng đặt lịch?</h3>
                  <p className="text-gray-600 text-sm">
                    Chúng tôi sẽ liên hệ với bạn để xác nhận
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                    <p className="text-sm text-emerald-700 mb-1">Giá chỉ từ</p>
                    <p className="text-3xl font-bold text-emerald-600">{formatPrice(service.basePrice)}</p>
                  </div>
                  
                  <a
                    href="/booking"
                    className="block w-full bg-emerald-600 text-white px-6 py-4 rounded-xl font-bold text-center hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Đặt lịch ngay
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </a>
                  
                  <button
                    onClick={() => router.push('/services')}
                    className="block w-full bg-transparent border-2 border-emerald-600 text-emerald-600 px-6 py-4 rounded-xl font-semibold hover:bg-emerald-600 hover:text-white transition-all duration-300"
                  >
                    Quay lại danh sách
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Thời gian: {formatDuration(service.estimatedDuration || service.duration || 60)}</span>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
