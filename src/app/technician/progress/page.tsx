'use client';
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  ArrowLeft,
  Wrench,
  Car,
  ClipboardCheck,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Save,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TechnicianProgressPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState([
    {
      id: 'SO001',
      vehicle: 'VinFast Feliz S',
      plate: '99A-123.45',
      service: 'Kiểm tra hệ thống điện',
      status: 'Hoàn tất',
      progress: 100,
    },
    {
      id: 'SO002',
      vehicle: 'VinFast Klara A2',
      plate: '30B-456.78',
      service: 'Thay pin & kiểm tra sạc',
      status: 'Đang làm',
      progress: 60,
    },
    {
      id: 'SO003',
      vehicle: 'VinFast Evo 200',
      plate: '22C-789.12',
      service: 'Bảo dưỡng định kỳ',
      status: 'Chờ',
      progress: 0,
    },
  ]);

  const updateStatus = (id: string, newStatus: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const progress =
            newStatus === 'Hoàn tất' ? 100 : newStatus === 'Đang làm' ? 50 : 0;
          return { ...t, status: newStatus, progress };
        }
        return t;
      })
    );
  };

  const handleSave = () => {
    alert('✅ Đã lưu tiến độ cập nhật!');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="relative bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-6 max-w-5xl flex items-center gap-3">
          <button
            onClick={() => router.push('/technician/dashboard')}
            className="flex items-center text-emerald-700 hover:text-emerald-800 transition"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span className="text-sm font-medium">Trở lại bảng điều khiển</span>
          </button>

          <div className="ml-auto flex items-center gap-2">
            <Wrench className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-gray-500">Cập nhật tiến độ</span>
          </div>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="container mx-auto px-6 py-6 max-w-5xl flex flex-col gap-6">
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-emerald-600" />
            Danh sách phiếu & tiến độ
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 border-b">
                <tr>
                  <th className="text-left py-2 px-3">Mã phiếu</th>
                  <th className="text-left py-2 px-3">Xe / Biển số</th>
                  <th className="text-left py-2 px-3">Dịch vụ</th>
                  <th className="text-left py-2 px-3 w-40">Tiến độ</th>
                  <th className="text-left py-2 px-3">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((t) => (
                  <tr
                    key={t.id}
                    className="border-b hover:bg-gray-50 transition-colors duration-100"
                  >
                    <td className="py-2 px-3 font-medium text-gray-800">{t.id}</td>
                    <td className="py-2 px-3">
                      <span className="font-medium">{t.vehicle}</span>
                      <br />
                      <span className="text-xs text-gray-500">{t.plate}</span>
                    </td>
                    <td className="py-2 px-3">{t.service}</td>
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              t.progress >= 100
                                ? 'bg-emerald-600'
                                : t.progress >= 50
                                ? 'bg-yellow-400'
                                : 'bg-gray-400'
                            }`}
                            style={{ width: `${t.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600">{t.progress}%</span>
                      </div>
                    </td>
                    <td className="py-2 px-3">
                      <select
                        value={t.status}
                        onChange={(e) => updateStatus(t.id, e.target.value)}
                        className="border rounded-md px-2 py-1 text-sm focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        <option value="Chờ">Chờ</option>
                        <option value="Đang làm">Đang làm</option>
                        <option value="Hoàn tất">Hoàn tất</option>
                      </select>
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
              Lưu tiến độ
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
