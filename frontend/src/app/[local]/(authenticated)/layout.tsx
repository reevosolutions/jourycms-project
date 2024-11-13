'use client';
import AdminOnlyGuard from "@/guards/admin-only.guard";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AdminOnlyGuard>{children}</AdminOnlyGuard>
  );
}
