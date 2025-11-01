'use client';

import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { login as loginApi } from '../../lib/api/auth';

export const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const trimmedUsername = username.trim();
      const trimmedPassword = password.trim();
      if (!trimmedUsername || !trimmedPassword) {
        throw new Error('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu');
      }

      const data = await loginApi({ username: trimmedUsername, password: trimmedPassword });
      const token = data?.access_token || data?.accessToken;
      const user = data?.user;
      if (token) {
        localStorage.setItem('accessToken', token);
      }
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }

      // Điều hướng theo role
      const role = (user?.role || '').toLowerCase();
      let redirect = '/';
      if (role === 'admin') redirect = '/admin/dashboard';
      else if (role === 'staff') redirect = '/staff/dashboard';
      else if (role === 'customer') redirect = '/customer/dashboard';
      window.location.href = redirect;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Đăng nhập thất bại';
      const lower = message.toLowerCase();
      if (lower.includes('401') || lower.includes('invalid') || lower.includes('không chính xác')) {
        setError('Username hoặc mật khẩu không chính xác');
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    console.log('Google login attempt');
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2 font-display tracking-tight">Đăng nhập</h1>
        <p className="text-gray-600 text-lg">Chào mừng bạn trở lại</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A4 4 0 017 17h10a4 4 0 011.879.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
        />

        <div className="relative w-full">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
            aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.29 3.29m13.42 13.42L21 21M12 12v.01" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>

        <div className="text-right">
          <a href="#" className="text-sm hover:opacity-80" style={{ color: '#10B981' }}>
            Quên mật khẩu?
          </a>
        </div>

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        <Button type="submit" className="w-full text-lg font-medium" size="lg" disabled={loading}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </Button>

        <button
          type="button"
          onClick={() => { window.location.href = '/'; }}
          className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition"
        >
         Back to Home
        </button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">hoặc</span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full mt-4 text-base font-medium"
          onClick={handleGoogleLogin}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Đăng nhập với Google
        </Button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-600 text-base">
          Chưa có tài khoản?{' '}
          <a href="#" className="font-semibold hover:opacity-80" style={{ color: '#10B981' }}>
            Đăng ký ngay
          </a>
        </p>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500 leading-relaxed">
          Bằng việc đăng nhập, bạn đồng ý với{' '}
          <a href="#" className="hover:opacity-80 font-medium" style={{ color: '#10B981' }}>Điều khoản sử dụng</a>
          {' '}&{' '}
          <a href="#" className="hover:opacity-80 font-medium" style={{ color: '#10B981' }}>Chính sách bảo mật</a>
        </p>
      </div>
    </div>
  );
};
