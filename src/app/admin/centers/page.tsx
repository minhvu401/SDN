'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  listCenters,
  createCenter,
  updateCenter,
  deleteCenter,
  type CenterItem,
} from '@/lib/api/admin/centers';
import { ArrowLeft, Building2, PlusCircle, Save, Search, Pencil, Trash2, X } from 'lucide-react';
import { ToastContainer, type Toast } from '@/components/ui/Toast';

export default function AdminCentersPage() {
  const router = useRouter();
  const [centers, setCenters] = useState<CenterItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    manager: '',
    openingHours: '',
    description: '',
    isActive: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: Toast['type'] = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const loadCenters = async () => {
    try {
      setLoading(true);
      const data = await listCenters();
      setCenters(data || []);
      setError('');
    } catch (e: any) {
      setError(e.message || 'Không thể tải danh sách trung tâm');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCenters();
  }, []);

  const filtered = centers.filter(
    (c) =>
      (c.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (c.address || '').toLowerCase().includes(search.toLowerCase()) ||
      (c.phone || '').includes(search)
  );

  const handleOpenForm = (center?: CenterItem) => {
    if (center) {
      setEditingId(center._id);
      setFormData({
        name: center.name || '',
        address: center.address || '',
        phone: center.phone || '',
        email: center.email || '',
        manager: center.manager || '',
        openingHours: center.openingHours || '',
        description: center.description || '',
        isActive: center.isActive ?? true,
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        address: '',
        phone: '',
        email: '',
        manager: '',
        openingHours: '',
        description: '',
        isActive: true,
      });
    }
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormData({
      name: '',
      address: '',
      phone: '',
      email: '',
      manager: '',
      openingHours: '',
      description: '',
      isActive: true,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Vui lòng nhập tên trung tâm');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name: formData.name.trim(),
        address: formData.address.trim() || undefined,
        phone: formData.phone.trim() || undefined,
        email: formData.email.trim() || undefined,
        manager: formData.manager.trim() || undefined,
        openingHours: formData.openingHours.trim() || undefined,
        description: formData.description.trim() || undefined,
        ...(editingId ? { isActive: formData.isActive } : {}),
      };

      if (editingId) {
        await updateCenter(editingId, payload);
        handleCloseForm();
        showToast('Cập nhật trung tâm thành công!', 'success');
      } else {
        await createCenter(payload);
        handleCloseForm();
        showToast('Thêm trung tâm thành công!', 'success');
      }
      loadCenters();
    } catch (err: any) {
      showToast(err.message || 'Có lỗi xảy ra', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa trung tâm "${name}"?`)) {
      return;
    }

    try {
      await deleteCenter(id);
      showToast('Xóa trung tâm thành công!', 'success');
      loadCenters();
    } catch (err: any) {
      showToast(err.message || 'Không thể xóa trung tâm', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 max-w-6xl flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="flex items-center text-emerald-700 hover:text-emerald-800 transition"
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              <span className="text-sm font-medium">Trang quản trị</span>
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3 bg-emerald-600">
                <svg
                  className="w-5 h-5 text-white"
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
                <h1 className="text-lg font-bold text-gray-900">EV Care</h1>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-gray-500">Quản lý trung tâm</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-6 max-w-6xl flex flex-col gap-6">
        {/* Search */}
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-3">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Tìm theo tên, địa chỉ hoặc số điện thoại..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none text-sm text-gray-700"
          />
        </div>

        {/* List */}
        <div className="bg-white rounded-xl border shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-600" />
            Danh sách trung tâm
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 border-b">
                <tr>
                  <th className="text-left py-2 px-3">Mã</th>
                  <th className="text-left py-2 px-3">Tên trung tâm</th>
                  <th className="text-left py-2 px-3">Địa chỉ</th>
                  <th className="text-left py-2 px-3">Số điện thoại</th>
                  <th className="text-left py-2 px-3">Trạng thái</th>
                  <th className="text-left py-2 px-3">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-gray-600">
                      Đang tải...
                    </td>
                  </tr>
                )}
                {error && !loading && (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-red-600">
                      {error}
                    </td>
                  </tr>
                )}
                {!loading &&
                  !error &&
                  filtered.map((c) => (
                    <tr key={c._id} className="border-b hover:bg-gray-50 transition">
                      <td className="py-2 px-3 font-medium text-gray-800">
                        {c._id?.slice(-6)}
                      </td>
                      <td className="py-2 px-3">{c.name}</td>
                      <td className="py-2 px-3">{c.address || '—'}</td>
                      <td className="py-2 px-3">{c.phone || '—'}</td>
                      <td className="py-2 px-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            c.isActive
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {c.isActive ? 'Hoạt động' : 'Tạm ngưng'}
                        </span>
                      </td>
                      <td className="py-2 px-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleOpenForm(c)}
                            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-600"
                            title="Sửa"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(c._id, c.name)}
                            className="p-1.5 rounded-md hover:bg-gray-100 text-red-500"
                            title="Xóa"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Center Button */}
        <div className="flex justify-end">
          <button
            onClick={() => handleOpenForm()}
            className="inline-flex items-center bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition text-sm"
          >
            <PlusCircle className="w-4 h-4 mr-1" />
            Thêm trung tâm mới
          </button>
        </div>
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-[9999]">
          <div className="bg-white/95 rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-gray-200">
            <div className="sticky top-0 bg-white/90 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                {editingId ? 'Chỉnh sửa trung tâm' : 'Thêm trung tâm mới'}
              </h2>
              <button
                onClick={handleCloseForm}
                className="p-1 rounded-md hover:bg-gray-100 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label htmlFor="center-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Tên trung tâm <span className="text-red-500">*</span>
                </label>
                <input
                  id="center-name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Nhập tên trung tâm"
                />
              </div>

              <div>
                <label htmlFor="center-address" className="block text-sm font-medium text-gray-700 mb-1">
                  Địa chỉ
                </label>
                <textarea
                  id="center-address"
                  name="address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  rows={2}
                  className="w-full border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Nhập địa chỉ trung tâm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="center-phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại
                  </label>
                  <input
                    id="center-phone"
                    name="phone"
                    type="text"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Nhập số điện thoại"
                  />
                </div>

                <div>
                  <label htmlFor="center-email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    id="center-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Nhập email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="center-manager" className="block text-sm font-medium text-gray-700 mb-1">
                    Quản lý
                  </label>
                  <input
                    id="center-manager"
                    name="manager"
                    type="text"
                    value={formData.manager}
                    onChange={(e) =>
                      setFormData({ ...formData, manager: e.target.value })
                    }
                    className="w-full border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Tên quản lý"
                  />
                </div>

                <div>
                  <label htmlFor="center-opening-hours" className="block text-sm font-medium text-gray-700 mb-1">
                    Giờ mở cửa
                  </label>
                  <input
                    id="center-opening-hours"
                    name="openingHours"
                    type="text"
                    value={formData.openingHours}
                    onChange={(e) =>
                      setFormData({ ...formData, openingHours: e.target.value })
                    }
                    className="w-full border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Ví dụ: 8:00 - 17:00"
                  />
                </div>
              </div>

              {editingId && (
                <div>
                  <label htmlFor="center-status" className="block text-sm font-medium text-gray-700 mb-1">
                    Trạng thái
                  </label>
                  <select
                    id="center-status"
                    name="isActive"
                    value={formData.isActive ? 'true' : 'false'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        isActive: e.target.value === 'true',
                      })
                    }
                    className="w-full border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="true">Hoạt động</option>
                    <option value="false">Tạm ngưng</option>
                  </select>
                </div>
              )}

              <div>
                <label htmlFor="center-description" className="block text-sm font-medium text-gray-700 mb-1">
                  Mô tả
                </label>
                <textarea
                  id="center-description"
                  name="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Nhập mô tả trung tâm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                  disabled={submitting}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition disabled:opacity-50"
                >
                  {submitting ? (
                    'Đang xử lý...'
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-1" />
                      {editingId ? 'Cập nhật' : 'Thêm mới'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}

