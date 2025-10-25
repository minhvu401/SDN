'use client';
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  ArrowLeft,
  CreditCard,
  Wallet,
  Clock,
  CheckCircle2,
  XCircle,
  CalendarDays,
  Receipt,
  RefreshCcw,
  DollarSign,
  TrendingUp,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CustomerPaymentsPage() {
  const router = useRouter();

  const [plan, setPlan] = useState({
    name: 'Gói bảo dưỡng định kỳ 6 tháng',
    price: '1.200.000 VNĐ',
    expire: '20/04/2026',
    status: 'Đang hoạt động',
  });

  const [transactions, setTransactions] = useState([
    {
      id: 'T-2401',
      date: '20/10/2025',
      method: 'Ví Momo',
      content: 'Thanh toán gói bảo dưỡng 6 tháng',
      amount: '+1.200.000 VNĐ',
      status: 'Thành công',
    },
    {
      id: 'T-2400',
      date: '15/05/2025',
      method: 'Thẻ ngân hàng',
      content: 'Gia hạn gói định kỳ',
      amount: '+1.200.000 VNĐ',
      status: 'Thành công',
    },
    {
      id: 'T-2399',
      date: '10/03/2025',
      method: 'Ví ZaloPay',
      content: 'Thanh toán không thành công',
      amount: '+1.200.000 VNĐ',
      status: 'Thất bại',
    },
  ]);

  const [isRenewing, setIsRenewing] = useState(false);

  const handleRenew = () => {
    setIsRenewing(true);
    setTimeout(() => {
      setIsRenewing(false);
      alert('Gia hạn thành công! Gói của bạn đã được kích hoạt thêm 6 tháng.');
    }, 2000);
  };

  const badge = (status: string) => {
    if (status === 'Thành công')
      return (
        <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full text-xs">
          <CheckCircle2 className="w-3 h-3" /> Thành công
        </span>
      );
    if (status === 'Thất bại')
      return (
        <span className="inline-flex items-center gap-1 text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full text-xs">
          <XCircle className="w-3 h-3" /> Thất bại
        </span>
      );
    return (
      <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full text-xs">
        <Clock className="w-3 h-3" /> Đang xử lý
      </span>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="relative bg-white border-b border-gray-200 py-10 text-center">
        <button
          onClick={() => router.push('/customer/dashboard')}
          className="absolute top-5 left-6 flex items-center text-emerald-700 hover:text-emerald-800 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span className="text-sm font-medium">Về bảng điều khiển</span>
        </button>

        <h1 className="text-3xl font-bold text-emerald-700 font-display">
          Thanh toán & Lịch sử giao dịch
        </h1>
        <p className="text-gray-600 mt-2">
          Quản lý gói bảo dưỡng, gia hạn và xem chi tiết các giao dịch của bạn
        </p>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-6 py-10 max-w-5xl space-y-10">
        {/* Gói bảo dưỡng hiện tại */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wallet className="w-6 h-6 text-emerald-600" />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{plan.name}</h2>
                <p className="text-sm text-gray-500">Giá: {plan.price}</p>
              </div>
            </div>
            <span className="px-3 py-1 text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
              {plan.status}
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <CalendarDays className="w-4 h-4" />
              <span>Hạn sử dụng: {plan.expire}</span>
            </div>
            <button
              onClick={handleRenew}
              disabled={isRenewing}
              className={`inline-flex items-center bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition ${
                isRenewing ? 'opacity-70 cursor-wait' : ''
              }`}
            >
              {isRenewing ? (
                <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <CreditCard className="w-4 h-4 mr-2" />
              )}
              {isRenewing ? 'Đang gia hạn...' : 'Gia hạn gói'}
            </button>
          </div>
        </div>

        {/* Lịch sử giao dịch */}
        <div className="bg-white shadow-md rounded-xl border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-800">
              <Receipt className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-semibold">Lịch sử giao dịch</h2>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <TrendingUp className="w-4 h-4" /> Tổng: {transactions.length} giao dịch
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-700 border-b">
                <tr>
                  <th className="text-left px-4 py-3">Mã giao dịch</th>
                  <th className="text-left px-4 py-3">Ngày</th>
                  <th className="text-left px-4 py-3">Phương thức</th>
                  <th className="text-left px-4 py-3">Nội dung</th>
                  <th className="text-right px-4 py-3">Số tiền</th>
                  <th className="text-center px-4 py-3">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500">
                      Chưa có giao dịch nào.
                    </td>
                  </tr>
                )}

                {transactions.map((t) => (
                  <tr
                    key={t.id}
                    className="border-b last:border-0 hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 font-medium text-gray-800">{t.id}</td>
                    <td className="px-4 py-3 text-gray-700">{t.date}</td>
                    <td className="px-4 py-3 text-gray-700">{t.method}</td>
                    <td className="px-4 py-3 text-gray-700">{t.content}</td>
                    <td className="px-4 py-3 text-right text-emerald-700 font-semibold">
                      {t.amount}
                    </td>
                    <td className="px-4 py-3 text-center">{badge(t.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Gợi ý thanh toán khác */}
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 text-gray-700">
          <h3 className="text-md font-semibold mb-2 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-600" /> Mẹo sử dụng gói bảo dưỡng hiệu quả:
          </h3>
          <ul className="list-disc ml-6 space-y-1 text-sm text-gray-600">
            <li>Đặt lịch bảo dưỡng định kỳ 2–3 tháng/lần để duy trì hiệu suất xe.</li>
            <li>Nếu đổi xe, bạn có thể chuyển gói sang xe mới trong 30 ngày.</li>
            <li>Kiểm tra thông tin gói tại mục <b>Dashboard → Gói bảo dưỡng</b>.</li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
}
