"use client";

import { MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openQuery, type QueryPreset } from "@/lib/query-store";

export function OpenQueryButton({
  preset,
  children,
  icon = true,
  variant = "primary",
  size = "md",
  className,
}: {
  preset?: QueryPreset;
  children: React.ReactNode;
  icon?: boolean;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "white";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  return (
    <Button type="button" variant={variant} size={size} className={className} onClick={() => openQuery(preset)}>
      {icon && <MessageSquarePlus className="h-4 w-4" />}
      {children}
    </Button>
  );
}
