"use client";

import React from "react";
import { Settings as SettingsIcon } from "lucide-react";
import { SecuritySettings } from "@/components/settings/SecuritySettings";

export default function SettingsPage() {
  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto w-full min-h-[calc(100vh-4rem)] bg-zinc-950 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-50 flex items-center gap-2">
          <SettingsIcon className="w-6 h-6 text-zinc-400" />
          Settings
        </h2>
        <p className="text-zinc-400 text-sm mt-1">
          Manage your account and security configuration.
        </p>
      </div>

      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
        <SecuritySettings />
      </div>
    </div>
  );
}
