"use client";

import { Button } from "@/src/components/ui/button";
import { createClient } from "@/src/utils/supabase/client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh(); // 루트 페이지 또는 내비게이션 상태 강제 갱신
  };

  return (
    <Button variant="destructive" onClick={handleLogout}>
      로그아웃
    </Button>
  );
}
