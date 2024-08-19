"use client";
import { ReactNode, useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
export default function ({ className, children }: { className?: string; children?: ReactNode }) {
  let [height, setHeight] = useState(0);
  useEffect(() => {
    let height = window.screen.height;
    setHeight(height);
  });
  return (
    <ScrollArea className={cn("", className)} style={{ height: `${height / 1.55}px` }}>
      {children}
    </ScrollArea>
  );
}
