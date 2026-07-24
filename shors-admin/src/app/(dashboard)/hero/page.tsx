import React from "react";
import { HeroUploader } from "@/components/hero/HeroUploader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hero CMS | SHORS Admin",
  description: "Manage storefront hero media",
};

export default function HeroPage() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto w-full min-h-[calc(100vh-4rem)] bg-zinc-950">
      <HeroUploader />
    </div>
  );
}
