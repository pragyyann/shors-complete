"use client";

import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services/product.service";
import { ProductTable } from "@/components/products/ProductTable";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";
import { Product } from "@/types/product";

export default function ProductsPage() {
  const { data: productsResponse, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: () => productService.getProducts(),
  });

  const products: Product[] = Array.isArray(productsResponse?.data)
    ? productsResponse.data
    : [];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto w-full min-h-[calc(100vh-4rem)] bg-zinc-950 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-50">
            Products
          </h2>
          <p className="text-zinc-400 text-sm mt-1">
            Manage your store&apos;s inventory and products.
          </p>
        </div>
        <Link href="/products/create" className="inline-flex items-center justify-center bg-zinc-50 text-zinc-950 hover:bg-zinc-200 h-10 px-4 py-2 rounded-md text-sm font-medium transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <div className="flex justify-between">
            <Skeleton className="h-10 w-64 bg-zinc-900 rounded-md" />
          </div>
          <Skeleton className="h-[400px] w-full bg-zinc-900 rounded-md" />
        </div>
      ) : isError ? (
        <div className="p-6 bg-zinc-950 border border-red-900/50 rounded-xl">
          <h3 className="text-red-500 font-medium">Error loading data</h3>
          <p className="text-zinc-400 text-sm mt-1">
            There was a problem fetching the products.
          </p>
        </div>
      ) : (
        <ProductTable products={products} />
      )}
    </div>
  );
}
