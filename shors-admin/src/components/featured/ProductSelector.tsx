"use client";

import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FeaturedProduct } from "@/types/homepageShowcaseModule";

interface ProductSelectorProps {
  products: FeaturedProduct[];
  value: number | null;
  onChange: (value: number | null) => void;
  disabledProductIds?: number[];
  placeholder?: string;
  disabled?: boolean;
}

export function ProductSelector({
  products,
  value,
  onChange,
  disabledProductIds = [],
  placeholder = "Select product...",
  disabled,
}: ProductSelectorProps) {
  const [open, setOpen] = useState(false);

  const selectedProduct = products.find((p) => p.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger render={
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className="w-full justify-between bg-zinc-950 border-zinc-800 text-zinc-300 hover:bg-zinc-900"
        >
          <div className="flex items-center gap-3 truncate">
            {selectedProduct ? (
              <>
                {selectedProduct.images?.[0] && (
                  <img
                    src={selectedProduct.images[0].imageUrl}
                    alt={selectedProduct.name}
                    className="w-6 h-6 object-cover rounded"
                  />
                )}
                <span className="truncate">{selectedProduct.name}</span>
              </>
            ) : (
              <span className="text-zinc-500">{placeholder}</span>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      } />
      <PopoverContent className="w-[300px] p-0 border-zinc-800 bg-zinc-950" align="start">
        <Command className="bg-zinc-950 text-zinc-50">
          <CommandInput placeholder="Search products..." className="h-9" />
          <CommandList>
            <CommandEmpty>No product found.</CommandEmpty>
            <CommandGroup>
              {products.map((product) => {
                const isDisabled = disabledProductIds.includes(product.id) && product.id !== value;
                return (
                  <CommandItem
                    key={product.id}
                    value={product.name} // Used for searching
                    disabled={isDisabled}
                    className="flex items-center gap-3 cursor-pointer aria-disabled:opacity-50 aria-disabled:cursor-not-allowed"
                    onSelect={() => {
                      if (!isDisabled) {
                        onChange(product.id === value ? null : product.id);
                        setOpen(false);
                      }
                    }}
                  >
                    <Check
                      className={cn(
                        "h-4 w-4 shrink-0",
                        value === product.id ? "opacity-100 text-zinc-50" : "opacity-0"
                      )}
                    />
                    {product.images?.[0] && (
                      <img
                        src={product.images[0].imageUrl}
                        alt={product.name}
                        className="w-8 h-8 object-cover rounded"
                      />
                    )}
                    <span className="truncate">{product.name}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
