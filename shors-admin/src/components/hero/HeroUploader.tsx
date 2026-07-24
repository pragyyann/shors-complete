"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { heroService } from "@/services/hero.service";
import { UploadCard } from "./UploadCard";
import { Skeleton } from "@/components/ui/skeleton";
import { AxiosProgressEvent } from "axios";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function HeroUploader() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["hero"],
    queryFn: () => heroService.getHero(),
  });

  const hero = data?.data;

  const [useMobileHero, setUseMobileHero] = useState(false);

  useEffect(() => {
    if (hero?.mobileMediaUrl) {
      setUseMobileHero(true);
    }
  }, [hero?.mobileMediaUrl]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-[250px] bg-zinc-900" />
          <Skeleton className="h-4 w-[350px] bg-zinc-900" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Skeleton className="h-[400px] w-full bg-zinc-900 rounded-xl" />
          <Skeleton className="h-[400px] w-full bg-zinc-900 rounded-xl" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 bg-zinc-950 border border-red-900/50 rounded-xl">
        <h3 className="text-red-500 font-medium">Error loading Hero data</h3>
        <p className="text-zinc-400 text-sm mt-1">Please try refreshing the page.</p>
      </div>
    );
  }

  const handleUploadDesktop = async (file: File, onProgress: (p: number) => void) => {
    return heroService.uploadDesktopMedia(file, (progressEvent: AxiosProgressEvent) => {
      if (progressEvent.total) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress(percentCompleted);
      }
    });
  };

  const handleUploadMobile = async (file: File, onProgress: (p: number) => void) => {
    return heroService.uploadMobileMedia(file, (progressEvent: AxiosProgressEvent) => {
      if (progressEvent.total) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress(percentCompleted);
      }
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-50">
          Hero Section
        </h2>
        <p className="text-zinc-400 text-sm mt-1">
          Manage the hero banners showcased on the storefront&apos;s homepage.
        </p>
      </div>

      <div className="flex items-center space-x-2 bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
        <Switch
          id="mobile-hero-toggle"
          checked={useMobileHero}
          onCheckedChange={setUseMobileHero}
        />
        <Label htmlFor="mobile-hero-toggle" className="text-zinc-100 font-medium">
          Use Separate Mobile Hero
        </Label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-auto lg:h-[600px]">
        <div className="h-[400px] lg:h-full">
          <UploadCard
            title="Desktop Hero (Default)"
            type="desktop"
            currentMediaUrl={hero?.desktopMediaUrl || null}
            mediaType={hero?.mediaType || null}
            onUpload={handleUploadDesktop}
          />
        </div>
        {useMobileHero && (
          <div className="h-[400px] lg:h-full">
            <UploadCard
              title="Mobile Hero"
              type="mobile"
              currentMediaUrl={hero?.mobileMediaUrl || null}
              mediaType={hero?.mediaType || null}
              onUpload={handleUploadMobile}
            />
          </div>
        )}
      </div>
    </div>
  );
}
