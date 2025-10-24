import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar Component */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="relative px-8 py-16 text-center">
              <div className="max-w-4xl mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#10B981' }}>
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h1 className="text-5xl font-bold text-white mb-6">
                  Chào mừng đến với EV Care
          </h1>
                <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                  Hệ thống quản lý bảo dưỡng xe điện chuyên nghiệp và đáng tin cậy. 
                  Chúng tôi cung cấp dịch vụ bảo dưỡng, sửa chữa và chăm sóc xe điện tốt nhất với đội ngũ kỹ thuật viên giàu kinh nghiệm.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-8 py-4 text-white font-semibold rounded-lg transition-all hover:scale-105" style={{ backgroundColor: '#10B981' }}>
                    Đặt lịch ngay
                  </button>
                  <button className="px-8 py-4 text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-gray-900 transition-all">
                    Tìm hiểu thêm
                  </button>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-10 left-10 w-20 h-20 rounded-full opacity-20" style={{ backgroundColor: '#10B981' }}></div>
            <div className="absolute bottom-10 right-10 w-16 h-16 rounded-full opacity-20" style={{ backgroundColor: '#10B981' }}></div>
            <div className="absolute top-1/2 left-5 w-12 h-12 rounded-full opacity-20" style={{ backgroundColor: '#10B981' }}></div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#10B981' }}>
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Chất lượng cao</h3>
              <p className="text-gray-600 leading-relaxed">Dịch vụ bảo dưỡng chuyên nghiệp với tiêu chuẩn quốc tế, đảm bảo hiệu suất tối ưu cho xe điện của bạn</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#10B981' }}>
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Nhanh chóng</h3>
              <p className="text-gray-600 leading-relaxed">Thời gian bảo dưỡng nhanh chóng, tiết kiệm thời gian quý báu của bạn với quy trình được tối ưu hóa</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#10B981' }}>
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Hỗ trợ 24/7</h3>
              <p className="text-gray-600 leading-relaxed">Đội ngũ hỗ trợ khách hàng chuyên nghiệp luôn sẵn sàng phục vụ mọi lúc, mọi nơi</p>
            </div>
          </div>
        </div>


        {/* Services Overview Section */}
        <div className="mb-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Dịch vụ của chúng tôi</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              EV Care cung cấp đầy đủ các dịch vụ chăm sóc và bảo dưỡng xe điện với công nghệ tiên tiến và đội ngũ chuyên gia giàu kinh nghiệm.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 border border-gray-100">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: '#10B981' }}>
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Bảo dưỡng định kỳ</h3>
              <p className="text-gray-600 leading-relaxed">Kiểm tra và bảo dưỡng xe điện theo lịch trình định kỳ để đảm bảo hiệu suất tối ưu</p>
              <div className="mt-6">
                <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full" style={{ backgroundColor: '#10B981', color: 'white' }}>
                  MIỄN PHÍ
                </span>
              </div>
            </div>
            <div className="group bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 border border-gray-100">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: '#10B981' }}>
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Sửa chữa chuyên nghiệp</h3>
              <p className="text-gray-600 leading-relaxed">Đội ngũ kỹ thuật viên chuyên nghiệp sửa chữa mọi loại xe điện với thiết bị hiện đại</p>
              <div className="mt-6">
                <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
                  CHUYÊN NGHIỆP
                </span>
              </div>
            </div>
            <div className="group bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 border border-gray-100">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: '#10B981' }}>
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Thay thế pin</h3>
              <p className="text-gray-600 leading-relaxed">Dịch vụ thay thế và nâng cấp pin xe điện với công nghệ tiên tiến nhất</p>
              <div className="mt-6">
                <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full bg-purple-100 text-purple-800">
                  CÔNG NGHỆ MỚI
                </span>
              </div>
            </div>
            <div className="group bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 border border-gray-100">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: '#10B981' }}>
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Kiểm tra tổng quát</h3>
              <p className="text-gray-600 leading-relaxed">Kiểm tra toàn diện hệ thống xe điện để phát hiện và xử lý sớm các vấn đề</p>
              <div className="mt-6">
                <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full bg-orange-100 text-orange-800">
                  TOÀN DIỆN
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose EV Care Section */}
        <div className="mb-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Tại sao nên chọn EV Care?</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              EV Care cam kết mang đến dịch vụ chăm sóc xe điện tốt nhất với những ưu điểm vượt trội
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300" style={{ backgroundColor: '#10B981' }}>
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Mạng lưới rộng lớn</h3>
              <p className="text-gray-600 leading-relaxed">Hệ thống cửa hàng trải rộng khắp cả nước, dễ dàng tìm kiếm và kết nối với trung tâm gần nhất</p>
              <div className="mt-6 flex justify-center">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#10B981' }}></div>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#10B981' }}></div>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#10B981' }}></div>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#10B981' }}></div>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#10B981' }}></div>
                </div>
              </div>
            </div>
            <div className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300" style={{ backgroundColor: '#10B981' }}>
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Phụ tùng chính hãng</h3>
              <p className="text-gray-600 leading-relaxed">100% phụ tùng và phụ kiện chính hãng, đảm bảo chất lượng và độ bền cao</p>
              <div className="mt-6">
                <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-green-100 text-green-800">
                  100% CHÍNH HÃNG
                </span>
              </div>
            </div>
            <div className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300" style={{ backgroundColor: '#10B981' }}>
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Dịch vụ chuyên nghiệp</h3>
              <p className="text-gray-600 leading-relaxed">Đội ngũ kỹ thuật viên chuyên nghiệp, nhanh chóng và chính xác trong mọi dịch vụ</p>
              <div className="mt-6">
                <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-800">
                  NHANH CHÓNG
                </span>
              </div>
            </div>
            <div className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300" style={{ backgroundColor: '#10B981' }}>
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Được tin tưởng</h3>
              <p className="text-gray-600 leading-relaxed">Khách hàng đánh giá cao dịch vụ, trở thành địa chỉ sửa chữa - bảo dưỡng đáng tin cậy</p>
              <div className="mt-6 flex justify-center">
                <div className="flex space-x-1">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quote Request Section */}
        <div className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Information */}
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl p-10 overflow-hidden">
              <div className="absolute inset-0 bg-black opacity-20"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mr-4" style={{ backgroundColor: '#10B981' }}>
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h2 className="text-4xl font-bold text-white">EV CARE SERVICE</h2>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center text-white group">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-xl font-bold" style={{ color: '#10B981' }}>1</span>
                    </div>
                    <span className="text-xl font-semibold">DỊCH VỤ TIÊU CHUẨN CAO</span>
                  </div>
                  <div className="flex items-center text-white group">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-xl font-bold" style={{ color: '#10B981' }}>2</span>
                    </div>
                    <span className="text-xl font-semibold">TÌM KIẾM DỄ DÀNG VÀ KẾT NỐI NHANH CHÓNG</span>
                  </div>
                  <div className="flex items-center text-white group">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-xl font-bold" style={{ color: '#10B981' }}>3</span>
                    </div>
                    <span className="text-xl font-semibold">GỬI YÊU CẦU BÁO GIÁ ONLINE</span>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-5 right-5 w-20 h-20 rounded-full opacity-10" style={{ backgroundColor: '#10B981' }}></div>
              <div className="absolute bottom-5 left-5 w-16 h-16 rounded-full opacity-10" style={{ backgroundColor: '#10B981' }}></div>
            </div>

            {/* Right Column - Quote Form */}
            <div className="bg-white rounded-2xl shadow-2xl p-10 border border-gray-100">
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Hãy nhập yêu cầu báo giá</h3>
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <div className="mb-8">
                  <div className="flex items-center mb-3">
                    <div className="w-6 h-6 rounded-full mr-3 flex items-center justify-center" style={{ backgroundColor: '#10B981' }}>
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    </div>
                    <div className="flex-1 h-3 bg-gray-300 rounded-full overflow-hidden">
                      <div className="h-full w-1/3 rounded-full" style={{ backgroundColor: '#10B981' }}></div>
                    </div>
                  </div>
                  <p className="text-lg text-gray-700 font-medium">Bước 1/3: Chọn loại dịch vụ</p>
                </div>
                <div className="space-y-6">
                  <button className="group w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-6 px-8 rounded-xl flex items-center justify-between transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-yellow-400 hover:border-yellow-500">
                    <span className="text-lg">BÁO GIÁ LỐP XE</span>
                    <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <button className="group w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-6 px-8 rounded-xl flex items-center justify-between transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-yellow-400 hover:border-yellow-500">
                    <span className="text-lg">BÁO GIÁ DỊCH VỤ</span>
                    <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-500">
                    Chọn loại dịch vụ bạn cần để nhận báo giá chính xác nhất
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Thao tác nhanh</h2>
            <p className="text-lg text-gray-600">Truy cập nhanh các dịch vụ quan trọng nhất</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <button className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-8 text-left hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: '#10B981' }}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Đặt lịch bảo dưỡng</h3>
              <p className="text-gray-600 leading-relaxed mb-4">Đặt lịch hẹn mới cho xe điện của bạn một cách nhanh chóng và tiện lợi</p>
              <div className="flex items-center text-sm font-semibold" style={{ color: '#10B981' }}>
                <span>Đặt lịch ngay</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
            <button className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-8 text-left hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: '#10B981' }}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Liên hệ hỗ trợ</h3>
              <p className="text-gray-600 leading-relaxed mb-4">Đội ngũ hỗ trợ chuyên nghiệp sẵn sàng giúp đỡ bạn 24/7</p>
              <div className="flex items-center text-sm font-semibold" style={{ color: '#10B981' }}>
                <span>Liên hệ ngay</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
