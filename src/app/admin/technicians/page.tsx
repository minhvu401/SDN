'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  UserCog,
  Search,
  CheckCircle2,
  XCircle,
  Pencil,
  Trash2,
  Save,
  X,
  PlusCircle,
  Wrench,
} from 'lucide-react';
import {
  listTechnicians,
  createTechnician,
  updateTechnician,
  deleteTechnician,
  getTechSpecializations,
  type TechnicianItem,
} from '@/lib/api/admin/technicians';
import { ToastContainer, type Toast } from '@/components/ui/Toast';

export default function AdminTechniciansPage() {
  const router = useRouter();
  const [technicians, setTechnicians] = useState<TechnicianItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [specializations, setSpecializations] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    password: '',
    role: 'TECHNICIAN',
    specializations: [] as string[],
    joinDate: '',
    bio: '',
    yearsOfExperience: '',
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

  const loadTechnicians = async () => {
    try {
      setLoading(true);
      const data = await listTechnicians();
      if (Array.isArray(data)) {
        setTechnicians(data);
      } else if (data && typeof data === 'object' && 'data' in data && Array.isArray((data as any).data)) {
        setTechnicians((data as any).data);
      } else {
        setTechnicians([]);
      }
      setError('');
    } catch (e: any) {
      setError(e.message || 'Không thể tải danh sách kỹ thuật viên');
      setTechnicians([]);
    } finally {
      setLoading(false);
    }
  };

  const loadSpecializations = async () => {
    try {
      const specs = await getTechSpecializations();
      setSpecializations(specs);
    } catch (e) {
      console.error('Failed to load specializations:', e);
    }
  };

  useEffect(() => {
    loadTechnicians();
    loadSpecializations();
  }, []);

  const handleOpenForm = (tech?: TechnicianItem) => {
    if (tech) {
      setEditingId(tech._id);
      setFormData({
        fullName: tech.fullName || tech.name || '',
        phone: tech.phone || '',
        password: '', // Don't show password when editing
        role: tech.role || 'TECHNICIAN',
        specializations: tech.specializations || [],
        joinDate: tech.joinDate || '',
        bio: tech.bio || '',
        yearsOfExperience: tech.yearsOfExperience?.toString() || '',
        isActive: tech.isActive ?? true,
      });
    } else {
      setEditingId(null);
      setFormData({
        fullName: '',
        phone: '',
        password: '',
        role: 'TECHNICIAN',
        specializations: [],
        joinDate: '',
        bio: '',
        yearsOfExperience: '',
        isActive: true,
      });
    }
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormData({
      fullName: '',
      phone: '',
      password: '',
      role: 'TECHNICIAN',
      specializations: [],
      joinDate: '',
      bio: '',
      yearsOfExperience: '',
      isActive: true,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      showToast('Vui lòng nhập đầy đủ thông tin bắt buộc', 'error');
      return;
    }

    if (!editingId && !formData.password.trim()) {
      showToast('Vui lòng nhập mật khẩu', 'error');
      return;
    }

    setSubmitting(true);
    try {
      if (editingId) {
        // Update
        const updatePayload: any = {
          fullName: formData.fullName.trim(),
          phone: formData.phone.trim(),
        };

        if (formData.role) updatePayload.role = formData.role;
        if (formData.specializations.length > 0) updatePayload.specializations = formData.specializations;
        if (formData.joinDate.trim()) updatePayload.joinDate = formData.joinDate.trim();
        if (formData.bio.trim()) updatePayload.bio = formData.bio.trim();
        if (formData.yearsOfExperience.trim() && !isNaN(parseInt(formData.yearsOfExperience, 10))) {
          updatePayload.yearsOfExperience = parseInt(formData.yearsOfExperience, 10);
        }
        updatePayload.isActive = formData.isActive;

        await updateTechnician(editingId, updatePayload);
        handleCloseForm();
        showToast('Cập nhật kỹ thuật viên thành công!', 'success');
        await loadTechnicians();
      } else {
        // Create
        const createPayload = {
          fullName: formData.fullName.trim(),
          phone: formData.phone.trim(),
          password: formData.password,
          role: formData.role || 'TECHNICIAN',
          specializations: formData.specializations,
          joinDate: formData.joinDate.trim() || undefined,
          bio: formData.bio.trim() || undefined,
          yearsOfExperience: formData.yearsOfExperience.trim() && !isNaN(parseInt(formData.yearsOfExperience, 10))
            ? parseInt(formData.yearsOfExperience, 10)
            : undefined,
        };

        await createTechnician(createPayload);
        handleCloseForm();
        showToast('Thêm kỹ thuật viên thành công!', 'success');
        await loadTechnicians();
      }
    } catch (err: any) {
      console.error('Error in handleSubmit:', err);
      const errorMessage = err?.message || 'Có lỗi xảy ra khi lưu kỹ thuật viên';
      showToast(errorMessage, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa kỹ thuật viên "${name}"?`)) {
      return;
    }

    try {
      await deleteTechnician(id);
      showToast('Xóa kỹ thuật viên thành công!', 'success');
      await loadTechnicians();
    } catch (err: any) {
      showToast(err.message || 'Không thể xóa kỹ thuật viên', 'error');
    }
  };

  const toggleSpecialization = (spec: string) => {
    setFormData((prev) => ({
      ...prev,
      specializations: prev.specializations.includes(spec)
        ? prev.specializations.filter((s) => s !== spec)
        : [...prev.specializations, spec],
    }));
  };

  const filtered = technicians.filter((t) => {
    const name = (t.fullName || t.name || '').toLowerCase();
    const phone = (t.phone || '').toLowerCase();
    const searchLower = search.toLowerCase();
    return (
      name.includes(searchLower) ||
      phone.includes(searchLower) ||
      (t.specializations || []).some((spec) => spec.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
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
            <UserCog className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-gray-500">Quản lý kỹ thuật viên</span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-6 py-6 max-w-6xl flex flex-col gap-6">
        {/* Search Bar */}
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, số điện thoại hoặc chuyên môn..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border shadow-sm p-5">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 border-b">
                <tr>
                  <th className="text-left py-2 px-3">Tên</th>
                  <th className="text-left py-2 px-3">Số điện thoại</th>
                  <th className="text-left py-2 px-3">Chuyên môn</th>
                  <th className="text-left py-2 px-3">Kinh nghiệm</th>
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
                {!loading && !error && filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-gray-500">
                      Chưa có kỹ thuật viên nào
                    </td>
                  </tr>
                )}
                {!loading && !error && filtered.map((tech) => {
                  const displayName = tech.fullName || tech.name || 'N/A';
                  return (
                    <tr key={tech._id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="py-2 px-3 font-medium text-gray-800">{displayName}</td>
                      <td className="py-2 px-3">{tech.phone || '—'}</td>
                      <td className="py-2 px-3">
                        {tech.specializations && tech.specializations.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {tech.specializations.slice(0, 2).map((spec, idx) => (
                              <span key={idx} className="inline-flex items-center px-2 py-1 rounded-md bg-blue-100 text-blue-800 text-xs">
                                {spec}
                              </span>
                            ))}
                            {tech.specializations.length > 2 && (
                              <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-800 text-xs">
                                +{tech.specializations.length - 2}
                              </span>
                            )}
                          </div>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td className="py-2 px-3">
                        {tech.yearsOfExperience ? `${tech.yearsOfExperience} năm` : '—'}
                      </td>
                      <td className="py-2 px-3">
                        {tech.isActive ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle2 className="w-3 h-3" />
                            Hoạt động
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <XCircle className="w-3 h-3" />
                            Không hoạt động
                          </span>
                        )}
                      </td>
                      <td className="py-2 px-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleOpenForm(tech)}
                            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-600"
                            title="Sửa"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(tech._id, displayName)}
                            className="p-1.5 rounded-md hover:bg-gray-100 text-red-500"
                            title="Xóa"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Button */}
        <div className="flex justify-end">
          <button
            onClick={() => handleOpenForm()}
            className="inline-flex items-center bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition text-sm"
          >
            <PlusCircle className="w-4 h-4 mr-1" />
            Thêm kỹ thuật viên mới
          </button>
        </div>
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-[9999] animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-hidden border border-gray-100 transform transition-all animate-in zoom-in-95 duration-200">
            <div className="sticky top-0 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100 px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  {editingId ? 'Chỉnh sửa kỹ thuật viên' : 'Thêm kỹ thuật viên mới'}
                </h2>
              </div>
              <button
                onClick={handleCloseForm}
                className="p-2 rounded-lg hover:bg-white/80 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="tech-fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="tech-fullName"
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                    placeholder="Nhập họ và tên"
                  />
                </div>
                <div>
                  <label htmlFor="tech-phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="tech-phone"
                    name="phone"
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                    placeholder="Nhập số điện thoại"
                  />
                </div>
              </div>

              {!editingId && (
                <div>
                  <label htmlFor="tech-password" className="block text-sm font-medium text-gray-700 mb-1">
                    Mật khẩu <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="tech-password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                    placeholder="Nhập mật khẩu"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="tech-joinDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Ngày tham gia
                  </label>
                  <input
                    id="tech-joinDate"
                    name="joinDate"
                    type="date"
                    value={formData.joinDate}
                    onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                  />
                </div>
                <div>
                  <label htmlFor="tech-yearsOfExperience" className="block text-sm font-medium text-gray-700 mb-1">
                    Số năm kinh nghiệm
                  </label>
                  <input
                    id="tech-yearsOfExperience"
                    name="yearsOfExperience"
                    type="number"
                    min="0"
                    value={formData.yearsOfExperience}
                    onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                    placeholder="Nhập số năm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chuyên môn
                </label>
                <div className="flex flex-wrap gap-2 p-3 border rounded-lg bg-gray-50 min-h-[80px]">
                  {specializations.length === 0 ? (
                    <span className="text-sm text-gray-500">Đang tải danh sách chuyên môn...</span>
                  ) : (
                    specializations.map((spec) => (
                      <button
                        key={spec}
                        type="button"
                        onClick={() => toggleSpecialization(spec)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                          formData.specializations.includes(spec)
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white text-gray-700 border border-gray-300 hover:border-emerald-500'
                        }`}
                      >
                        {spec}
                      </button>
                    ))
                  )}
                </div>
                {formData.specializations.length > 0 && (
                  <p className="mt-1 text-xs text-gray-500">
                    Đã chọn: {formData.specializations.join(', ')}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="tech-bio" className="block text-sm font-medium text-gray-700 mb-1">
                  Giới thiệu
                </label>
                <textarea
                  id="tech-bio"
                  name="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={3}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                  placeholder="Nhập giới thiệu về kỹ thuật viên"
                />
              </div>

              {editingId && (
                <div>
                  <label htmlFor="tech-status" className="block text-sm font-medium text-gray-700 mb-1">
                    Trạng thái
                  </label>
                  <select
                    id="tech-status"
                    name="isActive"
                    value={formData.isActive ? 'true' : 'false'}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                  >
                    <option value="true">Hoạt động</option>
                    <option value="false">Tạm ngưng</option>
                  </select>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium"
                  disabled={submitting}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center bg-emerald-600 text-white px-5 py-2.5 rounded-lg hover:bg-emerald-700 transition disabled:opacity-50 font-medium shadow-sm"
                >
                  {submitting ? (
                    'Đang xử lý...'
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
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
