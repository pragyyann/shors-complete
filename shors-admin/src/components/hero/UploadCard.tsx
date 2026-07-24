"use client";

import React, { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axios, { AxiosProgressEvent } from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { HeroPreview } from "./HeroPreview";
import { HeroMediaType } from "@/types/hero";
import { UploadCloud, Loader2 } from "lucide-react";

interface UploadCardProps {
  title: string;
  type?: string;
  currentMediaUrl: string | null;
  mediaType: HeroMediaType | null;
  onUpload: (
    file: File,
    onProgress: (progress: number) => void
  ) => Promise<unknown>;
}

export function UploadCard({
  title,
  currentMediaUrl,
  mediaType,
  onUpload,
}: UploadCardProps) {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewMediaType, setPreviewMediaType] = useState<HeroMediaType | null>(
    null
  );

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      return onUpload(file, (progress) => {
        setProgress(progress);
      });
    },
    onSuccess: () => {
      toast.success(`${title} media uploaded successfully`);
      queryClient.invalidateQueries({ queryKey: ["hero"] });
      // Reset local preview state so it relies on the newly fetched data
      setPreviewUrl(null);
      setPreviewMediaType(null);
    },
    onError: (error: unknown) => {
      let message = "Failed to upload media. Try again.";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }
      toast.error(message);
      // Revert to original media on failure
      setPreviewUrl(null);
      setPreviewMediaType(null);
    },
    onSettled: () => {
      setProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "video/mp4"];
    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type. Only JPG, PNG, WEBP, and MP4 are allowed.");
      return;
    }

    // Generate local preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setPreviewMediaType(file.type.startsWith("video/") ? "VIDEO" : "IMAGE");

    // Start upload
    uploadMutation.mutate(file);
  };

  const handleTriggerClick = () => {
    fileInputRef.current?.click();
  };

  // Determine what to display
  const displayUrl = previewUrl || currentMediaUrl;
  const displayMediaType = previewMediaType || mediaType;
  const isUploading = uploadMutation.isPending;

  return (
    <Card className="bg-zinc-950 border-zinc-800 h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="text-zinc-50 font-medium tracking-tight">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4">
        <div className="flex-1 w-full relative group">
          <HeroPreview url={displayUrl} mediaType={displayMediaType} />
          
          {/* Overlay when uploading */}
          {isUploading && (
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center rounded-xl p-6 backdrop-blur-sm transition-all z-10">
              <Loader2 className="h-8 w-8 text-zinc-50 animate-spin mb-4" />
              <Progress value={progress} className="h-2 w-full max-w-[200px]" />
              <p className="text-zinc-300 text-sm mt-2 font-medium">
                {progress}%
              </p>
            </div>
          )}
        </div>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".jpg,.jpeg,.png,.webp,.mp4"
          onChange={handleFileSelect}
          disabled={isUploading}
        />

        <Button
          variant="outline"
          className="w-full bg-zinc-900 border-zinc-800 text-zinc-100 hover:bg-zinc-800 hover:text-white transition-colors duration-200"
          onClick={handleTriggerClick}
          disabled={isUploading}
        >
          <UploadCloud className="w-4 h-4 mr-2" />
          {displayUrl ? "Replace Media" : "Upload Media"}
        </Button>
      </CardContent>
    </Card>
  );
}
