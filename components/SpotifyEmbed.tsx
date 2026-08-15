"use client";

import React from "react";
import { PLAYLIST_CONFIG } from "@/lib/playlist";

interface SpotifyEmbedProps {
  isVisible: boolean;
  onClose?: () => void;
}

export function SpotifyEmbed({ isVisible, onClose }: SpotifyEmbedProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-4 bottom-20 md:bottom-24 md:right-8 md:left-auto md:w-[400px] z-30 bg-[#2F4538] border-2 border-[#E8A33D]/40 rounded-2xl p-4 shadow-2xl backdrop-blur-lg animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#F7EFE2]/15">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1DB954]" aria-hidden="true" />
          <h3 className="font-serif text-sm md:text-base font-semibold text-[#F7EFE2]">
            Spotify Playlist
          </h3>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Spotify embed view"
            className="text-[#F7EFE2]/70 hover:text-[#F7EFE2] text-xs px-2 py-1 rounded bg-[#F7EFE2]/10 hover:bg-[#F7EFE2]/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A33D]"
          >
            ✕ Hide
          </button>
        )}
      </div>

      <div className="w-full rounded-xl overflow-hidden bg-black/30">
        <iframe
          src={`https://open.spotify.com/embed/playlist/${PLAYLIST_CONFIG.spotifyPlaylistId}?utm_source=generator&theme=0`}
          width="100%"
          height="152"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Spotify Pahadi Songs Playlist Embed"
          className="border-0 rounded-xl"
        />
      </div>

      <p className="mt-2 text-[11px] text-[#F7EFE2]/70 text-center leading-tight">
        Note: Spotify logged-in users get full playback; logged-out visitors hear 30s previews.
      </p>
    </div>
  );
}
