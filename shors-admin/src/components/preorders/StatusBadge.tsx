import React from "react";
import { Badge } from "@/components/ui/badge";
import { PreorderStatus } from "@/types/preorder";

interface StatusBadgeProps {
  status: PreorderStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  switch (status) {
    case "NEW":
      return (
        <Badge className="bg-blue-500/10 text-blue-500 border border-blue-500/20 shadow-none hover:bg-blue-500/20">
          New
        </Badge>
      );
    case "CONTACTED":
      return (
        <Badge className="bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-none hover:bg-amber-500/20">
          Contacted
        </Badge>
      );
    case "CONFIRMED":
      return (
        <Badge className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-none hover:bg-emerald-500/20">
          Confirmed
        </Badge>
      );
    case "IN_PRODUCTION":
      return (
        <Badge className="bg-purple-500/10 text-purple-500 border border-purple-500/20 shadow-none hover:bg-purple-500/20">
          In Production
        </Badge>
      );
    case "READY":
      return (
        <Badge className="bg-teal-500/10 text-teal-500 border border-teal-500/20 shadow-none hover:bg-teal-500/20">
          Ready
        </Badge>
      );
    case "DELIVERED":
      return (
        <Badge className="bg-green-500/10 text-green-500 border border-green-500/20 shadow-none hover:bg-green-500/20">
          Delivered
        </Badge>
      );
    case "CANCELLED":
      return (
        <Badge className="bg-red-500/10 text-red-500 border border-red-500/20 shadow-none hover:bg-red-500/20">
          Cancelled
        </Badge>
      );
    default:
      return (
        <Badge className="bg-zinc-500/10 text-zinc-500 border border-zinc-500/20 shadow-none hover:bg-zinc-500/20">
          {status}
        </Badge>
      );
  }
}
