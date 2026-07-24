"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Product } from "@/types/product";
import { Search, MoreHorizontal, Edit, Trash, ImageIcon, ImagePlus } from "lucide-react";
import { DeleteProductDialog } from "./DeleteProductDialog";

interface ProductTableProps {
  products: Product[];
}

export function ProductTable({ products }: ProductTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const ITEMS_PER_PAGE = 10;

  // Debounce search
  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Filter and paginate
  const { paginatedProducts, totalPages, safePage } = useMemo(() => {
    const filtered = products.filter((product) => {
      if (!debouncedSearch) return true;
      const term = debouncedSearch.toLowerCase();
      return (
        product.name.toLowerCase().includes(term) ||
        product.slug.toLowerCase().includes(term)
      );
    });

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
    const safePage = Math.min(currentPage, totalPages);

    const start = (safePage - 1) * ITEMS_PER_PAGE;
    const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);

    return { paginatedProducts: paginated, totalPages, safePage };
  }, [products, debouncedSearch, currentPage]);

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
          <Input
            placeholder="Search by name or slug..."
            className="pl-9 bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border border-zinc-800 bg-zinc-950 overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-900/50">
            <TableRow className="border-zinc-800 hover:bg-transparent">
              <TableHead className="w-[80px] text-zinc-400">Image</TableHead>
              <TableHead className="text-zinc-400">Name</TableHead>
              <TableHead className="text-zinc-400">Slug</TableHead>
              <TableHead className="text-zinc-400 hidden md:table-cell">Category</TableHead>
              <TableHead className="text-zinc-400">Status</TableHead>
              <TableHead className="text-zinc-400 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProducts.length === 0 ? (
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableCell colSpan={6} className="h-24 text-center text-zinc-500">
                  No products found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedProducts.map((product) => (
                <TableRow key={product.id} className="border-zinc-800 hover:bg-zinc-900/50">
                  <TableCell>
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0].imageUrl}
                        alt={product.name}
                        className="w-10 h-10 rounded-md object-cover border border-zinc-800"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                        <ImageIcon className="w-4 h-4 text-zinc-600" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium text-zinc-200 truncate max-w-[200px]">
                    {product.name}
                  </TableCell>
                  <TableCell className="text-zinc-400 truncate max-w-[150px]">
                    {product.slug}
                  </TableCell>
                  <TableCell className="text-zinc-400 hidden md:table-cell">
                    {product.category || "Unassigned"}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.isActive
                          ? "bg-emerald-500/10 text-emerald-500"
                          : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      {product.isActive ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger render={
                        <Button variant="ghost" className="h-8 w-8 p-0 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      } />
                      <DropdownMenuContent align="end" className="bg-zinc-950 border-zinc-800 text-zinc-200">
                        <DropdownMenuItem render={<Link href={`/products/${product.slug}/edit`} />} className="hover:bg-zinc-900 focus:bg-zinc-900 cursor-pointer">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="text-red-500 hover:bg-zinc-900 focus:bg-zinc-900 focus:text-red-500 cursor-pointer"
                          onClick={() => setProductToDelete(product)}
                        >
                          <Trash className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-zinc-500">
            Page {safePage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, safePage - 1))}
              disabled={safePage === 1}
              className="bg-zinc-950 border-zinc-800 text-zinc-300 hover:bg-zinc-900"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, safePage + 1))}
              disabled={safePage === totalPages}
              className="bg-zinc-950 border-zinc-800 text-zinc-300 hover:bg-zinc-900"
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Delete Dialog */}
      <DeleteProductDialog
        isOpen={!!productToDelete}
        onOpenChange={(open) => !open && setProductToDelete(null)}
        product={productToDelete}
      />
    </div>
  );
}
