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
  Gauge,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TechnicianDashboardPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState([
    {
      id: 'SO001',
      customer: 'Nguyễn Văn A',
      vehicle: 'VinFast Feliz S',
      plate: '99A-123.45',
      service: 'Kiểm tra hệ thống điện',
      assignedAt: '08:30',
      progress: 90,
      status: 'Hoàn tất',
    },
    {
      id: 'SO002',
      customer: 'Trần Thị B',
      vehicle: 'VinFast Klara A2',
      plate: '30B-456.78',
      service: 'Thay pin & kiểm tra sạc',
      assignedAt: '09:00',
      progress: 60,
      status: 'Đang thực hiện',
    },
    {
      id: 'SO003',
      customer: 'Phạm Minh C',
      vehicle: 'VinFast Evo 200',
      plate: '22C-789.12',
      service: 'Bảo dưỡng định kỳ',
      assignedAt: '09:45',
      progress: 35,
      status: 'Đang thực hiện',
    },
    {
      id: 'SO004',
      customer: 'Lê Văn D',
      vehicle: 'VinFast Feliz S',
      plate: '37D-234.56',
      service: 'Kiểm tra hệ thống phanh',
      assignedAt: '10:15',
      progress: 0,
      status: 'Chờ xử lý',
    },
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="relative bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-6 max-w-6xl flex items-center gap-3">
          <button
            onClick={() => router.push('/staff/dashboard')}
            className="flex items-center text-emerald-700 hover:text-emerald-800 transition"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span className="text-sm font-medium">Trang nhân viên</span>
          </button>

          <div className="ml-auto flex items-center gap-2">
            <Wrench className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-gray-500">Bảng điều khiển kỹ thuật viên</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-6 py-6 max-w-6xl flex flex-col gap-6">
        {/* Tổng quan */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <CardStat
            icon={<Car className="w-6 h-6 text-emerald-700" />}
            label="Xe đang xử lý"
            value={tasks.filter((t) => t.status === 'Đang thực hiện').length}
          />
          <CardStat
            icon={<CheckCircle2 className="w-6 h-6 text-blue-700" />}
            label="Hoàn tất hôm nay"
            value={tasks.filter((t) => t.status === 'Hoàn tất').length}
          />
          <CardStat
            icon={<AlertTriangle className="w-6 h-6 text-yellow-600" />}
            label="Chờ xử lý"
            value={tasks.filter((t) => t.status === 'Chờ xử lý').length}
          />
          <CardStat
            icon={<Gauge className="w-6 h-6 text-emerald-700" />}
            label="Tiến độ TB (%)"
            value={Math.round(tasks.reduce((a, b) => a + b.progress, 0) / tasks.length)}
          />
        </div>

        {/* Danh sách xe */}
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-emerald-600" />
            Danh sách xe được phân công
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-gray-600 border-b bg-gray-50">
                <tr>
                  <th className="text-left py-2 px-3">Mã phiếu</th>
                  <th className="text-left py-2 px-3">Khách hàng</th>
                  <th className="text-left py-2 px-3">Xe / Biển số</th>
                  <th className="text-left py-2 px-3">Dịch vụ</th>
                  <th className="text-left py-2 px-3">Phân công</th>
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
                    <td className="py-2 px-3">{t.customer}</td>
                    <td className="py-2 px-3">
                      <span className="font-medium">{t.vehicle}</span>
                      <br />
                      <span className="text-xs text-gray-500">{t.plate}</span>
                    </td>
                    <td className="py-2 px-3">{t.service}</td>
                    <td className="py-2 px-3 text-gray-500">{t.assignedAt}</td>

                    {/* Thanh tiến độ bằng div */}
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              t.progress >= 80
                                ? 'bg-emerald-600'
                                : t.progress >= 40
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
                      <StatusBadge status={t.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

/* ====== COMPONENT: CardStat ====== */
function CardStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
}) {
  return (
    <div className="bg-white p-4 rounded-xl border shadow-sm flex items-center gap-3">
      <div className="p-3 bg-emerald-100 rounded-full">{icon}</div>
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <p className="text-lg font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

/* ====== COMPONENT: StatusBadge ====== */
function StatusBadge({ status }: { status: string }) {
  let color =
    status === 'Hoàn tất'
      ? 'bg-emerald-100 text-emerald-700'
      : status === 'Đang thực hiện'
      ? 'bg-yellow-100 text-yellow-700'
      : 'bg-gray-100 text-gray-600';
  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1 ${color}`}
    >
      {status === 'Hoàn tất' && <CheckCircle2 className="w-3 h-3" />}
      {status === 'Đang thực hiện' && <Clock className="w-3 h-3" />}
      {status === 'Chờ xử lý' && <XCircle className="w-3 h-3" />}
      {status}
    </span>
  );
}
