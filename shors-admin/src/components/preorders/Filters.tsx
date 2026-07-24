"use client";

import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PreorderStatus } from "@/types/preorder";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks/useDebounce"; // Assuming we have this, I will implement if not

interface FiltersProps {
  onSearchChange: (search: string) => void;
  onStatusChange: (status: PreorderStatus | "ALL") => void;
  onSortChange: (sort: "desc" | "asc") => void;
  initialSearch?: string;
  initialStatus?: PreorderStatus | "ALL";
  initialSort?: "desc" | "asc";
}

export function Filters({
  onSearchChange,
  onStatusChange,
  onSortChange,
  initialSearch = "",
  initialStatus = "ALL",
  initialSort = "desc",
}: FiltersProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    onSearchChange(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearchChange]);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      {/* Search */}
      <div className="relative flex-1 w-full max-w-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-zinc-500" />
        </div>
        <Input
          type="text"
          placeholder="Search by name, email, phone or product..."
          className="pl-10 bg-zinc-950 border-zinc-800 text-zinc-200 placeholder:text-zinc-500 focus-visible:ring-emerald-500/20"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Status Filter */}
      <div className="w-full sm:w-48">
        <Select
          defaultValue={initialStatus}
          onValueChange={(val) => onStatusChange(val as PreorderStatus | "ALL")}
        >
          <SelectTrigger className="w-full bg-zinc-950 border-zinc-800 text-zinc-200">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-950 border-zinc-800">
            <SelectItem value="ALL">All Statuses</SelectItem>
            <SelectItem value="NEW">New</SelectItem>
            <SelectItem value="CONTACTED">Contacted</SelectItem>
            <SelectItem value="CONFIRMED">Confirmed</SelectItem>
            <SelectItem value="IN_PRODUCTION">In Production</SelectItem>
            <SelectItem value="READY">Ready</SelectItem>
            <SelectItem value="DELIVERED">Delivered</SelectItem>
            <SelectItem value="CANCELLED">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Sort Filter */}
      <div className="w-full sm:w-48">
        <Select
          defaultValue={initialSort}
          onValueChange={(val) => onSortChange(val as "desc" | "asc")}
        >
          <SelectTrigger className="w-full bg-zinc-950 border-zinc-800 text-zinc-200">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-950 border-zinc-800">
            <SelectItem value="desc">Newest First</SelectItem>
            <SelectItem value="asc">Oldest First</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
