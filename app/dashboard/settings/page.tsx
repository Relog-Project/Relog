"use client"

import { DashboardHeader } from "@/components/dashboard/dashboad-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
  const router = useRouter()

  const handleLogout = () => {
    // TODO: 실제 로그아웃 로직 구현
    router.push("/")
  }

  return (
    <div>
      <DashboardHeader
        title="Settings"
        description="계정과 환경을 설정하세요."
      />
      <div className="p-8">
        <div className="max-w-lg space-y-8">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-base font-semibold text-card-foreground">
              프로필
            </h2>
            <div className="mt-6 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="setting-name">이름</Label>
                <Input id="setting-name" defaultValue="김민준" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="setting-email">이메일</Label>
                <Input
                  id="setting-email"
                  type="email"
                  defaultValue="minjun@relog.kr"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="setting-company">회사명</Label>
                <Input id="setting-company" defaultValue="Relog Inc." />
              </div>
              <Button className="w-fit">저장</Button>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
              <Button variant="destructive" onClick={handleLogout}>
                로그아웃
              </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
