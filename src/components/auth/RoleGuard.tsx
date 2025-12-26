'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: string[];
  redirectTo?: string;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ 
  children, 
  allowedRoles, 
  redirectTo = '/login' 
}) => {
  const { user, loading, mounted, role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!mounted || loading) return;

    // If not authenticated, redirect to login
    if (!user) {
      router.push('/login');
      return;
    }

    // If authenticated but role not allowed, redirect
    if (role && !allowedRoles.map(r => r.toLowerCase()).includes(role)) {
      // Redirect to appropriate dashboard based on user's actual role
      const redirectMap: Record<string, string> = {
        'admin': '/admin/dashboard',
        'staff': '/staff/dashboard', 
        'customer': '/customer/dashboard',
        'technician': '/technician/dashboard',
      };
      
      const userDashboard = redirectMap[role] || '/';
      router.push(userDashboard);
      return;
    }
  }, [user, loading, mounted, role, allowedRoles, router]);

  // Show loading while checking auth
  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    );
  }

  // Show nothing while redirecting
  if (!user || (role && !allowedRoles.map(r => r.toLowerCase()).includes(role))) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang chuyển hướng...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};