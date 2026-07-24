"use client";

import React from "react";
import { format, formatDistanceToNowStrict } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "./StatusBadge";
import { Preorder } from "@/types/preorder";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface PreorderTableProps {
  preorders: Preorder[];
  isLoading: boolean;
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onRowClick: (preorder: Preorder) => void;
}

export function PreorderTable({
  preorders,
  isLoading,
  page,
  totalPages,
  total,
  limit,
  onPageChange,
  onLimitChange,
  onRowClick,
}: PreorderTableProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-md border border-zinc-800 bg-zinc-950 overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-900/50">
            <TableRow className="border-zinc-800 hover:bg-transparent">
              <TableHead className="text-zinc-400 font-medium w-[120px]">Order Ref</TableHead>
              <TableHead className="text-zinc-400 font-medium">Customer</TableHead>
              <TableHead className="text-zinc-400 font-medium">Product</TableHead>
              <TableHead className="text-zinc-400 font-medium">Qty</TableHead>
              <TableHead className="text-zinc-400 font-medium">Status</TableHead>
              <TableHead className="text-zinc-400 font-medium text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i} className="border-zinc-800">
                  <TableCell><Skeleton className="h-4 w-16 bg-zinc-800" /></TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24 bg-zinc-800 mb-2" />
                    <Skeleton className="h-3 w-32 bg-zinc-800" />
                  </TableCell>
                  <TableCell><Skeleton className="h-4 w-32 bg-zinc-800" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-8 bg-zinc-800" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-20 bg-zinc-800 rounded-full" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-4 w-24 bg-zinc-800 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : preorders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-zinc-500">
                  No orders found.
                </TableCell>
              </TableRow>
            ) : (
              preorders.map((order) => {
                const orderDate = new Date(order.createdAt);
                // eslint-disable-next-line react-hooks/purity
                const isOlderThanWeek = Date.now() - orderDate.getTime() > 7 * 24 * 60 * 60 * 1000;
                
                return (
                  <TableRow
                    key={order.id}
                    onClick={() => onRowClick(order)}
                    className="border-zinc-800 cursor-pointer hover:bg-zinc-900/50 transition-colors"
                  >
                    <TableCell className="font-medium text-zinc-300 whitespace-nowrap">
                      SH-{order.id.toString().padStart(5, "0")}
                    </TableCell>
                    <TableCell>
                      <div className="text-zinc-200">{order.fullName || order.customer?.name}</div>
                      <div className="text-xs text-zinc-500 mt-0.5">{order.customer?.phone}</div>
                    </TableCell>
                    <TableCell className="text-zinc-300">{order.product?.name}</TableCell>
                    <TableCell className="text-zinc-300">x{order.quantity}</TableCell>
                    <TableCell>
                      <StatusBadge status={order.status} />
                    </TableCell>
                    <TableCell className="text-right text-zinc-400 text-sm whitespace-nowrap">
                      {isOlderThanWeek 
                        ? format(orderDate, "MMM d, yyyy")
                        : formatDistanceToNowStrict(orderDate, { addSuffix: true })}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {!isLoading && total > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="text-sm text-zinc-400">
            Showing {Math.min((page - 1) * limit + 1, total)}–{Math.min(page * limit, total)} of {total} Orders
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium text-zinc-300">Rows per page</p>
              <select
                className="h-8 rounded-md border border-zinc-800 bg-zinc-900 text-zinc-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-700"
                value={limit}
                onChange={(e) => onLimitChange(Number(e.target.value))}
              >
                {[10, 25, 50, 100].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(page - 1)}
                  disabled={page === 1}
                  className="bg-zinc-950 border-zinc-800 text-zinc-300 hover:bg-zinc-900 h-8 px-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <div className="flex items-center space-x-1">
                  {(() => {
                    let pages = [];
                    if (totalPages <= 5) {
                      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
                    } else if (page <= 3) {
                      pages = [1, 2, 3, 4, 5];
                    } else if (page >= totalPages - 2) {
                      pages = [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
                    } else {
                      pages = [page - 2, page - 1, page, page + 1, page + 2];
                    }

                    return pages.map((p) => (
                      <Button
                        key={p}
                        variant={p === page ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => onPageChange(p)}
                        className={`h-8 w-8 p-0 ${
                          p === page
                            ? "bg-zinc-800 text-zinc-50 hover:bg-zinc-700 border border-zinc-700"
                            : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent"
                        }`}
                      >
                        {p}
                      </Button>
                    ));
                  })()}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(page + 1)}
                  disabled={page === totalPages}
                  className="bg-zinc-950 border-zinc-800 text-zinc-300 hover:bg-zinc-900 h-8 px-2"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
