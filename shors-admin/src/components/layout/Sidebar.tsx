"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Image as ImageIcon,
  Star,
  Package,
  ShoppingCart,
  Users,
  Settings,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Hero", href: "/hero", icon: ImageIcon },
  { name: "Homepage Showcase", href: "/homepage-showcase", icon: Star },
  { name: "Products", href: "/products", icon: Package },
  { name: "Preorders", href: "/preorders", icon: ShoppingCart },
  { name: "Community", href: "/community", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r border-zinc-800 bg-zinc-950">
      <div className="flex h-16 items-center px-6 border-b border-zinc-800">
        <span className="text-lg font-bold tracking-tight text-zinc-50">SHORS Admin</span>
      </div>
      <div className="flex-1 overflow-y-auto py-6">
        <nav className="grid gap-2 px-4">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-zinc-50",
                  isActive
                    ? "bg-zinc-800 text-zinc-50"
                    : "text-zinc-400 hover:bg-zinc-800/50"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
