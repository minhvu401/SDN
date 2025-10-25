'use client';
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  ArrowLeft,
  Wrench,
  Package,
  ClipboardList,
  PlusCircle,
  Save,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Car,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TechnicianPartsPage() {
  const router = useRouter();

  const [parts, setParts] = useState([
    {
      id: 'P001',
      name: 'Pin Lithium 60V',
      vehicle: 'VinFast Feliz S',
      service: 'Thay pin & kiểm tra sạc',
      quantity: 1,
      status: 'Đã thay',
    },
    {
      id: 'P002',
      name: 'Phanh đĩa trước',
      vehicle: 'VinFast Klara A2',
      service: 'Bảo dưỡng định kỳ',
      quantity: 1,
      status: 'Cần thay',
    },
    {
      id: 'P003',
      name: 'Bóng đèn pha LED',
      vehicle: 'VinFast Evo 200',
      service: 'Kiểm tra hệ thống điện',
      quantity: 2,
      status: 'Kiểm tra lại',
    },
  ]);

  const [newPart, setNewPart] = useState({
    name: '',
    quantity: 1,
    status: 'Cần thay',
  });

  const addPart = () => {
    if (!newPart.name) {
      alert('⚠️ Vui lòng nhập tên phụ tùng!');
      return;
    }
    const id = 'P' + (parts.length + 1).toString().padStart(3, '0');
    setParts((prev) => [
      ...prev,
      {
        id,
        name: newPart.name,
        vehicle: 'Chưa gán xe',
        service: 'Chưa xác định',
        quantity: newPart.quantity,
        status: newPart.status,
      },
    ]);
    setNewPart({ name: '', quantity: 1, status: 'Cần thay' });
  };

  const handleSave = () => {
    alert('✅ Đã lưu báo cáo phụ tùng!');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="relative bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-6 max-w-6xl flex items-center gap-3">
          <button
            onClick={() => router.push('/technician/dashboard')}
            className="flex items-center text-emerald-700 hover:text-emerald-800 transition"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span className="text-sm font-medium">Trang kỹ thuật viên</span>
          </button>

          <div className="ml-auto flex items-center gap-2">
            <Wrench className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-gray-500">Báo cáo phụ tùng</span>
          </div>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="container mx-auto px-6 py-6 max-w-6xl flex flex-col gap-6">
        {/* Thêm phụ tùng mới */}
        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <h2 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-emerald-600" />
            Thêm báo cáo phụ tùng
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <input
              type="text"
              value={newPart.name}
              onChange={(e) => setNewPart({ ...newPart, name: e.target.value })}
              placeholder="Tên phụ tùng..."
              className="border rounded-md px-3 py-2 text-sm focus:ring-emerald-500 focus:border-emerald-500"
            />

            <input
              type="number"
              value={newPart.quantity}
              onChange={(e) =>
                setNewPart({ ...newPart, quantity: parseInt(e.target.value) || 1 })
              }
              placeholder="Số lượng"
              min={1}
              className="border rounded-md px-3 py-2 text-sm focus:ring-emerald-500 focus:border-emerald-500"
            />

            <select
              value={newPart.status}
              onChange={(e) => setNewPart({ ...newPart, status: e.target.value })}
              className="border rounded-md px-3 py-2 text-sm focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="Cần thay">Cần thay</option>
              <option value="Đã thay">Đã thay</option>
              <option value="Kiểm tra lại">Kiểm tra lại</option>
            </select>

            <button
              onClick={addPart}
              className="inline-flex items-center justify-center bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition text-sm"
            >
              <Package className="w-4 h-4 mr-1" />
              Thêm phụ tùng
            </button>
          </div>
        </div>

        {/* Danh sách phụ tùng */}
        <div className="bg-white rounded-xl border shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-emerald-600" />
            Danh sách phụ tùng sử dụng / cần thay
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 border-b">
                <tr>
                  <th className="text-left py-2 px-3">Mã</th>
                  <th className="text-left py-2 px-3">Tên phụ tùng</th>
                  <th className="text-left py-2 px-3">Xe / Dịch vụ</th>
                  <th className="text-left py-2 px-3">Số lượng</th>
                  <th className="text-left py-2 px-3">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {parts.map((p) => (
                  <tr key={p.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-2 px-3 font-medium text-gray-800">{p.id}</td>
                    <td className="py-2 px-3">{p.name}</td>
                    <td className="py-2 px-3">
                      <span className="block font-medium text-gray-800">{p.vehicle}</span>
                      <span className="block text-xs text-gray-500">{p.service}</span>
                    </td>
                    <td className="py-2 px-3">{p.quantity}</td>
                    <td className="py-2 px-3">
                      <StatusBadge status={p.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-5 py-2 rounded-md hover:bg-emerald-700 transition"
            >
              <Save className="w-4 h-4" />
              Lưu báo cáo
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

/* ====== COMPONENT: StatusBadge ====== */
function StatusBadge({ status }: { status: string }) {
  let color =
    status === 'Đã thay'
      ? 'bg-emerald-100 text-emerald-700'
      : status === 'Cần thay'
      ? 'bg-yellow-100 text-yellow-700'
      : 'bg-gray-100 text-gray-600';

  let icon =
    status === 'Đã thay' ? (
      <CheckCircle2 className="w-3 h-3" />
    ) : status === 'Cần thay' ? (
      <AlertTriangle className="w-3 h-3" />
    ) : (
      <XCircle className="w-3 h-3" />
    );

  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1 ${color}`}
    >
      {icon}
      {status}
    </span>
  );
}
