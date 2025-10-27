'use client';
import React, { useState } from 'react';
import {
  ClipboardCheck,
  Wrench,
  Battery,
  Gauge,
  CheckCircle2,
  XCircle,
  PlusCircle,
  ArrowLeft,
  Car,
  User,
  CalendarDays,
  Clock,
  Eye,
  Save,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

// ✅ Định nghĩa kiểu dữ liệu rõ ràng
type ChecklistKey = 'battery' | 'brakes' | 'lights' | 'tires';

interface ServiceOrder {
  id: string;
  customer: string;
  vehicle: string;
  plate: string;
  service: string;
  technician: string;
  date: string;
  status: string;
  checklist: Record<ChecklistKey, boolean>;
  note: string;
}

export default function StaffServiceOrdersPage() {
  const router = useRouter();

  // ✅ Danh sách phiếu dịch vụ mẫu có kiểu rõ ràng
  const [orders, setOrders] = useState<ServiceOrder[]>([
    {
      id: 'SO001',
      customer: 'Nguyễn Văn A',
      vehicle: 'VinFast Feliz S',
      plate: '99A-123.45',
      service: 'Kiểm tra hệ thống điện',
      date: '25/10/2025',
      technician: 'Lê Văn Kỹ',
      status: 'Đang thực hiện',
      checklist: {
        battery: true,
        brakes: true,
        lights: false,
        tires: true,
      },
      note: 'Đèn pha không sáng, đang kiểm tra nguồn điện.',
    },
    {
      id: 'SO002',
      customer: 'Trần Thị B',
      vehicle: 'VinFast Klara A2',
      plate: '30B-456.78',
      service: 'Thay thế pin',
      date: '24/10/2025',
      technician: 'Phạm Quốc Dũng',
      status: 'Hoàn tất',
      checklist: {
        battery: true,
        brakes: true,
        lights: true,
        tires: true,
      },
      note: 'Đã thay pin mới chính hãng, test OK.',
    },
  ]);

  // Biến tạm để tạo phiếu mới
  const [newOrder, setNewOrder] = useState({
    customer: '',
    vehicle: '',
    plate: '',
    service: '',
    technician: '',
    date: '',
    note: '',
  });

  const [adding, setAdding] = useState(false);

  const createOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrder.customer || !newOrder.vehicle)
      return alert('Vui lòng điền đủ thông tin');
    const newSO: ServiceOrder = {
      id: 'SO' + (orders.length + 1).toString().padStart(3, '0'),
      ...newOrder,
      status: 'Đang thực hiện',
      checklist: { battery: false, brakes: false, lights: false, tires: false },
    };
    setOrders([newSO, ...orders]);
    setNewOrder({
      customer: '',
      vehicle: '',
      plate: '',
      service: '',
      technician: '',
      date: '',
      note: '',
    });
    setAdding(false);
  };

  // ✅ Đã fix lỗi TypeScript
  const toggleCheck = (id: string, key: ChecklistKey) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? { ...o, checklist: { ...o.checklist, [key]: !o.checklist[key] } }
          : o
      )
    );
  };

  const updateStatus = (id: string, status: string) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  return (
    <div className="min-h-screen bg-gray-50">

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
          Quản lý phiếu dịch vụ
        </h1>
        <p className="text-gray-600 mt-2">
          Tạo, cập nhật và theo dõi tình trạng bảo dưỡng xe điện tại trung tâm
        </p>

        <div className="mt-4">
          <button
            onClick={() => setAdding(!adding)}
            className="inline-flex items-center bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            {adding ? 'Đóng' : 'Tạo phiếu mới'}
          </button>
        </div>
      </div>

      {/* Form tạo phiếu */}
      {adding && (
        <div className="container mx-auto max-w-4xl mt-8 bg-white p-6 shadow rounded-xl border border-gray-100">
          <form
            onSubmit={createOrder}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div>
              <label className="text-sm text-gray-700 font-medium">
                Khách hàng
              </label>
              <input
                value={newOrder.customer}
                onChange={(e) =>
                  setNewOrder({ ...newOrder, customer: e.target.value })
                }
                className="w-full border rounded-md p-2 mt-1"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 font-medium">Xe</label>
              <input
                value={newOrder.vehicle}
                onChange={(e) =>
                  setNewOrder({ ...newOrder, vehicle: e.target.value })
                }
                className="w-full border rounded-md p-2 mt-1"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 font-medium">
                Biển số
              </label>
              <input
                value={newOrder.plate}
                onChange={(e) =>
                  setNewOrder({ ...newOrder, plate: e.target.value })
                }
                className="w-full border rounded-md p-2 mt-1"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 font-medium">
                Dịch vụ
              </label>
              <input
                value={newOrder.service}
                onChange={(e) =>
                  setNewOrder({ ...newOrder, service: e.target.value })
                }
                className="w-full border rounded-md p-2 mt-1"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 font-medium">
                Kỹ thuật viên
              </label>
              <input
                value={newOrder.technician}
                onChange={(e) =>
                  setNewOrder({ ...newOrder, technician: e.target.value })
                }
                className="w-full border rounded-md p-2 mt-1"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 font-medium">
                Ngày nhận
              </label>
              <input
                type="date"
                value={newOrder.date}
                onChange={(e) =>
                  setNewOrder({ ...newOrder, date: e.target.value })
                }
                className="w-full border rounded-md p-2 mt-1"
              />
            </div>
            <div className="col-span-2">
              <label className="text-sm text-gray-700 font-medium">
                Ghi chú
              </label>
              <textarea
                rows={2}
                value={newOrder.note}
                onChange={(e) =>
                  setNewOrder({ ...newOrder, note: e.target.value })
                }
                className="w-full border rounded-md p-2 mt-1"
              />
            </div>
            <div className="col-span-2 text-right">
              <button
                type="submit"
                className="inline-flex items-center bg-emerald-600 text-white px-5 py-2 rounded-md hover:bg-emerald-700 transition"
              >
                <Save className="w-4 h-4 mr-2" /> Lưu phiếu dịch vụ
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Danh sách phiếu */}
      <div className="container mx-auto max-w-6xl px-6 py-10">
        <div className="overflow-x-auto bg-white shadow border border-gray-100 rounded-xl">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-700 border-b">
              <tr>
                <th className="text-left px-4 py-3">Mã phiếu</th>
                <th className="text-left px-4 py-3">Khách hàng</th>
                <th className="text-left px-4 py-3">Xe / Biển số</th>
                <th className="text-left px-4 py-3">Kỹ thuật viên</th>
                <th className="text-left px-4 py-3">Dịch vụ</th>
                <th className="text-center px-4 py-3">Checklist</th>
                <th className="text-center px-4 py-3">Trạng thái</th>
                <th className="text-right px-4 py-3">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-medium text-gray-800">{o.id}</td>
                  <td className="px-4 py-3 text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" /> {o.customer}
                  </td>
                  <td className="px-4 py-3 text-gray-700 flex items-center gap-2">
                    <Car className="w-4 h-4 text-gray-500" /> {o.vehicle} –{' '}
                    {o.plate}
                  </td>
                  <td className="px-4 py-3 text-gray-700">{o.technician}</td>
                  <td className="px-4 py-3 text-gray-700">{o.service}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-2">
                      <Battery
                        className={`w-4 h-4 ${
                          o.checklist.battery
                            ? 'text-emerald-600'
                            : 'text-gray-300'
                        }`}
                        onClick={() => toggleCheck(o.id, 'battery')}
                      />
                      <Wrench
                        className={`w-4 h-4 ${
                          o.checklist.brakes
                            ? 'text-emerald-600'
                            : 'text-gray-300'
                        }`}
                        onClick={() => toggleCheck(o.id, 'brakes')}
                      />
                      <Gauge
                        className={`w-4 h-4 ${
                          o.checklist.tires
                            ? 'text-emerald-600'
                            : 'text-gray-300'
                        }`}
                        onClick={() => toggleCheck(o.id, 'tires')}
                      />
                      <ClipboardCheck
                        className={`w-4 h-4 ${
                          o.checklist.lights
                            ? 'text-emerald-600'
                            : 'text-gray-300'
                        }`}
                        onClick={() => toggleCheck(o.id, 'lights')}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {o.status === 'Đang thực hiện' && (
                      <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full text-xs">
                        <Clock className="w-3 h-3" /> Đang thực hiện
                      </span>
                    )}
                    {o.status === 'Hoàn tất' && (
                      <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full text-xs">
                        <CheckCircle2 className="w-3 h-3" /> Hoàn tất
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right flex justify-end gap-2">
                    <button
                      onClick={() => alert(o.note)}
                      className="text-sm inline-flex items-center gap-1 px-2 py-1 border rounded-md text-gray-600 hover:bg-gray-50"
                    >
                      <Eye className="w-4 h-4" /> Ghi chú
                    </button>
                    {o.status === 'Đang thực hiện' && (
                      <button
                        onClick={() => updateStatus(o.id, 'Hoàn tất')}
                        className="text-sm inline-flex items-center gap-1 px-2 py-1 border rounded-md text-emerald-700 hover:bg-emerald-50"
                      >
                        <CheckCircle2 className="w-4 h-4" /> Hoàn tất
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
