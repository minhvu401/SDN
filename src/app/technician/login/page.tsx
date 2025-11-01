"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { Wrench, ArrowLeft } from "lucide-react";
import { Illustration } from "../../../components/ui/Illustration";
import { Footer } from "../../../components/layout/Footer";
import { toast } from "react-hot-toast";
import { loginTechnician } from "../../../lib/api/auth";

export default function TechnicianLoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const trimmedPhone = phone.trim();
      const trimmedPassword = password.trim();

      if (!trimmedPhone || !trimmedPassword) {
        throw new Error("Vui lòng nhập đầy đủ số điện thoại và mật khẩu");
      }

      // 🔧 Gọi API technicians/login
      const data = await loginTechnician({
        phone: trimmedPhone,
        password: trimmedPassword,
      });

      const token = data?.access_token || data?.accessToken;
      const technician = data?.technician || data?.user;

      if (token) localStorage.setItem("accessToken", token);
      if (technician) localStorage.setItem("user", JSON.stringify(technician));

      // ✅ Chuẩn hóa role
      const role = (technician?.role || "").toLowerCase();
      if (role === "technician") {
        toast.success("Đăng nhập kỹ thuật viên thành công!");
        router.push("/technician/dashboard");
      } else {
        throw new Error("Tài khoản này không có quyền kỹ thuật viên");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Đăng nhập thất bại";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col relative">
      {/* 🌿 Nút quay lại */}
      <button
        onClick={() => router.push("/login")}
        className="absolute top-5 left-5 z-20 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500 text-emerald-400 bg-gray-800/40 backdrop-blur-sm hover:bg-emerald-500 hover:text-white transition-all duration-200 shadow-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Quay lại đăng nhập khách hàng</span>
      </button>

      {/* Nội dung chính */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl min-h-[550px] flex overflow-hidden">
          {/* Bên trái - form */}
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="w-full max-w-md">
              {/* Tiêu đề */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                    <Wrench className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 font-display tracking-tight">
                  Đăng nhập kỹ thuật viên
                </h1>
                <p className="text-gray-500 mt-1">EV Care Technician Portal</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="tel"
                  placeholder="Nhập số điện thoại"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  icon={
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5h2l3 7-1.5 3a11 11 0 006 6L17 19l7 3-3-7-3.5-2a11 11 0 00-7-7L8 2 5 3z"
                      />
                    </svg>
                  }
                />

                <Input
                  type="password"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  }
                />

                {error && <p className="text-sm text-red-600">{error}</p>}

                <Button
                  type="submit"
                  className="w-full text-lg font-medium"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? "Đang đăng nhập..." : "Đăng nhập kỹ thuật viên"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Quên mật khẩu?{" "}
                  <a href="#" className="text-emerald-600 hover:underline">
                    Liên hệ quản trị viên
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Bên phải - ảnh minh họa */}
          <div className="flex-1 bg-gray-50 rounded-r-lg flex items-center justify-center p-8">
            <Illustration />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
