"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Product, Collection } from "@/types/product";
import { productService } from "@/services/product.service";
import { Loader2, UploadCloud, X } from "lucide-react";
import axios from "axios";
import { productImageService } from "@/services/productImage.service";
import { Progress } from "@/components/ui/progress";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  description: z.string().optional().nullable(),
  category: z.string({ message: "Category is required" }),
  isActive: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData?: Product;
}

export function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isEditing = !!initialData;
  const [imageFiles, setImageFiles] = useState<Record<string, File | null>>({});
  const [previewUrls, setPreviewUrls] = useState<Record<string, string | null>>({});
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});

  const { data: imagesResponse } = useQuery({
    queryKey: ["product-images", initialData?.id],
    queryFn: () => productImageService.getImages(initialData!.id),
    enabled: isEditing,
  });

  useEffect(() => {
    if (imagesResponse?.data) {
      const urls: Record<string, string> = {};
      const imagesArray = Array.isArray(imagesResponse.data) ? imagesResponse.data : [imagesResponse.data];
      imagesArray.forEach((img) => {
        urls[img.imageType] = img.imageUrl;
      });
      setPreviewUrls(urls);
    }
  }, [imagesResponse]);

  const handleImageChange = (type: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        toast.error("Invalid file type. Only JPG, PNG, and WEBP are allowed.");
        return;
      }
      setImageFiles(prev => ({ ...prev, [type]: file }));
      setPreviewUrls(prev => ({ ...prev, [type]: URL.createObjectURL(file) }));
    }
  };

  const categories = ["Root Tote", "Loud Tote", "Premium Tote", "Ancient Tote"];

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      slug: initialData?.slug || "",
      description: initialData?.description || "",
      category: initialData?.category || "",
      isActive: initialData?.isActive ?? true,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name || "",
        slug: initialData.slug || "",
        description: initialData.description || "",
        category: initialData.category || "",
        isActive: initialData.isActive ?? true,
      });
    }
  }, [initialData, reset]);

  const watchName = watch("name");

  // Auto-generate slug from name if not editing
  useEffect(() => {
    if (!isEditing && watchName) {
      const generatedSlug = watchName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setValue("slug", generatedSlug, { shouldValidate: true });
    }
  }, [watchName, isEditing, setValue]);

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const payload = { ...data, description: data.description ?? undefined };
      let productResponse;
      if (isEditing && initialData) {
        productResponse = await productService.updateProduct(initialData.id, payload);
      } else {
        productResponse = await productService.createProduct(payload as any);
      }

      const productId = isEditing ? initialData!.id : (productResponse.data as Product).id;

      const typesToUpload = ["MAIN", "HOVER", "DETAIL_1", "DETAIL_2"];
      for (const type of typesToUpload) {
        if (imageFiles[type]) {
          await productImageService.uploadImage(
            productId,
            imageFiles[type]!,
            type as "MAIN" | "HOVER" | "DETAIL_1" | "DETAIL_2",
            (progressEvent) => {
              if (progressEvent.total) {
                setUploadProgress(prev => ({
                  ...prev,
                  [type]: Math.round((progressEvent.loaded * 100) / progressEvent.total!)
                }));
              }
            }
          );
        }
      }

      return productResponse;
    },
    onSuccess: () => {
      toast.success(
        `Product ${isEditing ? "updated" : "created"} successfully.`
      );
      queryClient.invalidateQueries({ queryKey: ["products"] });
      router.push("/products");
    },
    onError: (error: unknown) => {
      let message = `Failed to ${isEditing ? "update" : "create"} product.`;
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }
      toast.error(message);
    },
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

  return (
    <Card className="bg-zinc-950 border-zinc-800">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <Label className="text-zinc-300">Product Images</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["MAIN", "HOVER", "DETAIL_1", "DETAIL_2"].map((type) => (
                <div key={type} className="flex flex-col items-center gap-2">
                  <div 
                    className={`relative w-full aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-colors cursor-pointer overflow-hidden ${previewUrls[type] ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-800 hover:border-zinc-700 bg-zinc-950 hover:bg-zinc-900/50'}`}
                    onClick={() => document.getElementById(`image-upload-${type}`)?.click()}
                  >
                    {previewUrls[type] ? (
                      <>
                        <img src={previewUrls[type]!} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex flex-col items-center justify-center transition-opacity">
                          <p className="text-white text-xs font-medium text-center">{type}</p>
                          <p className="text-white text-xs font-medium mt-1">Replace</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="w-6 h-6 text-zinc-400 mb-2" />
                        <span className="text-xs text-zinc-400 font-medium text-center px-2">{type}</span>
                      </>
                    )}
                    <input 
                      id={`image-upload-${type}`} 
                      type="file" 
                      accept="image/jpeg,image/png,image/webp" 
                      className="hidden" 
                      onChange={(e) => handleImageChange(type, e)}
                      disabled={mutation.isPending}
                    />
                  </div>
                  {uploadProgress[type] > 0 && uploadProgress[type] < 100 && (
                    <div className="w-full space-y-1">
                      <div className="flex justify-between text-[10px] text-zinc-400">
                        <span>{uploadProgress[type]}%</span>
                      </div>
                      <Progress value={uploadProgress[type]} className="h-1" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-zinc-500">
              Upload exactly one image per slot (MAIN, HOVER, DETAIL_1, DETAIL_2). These will be displayed in order on the product page.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-zinc-300">
                Product Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                {...register("name")}
                disabled={mutation.isPending}
                className="bg-zinc-900 border-zinc-800 text-zinc-100"
                placeholder="e.g. Midnight Onyx Hoodie"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug" className="text-zinc-300">
                Slug <span className="text-red-500">*</span>
              </Label>
              <Input
                id="slug"
                {...register("slug")}
                disabled={mutation.isPending}
                className="bg-zinc-900 border-zinc-800 text-zinc-100"
                placeholder="e.g. midnight-onyx-hoodie"
              />
              {errors.slug && (
                <p className="text-sm text-red-500">{errors.slug.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-zinc-300">
              Category <span className="text-red-500">*</span>
            </Label>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Select
                  disabled={mutation.isPending}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger className="bg-zinc-900 border-zinc-800 text-zinc-100">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-950 border-zinc-800 text-zinc-100">
                    {categories.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && (
              <p className="text-sm text-red-500">
                {errors.category.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-zinc-300">
              Description
            </Label>
            <Textarea
              id="description"
              {...register("description")}
              disabled={mutation.isPending}
              className="bg-zinc-900 border-zinc-800 text-zinc-100 min-h-[150px]"
              placeholder="Product details..."
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50">
            <div className="space-y-0.5">
              <Label className="text-zinc-300">Active Status</Label>
              <p className="text-zinc-500 text-xs">
                Make this product visible on the storefront
              </p>
            </div>
            <Controller
              control={control}
              name="isActive"
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={mutation.isPending}
                />
              )}
            />
          </div>

          <div className="pt-6 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/products")}
              disabled={mutation.isPending}
              className="bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="bg-zinc-50 text-zinc-950 hover:bg-zinc-200"
            >
              {mutation.isPending && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              {isEditing ? "Save Changes" : "Create Product"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
