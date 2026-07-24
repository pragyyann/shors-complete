import React from "react";
import { DashboardRecentPreorder } from "@/types/dashboard";
import { format } from "date-fns";
import { ExternalLink } from "lucide-react";
import Link from "next/link";


interface RecentPreordersProps {
  preorders: DashboardRecentPreorder[] | undefined;
  isLoading: boolean;
}

export function RecentPreorders({ preorders, isLoading }: RecentPreordersProps) {
  if (isLoading) {
    return (
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 h-[400px] animate-pulse">
        <div className="h-6 w-1/3 bg-zinc-900 rounded mb-6" />
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 w-full bg-zinc-900 rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (!preorders || preorders.length === 0) {
    return (
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center text-center h-[400px]">
        <p className="text-zinc-400">No recent preorders found.</p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden flex flex-col">
      <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-zinc-50">Recent Preorders</h3>
        <Link 
          href="/preorders"
          className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors flex items-center gap-1"
        >
          View All <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-zinc-400 bg-zinc-900/50 uppercase border-b border-zinc-800">
            <tr>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Product ID</th>
              <th className="px-6 py-4 font-medium text-center">Qty</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {preorders.map((order) => (
              <tr key={order.id} className="hover:bg-zinc-900/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-zinc-200">{order.customer.name}</div>
                  <div className="text-xs text-zinc-500">{order.customer.phone}</div>
                </td>
                <td className="px-6 py-4 text-zinc-300">
                  #{order.productId}
                </td>
                <td className="px-6 py-4 text-center text-zinc-300">
                  {order.quantity}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border
                    ${order.status === "NEW" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : 
                      order.status === "CONTACTED" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" : 
                      order.status === "CONFIRMED" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : 
                      "bg-red-500/10 text-red-400 border-red-500/20"
                    }
                  `}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-zinc-400">
                  {format(new Date(order.createdAt), "MMM d, yyyy")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
