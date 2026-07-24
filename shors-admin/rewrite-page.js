"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { homepageShowcaseModuleService } from "@/services/homepageShowcaseModule.service";
import { CampaignUploader } from "@/components/featured/CampaignUploader";
import { ProductSelector } from "@/components/featured/ProductSelector";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { productService } from "@/services/product.service";
import { HomepageShowcaseModule } from "@/types/homepageShowcaseModule";

const blockOneSchema = z.object({
  blockOneLabel: z.string().optional().nullable(),
  blockOneCollectionName: z.string().min(1, "Collection Name is required"),
  blockOneDescription: z.string().optional().nullable(),
  blockOneProductOneId: z.number().optional().nullable(),
  blockOneProductTwoId: z.number().optional().nullable(),
  blockOneBannerImage: z.any().optional(),
  blockOneIsActive: z.boolean(),
});

type BlockOneValues = z.infer<typeof blockOneSchema>;

const blockTwoSchema = z.object({
  blockTwoLabel: z.string().optional().nullable(),
  blockTwoCollectionName: z.string().min(1, "Collection Name is required"),
  blockTwoDescription: z.string().optional().nullable(),
  blockTwoProductOneId: z.number().optional().nullable(),
  blockTwoProductTwoId: z.number().optional().nullable(),
  blockTwoBannerImage: z.any().optional(),
  blockTwoIsActive: z.boolean(),
});

type BlockTwoValues = z.infer<typeof blockTwoSchema>;

function ShowcaseCardOne({ showcase, products }: { showcase: HomepageShowcaseModule | undefined; products: any[] }) {
  const queryClient = useQueryClient();
  const [uploadProgress, setUploadProgress] = useState(0);

  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<BlockOneValues>({
    resolver: zodResolver(blockOneSchema),
    defaultValues: {
      blockOneLabel: "",
      blockOneCollectionName: "",
      blockOneDescription: "",
      blockOneProductOneId: undefined,
      blockOneProductTwoId: undefined,
      blockOneBannerImage: null,
      blockOneIsActive: true,
    },
  });

  useEffect(() => {
    if (showcase) {
      reset({
        blockOneLabel: showcase.blockOneLabel || "",
        blockOneCollectionName: showcase.blockOneCollectionName || "",
        blockOneDescription: showcase.blockOneDescription || "",
        blockOneProductOneId: showcase.blockOneProductOneId || undefined,
        blockOneProductTwoId: showcase.blockOneProductTwoId || undefined,
        blockOneBannerImage: null,
        blockOneIsActive: showcase.blockOneIsActive ?? true,
      });
    }
  }, [showcase, reset]);

  const watchBlockOneProductOne = watch("blockOneProductOneId");
  const watchBlockOneProductTwo = watch("blockOneProductTwoId");

  const mutation = useMutation({
    mutationFn: async (data: BlockOneValues) => {
      const formData = new FormData();
      if (data.blockOneLabel) formData.append("blockOneLabel", data.blockOneLabel);
      if (data.blockOneCollectionName) formData.append("blockOneCollectionName", data.blockOneCollectionName);
      if (data.blockOneDescription) formData.append("blockOneDescription", data.blockOneDescription);
      
      formData.append("blockOneProductOneId", data.blockOneProductOneId ? data.blockOneProductOneId.toString() : "null");
      formData.append("blockOneProductTwoId", data.blockOneProductTwoId ? data.blockOneProductTwoId.toString() : "null");
      formData.append("blockOneIsActive", data.blockOneIsActive.toString());

      if (data.blockOneBannerImage instanceof File) {
        formData.append("blockOneBannerImage", data.blockOneBannerImage);
      }
      return homepageShowcaseModuleService.updateHomepageShowcase(formData);
    },
    onSuccess: () => {
      toast.success("Block 1 updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["homepage-showcase-module"] });
    },
    onError: (error: unknown) => {
      let message = "Failed to update Block 1";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }
      toast.error(message);
    },
    onSettled: () => setUploadProgress(0),
  });

  return (
    <Card className="bg-zinc-950 border-zinc-700 shadow-lg shadow-zinc-900/50">
      <CardHeader className="pb-4 border-b border-zinc-800/50 mb-6 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-zinc-50 font-medium tracking-tight">Showcase Block 1</CardTitle>
          <CardDescription className="text-zinc-400">First editorial block on the homepage.</CardDescription>
        </div>
        <Controller
          control={control}
          name="blockOneIsActive"
          render={({ field }) => (
            <div className="flex items-center space-x-2">
              <Label className="text-zinc-300">Active</Label>
              <Switch checked={field.value} onCheckedChange={field.onChange} disabled={mutation.isPending} />
            </div>
          )}
        />
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-8">
          <div className="space-y-4">
            <Label className="text-zinc-300">Banner Image</Label>
            <Controller
              control={control}
              name="blockOneBannerImage"
              render={({ field: { onChange } }) => (
                <CampaignUploader
                  currentUrl={showcase?.blockOneBannerImagePublicId ? showcase?.blockOneBannerImage : null}
                  onFileSelect={onChange}
                  isUploading={mutation.isPending}
                  uploadProgress={uploadProgress}
                />
              )}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-zinc-300">Collection Name</Label>
              <Input {...register("blockOneCollectionName")} className="bg-zinc-900 border-zinc-800 text-zinc-100" />
              {errors.blockOneCollectionName && <p className="text-red-500 text-xs">{errors.blockOneCollectionName.message}</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-300">Small Label</Label>
              <Input {...register("blockOneLabel")} className="bg-zinc-900 border-zinc-800 text-zinc-100" />
            </div>
            <div className="space-y-2 col-span-2">
              <Label className="text-zinc-300">Description</Label>
              <Textarea {...register("blockOneDescription")} className="bg-zinc-900 border-zinc-800 text-zinc-100 min-h-[100px]" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <Label className="text-zinc-300">Featured Product 1</Label>
              <Controller
                control={control}
                name="blockOneProductOneId"
                render={({ field }) => (
                  <ProductSelector
                    products={products}
                    value={field.value || null}
                    onChange={field.onChange}
                    disabledProductIds={watchBlockOneProductTwo ? [watchBlockOneProductTwo] : []}
                    disabled={mutation.isPending}
                    placeholder="Search product..."
                  />
                )}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-300">Featured Product 2</Label>
              <Controller
                control={control}
                name="blockOneProductTwoId"
                render={({ field }) => (
                  <ProductSelector
                    products={products}
                    value={field.value || null}
                    onChange={field.onChange}
                    disabledProductIds={watchBlockOneProductOne ? [watchBlockOneProductOne] : []}
                    disabled={mutation.isPending}
                    placeholder="Search product..."
                  />
                )}
              />
            </div>
          </div>
          
          <div className="pt-4 border-t border-zinc-800/50">
            <Button type="submit" disabled={mutation.isPending} className="w-full bg-zinc-50 text-zinc-950 hover:bg-zinc-200">
              {mutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Save Block 1
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function ShowcaseCardTwo({ showcase, products }: { showcase: HomepageShowcaseModule | undefined; products: any[] }) {
  const queryClient = useQueryClient();
  const [uploadProgress, setUploadProgress] = useState(0);

  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<BlockTwoValues>({
    resolver: zodResolver(blockTwoSchema),
    defaultValues: {
      blockTwoLabel: "",
      blockTwoCollectionName: "",
      blockTwoDescription: "",
      blockTwoProductOneId: undefined,
      blockTwoProductTwoId: undefined,
      blockTwoBannerImage: null,
      blockTwoIsActive: true,
    },
  });

  useEffect(() => {
    if (showcase) {
      reset({
        blockTwoLabel: showcase.blockTwoLabel || "",
        blockTwoCollectionName: showcase.blockTwoCollectionName || "",
        blockTwoDescription: showcase.blockTwoDescription || "",
        blockTwoProductOneId: showcase.blockTwoProductOneId || undefined,
        blockTwoProductTwoId: showcase.blockTwoProductTwoId || undefined,
        blockTwoBannerImage: null,
        blockTwoIsActive: showcase.blockTwoIsActive ?? true,
      });
    }
  }, [showcase, reset]);

  const watchBlockTwoProductOne = watch("blockTwoProductOneId");
  const watchBlockTwoProductTwo = watch("blockTwoProductTwoId");

  const mutation = useMutation({
    mutationFn: async (data: BlockTwoValues) => {
      const formData = new FormData();
      if (data.blockTwoLabel) formData.append("blockTwoLabel", data.blockTwoLabel);
      if (data.blockTwoCollectionName) formData.append("blockTwoCollectionName", data.blockTwoCollectionName);
      if (data.blockTwoDescription) formData.append("blockTwoDescription", data.blockTwoDescription);
      
      formData.append("blockTwoProductOneId", data.blockTwoProductOneId ? data.blockTwoProductOneId.toString() : "null");
      formData.append("blockTwoProductTwoId", data.blockTwoProductTwoId ? data.blockTwoProductTwoId.toString() : "null");
      formData.append("blockTwoIsActive", data.blockTwoIsActive.toString());

      if (data.blockTwoBannerImage instanceof File) {
        formData.append("blockTwoBannerImage", data.blockTwoBannerImage);
      }
      return homepageShowcaseModuleService.updateHomepageShowcase(formData);
    },
    onSuccess: () => {
      toast.success("Block 2 updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["homepage-showcase-module"] });
    },
    onError: (error: unknown) => {
      let message = "Failed to update Block 2";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }
      toast.error(message);
    },
    onSettled: () => setUploadProgress(0),
  });

  return (
    <Card className="bg-zinc-950 border-zinc-700 shadow-lg shadow-zinc-900/50">
      <CardHeader className="pb-4 border-b border-zinc-800/50 mb-6 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-zinc-50 font-medium tracking-tight">Showcase Block 2</CardTitle>
          <CardDescription className="text-zinc-400">Second editorial block on the homepage.</CardDescription>
        </div>
        <Controller
          control={control}
          name="blockTwoIsActive"
          render={({ field }) => (
            <div className="flex items-center space-x-2">
              <Label className="text-zinc-300">Active</Label>
              <Switch checked={field.value} onCheckedChange={field.onChange} disabled={mutation.isPending} />
            </div>
          )}
        />
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-8">
          <div className="space-y-4">
            <Label className="text-zinc-300">Banner Image</Label>
            <Controller
              control={control}
              name="blockTwoBannerImage"
              render={({ field: { onChange } }) => (
                <CampaignUploader
                  currentUrl={showcase?.blockTwoBannerImagePublicId ? showcase?.blockTwoBannerImage : null}
                  onFileSelect={onChange}
                  isUploading={mutation.isPending}
                  uploadProgress={uploadProgress}
                />
              )}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-zinc-300">Collection Name</Label>
              <Input {...register("blockTwoCollectionName")} className="bg-zinc-900 border-zinc-800 text-zinc-100" />
              {errors.blockTwoCollectionName && <p className="text-red-500 text-xs">{errors.blockTwoCollectionName.message}</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-300">Small Label</Label>
              <Input {...register("blockTwoLabel")} className="bg-zinc-900 border-zinc-800 text-zinc-100" />
            </div>
            <div className="space-y-2 col-span-2">
              <Label className="text-zinc-300">Description</Label>
              <Textarea {...register("blockTwoDescription")} className="bg-zinc-900 border-zinc-800 text-zinc-100 min-h-[100px]" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <Label className="text-zinc-300">Featured Product 1</Label>
              <Controller
                control={control}
                name="blockTwoProductOneId"
                render={({ field }) => (
                  <ProductSelector
                    products={products}
                    value={field.value || null}
                    onChange={field.onChange}
                    disabledProductIds={watchBlockTwoProductTwo ? [watchBlockTwoProductTwo] : []}
                    disabled={mutation.isPending}
                    placeholder="Search product..."
                  />
                )}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-300">Featured Product 2</Label>
              <Controller
                control={control}
                name="blockTwoProductTwoId"
                render={({ field }) => (
                  <ProductSelector
                    products={products}
                    value={field.value || null}
                    onChange={field.onChange}
                    disabledProductIds={watchBlockTwoProductOne ? [watchBlockTwoProductOne] : []}
                    disabled={mutation.isPending}
                    placeholder="Search product..."
                  />
                )}
              />
            </div>
          </div>
          
          <div className="pt-4 border-t border-zinc-800/50">
            <Button type="submit" disabled={mutation.isPending} className="w-full bg-zinc-50 text-zinc-950 hover:bg-zinc-200">
              {mutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Save Block 2
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default function HomepageShowcasePage() {
  const {
    data: productsData,
    isLoading: isLoadingProducts,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => productService.getProducts(),
  });

  const {
    data: showcaseData,
    isLoading: isLoadingShowcase,
  } = useQuery({
    queryKey: ["homepage-showcase-module"],
    queryFn: () => homepageShowcaseModuleService.getHomepageShowcase(),
  });

  const isLoading = isLoadingProducts || isLoadingShowcase;

  if (isLoading) {
    return (
      <div className="p-6 md:p-8 max-w-3xl mx-auto w-full min-h-[calc(100vh-4rem)] bg-zinc-950 space-y-6">
        <Skeleton className="h-[600px] w-full bg-zinc-900 rounded-xl" />
        <Skeleton className="h-[600px] w-full bg-zinc-900 rounded-xl" />
      </div>
    );
  }

  const products = Array.isArray(productsData?.data) ? productsData.data : [];
  const showcase = showcaseData?.data;

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto w-full min-h-[calc(100vh-4rem)] bg-zinc-950 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-50">
          Homepage Showcase
        </h2>
        <p className="text-zinc-400 text-sm mt-1">
          Manage the primary product showcase blocks displayed on the storefront homepage independently.
        </p>
      </div>

      <div className="grid gap-8">
        <ShowcaseCardOne showcase={showcase} products={products} />
        <ShowcaseCardTwo showcase={showcase} products={products} />
      </div>
    </div>
  );
}
