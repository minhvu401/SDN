'use client';
import React, { useEffect, useState } from 'react';
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
import { listTechnicians, type TechnicianItem } from '@/lib/api/admin/technicians';

export default function AdminStaffPage() {
  const router = useRouter();

  const [staff, setStaff] = useState<TechnicianItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await listTechnicians();
        if (!mounted) return;
        const arr = Array.isArray(data) ? data : (data as any)?.data || [];
        setStaff(arr);
      } catch (e) {
        setError('Không thể tải danh sách nhân sự');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Staff',
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<TechnicianItem | null>(null);

  // ===== THÊM NHÂN VIÊN =====
  const addStaff = () => {
    if (!newStaff.name || !newStaff.phone) {
      alert('⚠️ Vui lòng nhập tên và số điện thoại!');
      return;
    }
    const _id = 'temp_' + Date.now().toString();
    setStaff([...staff, { _id, name: newStaff.name, email: newStaff.email, phone: newStaff.phone } as TechnicianItem]);
    setNewStaff({ name: '', email: '', phone: '', role: 'Staff' });
  };

  // ===== XÓA =====
  const deleteStaff = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa nhân viên này?')) {
      setStaff((prev) => prev.filter((s) => s._id !== id));
    }
  };

  // ===== SỬA =====
  const startEdit = (id: string) => {
    const s = staff.find((x) => x._id === id);
    if (s) {
      setEditingId(id);
      setEditingData({ ...s });
    }
  };

  const saveEdit = () => {
    if (editingData) {
      setStaff((prev) => prev.map((s) => (s._id === editingId ? editingData : s)));
    }
    setEditingId(null);
    setEditingData(null);
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
                {loading && (
                  <tr><td colSpan={5} className="py-6 text-center text-gray-600">Đang tải...</td></tr>
                )}
                {error && !loading && (
                  <tr><td colSpan={5} className="py-6 text-center text-red-600">{error}</td></tr>
                )}
                {!loading && !error && staff.map((s) => (
                  <tr key={(s as any)._id || (s as any).id || Math.random()} className="border-b hover:bg-gray-50 transition">
                    <td className="py-2 px-3 font-medium text-gray-800">{(((s as any)._id || (s as any).id || '').toString()).slice(-6) || '—'}</td>
                    <td className="py-2 px-3">{s.name}</td>
                    <td className="py-2 px-3">
                      <div className="text-gray-700 flex flex-col">
                        <span className="inline-flex items-center gap-1">
                          <Phone className="w-4 h-4 text-emerald-600" /> {s.phone || '—'}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                          <Mail className="w-4 h-4" /> {s.email || '—'}
                        </span>
                      </div>
                    </td>
                    <td className="py-2 px-3">
                      <RoleBadge role={'Technician'} />
                    </td>
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-2">
                        {editingId === s._id ? (
                          <button
                            onClick={saveEdit}
                            className="p-1.5 rounded-md hover:bg-emerald-100 text-emerald-700"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => startEdit(s._id)}
                            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-600"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteStaff(s._id)}
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
