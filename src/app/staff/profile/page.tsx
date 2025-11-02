"use client";

import React, { useEffect, useState } from "react";
import {
  getMyProfile,
  updateMyProfile,
  changeMyPassword,
  StaffProfile,
  StaffDetail,
} from "@/lib/api/staff/profile";
import { getIdFromAccessToken } from "@/lib/api/client";

export default function StaffProfilePage() {
  const [profile, setProfile] = useState<StaffProfile | StaffDetail | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // form state
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  // password form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        // Prefer extracting id from the stored access token and fetching /staff/{id}
        const id = getIdFromAccessToken();
        let data: StaffProfile | StaffDetail;

        if (id) {
          data = await getMyProfile(id);
        } else {
          data = await getMyProfile();
        }

        if (!mounted) return;
        setProfile(data as any);
        // both StaffProfile and StaffDetail expose email/fullName/phone
        setEmail((data as any).email ?? "");
        setFullName((data as any).fullName ?? "");
        setPhone((data as any).phone ?? "");
      } catch (err: any) {
        setError(err?.message || "Không thể tải thông tin hồ sơ");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const updated = await updateMyProfile({ email, fullName, phone });
      setProfile(updated);
      setSuccess("Cập nhật hồ sơ thành công");
    } catch (err: any) {
      setError(err?.message || "Cập nhật thất bại");
    } finally {
      setSaving(false);
    }
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setPasswordSaving(true);
    setError(null);
    setSuccess(null);
    if (!currentPassword || !newPassword) {
      setError("Vui lòng nhập mật khẩu hiện tại và mật khẩu mới");
      setPasswordSaving(false);
      return;
    }

    try {
      await changeMyPassword({ currentPassword, newPassword });
      setCurrentPassword("");
      setNewPassword("");
      setSuccess("Mật khẩu đã được thay đổi");
    } catch (err: any) {
      setError(err?.message || "Thay đổi mật khẩu thất bại");
    } finally {
      setPasswordSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6 max-w-3xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Hồ sơ nhân viên
        </h1>

        {loading ? (
          <div className="p-6 bg-white rounded-lg border border-gray-200">
            Đang tải...
          </div>
        ) : (
          <>
            <form
              onSubmit={handleSave}
              className="bg-white rounded-lg border border-gray-200 p-6 mb-6"
            >
              {error && (
                <div className="text-sm text-red-600 mb-4">{error}</div>
              )}
              {success && (
                <div className="text-sm text-emerald-700 mb-4">{success}</div>
              )}

              <div className="grid grid-cols-1 gap-4">
                <label className="block">
                  <div className="text-sm text-gray-700 mb-1">Họ và tên</div>
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    placeholder="Nguyễn Văn A"
                    required
                  />
                </label>

                <label className="block">
                  <div className="text-sm text-gray-700 mb-1">Email</div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    placeholder="you@example.com"
                    required
                  />
                </label>

                <label className="block">
                  <div className="text-sm text-gray-700 mb-1">
                    Số điện thoại
                  </div>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    placeholder="0912xxxxxx"
                  />
                </label>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-60"
                >
                  {saving ? "Đang lưu..." : "Lưu thay đổi"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    // revert to last saved
                    if (profile) {
                      setEmail(profile.email ?? "");
                      setFullName(profile.fullName ?? "");
                      setPhone(profile.phone ?? "");
                      setError(null);
                      setSuccess(null);
                    }
                  }}
                  className="px-4 py-2 border rounded-lg"
                >
                  Hủy
                </button>
              </div>
            </form>

            <form
              onSubmit={handleChangePassword}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <h2 className="text-lg font-semibold mb-4">Đổi mật khẩu</h2>
              <div className="grid grid-cols-1 gap-4">
                <label className="block">
                  <div className="text-sm text-gray-700 mb-1">
                    Mật khẩu hiện tại
                  </div>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    placeholder="Mật khẩu hiện tại"
                    required
                  />
                </label>

                <label className="block">
                  <div className="text-sm text-gray-700 mb-1">Mật khẩu mới</div>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    placeholder="Mật khẩu mới"
                    minLength={6}
                    required
                  />
                </label>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={passwordSaving}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-60"
                >
                  {passwordSaving ? "Đang lưu..." : "Đổi mật khẩu"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
