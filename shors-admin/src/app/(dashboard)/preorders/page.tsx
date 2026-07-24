"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PreorderStatus, Preorder } from "@/types/preorder";
import { preorderService } from "@/services/preorder.service";
import { Filters } from "@/components/preorders/Filters";
import { PreorderTable } from "@/components/preorders/PreorderTable";
import { OrderDetailsDrawer } from "@/components/preorders/OrderDetailsDrawer";
import { PackageSearch } from "lucide-react";

export default function PreordersPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<PreorderStatus | "ALL">("ALL");
  const [sort, setSort] = useState<"desc" | "asc">("desc");
  const [selectedOrder, setSelectedOrder] = useState<Preorder | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["preorders", { page, limit, search, status, sort }],
    queryFn: () =>
      preorderService.getPreorders({
        page,
        limit,
        search: search || undefined,
        status: status !== "ALL" ? status : undefined,
        sort,
      }),
  });

  const handleSearchChange = React.useCallback((newSearch: string) => {
    setSearch(newSearch);
    setPage(1); // Reset to first page on new search
  }, []);

  const handleStatusChange = React.useCallback((newStatus: PreorderStatus | "ALL") => {
    setStatus(newStatus);
    setPage(1); // Reset to first page on status change
  }, []);

  const handleSortChange = React.useCallback((newSort: "desc" | "asc") => {
    setSort(newSort);
    setPage(1);
  }, []);

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // Reset to first page on limit change
  };

  const preorders = data?.data || [];
  const totalPages = data?.totalPages || 1;
  const total = data?.total || 0;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto w-full min-h-[calc(100vh-4rem)] bg-zinc-950 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-50 flex items-center gap-2">
            <PackageSearch className="w-6 h-6 text-zinc-400" />
            Preorders
          </h2>
          <p className="text-zinc-400 text-sm mt-1">
            Manage customer preorders, update statuses, and add admin notes.
          </p>
        </div>
      </div>

      {/* Filters Toolbar */}
      <Filters
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onSortChange={handleSortChange}
        initialSearch={search}
        initialStatus={status}
        initialSort={sort}
      />

      {/* Error State */}
      {isError && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
          Failed to load preorders. Please try again.
        </div>
      )}

      {/* Main Table */}
      {!isError && (
        <PreorderTable
          preorders={preorders}
          isLoading={isLoading}
          page={page}
          totalPages={totalPages}
          total={total}
          limit={limit}
          onPageChange={setPage}
          onLimitChange={handleLimitChange}
          onRowClick={setSelectedOrder}
        />
      )}

      {/* Slide-out Drawer */}
      <OrderDetailsDrawer
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}
