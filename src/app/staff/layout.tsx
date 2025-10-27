'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Calendar,
  ClipboardCheck,
  MessageSquare,
  BarChart3,
  Menu,
  X,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Wrench,
  Car,
  UserCheck,
  DollarSign,
  Package,
  Activity,
  AlertTriangle,
} from 'lucide-react';

const staffNavigation = [
  { name: 'Bảng điều khiển', href: '/staff/dashboard', icon: LayoutDashboard },
  { name: 'Khách hàng', href: '/staff/customers', icon: Users },
  { name: 'Yêu cầu', href: '/staff/requests', icon: ClipboardList },
  { name: 'Lịch làm việc', href: '/staff/schedule', icon: Calendar },
  { name: 'Phiếu dịch vụ', href: '/staff/service-orders', icon: ClipboardCheck },
  { name: 'Theo dõi xe', href: '/staff/vehicle-tracking', icon: Car },
  { name: 'Phụ tùng', href: '/staff/parts', icon: Package },
  { name: 'Kỹ thuật viên', href: '/staff/technicians', icon: UserCheck },
  { name: 'Tài chính', href: '/staff/finance', icon: DollarSign },
  { name: 'Hiệu suất', href: '/staff/performance', icon: Activity },
  { name: 'Chat hỗ trợ', href: '/staff/chat', icon: MessageSquare },
  { name: 'Báo cáo', href: '/staff/reports', icon: BarChart3 },
];

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleLogout = () => {
    // Implement logout logic
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <button
        onClick={toggleMobileSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile sidebar */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={toggleMobileSidebar} />
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-emerald-700">EV Care Staff</h2>
              <button
                onClick={toggleMobileSidebar}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                {staffNavigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`
                          flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors
                          ${isActive
                            ? 'bg-emerald-100 text-emerald-700 border-r-2 border-emerald-600'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                          }
                        `}
                        onClick={toggleMobileSidebar}
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="p-4 border-t">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <LogOut className="w-5 h-5 mr-3" />
                <span>Đăng xuất</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className={`hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col transition-all duration-300 ${isCollapsed ? 'lg:w-16' : 'lg:w-64'}`}>
        <div className="flex flex-col flex-grow bg-white shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            {!isCollapsed && (
              <h2 className="text-lg font-semibold text-emerald-700">EV Care Staff</h2>
            )}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {staffNavigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`
                        flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors
                        ${isActive
                          ? 'bg-emerald-100 text-emerald-700 border-r-2 border-emerald-600'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }
                      `}
                    >
                      <Icon className={`w-5 h-5 ${isCollapsed ? 'mx-auto' : 'mr-3'}`} />
                      {!isCollapsed && <span>{item.name}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className={`
                flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors
              `}
            >
              <LogOut className={`w-5 h-5 ${isCollapsed ? 'mx-auto' : 'mr-3'}`} />
              {!isCollapsed && <span>Đăng xuất</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className={`lg:ml-64 transition-all duration-300 ${isCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
