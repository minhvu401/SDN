'use client';
import React, { useState } from 'react';
import {
  ArrowLeft,
  UserCog,
  ShieldCheck,
  UserPlus,
  Trash2,
  Pencil,
  Save,
  Mail,
  Phone,
  Wrench,
  UserCircle2,
  Key,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminStaffPage() {
  const router = useRouter();

  // ===== DỮ LIỆU MẪU =====
  const [staff, setStaff] = useState([
    {
      id: 'S001',
      name: 'Nguyễn Văn A',
      role: 'Admin',
      email: 'admin@evcare.vn',
      phone: '0987 123 456',
    },
    {
      id: 'S002',
      name: 'Trần Thị B',
      role: 'Staff',
      email: 'tranb@evcare.vn',
      phone: '0912 456 789',
    },
    {
      id: 'S003',
      name: 'Phạm Minh C',
      role: 'Technician',
      email: 'minhc@evcare.vn',
      phone: '0901 222 888',
    },
  ]);

  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Staff',
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<any>({});

  // ===== THÊM NHÂN VIÊN =====
  const addStaff = () => {
    if (!newStaff.name || !newStaff.phone) {
      alert('⚠️ Vui lòng nhập tên và số điện thoại!');
      return;
    }
    const id = 'S' + (staff.length + 1).toString().padStart(3, '0');
    setStaff([...staff, { id, ...newStaff }]);
    setNewStaff({ name: '', email: '', phone: '', role: 'Staff' });
  };

  // ===== XÓA =====
  const deleteStaff = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa nhân viên này?')) {
      setStaff((prev) => prev.filter((s) => s.id !== id));
    }
  };

  // ===== SỬA =====
  const startEdit = (id: string) => {
    const s = staff.find((x) => x.id === id);
    if (s) {
      setEditingId(id);
      setEditingData({ ...s });
    }
  };

  const saveEdit = () => {
    setStaff((prev) => prev.map((s) => (s.id === editingId ? editingData : s)));
    setEditingId(null);
    setEditingData({});
  };

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
            <UserCog className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-gray-500">Quản lý nhân sự & phân quyền</span>
          </div>
        </div>
      </div>

      {/* NỘI DUNG */}
      <div className="container mx-auto px-6 py-6 max-w-6xl flex flex-col gap-6">
        {/* Thêm nhân viên */}
        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <h2 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-emerald-600" />
            Thêm nhân viên mới
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-sm">
            <input
              type="text"
              placeholder="Họ tên"
              value={newStaff.name}
              onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
              className="border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={newStaff.email}
              onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
              className="border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            <input
              type="text"
              placeholder="Số điện thoại"
              value={newStaff.phone}
              onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
              className="border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            <select
              value={newStaff.role}
              onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
              className="border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="Admin">Admin</option>
              <option value="Staff">Staff</option>
              <option value="Technician">Technician</option>
            </select>
          </div>

          <div className="mt-3 flex justify-end">
            <button
              onClick={addStaff}
              className="inline-flex items-center bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition text-sm"
            >
              <Save className="w-4 h-4 mr-1" />
              Lưu nhân viên
            </button>
          </div>
        </div>

        {/* Danh sách nhân viên */}
        <div className="bg-white rounded-xl border shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            Danh sách nhân sự & quyền truy cập
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 border-b">
                <tr>
                  <th className="text-left py-2 px-3">Mã NV</th>
                  <th className="text-left py-2 px-3">Họ tên</th>
                  <th className="text-left py-2 px-3">Liên hệ</th>
                  <th className="text-left py-2 px-3">Vai trò</th>
                  <th className="text-left py-2 px-3">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {staff.map((s) => (
                  <tr key={s.id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-2 px-3 font-medium text-gray-800">{s.id}</td>
                    <td className="py-2 px-3">{s.name}</td>
                    <td className="py-2 px-3">
                      <div className="text-gray-700 flex flex-col">
                        <span className="inline-flex items-center gap-1">
                          <Phone className="w-4 h-4 text-emerald-600" /> {s.phone}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                          <Mail className="w-4 h-4" /> {s.email}
                        </span>
                      </div>
                    </td>
                    <td className="py-2 px-3">
                      {editingId === s.id ? (
                        <select
                          value={editingData.role}
                          onChange={(e) =>
                            setEditingData({ ...editingData, role: e.target.value })
                          }
                          className="border rounded-md px-2 py-1 text-sm focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option value="Admin">Admin</option>
                          <option value="Staff">Staff</option>
                          <option value="Technician">Technician</option>
                        </select>
                      ) : (
                        <RoleBadge role={s.role} />
                      )}
                    </td>
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-2">
                        {editingId === s.id ? (
                          <button
                            onClick={saveEdit}
                            className="p-1.5 rounded-md hover:bg-emerald-100 text-emerald-700"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => startEdit(s.id)}
                            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-600"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteStaff(s.id)}
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
      </div>

    </div>
  );
}

/* ===== COMPONENT: RoleBadge ===== */
function RoleBadge({ role }: { role: string }) {
  let color =
    role === 'Admin'
      ? 'bg-emerald-100 text-emerald-700'
      : role === 'Staff'
      ? 'bg-blue-100 text-blue-700'
      : 'bg-yellow-100 text-yellow-700';
  let icon =
    role === 'Admin' ? (
      <Key className="w-3 h-3" />
    ) : role === 'Staff' ? (
      <UserCircle2 className="w-3 h-3" />
    ) : (
      <Wrench className="w-3 h-3" />
    );

  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1 ${color}`}
    >
      {icon}
      {role}
    </span>
  );
}
