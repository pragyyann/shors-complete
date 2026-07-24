import React from "react";
import { DashboardOrdersCount } from "@/types/dashboard";
import { PieChart, ListOrdered } from "lucide-react";

interface OrdersOverviewProps {
  orders: DashboardOrdersCount | undefined;
  isLoading: boolean;
}

export function OrdersOverview({ orders, isLoading }: OrdersOverviewProps) {
  if (isLoading) {
    return (
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 h-[400px] animate-pulse">
        <div className="h-6 w-1/3 bg-zinc-900 rounded mb-8" />
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-zinc-900 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!orders) {
    return (
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center text-center h-[400px]">
        <PieChart className="w-8 h-8 text-zinc-700 mb-3" />
        <p className="text-zinc-400">No order data available.</p>
      </div>
    );
  }

  const statuses = [
    { label: "New", value: orders.NEW, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-500/20" },
    { label: "Contacted", value: orders.CONTACTED, color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-500/20" },
    { label: "Confirmed", value: orders.CONFIRMED, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-500/20" },
    { label: "Cancelled", value: orders.CANCELLED, color: "text-red-400", bg: "bg-red-400/10", border: "border-red-500/20" },
  ];

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-zinc-50">Orders by Status</h3>
        <ListOrdered className="w-5 h-5 text-zinc-500" />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {statuses.map((status) => (
          <div 
            key={status.label} 
            className={`p-4 rounded-xl border flex flex-col justify-between ${status.bg} ${status.border}`}
          >
            <span className={`text-sm font-medium ${status.color}`}>
              {status.label}
            </span>
            <span className="text-3xl font-bold text-zinc-50 mt-2">
              {status.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
