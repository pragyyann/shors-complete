"use client";

import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { productService } from "@/services/product.service";
import { Loader2 } from "lucide-react";
import { Product } from "@/types/product";

interface DeleteProductDialogProps {
  product: Product | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteProductDialog({ product, isOpen, onOpenChange }: DeleteProductDialogProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => productService.deleteProduct(id),
    onSuccess: () => {
      toast.success("Product deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      onOpenChange(false);
    },
    onError: (error: unknown) => {
      let message = "Failed to delete product.";
      if (error && typeof error === "object" && "response" in error) {
        const errorObj = error as { response?: { data?: { message?: string } } };
        message = errorObj.response?.data?.message || message;
      }
      toast.error(message);
    },
  });

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-zinc-950 border-zinc-800">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-zinc-100">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-400">
            This will soft delete the product <span className="font-semibold text-zinc-300">&quot;{product?.name}&quot;</span>. It will no longer be visible on the storefront or in the active products list.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={mutation.isPending} className="bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white">Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={mutation.isPending}
            onClick={(e) => {
              e.preventDefault();
              if (product?.id) {
                mutation.mutate(product.id);
              }
            }}
            className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20"
          >
            {mutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
