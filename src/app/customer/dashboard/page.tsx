'use client';
import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  Car,
  Plus,
  CheckCircle2,
  Edit2,
  Save,
  X,
  Trash2,
  AlertTriangle,
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  getCustomerVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  Vehicle,
} from '@/lib/api/customer/vehicles';
import { ALLOWED_CAR_MODELS } from '@/lib/api/auth';

export default function CustomerDashboardPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newVehicle, setNewVehicle] = useState({ carModel: '', licensePlate: '' });
  const [customerId, setCustomerId] = useState<string>('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<{ carModel: string; licensePlate: string }>({
    carModel: '',
    licensePlate: '',
  });

  // ✅ Lấy danh sách xe
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await getCustomerVehicles();
        setVehicles(data.vehicles || []);
        setCustomerId(data._id || '');
      } catch (err) {
        console.error('❌ Lỗi tải danh sách xe:', err);
        setError('Không thể tải danh sách xe. Vui lòng thử lại.');
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  // ✅ Thêm xe mới
  const handleAddVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVehicle.carModel || !newVehicle.licensePlate) {
      toast.error('Vui lòng nhập đầy đủ thông tin xe.');
      return;
    }
    if (!customerId) {
      toast.error('Không tìm thấy ID người dùng.');
      return;
    }

    const addPromise = createVehicle(customerId, newVehicle);
    toast.promise(addPromise, {
      loading: 'Đang thêm xe...',
      success: 'Thêm xe thành công!',
      error: 'Không thể thêm xe. Vui lòng thử lại.',
    });

    try {
      await addPromise;
      const refreshed = await getCustomerVehicles();
      setVehicles(refreshed.vehicles || []);
      setNewVehicle({ carModel: '', licensePlate: '' });
    } catch (err) {
      console.error('❌ Lỗi khi thêm xe:', err);
    }
  };

  // ✅ Bắt đầu sửa xe
  const startEditing = (v: Vehicle) => {
    const vid = v._id || (v as any).vehicleId || v.licensePlate;
    if (editingId === vid) {
      cancelEditing();
    } else {
      cancelEditing();
      setEditingId(vid);
      setEditData({ carModel: v.carModel, licensePlate: v.licensePlate });
    }
  };

  // ✅ Hủy sửa xe
  const cancelEditing = () => {
    setEditingId(null);
    setEditData({ carModel: '', licensePlate: '' });
  };

  // ✅ Lưu cập nhật xe
  const handleUpdateVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId || !customerId) {
      toast.error('Không xác định được xe hoặc khách hàng.');
      return;
    }

    const updatePromise = updateVehicle(customerId, {
      vehicleId: editingId,
      carModel: editData.carModel.trim(),
      licensePlate: editData.licensePlate.trim(),
    });

    toast.promise(updatePromise, {
      loading: 'Đang cập nhật xe...',
      success: 'Cập nhật xe thành công!',
      error: 'Không thể cập nhật xe. Vui lòng thử lại.',
    });

    try {
      await updatePromise;
      const refreshed = await getCustomerVehicles();
      setVehicles(refreshed.vehicles || []);
      cancelEditing();
    } catch (err) {
      console.error('❌ Lỗi cập nhật xe:', err);
    }
  };

  // 🗑️ Hiển thị toast xác nhận xóa
  const confirmDeleteToast = (licensePlate: string) => {
    toast.custom(
      (t) => (
        <div
          className={`bg-white border rounded-lg shadow-lg p-4 flex flex-col items-center text-center w-72 transition-all ${
            t.visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
          }`}
        >
          <AlertTriangle className="text-red-500 w-8 h-8 mb-2" />
          <p className="font-semibold text-gray-800">
            Xóa xe {licensePlate}?
          </p>
          <p className="text-gray-500 text-sm mt-1 mb-3">
            Hành động này không thể hoàn tác.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                handleDeleteVehicle(licensePlate);
              }}
              className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700"
            >
              Xóa
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm hover:bg-gray-300"
            >
              Hủy
            </button>
          </div>
        </div>
      ),
      { duration: 5000 }
    );
  };

  // ✅ Xử lý xóa xe
  const handleDeleteVehicle = async (licensePlate: string) => {
    if (!customerId) return toast.error('Không tìm thấy ID khách hàng.');

    const deletePromise = deleteVehicle(customerId, licensePlate);
    toast.promise(deletePromise, {
      loading: 'Đang xóa xe...',
      success: 'Đã xóa xe thành công!',
      error: 'Không thể xóa xe. Vui lòng thử lại.',
    });

    try {
      await deletePromise;
      const refreshed = await getCustomerVehicles();
      setVehicles(refreshed.vehicles || []);
    } catch (err) {
      console.error('❌ Lỗi khi xóa xe:', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="bg-white border-b border-gray-200 py-10 text-center">
        <h1 className="text-3xl font-bold text-emerald-700 font-display">
          Phương tiện của tôi
        </h1>
        <p className="text-gray-600 mt-2">
          Theo dõi và quản lý danh sách xe của bạn tại EV Care
        </p>
      </div>

      <div className="container mx-auto px-6 py-10 max-w-4xl">
        {/* Form thêm xe mới */}
        <form
          onSubmit={handleAddVehicle}
          className="bg-white shadow-md rounded-xl border border-gray-100 p-6 mb-10"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-emerald-600" /> Thêm xe mới
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm text-gray-700 font-medium">Mẫu xe</label>
              <select
                value={newVehicle.carModel}
                onChange={(e) =>
                  setNewVehicle({ ...newVehicle, carModel: e.target.value })
                }
                required
                className="w-full border rounded-md p-2 mt-1 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">-- Chọn mẫu xe --</option>
                {ALLOWED_CAR_MODELS.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-700 font-medium">Biển số xe</label>
              <input
                type="text"
                placeholder="VD: 30F-123.45"
                value={newVehicle.licensePlate}
                onChange={(e) =>
                  setNewVehicle({ ...newVehicle, licensePlate: e.target.value })
                }
                required
                className="w-full border rounded-md p-2 mt-1 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="text-right mt-6">
            <button
              type="submit"
              className="inline-flex items-center bg-emerald-600 text-white px-5 py-2 rounded-md hover:bg-emerald-700 transition"
            >
              <Plus className="w-4 h-4 mr-1" /> Thêm xe
            </button>
          </div>
        </form>

        {/* Danh sách xe */}
        {loading && <p className="text-center text-gray-600">Đang tải dữ liệu...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.length === 0 ? (
              <p className="text-center col-span-full text-gray-600">
                Bạn chưa có xe nào được đăng ký.
              </p>
            ) : (
              vehicles.map((v) => (
                <div
                  key={v._id || (v as any).vehicleId || v.licensePlate}
                  className="bg-white rounded-xl shadow-md p-6 border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition-all"
                >
                  <Car className="w-10 h-10 text-emerald-600 mb-3" />

                  {editingId === (v._id || (v as any).vehicleId || v.licensePlate) ? (
                    <form onSubmit={handleUpdateVehicle} className="w-full">
                      <input
                        type="text"
                        value={editData.carModel}
                        onChange={(e) =>
                          setEditData({ ...editData, carModel: e.target.value })
                        }
                        className="w-full border rounded-md p-2 mb-2 text-center"
                      />
                      <input
                        type="text"
                        value={editData.licensePlate}
                        onChange={(e) =>
                          setEditData({ ...editData, licensePlate: e.target.value })
                        }
                        className="w-full border rounded-md p-2 mb-3 text-center"
                      />
                      <div className="flex justify-center gap-3">
                        <button
                          type="submit"
                          className="bg-emerald-600 text-white px-3 py-1 rounded-md text-sm flex items-center gap-1 hover:bg-emerald-700"
                        >
                          <Save className="w-4 h-4" /> Lưu
                        </button>
                        <button
                          type="button"
                          onClick={cancelEditing}
                          className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md text-sm flex items-center gap-1 hover:bg-gray-400"
                        >
                          <X className="w-4 h-4" /> Hủy
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <h2 className="text-lg font-semibold text-gray-800 mb-1">
                        {v.carModel}
                      </h2>
                      <p className="text-gray-600 text-sm">{v.licensePlate}</p>
                      <div className="mt-3 flex items-center text-emerald-600 text-xs gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Đã đăng ký
                      </div>
                      <div className="mt-3 flex gap-3">
                        <button
                          onClick={() => startEditing(v)}
                          className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        >
                          <Edit2 className="w-4 h-4" /> Sửa
                        </button>
                        <button
                          onClick={() => confirmDeleteToast(v.licensePlate)}
                          className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4" /> Xóa
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
