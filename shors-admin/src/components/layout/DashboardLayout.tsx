"use client";

import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-zinc-950 text-zinc-50">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto bg-zinc-950/50 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
