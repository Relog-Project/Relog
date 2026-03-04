"use client";

import { cn } from "@/src/lib/utils";
import { Briefcase, LayoutDashboard, Settings, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/contacts", label: "Contacts", icon: Users },
  { href: "/dashboard/works", label: "Works", icon: Briefcase },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

interface AppSidebarProps {
  user?: {
    name: string;
    email: string;
  } | null;
}

export function AppSidebar({ user }: AppSidebarProps) {
  const pathname = usePathname();

  const name = user?.name || "사용자";
  const email = user?.email || "user@example.com";
  // 첫 글자 추출 (한글/영문 모두 가능)
  const initial = name.charAt(0) || "U";

  return (
    <aside className="flex h-screen w-60 flex-col border-r border-border bg-sidebar">
      <div className="flex h-16 items-center border-b border-sidebar-border px-6">
        <Link
          href="/dashboard"
          className="text-lg font-bold tracking-tight text-sidebar-foreground"
        >
          Relog
        </Link>
      </div>
      <nav className="flex-1 px-3 py-4">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="border-t border-sidebar-border px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
            {initial}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-sidebar-foreground">
              {name}
            </span>
            <span className="text-xs text-muted-foreground">
              {email}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
