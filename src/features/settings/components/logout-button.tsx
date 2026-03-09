"use client";

import { Button } from "@/src/components/ui/button";
import { createClient } from "@/src/utils/supabase/client";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    // 1. Supabase 로그아웃 시도
    await supabase.auth.signOut();
    
    // 2. NextAuth 로그아웃 시도 및 리다이렉트
    await signOut({ callbackUrl: "/" });
  };

  return (
    <Button variant="destructive" onClick={handleLogout}>
      로그아웃
    </Button>
  );
}
