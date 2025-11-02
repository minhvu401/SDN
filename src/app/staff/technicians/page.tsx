"use client";
import React, { useState, useEffect } from "react";
import { UserCheck, Edit, Eye, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { getActiveTechnicians } from "@/lib/api/staff/booking";

export default function StaffTechniciansPage() {
  const router = useRouter();
  // removed search/filter/add controls per request
  const [selectedTechnician, setSelectedTechnician] = useState<any | null>(null);

  const [technicians, setTechnicians] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getActiveTechnicians();
        if (res && res.success) {
          // keep the data as-is; UI will pick required fields
          setTechnicians(res.data || []);
        }
      } catch (err) {
        console.error("load technicians", err);
      }
    };
    load();
  }, []);

  // no client-side filtering/search — render full list
  const filtered = technicians;

  const getStatusColor = (isActive: boolean | undefined) => {
    if (isActive === true) return "text-green-700 bg-green-100";
    if (isActive === false) return "text-gray-700 bg-gray-100";
    return "text-gray-700 bg-gray-100";
  };

  const getCertificationStatusColor = (status: string) => {
    switch (status) {
      case 'Valid': return 'text-green-700 bg-green-100';
      case 'Expiring': return 'text-yellow-700 bg-yellow-100';
      case 'Expired': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Quản lý kỹ thuật viên
                </h1>
                <p className="text-gray-600 text-sm">
                  Quản lý nhân sự, chứng chỉ và hiệu suất kỹ thuật viên
                </p>
              </div>
            </div>
            {/* header counters removed */}
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* filters/search/add removed */}
          </div>
        </div>
      </div>

      {/* Technicians List */}
      <div className="container mx-auto px-6 py-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((tech: any) => (
              <div key={tech.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                      <UserCheck className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{tech.fullName || tech.name}</h3>
                      <p className="text-sm text-gray-500">{tech.role || ''}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tech.isActive)}`}>
                    {tech.isActive ? 'Hoạt động' : 'Không hoạt động'}
                  </span>
                </div>

                <div className="mb-4 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">SĐT</span>
                    <span className="font-medium">{tech.phone || '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Thâm niên</span>
                    <span className="font-medium">{tech.yearsOfExperience ?? tech.experience ?? '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Gia nhập</span>
                    <span className="font-medium">{tech.joinDate ? new Date(tech.joinDate).toLocaleDateString('vi-VN') : '—'}</span>
                  </div>
                </div>

                {tech.specialization && tech.specialization.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Chuyên môn</h4>
                    <div className="flex flex-wrap gap-2">
                      {tech.specialization.map((s: string, i: number) => (
                        <span key={i} className="px-2 py-1 bg-blue-50 text-blue-800 text-xs rounded-full">{s}</span>
                      ))}
                    </div>
                  </div>
                )}

                {tech.bio && (
                  <div className="mb-4 text-sm text-gray-700">
                    <div className="text-gray-500 text-xs">Mô tả</div>
                    <div className="mt-1">{tech.bio}</div>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedTechnician(tech)}
                    className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Chi tiết
                  </button>
                  <button className="px-3 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded hover:bg-blue-200 transition">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
      </div>

      {/* Technician Detail Modal */}
      {selectedTechnician && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Chi tiết kỹ thuật viên</h3>
              <button
                onClick={() => setSelectedTechnician(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Thông tin chung</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">ID</div>
                    <div className="font-medium">{selectedTechnician.id}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Họ tên</div>
                    <div className="font-medium">{selectedTechnician.fullName}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">SĐT</div>
                    <div className="font-medium">{selectedTechnician.phone}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Vai trò</div>
                    <div className="font-medium">{selectedTechnician.role}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Thâm niên</div>
                    <div className="font-medium">{selectedTechnician.yearsOfExperience ?? '—'}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Gia nhập</div>
                    <div className="font-medium">{selectedTechnician.joinDate ? new Date(selectedTechnician.joinDate).toLocaleDateString('vi-VN') : '—'}</div>
                  </div>
                </div>
              </div>

              {selectedTechnician.specialization && selectedTechnician.specialization.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Chuyên môn</h4>
                  <div className="flex flex-wrap gap-2 text-sm">
                    {selectedTechnician.specialization.map((s: string, i: number) => (
                      <span key={i} className="px-2 py-1 bg-blue-50 text-blue-800 text-xs rounded-full">{s}</span>
                    ))}
                  </div>
                </div>
              )}

              {selectedTechnician.bio && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Tiểu sử</h4>
                  <div className="text-sm text-gray-800">{selectedTechnician.bio}</div>
                </div>
              )}

              <div className="flex gap-3 mt-4">
                <button onClick={() => setSelectedTechnician(null)} className="flex-1 px-4 py-2 bg-gray-100 rounded-md">Đóng</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
