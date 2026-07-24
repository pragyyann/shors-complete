"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { communityService } from "@/services/community.service";
import { Users } from "lucide-react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CommunityPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["community", { page }],
    queryFn: () =>
      communityService.getCommunity({
        page,
        limit: 10,
      }),
  });

  const members = data?.data || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto w-full min-h-[calc(100vh-4rem)] bg-zinc-950 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-50 flex items-center gap-2">
            <Users className="w-6 h-6 text-zinc-400" />
            Community Members
          </h2>
          <p className="text-zinc-400 text-sm mt-1">
            View users who joined the SHORS Circle for early access and drops.
          </p>
        </div>
      </div>

      {/* Error State */}
      {isError && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
          Failed to load community members. Please try again.
        </div>
      )}

      {/* Main Table */}
      {!isError && (
        <div className="space-y-4">
          <div className="rounded-md border border-zinc-800 bg-zinc-950 overflow-hidden">
            <Table>
              <TableHeader className="bg-zinc-900/50">
                <TableRow className="border-zinc-800 hover:bg-transparent">
                  <TableHead className="text-zinc-400 font-medium">Name</TableHead>
                  <TableHead className="text-zinc-400 font-medium">Phone</TableHead>
                  <TableHead className="text-zinc-400 font-medium">Email</TableHead>
                  <TableHead className="text-zinc-400 font-medium text-right">Date Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i} className="border-zinc-800">
                      <TableCell><Skeleton className="h-4 w-24 bg-zinc-800" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-32 bg-zinc-800" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-40 bg-zinc-800" /></TableCell>
                      <TableCell className="text-right"><Skeleton className="h-4 w-24 bg-zinc-800 ml-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : members.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-32 text-center text-zinc-500">
                      No community members found.
                    </TableCell>
                  </TableRow>
                ) : (
                  members.map((member) => (
                    <TableRow key={member.id} className="border-zinc-800 hover:bg-zinc-900/50 transition-colors">
                      <TableCell className="font-medium text-zinc-300">{member.name}</TableCell>
                      <TableCell className="text-zinc-300">{member.phone}</TableCell>
                      <TableCell className="text-zinc-300">{member.email || "-"}</TableCell>
                      <TableCell className="text-right text-zinc-400 text-sm">
                        {format(new Date(member.createdAt), "MMM d, yyyy")}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {!isLoading && totalPages > 1 && (
            <div className="flex items-center justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="bg-zinc-950 border-zinc-800 text-zinc-300 hover:bg-zinc-900"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <div className="text-sm text-zinc-400 mx-2">
                Page {page} of {totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="bg-zinc-950 border-zinc-800 text-zinc-300 hover:bg-zinc-900"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
