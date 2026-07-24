"use client";

import React from "react";
import { LayoutDashboard } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard.service";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { RecentPreorders } from "@/components/dashboard/RecentPreorders";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { TopProducts } from "@/components/dashboard/TopProducts";
import { OrdersOverview } from "@/components/dashboard/OrdersOverview";
import { toast } from "sonner";

export default function DashboardPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard"],
    queryFn: dashboardService.getDashboardData,
  });

  if (isError) {
    toast.error("Failed to load dashboard data");
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto w-full min-h-[calc(100vh-4rem)] bg-zinc-950 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-50 flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6 text-zinc-400" />
          Dashboard
        </h2>
        <p className="text-zinc-400 text-sm mt-1">
          Welcome back, Admin. Here is an overview of the platform.
        </p>
      </div>

      {/* Top Stats */}
      <StatsCards summary={data?.summary} isLoading={isLoading} />

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Wider for lists) */}
        <div className="lg:col-span-2 space-y-8">
          <RecentPreorders preorders={data?.recentPreorders} isLoading={isLoading} />
        </div>

        {/* Right Column (Widgets) */}
        <div className="space-y-8">
          <QuickActions />
          <OrdersOverview orders={data?.orders} isLoading={isLoading} />
          <TopProducts products={data?.topProducts} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
