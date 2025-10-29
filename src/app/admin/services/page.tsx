'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { listServices, type ServiceItem } from '@/lib/api/admin/services';
import { ArrowLeft, Settings2, PlusCircle, Save, Search, Wrench, Pencil, Trash2 } from 'lucide-react';

export default function AdminServicesPage() {
  const router = useRouter();
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await listServices();
        if (!mounted) return;
        setServices(data || []);
      } catch (e) {
        setError('Không thể tải danh sách dịch vụ');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const filtered = services.filter(s =>
    (s.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (s.type || '').toLowerCase().includes(search.toLowerCase())
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
                    <td className="py-2 px-3">{s.type || '—'}</td>
                    <td className="py-2 px-3">{s.price ? s.price.toLocaleString('vi-VN') : '—'}</td>
                    <td className="py-2 px-3">{s.duration ? `${s.duration} phút` : '—'}</td>
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-600" title="Sửa">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-md hover:bg-gray-100 text-red-500" title="Xóa">
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

        {/* Create (placeholder UI) */}
        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <h2 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-emerald-600" />
            Thêm dịch vụ (demo UI)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-sm">
            <input type="text" placeholder="Tên dịch vụ" className="border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500" />
            <input type="text" placeholder="Loại" className="border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500" />
            <input type="number" placeholder="Giá" className="border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500" />
            <input type="number" placeholder="Thời lượng (phút)" className="border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500" />
            <input type="text" placeholder="Mô tả" className="border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500" />
          </div>
          <div className="mt-3 flex justify-end">
            <button className="inline-flex items-center bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition text-sm">
              <Save className="w-4 h-4 mr-1" />
              Lưu dịch vụ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


