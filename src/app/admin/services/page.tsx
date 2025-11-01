'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  listServices, 
  createService, 
  updateService, 
  deleteService,
  type ServiceItem 
} from '@/lib/api/admin/services';
import { ArrowLeft, Settings2, PlusCircle, Save, Search, Wrench, Pencil, Trash2, X } from 'lucide-react';
import { ToastContainer, type Toast } from '@/components/ui/Toast';

export default function AdminServicesPage() {
  const router = useRouter();
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    price: '',
    duration: '',
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

  const loadServices = async () => {
    try {
      setLoading(true);
      const data = await listServices();
      setServices(data || []);
      setError('');
    } catch (e: any) {
      setError(e.message || 'Không thể tải danh sách dịch vụ');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const filtered = services.filter(s =>
    (s.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (s.serviceType || s.type || '').toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenForm = (service?: ServiceItem) => {
    if (service) {
      setEditingId(service._id);
      setFormData({
        name: service.name || '',
        type: service.serviceType || service.type || '',
        description: service.description || '',
        price: (service.basePrice || service.price)?.toString() || '',
        duration: service.duration?.toString() || '',
        isActive: service.isActive ?? true,
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        type: '',
        description: '',
        price: '',
        duration: '',
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
      type: '',
      description: '',
      price: '',
      duration: '',
      isActive: true,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Vui lòng nhập tên dịch vụ');
      return;
    }

    setSubmitting(true);
    try {
      // Build payload based on create or update
      const payload: any = {
        name: formData.name.trim(),
      };

      // Only add fields that have values
      if (formData.type.trim()) {
        payload.serviceType = formData.type.trim();
      }
      if (formData.description.trim()) {
        payload.description = formData.description.trim();
      }
      if (formData.price && !isNaN(parseFloat(formData.price))) {
        payload.basePrice = parseFloat(formData.price);
      }
      if (formData.duration && !isNaN(parseInt(formData.duration))) {
        // API expects estimatedDuration in seconds (minutes * 60)
        payload.estimatedDuration = parseInt(formData.duration) * 60;
      }

      if (editingId) {
        // For update, include isActive but NOT duration
        const updatePayload = { ...payload };
        updatePayload.isActive = formData.isActive;
        // Don't include duration in update - API doesn't accept it
        await updateService(editingId, updatePayload);
        handleCloseForm();
        showToast('Cập nhật dịch vụ thành công!', 'success');
      } else {
        // For create, don't include isActive or duration
        await createService(payload);
        handleCloseForm();
        showToast('Thêm dịch vụ thành công!', 'success');
      }
      loadServices();
    } catch (err: any) {
      console.error('Error creating/updating service:', err);
      const errorMessage = err.message || 'Có lỗi xảy ra khi tạo/cập nhật dịch vụ';
      showToast(errorMessage, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa dịch vụ "${name}"?`)) {
      return;
    }

    try {
      await deleteService(id);
      showToast('Xóa dịch vụ thành công!', 'success');
      loadServices();
    } catch (err: any) {
      showToast(err.message || 'Không thể xóa dịch vụ', 'error');
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
            <Settings2 className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-gray-500">Quản lý dịch vụ</span>
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
            placeholder="Tìm theo tên hoặc loại dịch vụ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none text-sm text-gray-700"
          />
        </div>

        {/* List */}
        <div className="bg-white rounded-xl border shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-emerald-600" />
            Danh sách dịch vụ
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 border-b">
                <tr>
                  <th className="text-left py-2 px-3">Mã</th>
                  <th className="text-left py-2 px-3">Tên dịch vụ</th>
                  <th className="text-left py-2 px-3">Loại</th>
                  <th className="text-left py-2 px-3">Giá</th>
                  <th className="text-left py-2 px-3">Thời lượng</th>
                  <th className="text-left py-2 px-3">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr><td colSpan={6} className="py-6 text-center text-gray-600">Đang tải...</td></tr>
                )}
                {error && !loading && (
                  <tr><td colSpan={6} className="py-6 text-center text-red-600">{error}</td></tr>
                )}
                {!loading && !error && filtered.map(s => (
                  <tr key={s._id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-2 px-3 font-medium text-gray-800">{s._id?.slice(-6)}</td>
                    <td className="py-2 px-3">{s.name}</td>
                    <td className="py-2 px-3">{s.serviceType || s.type || '—'}</td>
                    <td className="py-2 px-3">{(s.basePrice || s.price) ? (s.basePrice || s.price)!.toLocaleString('vi-VN') : '—'}</td>
                    <td className="py-2 px-3">{s.duration ? `${s.duration} phút` : '—'}</td>
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleOpenForm(s)}
                          className="p-1.5 rounded-md hover:bg-gray-100 text-gray-600" 
                          title="Sửa"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(s._id, s.name)}
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

        {/* Add Service Button */}
        <div className="flex justify-end">
          <button
            onClick={() => handleOpenForm()}
            className="inline-flex items-center bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition text-sm"
          >
            <PlusCircle className="w-4 h-4 mr-1" />
            Thêm dịch vụ mới
          </button>
        </div>
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-[9999] animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden border border-gray-100 transform transition-all animate-in zoom-in-95 duration-200">
            <div className="sticky top-0 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100 px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center">
                  <Settings2 className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  {editingId ? 'Chỉnh sửa dịch vụ' : 'Thêm dịch vụ mới'}
                </h2>
              </div>
              <button
                onClick={handleCloseForm}
                className="p-2 rounded-lg hover:bg-white/80 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label htmlFor="service-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Tên dịch vụ <span className="text-red-500">*</span>
                </label>
                <input
                  id="service-name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Nhập tên dịch vụ"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="service-type" className="block text-sm font-medium text-gray-700 mb-1">
                    Loại dịch vụ
                  </label>
                  <input
                    id="service-type"
                    name="serviceType"
                    type="text"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Ví dụ: Bảo dưỡng định kì"
                  />
                </div>

                <div>
                  <label htmlFor="service-price" className="block text-sm font-medium text-gray-700 mb-1">
                    Giá (VNĐ)
                  </label>
                  <input
                    id="service-price"
                    name="basePrice"
                    type="number"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Nhập giá"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="service-duration" className="block text-sm font-medium text-gray-700 mb-1">
                    Thời lượng (phút)
                  </label>
                  <input
                    id="service-duration"
                    name="duration"
                    type="number"
                    min="1"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Nhập thời lượng"
                  />
                </div>

                <div>
                  <label htmlFor="service-status" className="block text-sm font-medium text-gray-700 mb-1">
                    Trạng thái
                  </label>
                  <select
                    id="service-status"
                    name="isActive"
                    value={formData.isActive ? 'true' : 'false'}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
                    className="w-full border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="true">Hoạt động</option>
                    <option value="false">Tạm ngưng</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="service-description" className="block text-sm font-medium text-gray-700 mb-1">
                  Mô tả
                </label>
                <textarea
                  id="service-description"
                  name="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Nhập mô tả dịch vụ"
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


