'use client';
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  User,
  Car,
  History,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  Send,
  ArrowLeft,
  Search,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function StaffCustomersPage() {
  const router = useRouter();

  const [customers] = useState([
    {
      id: 'C001',
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      phone: '0987654321',
      address: '123 Lý Thái Tổ, Bắc Ninh',
      vehicle: 'VinFast Feliz S',
      plate: '99A-123.45',
      lastService: '25/10/2025',
      status: 'Đang bảo dưỡng',
      history: [
        { date: '10/09/2025', service: 'Bảo dưỡng định kỳ', result: 'Hoàn tất' },
        { date: '25/10/2025', service: 'Kiểm tra hệ thống điện', result: 'Đang bảo dưỡng' },
      ],
    },
    {
      id: 'C002',
      name: 'Trần Thị B',
      email: 'tranthib@example.com',
      phone: '0911222333',
      address: '45 Lê Lợi, Hà Nội',
      vehicle: 'VinFast Klara A2',
      plate: '30B-456.78',
      lastService: '24/10/2025',
      status: 'Hoàn tất',
      history: [
        { date: '10/07/2025', service: 'Thay thế pin', result: 'Hoàn tất' },
        { date: '24/10/2025', service: 'Kiểm tra phanh & lốp', result: 'Hoàn tất' },
      ],
    },
  ]);

  const [selected, setSelected] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.vehicle.toLowerCase().includes(search.toLowerCase())
  );

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    alert(`Đã gửi tin nhắn tới ${selected.name}: "${message}"`);
    setMessage('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="relative bg-white border-b border-gray-200 py-10 text-center">
        <button
          onClick={() => router.push('/staff/dashboard')}
          className="absolute top-5 left-6 flex items-center text-emerald-700 hover:text-emerald-800 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span className="text-sm font-medium">Về bảng điều khiển</span>
        </button>

        <h1 className="text-3xl font-bold text-emerald-700 font-display">
          Hồ sơ khách hàng EV Care
        </h1>
        <p className="text-gray-600 mt-2">
          Xem lịch sử bảo dưỡng, thông tin xe và liên hệ trực tiếp với khách hàng
        </p>
      </div>

      {/* Nội dung chính */}
      <div className="container mx-auto max-w-6xl px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Danh sách khách hàng */}
        <div className="lg:col-span-1 bg-white shadow border border-gray-100 rounded-xl p-5">
          <div className="relative mb-4">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm theo tên, SĐT, xe..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-2 border rounded-md text-sm w-full focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <div className="space-y-3 max-h-[550px] overflow-y-auto">
            {filtered.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-10">
                Không tìm thấy khách hàng.
              </p>
            )}

            {filtered.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelected(c)}
                className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition ${
                  selected?.id === c.id ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="font-medium text-gray-800">{c.name}</p>
                    <p className="text-xs text-gray-500">{c.vehicle}</p>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Lần gần nhất: {c.lastService}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Thông tin chi tiết */}
        <div className="lg:col-span-2 bg-white shadow border border-gray-100 rounded-xl p-6 min-h-[500px]">
          {!selected ? (
            <div className="text-center text-gray-500 py-20">
              <User className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p>Chọn một khách hàng để xem chi tiết</p>
            </div>
          ) : (
            <>
              {/* Thông tin chung */}
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-emerald-700 flex items-center gap-2">
                  <User className="w-5 h-5" /> {selected.name}
                </h2>
                <span
                  className={`text-xs px-3 py-1 rounded-full border ${
                    selected.status === 'Hoàn tất'
                      ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                      : 'text-amber-700 bg-amber-50 border-amber-200'
                  }`}
                >
                  {selected.status}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700 mb-6">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" /> {selected.phone}
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" /> {selected.email}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" /> {selected.address}
                </p>
                <p className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-gray-500" /> {selected.vehicle} – {selected.plate}
                </p>
              </div>

              {/* Lịch sử bảo dưỡng */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <History className="w-4 h-4 text-emerald-600" /> Lịch sử bảo dưỡng
                </h3>
                <div className="border rounded-lg p-3 bg-gray-50 space-y-2">
                  {selected.history.map((h: any, i: number) => (
                    <div
                      key={i}
                      className="flex justify-between text-sm border-b last:border-0 border-gray-200 pb-2"
                    >
                      <span>{h.date} – {h.service}</span>
                      <span
                        className={`${
                          h.result === 'Hoàn tất'
                            ? 'text-emerald-600'
                            : 'text-amber-600'
                        } font-medium`}
                      >
                        {h.result}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gửi tin nhắn */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-600" /> Trao đổi nhanh
                </h3>
                <form onSubmit={sendMessage} className="flex gap-2">
                  <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Nhập tin nhắn..."
                    className="flex-1 border rounded-md p-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition text-sm"
                  >
                    <Send className="w-4 h-4 mr-1" /> Gửi
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
