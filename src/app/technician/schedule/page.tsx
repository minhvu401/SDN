'use client';
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Wrench,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Car,
  ClipboardCheck,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TechnicianSchedulePage() {
  const router = useRouter();

  // Dữ liệu mô phỏng: lịch làm việc cá nhân của kỹ thuật viên
  const [schedule, setSchedule] = useState([
    {
      id: 'S1',
      date: '25/10/2025',
      shift: 'Ca sáng',
      time: '07:30 – 11:30',
      vehicles: [
        { id: 'SO001', model: 'VinFast Feliz S', service: 'Kiểm tra hệ thống điện', status: 'Đang làm' },
      ],
    },
    {
      id: 'S2',
      date: '25/10/2025',
      shift: 'Ca chiều',
      time: '13:00 – 17:00',
      vehicles: [
        { id: 'SO002', model: 'VinFast Klara A2', service: 'Thay pin & kiểm tra sạc', status: 'Chưa bắt đầu' },
        { id: 'SO003', model: 'VinFast Evo 200', service: 'Bảo dưỡng định kỳ', status: 'Hoàn tất' },
      ],
    },
    {
      id: 'S3',
      date: '26/10/2025',
      shift: 'Ca sáng',
      time: '07:30 – 11:30',
      vehicles: [],
    },
  ]);

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
            <Calendar className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-gray-500">Lịch làm việc cá nhân</span>
          </div>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="container mx-auto px-6 py-6 max-w-6xl flex flex-col gap-6">
        {schedule.map((shift) => (
          <div key={shift.id} className="bg-white p-5 rounded-xl border shadow-sm">
            {/* Thông tin ca */}
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-600" />
                {shift.shift} ({shift.time})
              </h2>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Calendar className="w-4 h-4 text-gray-400" />
                {shift.date}
              </span>
            </div>

            {/* Danh sách xe */}
            {shift.vehicles.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50 text-gray-600 border-b">
                    <tr>
                      <th className="text-left py-2 px-3">Mã phiếu</th>
                      <th className="text-left py-2 px-3">Dòng xe</th>
                      <th className="text-left py-2 px-3">Dịch vụ</th>
                      <th className="text-left py-2 px-3">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shift.vehicles.map((v) => (
                      <tr key={v.id} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-3 font-medium text-gray-800">{v.id}</td>
                        <td className="py-2 px-3 flex items-center gap-2">
                          <Car className="w-4 h-4 text-emerald-600" />
                          {v.model}
                        </td>
                        <td className="py-2 px-3">{v.service}</td>
                        <td className="py-2 px-3">
                          <StatusBadge status={v.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">Chưa có xe được phân công trong ca này.</p>
            )}
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

/* ====== COMPONENT: StatusBadge ====== */
function StatusBadge({ status }: { status: string }) {
  let color =
    status === 'Hoàn tất'
      ? 'bg-emerald-100 text-emerald-700'
      : status === 'Đang làm'
      ? 'bg-yellow-100 text-yellow-700'
      : 'bg-gray-100 text-gray-600';
  let icon =
    status === 'Hoàn tất' ? (
      <CheckCircle2 className="w-3 h-3" />
    ) : status === 'Đang làm' ? (
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
