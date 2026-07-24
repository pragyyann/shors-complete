"use client";

import React, { use } from "react";
import { ProductForm } from "@/components/products/ProductForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services/product.service";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/types/product";

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams.id; // The dynamic folder is [id], but for edit, the URL actually passes the slug string

  const { data: response, isLoading, isError } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => productService.getProduct(slug),
  });

  const product = response?.data as Product | undefined;

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto w-full min-h-[calc(100vh-4rem)] bg-zinc-950 space-y-6">
      <div className="space-y-4">
        <Link href="/products" className="inline-flex items-center text-sm font-medium text-zinc-400 hover:text-zinc-100 -ml-4 py-2 px-4 hover:bg-zinc-800/50 rounded-md transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Products
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-50">
            Edit Product
          </h2>
          <p className="text-zinc-400 text-sm mt-1">
            Update existing product information.
          </p>
        </div>
      </div>

      {isLoading ? (
        <Skeleton className="h-[600px] w-full bg-zinc-900 rounded-xl" />
      ) : isError || !product ? (
        <div className="p-6 bg-zinc-950 border border-red-900/50 rounded-xl">
          <h3 className="text-red-500 font-medium">Product not found</h3>
          <p className="text-zinc-400 text-sm mt-1">
            There was a problem loading this product.
          </p>
        </div>
      ) : (
        <ProductForm initialData={product} />
      )}
    </div>
  );
}
