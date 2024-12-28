"use client";
import AdminOnlyGuard from "@/guards/admin-only.guard";
import useAuth from "@/hooks/use-auth";
import {useSdk} from "@/hooks/use-sdk";
import {useAppDispatch} from "@/lib/redux/hooks";
import {ReactQueryDevtoolsProvider} from "@/lib/utils/dev-tools/react-query-dev-tools";
import {useEffect, useState} from "react";
import {toast} from "sonner";
import {logout} from "@features/auth/redux/slice";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {currentUser} = useAuth();
  const dispatch = useAppDispatch();
  const sdk = useSdk();
  const [JWTExpiredHandled, setJWTExpiredHandled] = useState(false);
  useEffect(() => {
    if (currentUser && JWTExpiredHandled) return;
    setJWTExpiredHandled(true);
    sdk.on("jwt-token-expired", () => {
      dispatch(logout());
      toast.error("JWT Expired");
    });
  }, [JWTExpiredHandled, currentUser, dispatch, sdk]);

  return (
    <ReactQueryDevtoolsProvider>
      <AdminOnlyGuard>{children}</AdminOnlyGuard>
    </ReactQueryDevtoolsProvider>
  );
}
