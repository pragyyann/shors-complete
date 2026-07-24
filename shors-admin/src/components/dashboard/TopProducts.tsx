import React from "react";
import { DashboardTopProduct } from "@/types/dashboard";
import { Package } from "lucide-react";

interface TopProductsProps {
  products: DashboardTopProduct[] | undefined;
  isLoading: boolean;
}

export function TopProducts({ products, isLoading }: TopProductsProps) {
  if (isLoading) {
    return (
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 h-[400px] animate-pulse">
        <div className="h-6 w-1/2 bg-zinc-900 rounded mb-6" />
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 w-full bg-zinc-900 rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center text-center h-[400px]">
        <Package className="w-8 h-8 text-zinc-700 mb-3" />
        <p className="text-zinc-400">No top products data yet.</p>
      </div>
    );
  }

  // Calculate the maximum preorder count to scale the progress bars
  const maxCount = Math.max(...products.map(p => p.preorderCount), 1);

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-zinc-50 mb-6">Top Preordered Products</h3>
      <div className="space-y-6">
        {products.map((product) => {
          const percentage = (product.preorderCount / maxCount) * 100;
          return (
            <div key={product.id} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-zinc-300 truncate pr-4">{product.name}</span>
                <span className="text-zinc-400 font-medium">{product.preorderCount}</span>
              </div>
              <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
