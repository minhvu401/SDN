import { API_BASE_URL, authHeaders, handleResponse } from '../../api/client';
import { listBookings, type BookingItem } from './booking';
import { listServices } from './services';
import { listCustomers } from './customers';
import { listCenters } from './centers';

export interface DashboardStats {
  totalRevenue: number;
  totalServices: number;
  totalBookings: number;
  completionRate: number;
  growth: number;
}

export interface RevenueDataPoint {
  label: string;
  revenue: number;
  date?: string;
}

export interface ServiceStats {
  name: string;
  count: number;
}

/**
 * Tính toán revenue từ bookings
 */
export async function getRevenueStats(
  period: 'day' | 'week' | 'month' = 'week'
): Promise<RevenueDataPoint[]> {
  try {
    const allBookings = await listBookings({ limit: 1000 });
    const bookings = allBookings.data || [];

    // Lọc bookings đã hoàn thành (status: 'COMPLETED', 'DONE', etc.)
    const completedBookings = bookings.filter(
      (b) => b.status === 'COMPLETED' || b.status === 'DONE' || b.status === 'FINISHED'
    );

    const now = new Date();
    const data: RevenueDataPoint[] = [];

    if (period === 'day') {
      // 7 ngày gần nhất
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        const dayBookings = completedBookings.filter(
          (b) => b.bookingDate && b.bookingDate.startsWith(dateStr)
        );
        
        const revenue = dayBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0) / 1_000_000; // Chuyển sang triệu đồng
        
        const dayLabel = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'][date.getDay()];
        data.push({ label: dayLabel, revenue: Math.round(revenue) });
      }
    } else if (period === 'week') {
      // 4 tuần gần nhất
      for (let i = 3; i >= 0; i--) {
        const weekStart = new Date(now);
        weekStart.setDate(weekStart.getDate() - (i * 7 + now.getDay()));
        weekStart.setHours(0, 0, 0, 0);
        
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);

        const weekBookings = completedBookings.filter((b) => {
          if (!b.bookingDate) return false;
          const bookingDate = new Date(b.bookingDate);
          return bookingDate >= weekStart && bookingDate <= weekEnd;
        });

        const revenue = weekBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0) / 1_000_000;
        data.push({ label: `Tuần ${4 - i}`, revenue: Math.round(revenue) });
      }
    } else {
      // 6 tháng gần nhất
      for (let i = 5; i >= 0; i--) {
        const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59, 999);

        const monthBookings = completedBookings.filter((b) => {
          if (!b.bookingDate) return false;
          const bookingDate = new Date(b.bookingDate);
          return bookingDate >= monthStart && bookingDate <= monthEnd;
        });

        const revenue = monthBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0) / 1_000_000;
        const monthLabels = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];
        data.push({ label: monthLabels[monthStart.getMonth()], revenue: Math.round(revenue) });
      }
    }

    return data;
  } catch (error) {
    console.error('Error getting revenue stats:', error);
    return [];
  }
}

/**
 * Lấy thống kê dịch vụ phổ biến
 */
export async function getServiceStats(): Promise<ServiceStats[]> {
  try {
    const allBookings = await listBookings({ limit: 1000 });
    const bookings = allBookings.data || [];
    
    const serviceCounts: Record<string, number> = {};
    
    bookings.forEach((booking) => {
      booking.services?.forEach((service) => {
        const serviceName = service.name || service.serviceType || 'Unknown';
        serviceCounts[serviceName] = (serviceCounts[serviceName] || 0) + 1;
      });
    });

    return Object.entries(serviceCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Top 10
  } catch (error) {
    console.error('Error getting service stats:', error);
    return [];
  }
}

/**
 * Lấy dashboard statistics tổng hợp
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const [allBookings, allServices] = await Promise.all([
      listBookings({ limit: 1000 }),
      listServices(),
    ]);

    const bookings = allBookings.data || [];
    const completedBookings = bookings.filter(
      (b) => b.status === 'COMPLETED' || b.status === 'DONE' || b.status === 'FINISHED'
    );

    const totalRevenue = completedBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
    const totalServices = allServices.length;
    const totalBookings = bookings.length;
    
    const completionRate = totalBookings > 0 
      ? Math.round((completedBookings.length / totalBookings) * 100) 
      : 0;

    // Tính growth: so sánh tuần này vs tuần trước
    const now = new Date();
    const thisWeekStart = new Date(now);
    thisWeekStart.setDate(thisWeekStart.getDate() - now.getDay());
    thisWeekStart.setHours(0, 0, 0, 0);
    
    const lastWeekStart = new Date(thisWeekStart);
    lastWeekStart.setDate(lastWeekStart.getDate() - 7);
    
    const thisWeekRevenue = completedBookings
      .filter((b) => {
        if (!b.bookingDate) return false;
        const date = new Date(b.bookingDate);
        return date >= thisWeekStart;
      })
      .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

    const lastWeekRevenue = completedBookings
      .filter((b) => {
        if (!b.bookingDate) return false;
        const date = new Date(b.bookingDate);
        return date >= lastWeekStart && date < thisWeekStart;
      })
      .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

    const growth = lastWeekRevenue > 0 
      ? ((thisWeekRevenue - lastWeekRevenue) / lastWeekRevenue) * 100 
      : 0;

    return {
      totalRevenue,
      totalServices,
      totalBookings,
      completionRate,
      growth: Math.round(growth * 10) / 10,
    };
  } catch (error) {
    console.error('Error getting dashboard stats:', error);
    return {
      totalRevenue: 0,
      totalServices: 0,
      totalBookings: 0,
      completionRate: 0,
      growth: 0,
    };
  }
}

/**
 * Lấy revenue theo tháng cho reports
 */
export async function getMonthlyRevenue(): Promise<RevenueDataPoint[]> {
  try {
    const allBookings = await listBookings({ limit: 1000 });
    const bookings = allBookings.data || [];

    const completedBookings = bookings.filter(
      (b) => b.status === 'COMPLETED' || b.status === 'DONE' || b.status === 'FINISHED'
    );

    const now = new Date();
    const monthlyData: Record<string, number> = {};

    // 10 tháng gần nhất
    for (let i = 9; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = `${monthStart.getFullYear()}-${String(monthStart.getMonth() + 1).padStart(2, '0')}`;
      
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59, 999);

      const monthBookings = completedBookings.filter((b) => {
        if (!b.bookingDate) return false;
        const bookingDate = new Date(b.bookingDate);
        return bookingDate >= monthStart && bookingDate <= monthEnd;
      });

      monthlyData[monthKey] = monthBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0) / 1_000_000;
    }

    return Object.entries(monthlyData).map(([key, revenue]) => {
      const [year, month] = key.split('-');
      return {
        label: `Th${parseInt(month)}`,
        revenue: Math.round(revenue),
        date: key,
      };
    });
  } catch (error) {
    console.error('Error getting monthly revenue:', error);
    return [];
  }
}

