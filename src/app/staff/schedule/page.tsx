'use client';
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  Wrench,
  PlusCircle,
  CheckCircle2,
  AlertTriangle,
  UserPlus,
  Save,
  Circle,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function StaffSchedulePage() {
  const router = useRouter();

  const [schedules, setSchedules] = useState([
    {
      id: 'S1',
      shift: 'Ca sáng',
      time: '07:30 – 11:30',
      date: '25/10/2025',
      technicians: ['Nguyễn Văn A', 'Trần Thị B'],
      capacity: 3,
    },
    {
      id: 'S2',
      shift: 'Ca chiều',
      time: '13:00 – 17:00',
      date: '25/10/2025',
      technicians: ['Phạm Minh C'],
      capacity: 3,
    },
    {
      id: 'S3',
      shift: 'Ca tối',
      time: '18:00 – 21:00',
      date: '25/10/2025',
      technicians: [],
      capacity: 2,
    },
  ]);

  const [newTech, setNewTech] = useState('');
  const [selectedShift, setSelectedShift] = useState('');

  const handleAssign = () => {
    if (!newTech || !selectedShift) {
      alert('⚠️ Vui lòng chọn ca và nhập tên kỹ thuật viên!');
      return;
    }
    setSchedules((prev) =>
      prev.map((s) =>
        s.id === selectedShift && s.technicians.length < s.capacity
          ? { ...s, technicians: [...s.technicians, newTech] }
          : s
      )
    );
    setNewTech('');
    setSelectedShift('');
  };

  const handleSave = () => {
    alert('✅ Lịch làm việc đã được lưu!');
  };

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
            <Calendar className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-gray-500">Quản lý ca làm & phân công</span>
          </div>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="container mx-auto px-6 py-6 max-w-6xl flex flex-col gap-6">
        {/* Bộ lọc và thêm mới */}
        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <h2 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-emerald-600" />
            Phân công kỹ thuật viên
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <select
              value={selectedShift}
              onChange={(e) => setSelectedShift(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">-- Chọn ca làm --</option>
              {schedules.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.shift} ({s.time})
                </option>
              ))}
            </select>

            <input
              type="text"
              value={newTech}
              onChange={(e) => setNewTech(e.target.value)}
              placeholder="Nhập tên kỹ thuật viên..."
              className="border rounded-md px-3 py-2 text-sm focus:ring-emerald-500 focus:border-emerald-500"
            />

            <button
              onClick={handleAssign}
              className="inline-flex items-center justify-center bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition text-sm"
            >
              <PlusCircle className="w-4 h-4 mr-1" />
              Thêm vào ca
            </button>
          </div>
        </div>

        {/* Danh sách ca làm */}
        <div className="bg-white rounded-xl border shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-600" />
            Lịch làm việc trong ngày
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 border-b">
                <tr>
                  <th className="text-left py-2 px-3">Ca</th>
                  <th className="text-left py-2 px-3">Thời gian</th>
                  <th className="text-left py-2 px-3">Ngày</th>
                  <th className="text-left py-2 px-3">Kỹ thuật viên</th>
                  <th className="text-left py-2 px-3">Tình trạng</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((s) => {
                  const fillRatio = s.technicians.length / s.capacity;
                  const status =
                    fillRatio === 0
                      ? 'Trống'
                      : fillRatio < 1
                      ? 'Còn trống'
                      : 'Đủ người';
                  const color =
                    status === 'Trống'
                      ? 'bg-gray-100 text-gray-600'
                      : status === 'Còn trống'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-emerald-100 text-emerald-700';

                  return (
                    <tr key={s.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-3 font-medium text-gray-800">{s.shift}</td>
                      <td className="py-2 px-3">{s.time}</td>
                      <td className="py-2 px-3">{s.date}</td>
                      <td className="py-2 px-3">
                        {s.technicians.length > 0 ? (
                          <ul className="list-disc list-inside text-gray-800">
                            {s.technicians.map((t) => (
                              <li key={t}>{t}</li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-gray-400 italic">Chưa có</span>
                        )}
                      </td>
                      <td className="py-2 px-3">
                        <span
                          className={`px-3 py-1 text-xs rounded-full inline-flex items-center gap-1 ${color}`}
                        >
                          {status === 'Đủ người' && <CheckCircle2 className="w-3 h-3" />}
                          {status === 'Còn trống' && <AlertTriangle className="w-3 h-3" />}
                          {status === 'Trống' && <Circle className="w-3 h-3" />}
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-5 py-2 rounded-md hover:bg-emerald-700 transition"
            >
              <Save className="w-4 h-4" />
              Lưu lịch làm việc
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
