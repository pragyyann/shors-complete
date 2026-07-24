import React, { useRef, useState, useEffect } from "react";
import { FeaturedPreview } from "./FeaturedPreview";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { UploadCloud, Loader2 } from "lucide-react";

interface CampaignUploaderProps {
  currentUrl: string | null;
  onFileSelect: (file: File | null) => void;
  uploadProgress?: number;
  isUploading?: boolean;
}

export function CampaignUploader({
  currentUrl,
  onFileSelect,
  uploadProgress,
  isUploading,
}: CampaignUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);

  useEffect(() => {
    // Cleanup local object url when unmounting or when currentUrl overrides
    return () => {
      if (localPreview) URL.revokeObjectURL(localPreview);
    };
  }, [localPreview]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setLocalPreview(objectUrl);
      onFileSelect(file);
    } else {
      setLocalPreview(null);
      onFileSelect(null);
    }
  };

  const displayUrl = localPreview || currentUrl;

  return (
    <div className="space-y-4">
      <div className="relative group overflow-hidden rounded-xl">
        <FeaturedPreview url={displayUrl} />

        {isUploading && uploadProgress !== undefined && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-6 backdrop-blur-sm transition-all z-10">
            <Loader2 className="h-8 w-8 text-zinc-50 animate-spin mb-4" />
            <Progress value={uploadProgress} className="h-2 w-full max-w-[200px]" />
            <p className="text-zinc-300 text-sm mt-2 font-medium">
              {uploadProgress}%
            </p>
          </div>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/jpeg, image/png, image/webp"
        onChange={handleFileChange}
        disabled={isUploading}
      />

      <Button
        type="button"
        variant="outline"
        className="w-full bg-zinc-900 border-zinc-800 text-zinc-100 hover:bg-zinc-800 hover:text-white transition-colors duration-200"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
      >
        <UploadCloud className="w-4 h-4 mr-2" />
        {displayUrl ? "Change Image" : "Upload Image"}
      </Button>
    </div>
  );
}
