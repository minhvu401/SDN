'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, User as UserIcon, LogOut, LogIn, UserPlus, Settings, KeyRound, Bell, Shield, HelpCircle } from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<any | null>(null);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
      setUser(raw ? JSON.parse(raw) : null);
    } catch {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
    } catch {}
    window.location.href = '/';
  };

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const navItems = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Dịch vụ', path: '/services' },
    { name: 'Đặt lịch', path: '/booking' },
    { name: 'Liên hệ', path: '/contact' },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-emerald-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center mr-4"
              style={{ backgroundColor: '#10B981' }}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 font-display tracking-tight">
                EV Care
              </h1>
              <p className="text-sm text-gray-500 leading-relaxed">
                Hệ thống quản lý bảo dưỡng xe điện
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`font-medium transition-colors ${
                  pathname === item.path
                    ? 'text-emerald-600 font-semibold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4 relative" ref={menuRef}>
            {mounted && user ? (
              <>
                <button
                  onClick={() => setOpen((v) => !v)}
                  className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  aria-label="Mở menu hồ sơ"
                >
                  <UserIcon className="w-5 h-5" />
                </button>

                {open && (
                  <div className="absolute right-0 top-12 w-72 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
                    {/* Header */}
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                          {(user.fullName || user.username || 'U').slice(0,1).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{user.fullName || user.username}</p>
                          <p className="text-xs text-gray-500 capitalize">{(user.role || '').toLowerCase() || 'user'}</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu */}
                    <div className="p-2">
                      <Link href="/customer/profile" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-700">
                        <UserIcon className="w-4 h-4 text-emerald-600" />
                        <span>Thông tin cá nhân</span>
                      </Link>
                      <Link href="/customer/profile" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-700">
                        <Settings className="w-4 h-4 text-emerald-600" />
                        <span>Cài đặt</span>
                      </Link>
                      <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-700">
                        <KeyRound className="w-4 h-4 text-emerald-600" />
                        <span>Đổi mật khẩu</span>
                      </Link>
                      <Link href="/customer/notifications" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-700">
                        <Bell className="w-4 h-4 text-emerald-600" />
                        <span>Thông báo</span>
                      </Link>
                      <Link href="/customer/profile" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-700">
                        <Shield className="w-4 h-4 text-emerald-600" />
                        <span>Bảo mật</span>
                      </Link>
                      <Link href="/customer/support" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-700">
                        <HelpCircle className="w-4 h-4 text-emerald-600" />
                        <span>Trợ giúp</span>
                      </Link>
                    </div>

                    <div className="px-2 pb-3">
                      <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50">
                        <LogOut className="w-4 h-4" />
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 inline-flex items-center gap-2"
                  aria-label="Đăng nhập"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Đăng nhập</span>
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 inline-flex items-center gap-2"
                  aria-label="Đăng ký"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Đăng ký</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
