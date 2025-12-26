'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export interface User {
  _id: string;
  email: string;
  fullName: string;
  phone: string;
  role: string;
  username: string;
  isActive: boolean;
  vehicles?: any[];
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
      const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
      
      if (userStr && token) {
        const userData = JSON.parse(userStr);
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = () => {
    try {
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
    } catch (error) {
      console.error('Error during logout:', error);
    }
    setUser(null);
    window.location.href = '/';
  };

  return {
    user,
    loading,
    mounted,
    logout,
    isAuthenticated: !!user,
    role: user?.role?.toLowerCase() || null,
  };
};