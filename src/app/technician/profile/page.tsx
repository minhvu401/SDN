'use client';
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  ArrowLeft,
  User,
  Wrench,
  FileBadge,
  Clock,
  BookCheck,
  Save,
  PlusCircle,
  Star,
  Calendar,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TechnicianProfilePage() {
  const router = useRouter();

  // ====== DỮ LIỆU GIẢ LẬP ======
  const [profile, setProfile] = useState({
    name: 'Nguyễn Văn A',
    position: 'Kỹ thuật viên cao cấp',
    startDate: '2022-05-15',
    totalHours: 2680,
  });

  const [skills, setSkills] = useState([
    { id: 1, name: 'Chẩn đoán hệ thống điện', level: 5 },
    { id: 2, name: 'Bảo dưỡng pin & sạc', level: 4 },
    { id: 3, name: 'Hệ thống phanh & lốp', level: 3 },
    { id: 4, name: 'Phần mềm điều khiển', level: 4 },
  ]);

  const [certificates, setCertificates] = useState([
    { id: 'C001', title: 'Chứng chỉ Bảo dưỡng xe điện cơ bản', date: '2023-03-10' },
    { id: 'C002', title: 'Chứng chỉ Kỹ thuật viên VinFast EV', date: '2024-01-05' },
  ]);

  const [newCert, setNewCert] = useState({ title: '', date: '' });

  const addCertificate = () => {
    if (!newCert.title || !newCert.date) {
      alert('⚠️ Nhập đầy đủ thông tin chứng chỉ!');
      return;
    }
    const id = 'C' + (certificates.length + 1).toString().padStart(3, '0');
    setCertificates([...certificates, { id, ...newCert }]);
    setNewCert({ title: '', date: '' });
  };

  const handleSave = () => {
    alert('✅ Hồ sơ đã được lưu!');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* HEADER */}
      <div className="relative bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-6 max-w-5xl flex items-center gap-3">
          <button
            onClick={() => router.push('/technician/dashboard')}
            className="flex items-center text-emerald-700 hover:text-emerald-800 transition"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span className="text-sm font-medium">Trang kỹ thuật viên</span>
          </button>

          <div className="ml-auto flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-gray-500">Hồ sơ cá nhân</span>
          </div>
        </div>
      </div>

      {/* NỘI DUNG CHÍNH */}
      <div className="container mx-auto px-6 py-6 max-w-5xl flex flex-col gap-6">
        {/* Thông tin cơ bản */}
        <div className="bg-white rounded-xl border shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-emerald-600" />
            Thông tin kỹ thuật viên
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
            <p><b>Họ và tên:</b> {profile.name}</p>
            <p><b>Chức vụ:</b> {profile.position}</p>
            <p><b>Ngày bắt đầu làm việc:</b> {profile.startDate}</p>
            <p>
              <b>Tổng giờ làm việc:</b> {profile.totalHours.toLocaleString()} giờ
            </p>
          </div>
        </div>

        {/* Năng lực chuyên môn */}
        <div className="bg-white rounded-xl border shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <BookCheck className="w-5 h-5 text-emerald-600" />
            Năng lực & kỹ năng chuyên môn
          </h2>

          <div className="space-y-3">
            {skills.map((s) => (
              <div key={s.id} className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-800">{s.name}</span>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < s.level ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chứng chỉ chuyên môn */}
        <div className="bg-white rounded-xl border shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FileBadge className="w-5 h-5 text-emerald-600" />
            Chứng chỉ & đào tạo
          </h2>

          <div className="overflow-x-auto mb-3">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 border-b">
                <tr>
                  <th className="text-left py-2 px-3">Mã</th>
                  <th className="text-left py-2 px-3">Tên chứng chỉ</th>
                  <th className="text-left py-2 px-3">Ngày cấp</th>
                </tr>
              </thead>
              <tbody>
                {certificates.map((c) => (
                  <tr key={c.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-3 font-medium text-gray-800">{c.id}</td>
                    <td className="py-2 px-3">{c.title}</td>
                    <td className="py-2 px-3">{c.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Form thêm chứng chỉ */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
            <input
              type="text"
              value={newCert.title}
              onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
              placeholder="Tên chứng chỉ..."
              className="border rounded-md px-3 py-2 text-sm focus:ring-emerald-500 focus:border-emerald-500"
            />
            <input
              type="date"
              value={newCert.date}
              onChange={(e) => setNewCert({ ...newCert, date: e.target.value })}
              className="border rounded-md px-3 py-2 text-sm focus:ring-emerald-500 focus:border-emerald-500"
            />
            <button
              onClick={addCertificate}
              className="inline-flex items-center justify-center bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition text-sm"
            >
              <PlusCircle className="w-4 h-4 mr-1" />
              Thêm chứng chỉ
            </button>
          </div>
        </div>

        {/* Thời gian làm việc */}
        <div className="bg-white rounded-xl border shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-600" />
            Thời gian & lịch sử làm việc
          </h2>

          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li>2022 – Gia nhập trung tâm EV Care Bắc Ninh</li>
            <li>2023 – Hoàn thành 180 giờ đào tạo nâng cao về pin & động cơ điện</li>
            <li>2024 – Kỹ thuật viên chính nhóm bảo dưỡng xe điện VinFast</li>
          </ul>
        </div>

        {/* Nút lưu */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-5 py-2 rounded-md hover:bg-emerald-700 transition"
          >
            <Save className="w-4 h-4" />
            Lưu hồ sơ
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
