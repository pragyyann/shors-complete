"use client";

import React, { use } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { preorderService } from "@/services/preorder.service";
import { OrderDetailsDrawer } from "@/components/preorders/OrderDetailsDrawer";
import { Loader2 } from "lucide-react";

export default function PreorderIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const id = parseInt(resolvedParams.id, 10);

  const { data: preorder, isLoading, isError } = useQuery({
    queryKey: ["preorder", id],
    queryFn: () => preorderService.getPreorderById(id),
  });

  const handleClose = () => {
    router.push("/preorders");
  };

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center bg-zinc-950">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
      </div>
    );
  }

  if (isError || !preorder) {
    return (
      <div className="flex flex-col h-[calc(100vh-4rem)] items-center justify-center bg-zinc-950">
        <div className="text-red-500 mb-4">Failed to load preorder.</div>
        <button
          onClick={handleClose}
          className="px-4 py-2 bg-zinc-900 text-zinc-300 rounded hover:bg-zinc-800"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Render a dummy background and the drawer
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto w-full min-h-[calc(100vh-4rem)] bg-zinc-950">
      <OrderDetailsDrawer
        order={preorder}
        isOpen={true}
        onClose={handleClose}
      />
    </div>
  );
}
