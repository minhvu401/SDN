'use client';
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  ArrowLeft,
  ClipboardCheck,
  Wrench,
  Car,
  Battery,
  Gauge,
  PlugZap,
  ThermometerSun,
  Save,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';

export default function TechnicianTaskDetailPage() {
  const router = useRouter();
  const params = useParams();
  const taskId = params?.id;

  const [checklist, setChecklist] = useState({
    battery: true,
    brakes: false,
    lights: true,
    motor: true,
    tire: false,
    software: true,
  });

  const [notes, setNotes] = useState(
    'Xe có hiện tượng pin yếu, cần kiểm tra cáp sạc và đầu kết nối. Dự kiến thay cell pin nếu cần.'
  );
  const [images, setImages] = useState<File[]>([]);

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImages((prev) => [...prev, ...Array.from(files)]);
    }
  };

  const handleSave = () => {
    alert('✅ Đã lưu cập nhật cho phiếu ' + taskId);
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
            <span className="text-sm text-gray-500">Chi tiết phiếu: {taskId}</span>
          </div>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="container mx-auto px-6 py-6 max-w-5xl flex flex-col gap-6">
        {/* Thông tin xe */}
        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-3">
            <Car className="w-5 h-5 text-emerald-600" />
            Thông tin xe
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
            <p>
              <b>Khách hàng:</b> Nguyễn Văn A
            </p>
            <p>
              <b>Dòng xe:</b> VinFast Feliz S
            </p>
            <p>
              <b>Biển số:</b> 99A-123.45
            </p>
            <p>
              <b>Dịch vụ:</b> Kiểm tra hệ thống điện
            </p>
          </div>
        </div>

        {/* Checklist kỹ thuật */}
        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-3">
            <ClipboardCheck className="w-5 h-5 text-emerald-600" />
            Checklist kỹ thuật
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(checklistItems).map(([key, item]) => (
              <label
                key={key}
                className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition ${
                  checklist[key as keyof typeof checklist]
                    ? 'bg-emerald-50 border-emerald-300'
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checklist[key as keyof typeof checklist]}
                  onChange={() => toggleCheck(key as keyof typeof checklist)}
                  className="w-4 h-4 accent-emerald-600"
                />
                <span className="flex items-center gap-2 text-sm text-gray-800">
                  {item.icon}
                  {item.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Ghi chú tình trạng */}
        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-3">
            <FileText className="w-5 h-5 text-emerald-600" />
            Ghi chú tình trạng xe
          </h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full border rounded-md px-3 py-2 text-sm focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Nhập ghi chú chi tiết..."
          ></textarea>
        </div>

        {/* Ảnh minh họa */}
        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-3">
            <ImageIcon className="w-5 h-5 text-emerald-600" />
            Ảnh minh họa & bằng chứng
          </h2>

          <div className="flex flex-wrap gap-3">
            {images.map((img, i) => (
              <div key={i} className="relative">
                <img
                  src={URL.createObjectURL(img)}
                  alt={img.name}
                  className="w-40 h-28 object-cover rounded-lg border"
                />
              </div>
            ))}

            <label className="w-40 h-28 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-xs text-gray-500 cursor-pointer hover:border-emerald-400 hover:text-emerald-600 transition">
              <ImageIcon className="w-6 h-6 mb-1" />
              Thêm ảnh
              <input type="file" multiple accept="image/*" onChange={handleImage} className="hidden" />
            </label>
          </div>
        </div>

        {/* Nút lưu */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-5 py-2 rounded-md hover:bg-emerald-700 transition"
          >
            <Save className="w-4 h-4" />
            Lưu cập nhật
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

/* === Danh sách mục checklist === */
const checklistItems: Record<
  string,
  { label: string; icon: React.ReactNode }
> = {
  battery: { label: 'Kiểm tra pin & sạc', icon: <Battery className="w-4 h-4 text-emerald-600" /> },
  brakes: { label: 'Kiểm tra phanh', icon: <AlertTriangle className="w-4 h-4 text-yellow-600" /> },
  lights: { label: 'Đèn & tín hiệu', icon: <PlugZap className="w-4 h-4 text-blue-600" /> },
  motor: { label: 'Động cơ điện', icon: <Gauge className="w-4 h-4 text-gray-600" /> },
  tire: { label: 'Lốp xe & áp suất', icon: <Wrench className="w-4 h-4 text-gray-600" /> },
  software: { label: 'Phần mềm điều khiển', icon: <ThermometerSun className="w-4 h-4 text-orange-500" /> },
};
