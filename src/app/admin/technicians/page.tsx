'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { listTechnicians, type TechnicianItem } from '@/lib/api/admin/technicians';
import { ArrowLeft, UserCog, Search, CheckCircle2, XCircle, Pencil, Trash2 } from 'lucide-react';

export default function AdminTechniciansPage() {
  const router = useRouter();
  const [technicians, setTechnicians] = useState<TechnicianItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await listTechnicians();
        if (!mounted) return;
        if (Array.isArray(data)) {
          setTechnicians(data);
        } else if (data && typeof data === 'object' && 'data' in data && Array.isArray((data as any).data)) {
          setTechnicians((data as any).data);
        } else {
          setTechnicians([]);
        }
      } catch (e) {
        setError('Không thể tải danh sách kỹ thuật viên');
        setTechnicians([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const filtered = Array.isArray(technicians) ? technicians.filter(t =>
    (t.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (t.email || '').toLowerCase().includes(search.toLowerCase()) ||
    (t.phone || '').toLowerCase().includes(search.toLowerCase()) ||
    (t.specializations || []).some(spec => spec.toLowerCase().includes(search.toLowerCase()))
  ) : [];

  return (
    <div className="min-h-screen bg-gray-50">
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
            <span className="text-sm text-gray-500">Quản lý kỹ thuật viên</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl py-8">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, email, số điện thoại hoặc chuyên môn..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Đang tải...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
            {error}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12">
            <UserCog className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Chưa có kỹ thuật viên nào</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số điện thoại</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chuyên môn</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filtered.map((tech) => (
                    <tr key={tech._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                            <UserCog className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{tech.name || 'N/A'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {tech.email || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {tech.phone || '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
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
                          '-'
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {tech.isActive ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle2 className="w-4 h-4" />
                            Hoạt động
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <XCircle className="w-4 h-4" />
                            Không hoạt động
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button className="text-emerald-600 hover:text-emerald-800">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-800">
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
        )}
      </div>
    </div>
  );
}
