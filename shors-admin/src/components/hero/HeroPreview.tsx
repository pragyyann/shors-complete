import React from "react";
import { HeroMediaType } from "@/types/hero";

interface HeroPreviewProps {
  url: string | null;
  mediaType?: HeroMediaType | null;
}

export function HeroPreview({ url, mediaType }: HeroPreviewProps) {
  if (!url) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-zinc-900 border-2 border-dashed border-zinc-800 rounded-xl">
        <p className="text-zinc-500 text-sm">No media uploaded</p>
      </div>
    );
  }

  // Auto-detect if mediaType isn't fully reliable
  const isVideo = mediaType === "VIDEO" || url.match(/\.(mp4|webm|ogg)$/i);

  if (isVideo) {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
        <video
          src={url}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
      <img
        src={url}
        alt="Hero preview"
        className="h-full w-full object-cover"
      />
    </div>
  );
}
