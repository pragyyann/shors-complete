"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lock, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { settingsService } from "@/services/settings.service";
import { clearAuthToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

export function SecuritySettings() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    try {
      await settingsService.changePassword({ currentPassword, newPassword, confirmPassword });
      toast.success("Password changed successfully. Please log in again.");
      clearAuthToken();
      router.push("/login");
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to change password";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 max-w-xl">
        <div className="space-y-2 md:col-span-2">
          <Label className="text-zinc-400">Current Password</Label>
          <Input 
            required
            type="password"
            placeholder="••••••••"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="bg-zinc-900 border-zinc-800 text-zinc-50 placeholder:text-zinc-500" 
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label className="text-zinc-400">New Password</Label>
          <Input 
            required
            type="password"
            placeholder="••••••••"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="bg-zinc-900 border-zinc-800 text-zinc-50 placeholder:text-zinc-500" 
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label className="text-zinc-400">Confirm New Password</Label>
          <Input 
            required
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-zinc-900 border-zinc-800 text-zinc-50 placeholder:text-zinc-500" 
          />
        </div>
      </div>

      <div className="flex justify-end border-t border-zinc-800 pt-6 max-w-xl">
        <Button 
          type="submit" 
          disabled={isLoading || !currentPassword || !newPassword || !confirmPassword} 
          className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
          Update Password
        </Button>
      </div>
    </form>
  );
}
