import React from "react";
import { Image as ImageIcon } from "lucide-react";

interface FeaturedPreviewProps {
  url: string | null;
}

export function FeaturedPreview({ url }: FeaturedPreviewProps) {
  if (!url) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-zinc-900 border border-dashed border-zinc-800 rounded-xl min-h-[200px]">
        <ImageIcon className="h-8 w-8 text-zinc-600 mb-2" />
        <p className="text-zinc-500 text-sm">No campaign image</p>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 min-h-[200px]">
      <img
        src={url}
        alt="Campaign preview"
        className="h-full w-full object-cover"
      />
    </div>
  );
}
