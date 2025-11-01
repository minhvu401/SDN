'use client';
import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Package,
  Warehouse,
  ShoppingCart,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Save,
  Bot,
  PlusCircle,
  Search,
  BarChart3,
  X,
  Pencil,
  Trash2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  listInventories,
  createInventory,
  updateInventory,
  deleteInventory,
  type InventoryItem,
} from '@/lib/api/admin/inventories';
import { ToastContainer, type Toast } from '@/components/ui/Toast';

export default function AdminInventoriesPage() {
  const router = useRouter();

  const [parts, setParts] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    partCode: '',
    partName: '',
    category: '',
    description: '',
    quantity: '',
    minQuantity: '',
    unitPrice: '',
    supplier: '',
    productLink: '',
    warranty: '',
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

  const loadParts = async () => {
    try {
      setLoading(true);
      const data = await listInventories();
      console.log('Loaded inventories:', data);
      // Log để kiểm tra xem API có trả về minQuantity không
      if (data && data.length > 0) {
        console.log('First item minQuantity:', data[0].minQuantity);
      }
      setParts(data || []);
      setError('');
    } catch (e: any) {
      setError(e.message || 'Không thể tải danh sách phụ tùng');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadParts();
  }, []);

  const handleOpenForm = (part?: InventoryItem) => {
    if (part) {
      setEditingId(part._id);
      setFormData({
        partCode: part.partCode || '',
        partName: part.partName || '',
        category: part.category || '',
        description: part.description || '',
        quantity: part.quantity?.toString() || '',
        minQuantity: part.minQuantity?.toString() || '',
        unitPrice: part.unitPrice?.toString() || '',
        supplier: part.supplier || '',
        productLink: part.productLink || '',
        warranty: part.warranty || '',
        isActive: part.isActive ?? true,
      });
    } else {
      setEditingId(null);
      setFormData({
        partCode: '',
        partName: '',
        category: '',
        description: '',
        quantity: '',
        minQuantity: '',
        unitPrice: '',
        supplier: '',
        productLink: '',
        warranty: '',
        isActive: true,
      });
    }
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormData({
      partCode: '',
      partName: '',
      category: '',
      description: '',
      quantity: '',
      minQuantity: '',
      unitPrice: '',
      supplier: '',
      productLink: '',
      warranty: '',
      isActive: true,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.partName.trim()) {
      showToast('Vui lòng nhập tên phụ tùng', 'error');
      return;
    }

    // Validate minQuantity - must be a valid number >= 0
    const minQtyStr = formData.minQuantity.trim();
    const minQtyNum = minQtyStr ? parseInt(minQtyStr, 10) : NaN;
    if (!minQtyStr || isNaN(minQtyNum) || minQtyNum < 0) {
      showToast('Vui lòng nhập số lượng tối thiểu để cảnh báo (phải là số >= 0)', 'error');
      return;
    }

    setSubmitting(true);
    try {
      if (editingId) {
        // For UPDATE: exclude partCode (API doesn't accept it), include isActive
        const updatePayload: any = {
          partName: formData.partName.trim(),
          minQuantity: minQtyNum,
        };

        // DO NOT include partCode in update (API doesn't accept it)
        // partCode cannot be updated after creation
        
        if (formData.category.trim()) updatePayload.category = formData.category.trim();
        if (formData.description.trim()) updatePayload.description = formData.description.trim();
        if (formData.quantity.trim() && !isNaN(parseInt(formData.quantity, 10))) {
          updatePayload.quantity = parseInt(formData.quantity, 10);
        }
        if (formData.unitPrice.trim() && !isNaN(parseFloat(formData.unitPrice))) {
          updatePayload.unitPrice = parseFloat(formData.unitPrice);
        }
        if (formData.supplier.trim()) updatePayload.supplier = formData.supplier.trim();
        if (formData.productLink.trim()) updatePayload.productLink = formData.productLink.trim();
        if (formData.warranty.trim()) updatePayload.warranty = formData.warranty.trim();
        
        // Include isActive in update (API accepts it)
        updatePayload.isActive = formData.isActive;
        
        const updatedItem = await updateInventory(editingId, updatePayload);
        handleCloseForm();
        showToast('Cập nhật phụ tùng thành công!', 'success');
        // Reload data to reflect changes
        await loadParts();
      } else {
        // For CREATE: DO NOT include isActive
        const createPayload: any = {
          partName: formData.partName.trim(),
          minQuantity: minQtyNum, // Required - must be number
        };

        if (formData.partCode.trim()) createPayload.partCode = formData.partCode.trim();
        if (formData.category.trim()) createPayload.category = formData.category.trim();
        if (formData.description.trim()) createPayload.description = formData.description.trim();
        if (formData.quantity.trim() && !isNaN(parseInt(formData.quantity, 10))) {
          createPayload.quantity = parseInt(formData.quantity, 10);
        }
        if (formData.unitPrice.trim() && !isNaN(parseFloat(formData.unitPrice))) {
          createPayload.unitPrice = parseFloat(formData.unitPrice);
        }
        if (formData.supplier.trim()) createPayload.supplier = formData.supplier.trim();
        if (formData.productLink.trim()) createPayload.productLink = formData.productLink.trim();
        if (formData.warranty.trim()) createPayload.warranty = formData.warranty.trim();

        // Explicitly ensure isActive is NOT in the payload
        
        const createdItem = await createInventory(createPayload);
        handleCloseForm();
        showToast('Thêm phụ tùng thành công!', 'success');
        // Reload data to reflect changes
        await loadParts();
      }
    } catch (err: any) {
      console.error('Error in handleSubmit:', err);
      const errorMessage = err?.message || err?.response?.data?.message || 'Có lỗi xảy ra khi lưu phụ tùng';
      showToast(errorMessage, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa phụ tùng "${name}"?`)) {
      return;
    }

    try {
      await deleteInventory(id);
      showToast('Xóa phụ tùng thành công!', 'success');
      loadParts();
    } catch (err: any) {
      showToast(err.message || 'Không thể xóa phụ tùng', 'error');
    }
  };

  const handleOrder = (part: InventoryItem) => {
    alert(`🛒 Đã gửi yêu cầu đặt hàng bổ sung cho "${part.partName}"`);
  };

  const suggestMinStock = (quantity: number) => {
    return Math.max(1, Math.ceil((quantity || 0) / 10));
  };

  const updateSuggestions = () => {
    setParts((prev) => prev.map((p) => ({ ...p, minStock: suggestMinStock(p.quantity ?? 0) })));
    alert('🤖 AI đã cập nhật lượng tồn tối thiểu đề xuất!');
  };

  const filtered = parts.filter(
    (p) =>
      (p.partName || '').toLowerCase().includes(search.toLowerCase()) ||
      (p.category || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="relative bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-6 max-w-6xl flex items-center gap-3">
          <button
            onClick={() => router.push('/admin/dashboard')}
            className="flex items-center text-emerald-700 hover:text-emerald-800 transition"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span className="text-sm font-medium">Trang quản trị</span>
          </button>

          <div className="ml-auto flex items-center gap-2">
            <Warehouse className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-gray-500">Quản lý kho phụ tùng</span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-6 py-6 max-w-6xl flex flex-col gap-6">
        {/* Thanh tìm kiếm + AI */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-gray-200 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Tìm theo tên hoặc model..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="text-sm text-gray-700 outline-none"
            />
          </div>
          <button
            onClick={updateSuggestions}
            className="inline-flex items-center gap-2 text-sm bg-emerald-100 text-emerald-700 px-3 py-2 rounded-md hover:bg-emerald-200 transition"
          >
            <Bot className="w-4 h-4" />
            Gợi ý tồn tối thiểu (AI)
          </button>
        </div>

        {/* Danh sách phụ tùng */}
        <div className="bg-white rounded-xl border shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-600" />
            Theo dõi tồn kho & đặt hàng
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 border-b">
                <tr>
                  <th className="text-left py-2 px-3">Mã</th>
                  <th className="text-left py-2 px-3">Tên phụ tùng</th>
                  <th className="text-left py-2 px-3">Danh mục</th>
                  <th className="text-left py-2 px-3">Tồn kho</th>
                  <th className="text-left py-2 px-3">Tối thiểu</th>
                  <th className="text-left py-2 px-3">SL dùng/tháng</th>
                  <th className="text-left py-2 px-3">Trạng thái</th>
                  <th className="text-left py-2 px-3">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr><td colSpan={8} className="py-6 text-center text-gray-600">Đang tải...</td></tr>
                )}
                {error && !loading && (
                  <tr><td colSpan={8} className="py-6 text-center text-red-600">{error}</td></tr>
                )}
                {!loading && !error && filtered.map((p) => (
                  <tr
                    key={p._id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-2 px-3 font-medium text-gray-800">{p.partCode}</td>
                    <td className="py-2 px-3">{p.partName}</td>
                    <td className="py-2 px-3">{p.category || '—'}</td>
                    <td className="py-2 px-3">{p.quantity ?? 0}</td>
                    <td className="py-2 px-3">
                      {(p.minQuantity !== undefined && p.minQuantity !== null) ? (
                        <span className="px-2 py-0.5 bg-emerald-50 rounded text-emerald-700 font-medium">
                          {p.minQuantity}
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="py-2 px-3">{p.unitPrice ? p.unitPrice.toLocaleString('vi-VN') : '—'}</td>
                    <td className="py-2 px-3">
                      <StatusBadge stock={p.quantity ?? 0} min={p.minQuantity ?? 0} />
                    </td>
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenForm(p)}
                          className="p-1.5 rounded-md hover:bg-gray-100 text-gray-600"
                          title="Sửa"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p._id, p.partName)}
                          className="p-1.5 rounded-md hover:bg-gray-100 text-red-500"
                          title="Xóa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOrder(p)}
                          className="inline-flex items-center gap-1 bg-emerald-600 text-white px-3 py-1 rounded-md hover:bg-emerald-700 text-xs"
                        >
                          <ShoppingCart className="w-3 h-3" />
                          Đặt hàng
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Part Button */}
        <div className="flex justify-end">
          <button
            onClick={() => handleOpenForm()}
            className="inline-flex items-center bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition text-sm"
          >
            <PlusCircle className="w-4 h-4 mr-1" />
            Thêm phụ tùng mới
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
                  <Package className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  {editingId ? 'Chỉnh sửa phụ tùng' : 'Thêm phụ tùng mới'}
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
                  <label htmlFor="part-code" className="block text-sm font-medium text-gray-700 mb-1">
                    Mã phụ tùng {editingId && <span className="text-xs text-gray-500">(không thể thay đổi)</span>}
                  </label>
                  <input
                    id="part-code"
                    name="partCode"
                    type="text"
                    value={formData.partCode}
                    onChange={(e) => setFormData({ ...formData, partCode: e.target.value })}
                    disabled={!!editingId}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition ${
                      editingId ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                    placeholder="Nhập mã phụ tùng"
                  />
                </div>
                <div>
                  <label htmlFor="part-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Tên phụ tùng <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="part-name"
                    name="partName"
                    type="text"
                    required
                    value={formData.partName}
                    onChange={(e) => setFormData({ ...formData, partName: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                    placeholder="Nhập tên phụ tùng"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="part-category" className="block text-sm font-medium text-gray-700 mb-1">
                    Danh mục
                  </label>
                  <input
                    id="part-category"
                    name="category"
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                    placeholder="Nhập danh mục"
                  />
                </div>
                <div>
                  <label htmlFor="part-quantity" className="block text-sm font-medium text-gray-700 mb-1">
                    Số lượng tồn kho
                  </label>
                  <input
                    id="part-quantity"
                    name="quantity"
                    type="number"
                    min="0"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                    placeholder="Nhập số lượng"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="part-minQuantity" className="block text-sm font-medium text-gray-700 mb-1">
                    Số lượng tối thiểu để cảnh báo <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="part-minQuantity"
                    name="minQuantity"
                    type="number"
                    required
                    min="0"
                    value={formData.minQuantity}
                    onChange={(e) => setFormData({ ...formData, minQuantity: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                    placeholder="Nhập số lượng tối thiểu"
                  />
                  <p className="mt-1 text-xs text-gray-500">Khi tồn kho &lt; số này sẽ cảnh báo</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="part-price" className="block text-sm font-medium text-gray-700 mb-1">
                    Giá đơn vị (VNĐ)
                  </label>
                  <input
                    id="part-price"
                    name="unitPrice"
                    type="number"
                    min="0"
                    value={formData.unitPrice}
                    onChange={(e) => setFormData({ ...formData, unitPrice: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                    placeholder="Nhập giá"
                  />
                </div>
                <div>
                  <label htmlFor="part-supplier" className="block text-sm font-medium text-gray-700 mb-1">
                    Nhà cung cấp
                  </label>
                  <input
                    id="part-supplier"
                    name="supplier"
                    type="text"
                    value={formData.supplier}
                    onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                    placeholder="Nhập nhà cung cấp"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="part-link" className="block text-sm font-medium text-gray-700 mb-1">
                    Link sản phẩm
                  </label>
                  <input
                    id="part-link"
                    name="productLink"
                    type="url"
                    value={formData.productLink}
                    onChange={(e) => setFormData({ ...formData, productLink: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label htmlFor="part-warranty" className="block text-sm font-medium text-gray-700 mb-1">
                    Bảo hành
                  </label>
                  <input
                    id="part-warranty"
                    name="warranty"
                    type="text"
                    value={formData.warranty}
                    onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                    placeholder="Ví dụ: 12 tháng"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="part-description" className="block text-sm font-medium text-gray-700 mb-1">
                  Mô tả
                </label>
                <textarea
                  id="part-description"
                  name="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                  placeholder="Nhập mô tả phụ tùng"
                />
              </div>

              {editingId && (
                <div>
                  <label htmlFor="part-status" className="block text-sm font-medium text-gray-700 mb-1">
                    Trạng thái
                  </label>
                  <select
                    id="part-status"
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

/* ===== COMPONENT: StatusBadge ===== */
function StatusBadge({ stock, min }: { stock: number; min: number }) {
  const status =
    stock === 0
      ? 'Hết hàng'
      : stock < min
      ? 'Thiếu hàng'
      : stock === min
      ? 'Cần nhập thêm'
      : 'Đủ tồn';

  const { color, icon } =
    status === 'Hết hàng'
      ? { color: 'bg-red-100 text-red-600', icon: <AlertTriangle className="w-3 h-3" /> }
      : status === 'Thiếu hàng'
      ? { color: 'bg-yellow-100 text-yellow-700', icon: <AlertTriangle className="w-3 h-3" /> }
      : status === 'Cần nhập thêm'
      ? { color: 'bg-orange-100 text-orange-700', icon: <Clock className="w-3 h-3" /> }
      : { color: 'bg-emerald-100 text-emerald-700', icon: <CheckCircle2 className="w-3 h-3" /> };

  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1 ${color}`}
    >
      {icon}
      {status}
    </span>
  );
}
