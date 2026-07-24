import React from "react";
import { ProductForm } from "@/components/products/ProductForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CreateProductPage() {
  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto w-full min-h-[calc(100vh-4rem)] bg-zinc-950 space-y-6">
      <div className="space-y-4">
        <Link href="/products" className="inline-flex items-center text-sm font-medium text-zinc-400 hover:text-zinc-100 -ml-4 py-2 px-4 hover:bg-zinc-800/50 rounded-md transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Products
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-50">
            Create Product
          </h2>
          <p className="text-zinc-400 text-sm mt-1">
            Add a new product to your catalog.
          </p>
        </div>
      </div>

      <ProductForm />
    </div>
  );
}
