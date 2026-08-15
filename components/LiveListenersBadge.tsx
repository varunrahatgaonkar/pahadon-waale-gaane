"use client";

import React from "react";
import { usePresenceCount } from "@/lib/hooks/usePresenceCount";

export function LiveListenersBadge() {
  const count = usePresenceCount();

  return (
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs text-[#F7EFE2] font-sans font-medium shadow-lg">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      <span>{count} {count === 1 ? "person listening" : "people listening"}</span>
    </div>
  );
}
