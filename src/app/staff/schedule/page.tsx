'use client';
import React, { useState } from 'react';
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
      status: 'active',
      tasks: ['Bảo dưỡng định kỳ', 'Kiểm tra hệ thống điện'],
    },
    {
      id: 'S2',
      shift: 'Ca chiều',
      time: '13:00 – 17:00',
      date: '25/10/2025',
      technicians: ['Phạm Minh C'],
      capacity: 3,
      status: 'active',
      tasks: ['Thay thế pin', 'Sửa chữa phanh'],
    },
    {
      id: 'S3',
      shift: 'Ca tối',
      time: '18:00 – 21:00',
      date: '25/10/2025',
      technicians: [],
      capacity: 2,
      status: 'inactive',
      tasks: [],
    },
    {
      id: 'S4',
      shift: 'Ca sáng',
      time: '07:30 – 11:30',
      date: '26/10/2025',
      technicians: ['Lê Văn D', 'Hoàng Thị E'],
      capacity: 3,
      status: 'active',
      tasks: ['Bảo dưỡng toàn diện', 'Kiểm tra lốp'],
    },
    {
      id: 'S5',
      shift: 'Ca chiều',
      time: '13:00 – 17:00',
      date: '26/10/2025',
      technicians: ['Nguyễn Văn A'],
      capacity: 3,
      status: 'active',
      tasks: ['Kiểm tra hệ thống điện'],
    },
  ]);

  const [newTech, setNewTech] = useState('');
  const [selectedShift, setSelectedShift] = useState('');
  const [selectedDate, setSelectedDate] = useState('25/10/2025');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [showAddShift, setShowAddShift] = useState(false);
  const [newShift, setNewShift] = useState({
    shift: '',
    time: '',
    date: '',
    capacity: 3,
  });

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

  const handleAddShift = () => {
    if (!newShift.shift || !newShift.time || !newShift.date) {
      alert('⚠️ Vui lòng điền đủ thông tin ca làm!');
      return;
    }
    const newSchedule = {
      id: 'S' + (schedules.length + 1),
      ...newShift,
      technicians: [],
      status: 'active',
      tasks: [],
    };
    setSchedules([...schedules, newSchedule]);
    setNewShift({ shift: '', time: '', date: '', capacity: 3 });
    setShowAddShift(false);
  };

  const removeTechnician = (scheduleId: string, techName: string) => {
    setSchedules((prev) =>
      prev.map((s) =>
        s.id === scheduleId
          ? { ...s, technicians: s.technicians.filter((t) => t !== techName) }
          : s
      )
    );
  };

  const toggleShiftStatus = (scheduleId: string) => {
    setSchedules((prev) =>
      prev.map((s) =>
        s.id === scheduleId
          ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' }
          : s
      )
    );
  };

  const filteredSchedules = schedules.filter((s) => s.date === selectedDate);

  return (
    <div className="min-h-screen bg-gray-50">

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
        {/* Controls */}
        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-emerald-600" />
                Quản lý lịch làm việc
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1 rounded-md text-sm ${
                    viewMode === 'list' 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Danh sách
                </button>
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`px-3 py-1 rounded-md text-sm ${
                    viewMode === 'calendar' 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Lịch
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <input
                type="date"
                value={selectedDate.split('/').reverse().join('-')}
                onChange={(e) => setSelectedDate(e.target.value.split('-').reverse().join('/'))}
                className="border rounded-md px-3 py-2 text-sm focus:ring-emerald-500 focus:border-emerald-500"
              />
              <button
                onClick={() => setShowAddShift(true)}
                className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm"
              >
                <PlusCircle className="w-4 h-4 mr-1" />
                Thêm ca mới
              </button>
            </div>
          </div>

          {/* Phân công kỹ thuật viên */}
          <div className="mt-4 pt-4 border-t">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Phân công kỹ thuật viên</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <select
                value={selectedShift}
                onChange={(e) => setSelectedShift(e.target.value)}
                className="border rounded-md px-3 py-2 text-sm focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">-- Chọn ca làm --</option>
                {filteredSchedules.map((s) => (
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
        </div>

        {/* Danh sách ca làm */}
        <div className="bg-white rounded-xl border shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-600" />
            Lịch làm việc ngày {selectedDate}
          </h2>

          {viewMode === 'list' ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-600 border-b">
                  <tr>
                    <th className="text-left py-2 px-3">Ca</th>
                    <th className="text-left py-2 px-3">Thời gian</th>
                    <th className="text-left py-2 px-3">Kỹ thuật viên</th>
                    <th className="text-left py-2 px-3">Nhiệm vụ</th>
                    <th className="text-center py-2 px-3">Tình trạng</th>
                    <th className="text-center py-2 px-3">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSchedules.map((s) => {
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
                        <td className="py-2 px-3">
                          <div className="space-y-1">
                            {s.technicians.length > 0 ? (
                              s.technicians.map((t) => (
                                <div key={t} className="flex items-center justify-between">
                                  <span className="text-gray-800">{t}</span>
                                  <button
                                    onClick={() => removeTechnician(s.id, t)}
                                    className="text-red-500 hover:text-red-700 text-xs"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))
                            ) : (
                              <span className="text-gray-400 italic">Chưa có</span>
                            )}
                          </div>
                        </td>
                        <td className="py-2 px-3">
                          <div className="space-y-1">
                            {s.tasks.length > 0 ? (
                              s.tasks.map((task, idx) => (
                                <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                                  {task}
                                </span>
                              ))
                            ) : (
                              <span className="text-gray-400 italic text-xs">Chưa có</span>
                            )}
                          </div>
                        </td>
                        <td className="py-2 px-3 text-center">
                          <span
                            className={`px-3 py-1 text-xs rounded-full inline-flex items-center gap-1 ${color}`}
                          >
                            {status === 'Đủ người' && <CheckCircle2 className="w-3 h-3" />}
                            {status === 'Còn trống' && <AlertTriangle className="w-3 h-3" />}
                            {status === 'Trống' && <Circle className="w-3 h-3" />}
                            {status}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-center">
                          <button
                            onClick={() => toggleShiftStatus(s.id)}
                            className={`text-xs px-2 py-1 rounded ${
                              s.status === 'active'
                                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                            }`}
                          >
                            {s.status === 'active' ? 'Tắt' : 'Bật'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredSchedules.map((s) => {
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
                  <div key={s.id} className="border rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-800">{s.shift}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${color}`}>
                        {status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{s.time}</p>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">Kỹ thuật viên:</p>
                        {s.technicians.length > 0 ? (
                          <div className="space-y-1">
                            {s.technicians.map((t) => (
                              <div key={t} className="flex items-center justify-between text-sm">
                                <span>{t}</span>
                                <button
                                  onClick={() => removeTechnician(s.id, t)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-400 italic text-sm">Chưa có</span>
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">Nhiệm vụ:</p>
                        <div className="flex flex-wrap gap-1">
                          {s.tasks.map((task, idx) => (
                            <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                              {task}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex justify-between items-center mt-6 pt-4 border-t">
            <div className="text-sm text-gray-500">
              Tổng: {filteredSchedules.length} ca • 
              Đang hoạt động: {filteredSchedules.filter(s => s.status === 'active').length} ca
            </div>
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

      {/* Modal thêm ca mới */}
      {showAddShift && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Thêm ca làm mới
                </h3>
                <button
                  onClick={() => setShowAddShift(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Tên ca</label>
                  <input
                    type="text"
                    value={newShift.shift}
                    onChange={(e) => setNewShift({ ...newShift, shift: e.target.value })}
                    placeholder="Ví dụ: Ca sáng, Ca chiều..."
                    className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Thời gian</label>
                  <input
                    type="text"
                    value={newShift.time}
                    onChange={(e) => setNewShift({ ...newShift, time: e.target.value })}
                    placeholder="Ví dụ: 07:30 – 11:30"
                    className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Ngày</label>
                  <input
                    type="date"
                    value={newShift.date.split('/').reverse().join('-')}
                    onChange={(e) => setNewShift({ ...newShift, date: e.target.value.split('-').reverse().join('/') })}
                    className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Số lượng kỹ thuật viên tối đa</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={newShift.capacity}
                    onChange={(e) => setNewShift({ ...newShift, capacity: parseInt(e.target.value) })}
                    className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowAddShift(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleAddShift}
                    className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition"
                  >
                    Thêm ca
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
