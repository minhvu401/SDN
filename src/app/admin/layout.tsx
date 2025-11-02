import { AdminLayout } from '@/components/layout/AdminLayout';
import { RoleGuard } from '@/components/auth/RoleGuard';

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRoles={['admin']}>
      <AdminLayout>{children}</AdminLayout>
    </RoleGuard>
  );
}
