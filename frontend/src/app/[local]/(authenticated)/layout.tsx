"use client";
import AdminOnlyGuard from "@/guards/admin-only.guard";
import {ReactQueryDevtoolsProvider} from "@/lib/utils/dev-tools/react-query-dev-tools";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryDevtoolsProvider>
      <AdminOnlyGuard>{children}</AdminOnlyGuard>
    </ReactQueryDevtoolsProvider>
  );
}
