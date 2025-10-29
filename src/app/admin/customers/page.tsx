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
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { listCustomers, type CustomerItem } from '@/lib/api/admin/customers';

export default function AdminCustomersPage() {
  const router = useRouter();

  const [customers, setCustomers] = useState<CustomerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await listCustomers();
        if (!mounted) return;
        setCustomers(res.data || []);
      } catch (err: unknown) {
        setError('Không thể tải danh sách khách hàng');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const [search, setSearch] = useState('');
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    vehicle: '',
    plate: '',
  });

  const addCustomer = () => {
    if (!newCustomer.name || !newCustomer.phone) {
      alert('⚠️ Nhập ít nhất họ tên và số điện thoại!');
      return;
    }
    const id = 'C' + (customers.length + 1).toString().padStart(3, '0');
    const newEntry = {
      id,
      name: newCustomer.name,
      email: newCustomer.email,
      phone: newCustomer.phone,
      vehicles: [
        { model: newCustomer.vehicle, plate: newCustomer.plate, lastService: 'Chưa có' },
      ],
    };
    setCustomers((prev) => [...prev, newEntry]);
    setNewCustomer({ name: '', email: '', phone: '', vehicle: '', plate: '' });
  };

  const deleteCustomer = (id: string) => {
    if (confirm('Xác nhận xóa khách hàng này?')) {
      setCustomers((prev) => prev.filter((c) => c.id !== id));
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
            <User className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-gray-500">Quản lý khách hàng & xe</span>
          </div>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="container mx-auto px-6 py-6 max-w-6xl flex flex-col gap-6">
        {/* Form thêm khách hàng */}
        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <h2 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <FilePlus2 className="w-5 h-5 text-emerald-600" />
            Thêm khách hàng mới
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-sm">
            <input
              type="text"
              placeholder="Họ tên"
              value={newCustomer.name}
              onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
              className="border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={newCustomer.email}
              onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
              className="border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            <input
              type="text"
              placeholder="Số điện thoại"
              value={newCustomer.phone}
              onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
              className="border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            <input
              type="text"
              placeholder="Xe (model)"
              value={newCustomer.vehicle}
              onChange={(e) => setNewCustomer({ ...newCustomer, vehicle: e.target.value })}
              className="border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            <input
              type="text"
              placeholder="Biển số"
              value={newCustomer.plate}
              onChange={(e) => setNewCustomer({ ...newCustomer, plate: e.target.value })}
              className="border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div className="mt-3 flex justify-end">
            <button
              onClick={addCustomer}
              className="inline-flex items-center bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition text-sm"
            >
              <Save className="w-4 h-4 mr-1" />
              Lưu khách hàng
            </button>
          </div>
        </div>

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
                          title="Chỉnh sửa"
                          className="p-1.5 rounded-md hover:bg-gray-100 text-gray-600"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          title="Xóa khách hàng"
                          onClick={() => deleteCustomer(c.id)}
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
