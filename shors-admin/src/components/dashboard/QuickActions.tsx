import React from "react";
import Link from "next/link";
import { LayoutTemplate, Package, Layers, Users, ShoppingBag, Settings } from "lucide-react";

export function QuickActions() {
  const actions = [
    {
      label: "Hero CMS",
      href: "/hero",
      icon: LayoutTemplate,
      color: "text-blue-400 group-hover:text-blue-300",
    },
    {
      label: "Products",
      href: "/products",
      icon: Package,
      color: "text-emerald-400 group-hover:text-emerald-300",
    },
    {
      label: "Collections",
      href: "/featured",
      icon: Layers,
      color: "text-purple-400 group-hover:text-purple-300",
    },
    {
      label: "Preorders",
      href: "/preorders",
      icon: ShoppingBag,
      color: "text-amber-400 group-hover:text-amber-300",
    },
    {
      label: "Settings",
      href: "/settings",
      icon: Settings,
      color: "text-zinc-400 group-hover:text-zinc-300",
    },
  ];

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-zinc-50 mb-6">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.href}
              href={action.href}
              className="group flex flex-col items-center justify-center gap-3 p-4 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 transition-colors"
            >
              <Icon className={`w-6 h-6 transition-colors ${action.color}`} />
              <span className="text-sm font-medium text-zinc-300 group-hover:text-zinc-50 transition-colors">
                {action.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
