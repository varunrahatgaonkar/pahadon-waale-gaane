"use client";

import React, { useState } from "react";
import { PLAYLIST_CONFIG, TrackMetadata } from "@/lib/playlist";

interface PlaylistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentTrackTitle?: string;
  currentArtistName?: string;
  isPlaying?: boolean;
  isShuffle?: boolean;
  onToggleShuffle?: () => void;
  onSelectTrack?: (index: number, videoId?: string) => void;
}

export function PlaylistDrawer({
  isOpen,
  onClose,
  currentTrackTitle = "",
  currentArtistName = "",
  isPlaying = false,
  isShuffle = false,
  onToggleShuffle,
  onSelectTrack,
}: PlaylistDrawerProps) {
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  const filteredTracks = PLAYLIST_CONFIG.tracks.filter(
    (track: TrackMetadata) =>
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-md transition-opacity animate-in fade-in duration-300">
      {/* Click outside to close */}
      <div className="flex-1 hidden sm:block" onClick={onClose} />

      {/* Drawer Container */}
      <div className="w-full sm:max-w-md bg-[#121416]/95 border-l border-white/15 h-full flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)] text-[#e2e2e5] relative z-10 overflow-hidden">
        {/* Top Header */}
        <div className="p-3.5 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#1a1c1e]/60">
          <div>
            <h2 className="font-serif text-base sm:text-lg font-bold text-[#ffd7a9] flex items-center gap-2">
              <span>📻</span> पहाड़ों की प्लेलिस्ट
            </h2>
            <p className="font-sans text-[11px] sm:text-xs text-[#d6c3b0]/70 mt-0.5">
              Radio Pahad • 300+ Tracks Playlist
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Shuffle Button */}
            <button
              type="button"
              onClick={onToggleShuffle}
              className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border text-[11px] sm:text-xs font-medium flex items-center gap-1.5 transition-all ${
                isShuffle
                  ? "bg-[#ffb347] text-[#462a00] border-[#ffb347] font-bold shadow-[0_0_12px_rgba(255,179,71,0.5)]"
                  : "bg-white/5 border-white/15 text-[#d6c3b0] hover:text-[#ffd7a9] hover:bg-white/10"
              }`}
            >
              <span>🔀</span>
              {isShuffle ? "Shuffle ON" : "Shuffle"}
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-[#d6c3b0] hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close playlist"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Currently Playing Highlight Card */}
        <div className="p-3 mx-3 mt-3 bg-[#ffb347]/10 border border-[#ffb347]/30 rounded-2xl flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#ffb347] text-[#462a00] font-bold flex items-center justify-center text-xs sm:text-sm shrink-0">
            {isPlaying ? "▶" : "⏸"}
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#ffb347]">
              Now Playing on Radio
            </span>
            <p className="text-xs sm:text-sm font-bold text-[#ffd7a9] truncate">
              {currentTrackTitle || "पहाड़ों वाले गाने"}
            </p>
            <p className="text-[10px] sm:text-[11px] text-[#d6c3b0]/70 truncate">
              {currentArtistName || "Radio Pahad"}
            </p>
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="p-3 border-b border-white/10 bg-[#121416] shrink-0">
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-white/40 text-xs">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search song or artist..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1e2022] border border-white/15 rounded-xl pl-9 pr-4 py-2 text-xs text-[#ffd7a9] placeholder-white/30 focus:outline-none focus:border-[#ffb347] transition-colors"
            />
          </div>
        </div>

        {/* Playlist Song Rows */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5 custom-scrollbar">
          {filteredTracks.length === 0 ? (
            <div className="text-center py-12 text-xs text-[#d6c3b0]/50">
              No matching songs found in playlist.
            </div>
          ) : (
            filteredTracks.map((track, idx) => {
              const isCurrent = currentTrackTitle.toLowerCase().includes(track.title.toLowerCase());
              return (
                <button
                  key={`${track.title}-${idx}`}
                  type="button"
                  onClick={() => {
                    onSelectTrack?.(idx, track.id);
                    onClose();
                  }}
                  className={`w-full text-left p-2.5 sm:p-3 rounded-xl border flex items-center gap-2.5 sm:gap-3 transition-all ${
                    isCurrent
                      ? "bg-[#ffb347]/15 border-[#ffb347]/40 text-[#ffd7a9]"
                      : "bg-white/[0.02] border-white/5 hover:bg-white/[0.07] text-[#d6c3b0]"
                  }`}
                >
                  <span className="font-mono text-xs text-white/40 w-5 shrink-0 text-center">
                    {isCurrent && isPlaying ? (
                      <span className="text-[#ffb347] animate-pulse">▶</span>
                    ) : (
                      idx + 1
                    )}
                  </span>

                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-bold truncate ${isCurrent ? "text-[#ffd7a9]" : "text-white/90"}`}>
                      {track.title}
                    </p>
                    <p className="text-[10px] sm:text-[11px] text-[#d6c3b0]/60 truncate mt-0.5">
                      {track.artist}
                    </p>
                  </div>

                  <span className="font-mono text-[10px] text-white/30 shrink-0">
                    {track.duration || "3:30"}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* External YouTube Playlist Link */}
        <div className="p-3 border-t border-white/10 bg-[#121416] flex items-center justify-between text-xs shrink-0">
          <a
            href={`https://youtube.com/playlist?list=${PLAYLIST_CONFIG.youtubePlaylistId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ffb347] hover:underline flex items-center gap-1 font-mono text-[10px] sm:text-[11px]"
          >
            <span>▶</span> Open Full Playlist on YouTube
          </a>
          <span className="font-mono text-[10px] text-[#d6c3b0]/50">FM 92.7</span>
        </div>
      </div>
    </div>
  );
}
