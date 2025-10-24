import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <>

      {/* Main Navigation Header */}
      <header className="bg-white shadow-sm border-b" style={{ borderBottomColor: '#10B981' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-4" style={{ backgroundColor: '#10B981' }}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 font-display tracking-tight">EV Care</h1>
                <p className="text-sm text-gray-500 leading-relaxed">Hệ thống quản lý bảo dưỡng xe điện</p>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-600 hover:text-gray-900 font-medium transition-colors" style={{ color: '#10B981' }}>Trang chủ</a>
              <a href="/services" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Dịch vụ</a>
              <a href="/booking" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Đặt lịch</a>
              <a href="/contact" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Liên hệ</a>
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {/* Notification Bell */}
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.828 7l2.586 2.586a2 2 0 002.828 0L12.828 7H4.828zM4.828 17h8l-2.586-2.586a2 2 0 00-2.828 0L4.828 17z" />
                </svg>
              </button>

              {/* User Profile */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">U</span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
