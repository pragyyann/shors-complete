"use client";

import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Preorder, PreorderStatus } from "@/types/preorder";
import { preorderService } from "@/services/preorder.service";
import { toast } from "sonner";
import { format } from "date-fns";
import { Loader2, Package, User, MapPin, AlignLeft, Calendar } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "./StatusBadge";
import axios from "axios";

interface OrderDetailsDrawerProps {
  order: Preorder | null;
  isOpen: boolean;
  onClose: () => void;
}

export function OrderDetailsDrawer({ order, isOpen, onClose }: OrderDetailsDrawerProps) {
  const queryClient = useQueryClient();

  const [status, setStatus] = useState<PreorderStatus | undefined>(order?.status);
  const [notes, setNotes] = useState<string>(order?.internalNotes || "");
  const [prevOrder, setPrevOrder] = useState<Preorder | null>(order);

  if (order !== prevOrder) {
    setPrevOrder(order);
    setStatus(order?.status);
    setNotes(order?.internalNotes || "");
  }


  const handleStatusChange = (newStatus: PreorderStatus) => {
    setStatus(newStatus);
    if (!order) return;
    preorderService.updatePreorder(order.id, {
      status: newStatus,
      adminNotes: notes,
    }).then(() => {
      toast.success("Status updated");
      queryClient.invalidateQueries({ queryKey: ["preorders"] });
    }).catch((error) => {
      let message = "Failed to update status.";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }
      toast.error(message);
    });
  };

  const handleNotesBlur = () => {
    if (!order || notes === (order.internalNotes || "")) return;
    preorderService.updatePreorder(order.id, {
      status,
      adminNotes: notes,
    }).then(() => {
      toast.success("Notes saved");
      queryClient.invalidateQueries({ queryKey: ["preorders"] });
    }).catch((error) => {
      let message = "Failed to save notes.";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }
      toast.error(message);
    });
  };

  if (!order) return null;

  // WhatsApp Quick Action URL generator
  const getWhatsAppUrl = () => {
    if (!order.customer?.phone) return "#";
    const phone = order.customer.phone.replace(/[^0-9]/g, "");
    const message = `Hi ${order.fullName || order.customer.name}, Thank you for reserving the ${order.product?.name} from SHORS. Your preorder has been received successfully. Our team will now guide you through confirmation, payment, and production. Thank you for choosing SHORS.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="bg-zinc-950 border-l-zinc-800 w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-6">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-bold text-zinc-100 flex items-center gap-2">
              Order #SH-{order.id.toString().padStart(5, "0")}
            </SheetTitle>
            <StatusBadge status={order.status} />
          </div>
          <SheetDescription className="text-zinc-400">
            Placed on {format(new Date(order.createdAt), "PPP 'at' p")}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-8">
          {/* Customer Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-zinc-100 flex items-center gap-2 uppercase tracking-wider">
              <User className="w-4 h-4 text-zinc-500" />
              Customer Details
            </h3>
            <div className="p-4 bg-zinc-900/50 rounded-lg border border-zinc-800 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-500">Name</span>
                <span className="text-zinc-200 font-medium">{order.fullName || order.customer?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Phone</span>
                <span className="text-zinc-200 font-medium">{order.customer?.phone}</span>
              </div>
              {order.customer?.email && (
                <div className="flex justify-between">
                  <span className="text-zinc-500">Email</span>
                  <span className="text-zinc-200">{order.customer.email}</span>
                </div>
              )}
            </div>
          </div>

          {/* Location Info */}
          {(order.customer?.city || order.customer?.state || order.customer?.country) && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-zinc-100 flex items-center gap-2 uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-zinc-500" />
                Location
              </h3>
              <div className="p-4 bg-zinc-900/50 rounded-lg border border-zinc-800 space-y-2 text-sm">
                {order.customer?.city && (
                  <div className="flex justify-between">
                    <span className="text-zinc-500">City</span>
                    <span className="text-zinc-200">{order.customer.city}</span>
                  </div>
                )}
                {order.customer?.state && (
                  <div className="flex justify-between">
                    <span className="text-zinc-500">State</span>
                    <span className="text-zinc-200">{order.customer.state}</span>
                  </div>
                )}
                {order.customer?.country && (
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Country</span>
                    <span className="text-zinc-200">{order.customer.country}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Product Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-zinc-100 flex items-center gap-2 uppercase tracking-wider">
              <Package className="w-4 h-4 text-zinc-500" />
              Order Items
            </h3>
            <div className="p-4 bg-zinc-900/50 rounded-lg border border-zinc-800 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-500">Product</span>
                <span className="text-zinc-200 font-medium">{order.product?.name}</span>
              </div>
              {order.product?.category && (
                <div className="flex justify-between">
                  <span className="text-zinc-500">Category</span>
                  <span className="text-zinc-200 font-medium capitalize">{order.product.category.replace(/_/g, " ").toLowerCase()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-zinc-500">Quantity</span>
                <span className="text-zinc-200 font-medium">x{order.quantity}</span>
              </div>
            </div>
          </div>

          {/* Customer Message (Read-Only) */}
          {order.message && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-zinc-100 flex items-center gap-2 uppercase tracking-wider">
                <AlignLeft className="w-4 h-4 text-zinc-500" />
                Customer Message
              </h3>
              <div className="p-4 bg-zinc-900/50 rounded-lg border border-zinc-800 space-y-2 text-sm text-zinc-300 whitespace-pre-wrap">
                {order.message}
              </div>
            </div>
          )}

          {/* WhatsApp Quick Action */}
          <div className="pt-2">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white py-2 px-4 rounded-md font-medium text-sm transition-colors"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              Contact Customer on WhatsApp
            </a>
          </div>

          {/* Order Status & Notes */}
          <div className="space-y-4 pt-4 border-t border-zinc-800">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">
                Update Status
              </label>
              <Select
                value={status}
                onValueChange={(val) => handleStatusChange(val as PreorderStatus)}
              >
                <SelectTrigger className="w-full bg-zinc-950 border-zinc-800 text-zinc-200">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-950 border-zinc-800">
                  <SelectItem value="NEW">New</SelectItem>
                  <SelectItem value="CONTACTED">Contacted</SelectItem>
                  <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                  <SelectItem value="IN_PRODUCTION">In Production</SelectItem>
                  <SelectItem value="READY">Ready</SelectItem>
                  <SelectItem value="DELIVERED">Delivered</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                <AlignLeft className="w-4 h-4 text-zinc-500" />
                Admin Notes
              </label>
              <Textarea
                placeholder="Add notes about contacting the customer, payment, etc..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                onBlur={handleNotesBlur}
                className="bg-zinc-950 border-zinc-800 text-zinc-200 min-h-[100px] resize-none"
              />
            </div>
          </div>

          {/* Timeline / Footer Info */}
          <div className="text-xs text-zinc-500 flex items-center gap-1.5 justify-center pt-4">
            <Calendar className="w-3.5 h-3.5" />
            Last updated {format(new Date(order.updatedAt), "PPP")}
          </div>

        </div>
      </SheetContent>
    </Sheet>
  );
}
