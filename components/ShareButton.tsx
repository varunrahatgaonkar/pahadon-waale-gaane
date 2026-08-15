"use client";

import React, { useState } from "react";

export interface ShareButtonProps {
  title?: string;
  text?: string;
  url?: string;
  className?: string;
}

export function ShareButton({
  title = "पहाड़ों वाले गाने | Pahado Wale Gaane",
  text = "gaane jo pahadiyon mein hi sahi lagte the. before Wi-Fi, before Google Maps ki 'no signal'",
  url,
  className = "",
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: shareUrl,
        });
      } catch (err) {
        // Ignore user cancellation errors
        if ((err as Error).name !== "AbortError") {
          fallbackToClipboard(shareUrl);
        }
      }
    } else {
      fallbackToClipboard(shareUrl);
    }
  };

  const fallbackToClipboard = (shareUrl: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label="Share Pahado Wale Gaane link"
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7EFE2]/15 hover:bg-[#F7EFE2]/25 backdrop-blur-sm border border-[#F7EFE2]/20 text-[#F7EFE2] text-xs md:text-sm font-sans font-medium transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A33D] cursor-pointer ${className}`}
    >
      {copied ? (
        <>
          <svg className="w-4 h-4 text-[#E8A33D]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-[#E8A33D] font-semibold">कॉपी हो गया!</span>
        </>
      ) : (
        <>
          <svg className="w-4 h-4 text-[#E8A33D]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z" />
          </svg>
          <span>Share / साझा करें</span>
        </>
      )}
    </button>
  );
}
