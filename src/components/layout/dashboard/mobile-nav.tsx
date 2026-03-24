"use client";

import { useState, useEffect } from "react";
import { cn } from "@/src/lib/utils";
import { Briefcase, LayoutDashboard, Menu, Settings, Users, X, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/contacts", label: "Contacts", icon: Users },
  { href: "/works", label: "Works", icon: Briefcase },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/upgrade", label: "요금제", icon: Zap },
];

interface MobileNavProps {
  user?: {
    name: string;
    email: string;
  } | null;
}

export function MobileNav({ user }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const name = user?.name || "사용자";
  const email = user?.email || "user@example.com";
  const initial = name.charAt(0) || "U";

  // Close nav when path changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="sticky top-0 z-40 flex h-16 items-center border-b border-border bg-background/80 px-4 backdrop-blur-md md:hidden">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className="-ml-2 h-10 w-10 text-muted-foreground hover:bg-transparent">
            <Menu className="h-6 w-6" />
            <span className="sr-only">메뉴 열기</span>
          </Button>
        </DialogTrigger>
        <DialogContent 
          className="fixed inset-y-0 left-0 z-50 flex h-full w-[280px] flex-col gap-0 border-r bg-card p-0 shadow-2xl transition-transform data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-none translate-x-0 translate-y-0"
          showCloseButton={false}
        >
          <div className="flex h-16 items-center justify-between px-6">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                R
              </div>
              Relog
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setOpen(false)} 
              className="h-9 w-9 rounded-full text-muted-foreground hover:bg-muted"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <DialogTitle className="sr-only">Navigation Menu</DialogTitle>
          
          <div className="flex-1 overflow-y-auto py-6">
            <nav className="px-4">
              <ul className="space-y-1.5">
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
                          "flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium transition-all active:scale-[0.98]",
                          isActive
                            ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        )}
                      >
                        <item.icon className={cn("h-5 w-5", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <div className="mt-auto border-t border-border p-4">
            <div className="flex items-center gap-4 rounded-2xl bg-muted/50 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-inner">
                {initial}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">
                  {name}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {email}
                </p>
              </div>
              <Link href="/settings">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground">
                  <Settings className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
        <Link
          href="/dashboard"
          className="text-lg font-bold tracking-tight text-foreground"
        >
          Relog
        </Link>
      </div>
    </div>
  );
}
