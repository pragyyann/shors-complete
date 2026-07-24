import React from "react";
import { DashboardSummary } from "@/types/dashboard";
import { Box, Layers, Users, ShoppingBag } from "lucide-react";

interface StatsCardsProps {
  summary: DashboardSummary | undefined;
  isLoading: boolean;
}

export function StatsCards({ summary, isLoading }: StatsCardsProps) {
  if (isLoading || !summary) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 h-[120px] animate-pulse" />
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "Total Products",
      value: summary.totalProducts,
      icon: Box,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      title: "Homepage Showcases",
      value: summary.totalHomepageShowcases,
      icon: Layers,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
    },
    {
      title: "Preorders",
      value: summary.totalPreorders,
      icon: ShoppingBag,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <div key={i} className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-400">{card.title}</span>
              <div className={`p-2 rounded-md ${card.bg}`}>
                <Icon className={`w-4 h-4 ${card.color}`} />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-3xl font-bold text-zinc-50">{card.value}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
