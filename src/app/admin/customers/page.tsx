'use client';
import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  User,
  Car,
  Mail,
  Phone,
  FilePlus2,
  Trash2,
  Pencil,
  Save,
  Search,
  X,
  Plus,
  Minus,
  PlusCircle,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  listCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  deleteCustomerVehicle,
  type CustomerItem,
  type CreateCustomerDto,
} from '@/lib/api/admin/customers';
import { ALLOWED_CAR_MODELS } from '@/lib/api/auth';
import { ToastContainer, type Toast } from '@/components/ui/Toast';

export default function AdminCustomersPage() {
  const router = useRouter();

  const [customers, setCustomers] = useState<CustomerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
    phone: '',
    address: '',
    note: '',
    vehicles: [{ carModel: '', licensePlate: '' }],
  });
  const [submitting, setSubmitting] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [initialVehicles, setInitialVehicles] = useState<Array<{ carModel: string; licensePlate: string }>>([]);

  const showToast = (message: string, type: Toast['type'] = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const res = await listCustomers();
      setCustomers(res.data || []);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Không thể tải danh sách khách hàng');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleOpenForm = (customer?: CustomerItem) => {
    if (customer) {
      setEditingId(customer._id);
      const initialVehiclesList = customer.vehicles?.length
        ? customer.vehicles.map((v) => ({
            carModel: v.carModel || '',
            licensePlate: v.licensePlate || '',
          }))
        : [];
      setInitialVehicles(initialVehiclesList);
      setFormData({
        username: customer.username || '',
        email: customer.email || '',
        password: '',
        fullName: customer.fullName || '',
        phone: customer.phone || '',
        address: customer.address || '',
        note: customer.note || '',
        vehicles: initialVehiclesList.length > 0 
          ? initialVehiclesList 
          : [{ carModel: '', licensePlate: '' }],
      });
    } else {
      setEditingId(null);
      setInitialVehicles([]);
      setFormData({
        username: '',
        email: '',
        password: '',
        fullName: '',
        phone: '',
        address: '',
        note: '',
        vehicles: [{ carModel: '', licensePlate: '' }],
      });
    }
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setInitialVehicles([]);
    setFormData({
      username: '',
      email: '',
      password: '',
      fullName: '',
      phone: '',
      address: '',
      note: '',
      vehicles: [{ carModel: '', licensePlate: '' }],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      alert('Vui lòng nhập họ tên và số điện thoại');
      return;
    }
    if (!editingId && (!formData.username.trim() || !formData.password.trim())) {
      alert('Vui lòng nhập username và password');
      return;
    }

    // Lọc và loại bỏ trùng lặp xe
    const validVehicles = formData.vehicles
      .filter((v) => v.carModel?.trim() && v.licensePlate?.trim())
      .map((v) => ({
        carModel: v.carModel.trim(),
        licensePlate: v.licensePlate.trim(),
      }));

    // Loại bỏ trùng lặp: chỉ giữ lại xe đầu tiên nếu có nhiều xe giống nhau
    const uniqueVehicles = validVehicles.filter((v, index, self) => {
      return (
        index ===
        self.findIndex(
          (t) =>
            t.carModel === v.carModel && t.licensePlate === v.licensePlate
        )
      );
    });

    // Kiểm tra trùng lặp và cảnh báo
    if (validVehicles.length !== uniqueVehicles.length) {
      showToast('Có xe trùng lặp trong danh sách. Đã tự động loại bỏ.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      if (editingId) {
        // Khi chỉnh sửa: chỉ gửi các xe mới (không có trong danh sách ban đầu)
        const newVehicles = uniqueVehicles.filter((v) => {
          return !initialVehicles.some(
            (iv) =>
              iv.carModel?.trim() === v.carModel &&
              iv.licensePlate?.trim() === v.licensePlate
          );
        });

        // Không gửi email khi cập nhật vì backend không cho phép
        // Chỉ gửi các trường có giá trị, loại bỏ undefined và empty string
        const updatePayload: any = {
          fullName: formData.fullName.trim(),
          phone: formData.phone.trim(),
        };
        
        if (formData.address.trim()) {
          updatePayload.address = formData.address.trim();
        }
        if (formData.note.trim()) {
          updatePayload.note = formData.note.trim();
        }
        if (newVehicles.length > 0) {
          updatePayload.vehicles = newVehicles;
        }
        
        await updateCustomer(editingId, updatePayload);
        handleCloseForm();
        showToast('Cập nhật khách hàng thành công!', 'success');
      } else {
        await createCustomer({
          username: formData.username.trim(),
          email: formData.email.trim(),
          password: formData.password,
          fullName: formData.fullName.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim() || undefined,
          note: formData.note.trim() || undefined,
          vehicles: uniqueVehicles,
        });
        handleCloseForm();
        showToast('Thêm khách hàng thành công!', 'success');
      }
      loadCustomers();
    } catch (err: any) {
      // Xử lý lỗi chi tiết hơn
      let errorMessage = 'Có lỗi xảy ra';
      
      // Nếu là Error object
      if (err instanceof Error) {
        errorMessage = err.message;
      } 
      // Nếu là object với message
      else if (err && typeof err === 'object') {
        if (err.message) {
          errorMessage = err.message;
        } else if (err.error) {
          errorMessage = err.error;
        }
      }
      // Nếu là string
      else if (typeof err === 'string') {
        errorMessage = err;
      }
      
      // Kiểm tra nếu là lỗi conflict về xe trùng
      if (errorMessage.includes('đã tồn tại') || errorMessage.includes('Conflict') || errorMessage.includes('409')) {
        showToast(errorMessage || 'Xe đã tồn tại trong hệ thống. Vui lòng kiểm tra lại.', 'error');
      } else {
        showToast(errorMessage, 'error');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa khách hàng "${name}"?`)) {
      return;
    }

    try {
      await deleteCustomer(id);
      showToast('Xóa khách hàng thành công!', 'success');
      loadCustomers();
    } catch (err: any) {
      showToast(err.message || 'Không thể xóa khách hàng', 'error');
    }
  };

  const handleDeleteVehicle = async (
    customerId: string,
    licensePlate: string
  ) => {
    if (
      !confirm(
        `Bạn có chắc chắn muốn xóa xe với biển số "${licensePlate}"?`
      )
    ) {
      return;
    }

    try {
      await deleteCustomerVehicle(customerId, licensePlate);
      showToast('Xóa xe thành công!', 'success');
      loadCustomers();
    } catch (err: any) {
      showToast(err.message || 'Không thể xóa xe', 'error');
    }
  };

  const filtered = customers.filter(
    (c) =>
      (c.fullName || '').toLowerCase().includes(search.toLowerCase()) ||
      (c.phone || '').includes(search) ||
      (c.email || '').toLowerCase().includes(search.toLowerCase())
  );

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
            <User className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-gray-500">Quản lý khách hàng & xe</span>
          </div>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="container mx-auto px-6 py-6 max-w-6xl flex flex-col gap-6">
        {/* Tìm kiếm */}
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-3">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Tìm khách hàng theo tên, email hoặc SĐT..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none text-sm text-gray-700"
          />
        </div>

        {/* Danh sách khách hàng */}
        <div className="bg-white rounded-xl border shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Car className="w-5 h-5 text-emerald-600" />
            Danh sách khách hàng & xe
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 border-b">
                <tr>
                  <th className="text-left py-2 px-3">Mã KH</th>
                  <th className="text-left py-2 px-3">Tên khách hàng</th>
                  <th className="text-left py-2 px-3">Liên hệ</th>
                  <th className="text-left py-2 px-3">Xe sở hữu</th>
                  <th className="text-left py-2 px-3">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-gray-600">Đang tải...</td>
                  </tr>
                )}
                {error && !loading && (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-red-600">{error}</td>
                  </tr>
                )}
                {!loading && !error && filtered.map((c) => (
                  <tr key={c._id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-2 px-3 font-medium text-gray-800">{c._id.slice(-6)}</td>
                    <td className="py-2 px-3">{c.fullName || c.username}</td>
                    <td className="py-2 px-3">
                      <div className="text-gray-700 flex flex-col">
                        <span className="inline-flex items-center gap-1">
                          <Phone className="w-4 h-4 text-emerald-600" /> {c.phone || '—'}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                          <Mail className="w-4 h-4" /> {c.email || '—'}
                        </span>
                      </div>
                    </td>
                    <td className="py-2 px-3">
                      <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                        {c.vehicles?.map((v, i) => (
                          <li key={i}>
                            <span className="font-medium">{v.carModel}</span> – {v.licensePlate}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenForm(c)}
                          title="Chỉnh sửa"
                          className="p-1.5 rounded-md hover:bg-gray-100 text-gray-600"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          title="Xóa khách hàng"
                          onClick={() => handleDelete(c._id, c.fullName || c.username)}
                          className="p-1.5 rounded-md hover:bg-gray-100 text-red-500"
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

        {/* Add Customer Button */}
        <div className="flex justify-end">
          <button
            onClick={() => handleOpenForm()}
            className="inline-flex items-center bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition text-sm"
          >
            <PlusCircle className="w-4 h-4 mr-1" />
            Thêm khách hàng mới
          </button>
        </div>
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-[9999]">
          <div className="bg-white/95 rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-gray-200">
            <div className="sticky top-0 bg-white/90 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                {editingId ? 'Chỉnh sửa khách hàng' : 'Thêm khách hàng mới'}
              </h2>
              <button
                onClick={handleCloseForm}
                className="p-1 rounded-md hover:bg-gray-100 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {!editingId && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="customer-username" className="block text-sm font-medium text-gray-700 mb-1">
                        Username <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="customer-username"
                        name="username"
                        type="text"
                        required
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        className="w-full border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Nhập username"
                      />
                    </div>
                    <div>
                      <label htmlFor="customer-password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="customer-password"
                        name="password"
                        type="password"
                        required={!editingId}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Nhập password"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="customer-fullname" className="block text-sm font-medium text-gray-700 mb-1">
                    Họ tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="customer-fullname"
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Nhập họ tên"
                  />
                </div>
                <div>
                  <label htmlFor="customer-phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="customer-phone"
                    name="phone"
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Nhập số điện thoại"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="customer-email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    id="customer-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Nhập email"
                  />
                </div>
                <div>
                  <label htmlFor="customer-address" className="block text-sm font-medium text-gray-700 mb-1">
                    Địa chỉ
                  </label>
                  <input
                    id="customer-address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Nhập địa chỉ"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="customer-note" className="block text-sm font-medium text-gray-700 mb-1">
                  Ghi chú
                </label>
                <textarea
                  id="customer-note"
                  name="note"
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  rows={2}
                  className="w-full border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Nhập ghi chú"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Xe sở hữu
                </label>
                {formData.vehicles.map((vehicle, index) => {
                  // Lấy danh sách xe đã được chọn (có cả carModel và licensePlate, đã trim)
                  const addedCarModels = formData.vehicles
                    .filter((v, i) => i !== index && v.carModel?.trim() && v.licensePlate?.trim())
                    .map((v) => v.carModel);
                  
                  // Kiểm tra xem xe này có trong danh sách xe ban đầu không (xe đã tồn tại trong DB)
                  const isExistingVehicle = initialVehicles.some(
                    (v) =>
                      v.carModel?.trim() === vehicle.carModel?.trim() &&
                      v.licensePlate?.trim() === vehicle.licensePlate?.trim() &&
                      vehicle.carModel?.trim() &&
                      vehicle.licensePlate?.trim()
                  );
                  
                  // Chỉ khóa xe đã tồn tại trong database, không khóa xe mới đang nhập
                  const isVehicleAdded = isExistingVehicle;
                  
                  // Lọc ra các xe chưa được thêm (loại trừ các xe đã được chọn ở các entry khác)
                  const availableModels = ALLOWED_CAR_MODELS.filter(
                    (model) => !addedCarModels.includes(model) || model === vehicle.carModel
                  );

                  return (
                    <div key={index} className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <select
                          value={vehicle.carModel}
                          onChange={(e) => {
                            // Ngăn chặn thay đổi nếu xe đã được thêm
                            if (isVehicleAdded) return;
                            const newVehicles = [...formData.vehicles];
                            newVehicles[index].carModel = e.target.value;
                            setFormData({ ...formData, vehicles: newVehicles });
                          }}
                          disabled={isVehicleAdded}
                          className={`w-full border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                            isVehicleAdded ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''
                          }`}
                        >
                          <option value="">Chọn model xe</option>
                          {availableModels.map((model) => (
                            <option key={model} value={model}>
                              {model}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={vehicle.licensePlate}
                          onChange={(e) => {
                            // Ngăn chặn thay đổi nếu xe đã được thêm
                            if (isVehicleAdded) return;
                            const newVehicles = [...formData.vehicles];
                            newVehicles[index].licensePlate = e.target.value;
                            setFormData({ ...formData, vehicles: newVehicles });
                          }}
                          disabled={isVehicleAdded}
                          className={`flex-1 border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                            isVehicleAdded ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''
                          }`}
                          placeholder="Biển số"
                        />
                        {formData.vehicles.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              const newVehicles = formData.vehicles.filter((_, i) => i !== index);
                              setFormData({ ...formData, vehicles: newVehicles });
                            }}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      vehicles: [...formData.vehicles, { carModel: '', licensePlate: '' }],
                    });
                  }}
                  className="inline-flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700"
                >
                  <Plus className="w-4 h-4" />
                  Thêm xe
                </button>
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
