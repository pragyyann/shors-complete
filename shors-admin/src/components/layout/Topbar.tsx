"use client";

import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { clearAuthToken } from "@/lib/auth";

export function Topbar() {
  const router = useRouter();

  const handleLogout = () => {
    clearAuthToken();
    router.push("/login");
  };

  return (
    <header className="flex h-16 items-center justify-end gap-4 border-b border-zinc-800 bg-zinc-950 px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <User className="h-4 w-4" />
          <span>Admin</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-zinc-400 hover:bg-zinc-800 hover:text-zinc-50 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </header>
  );
}
