import { API_BASE_URL, authHeaders, handleResponse } from '../../api/client';
import { listBookings, type BookingItem } from './booking';

export interface Transaction {
  id: string;
  type: 'Thu' | 'Chi';
  description: string;
  amount: number;
  date: string;
  method: string;
}

export interface TransactionStats {
  totalIncome: number;
  totalExpense: number;
  profit: number;
}

/**
 * Chuyển đổi bookings thành transactions
 * Bookings có status COMPLETED/DONE được coi là "Thu"
 */
export async function listTransactions(): Promise<Transaction[]> {
  try {
    const allBookings = await listBookings({ limit: 1000 });
    const bookings = allBookings.data || [];

    const transactions: Transaction[] = bookings
      .filter((b) => {
        // Chỉ lấy bookings đã hoàn thành để hiển thị như transactions thu
        return b.status === 'COMPLETED' || b.status === 'DONE' || b.status === 'FINISHED' || b.status === 'CONFIRMED';
      })
      .map((b) => {
        const serviceNames = b.services?.map((s) => s.name || s.serviceType || '').join(', ') || 'Dịch vụ';
        
        return {
          id: b.bookingId,
          type: 'Thu' as const,
          description: `Thanh toán ${serviceNames}`,
          amount: b.totalPrice || 0,
          date: b.bookingDate ? new Date(b.bookingDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          method: 'Chuyển khoản', // Mặc định, có thể lấy từ booking nếu có
        };
      });

    // Sắp xếp theo ngày mới nhất
    return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error listing transactions:', error);
    return [];
  }
}

/**
 * Lấy thống kê transactions
 */
export async function getTransactionStats(): Promise<TransactionStats> {
  try {
    const transactions = await listTransactions();
    
    const totalIncome = transactions
      .filter((t) => t.type === 'Thu')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpense = transactions
      .filter((t) => t.type === 'Chi')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalIncome,
      totalExpense,
      profit: totalIncome - totalExpense,
    };
  } catch (error) {
    console.error('Error getting transaction stats:', error);
    return {
      totalIncome: 0,
      totalExpense: 0,
      profit: 0,
    };
  }
}

