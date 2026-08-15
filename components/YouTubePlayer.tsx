"use client";

import React, { useEffect, useRef } from "react";
import { PLAYLIST_CONFIG } from "@/lib/playlist";

export interface YTPlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  nextVideo: () => void;
  previousVideo: () => void;
  destroy: () => void;
  getVideoData: () => { title?: string; author?: string };
  getCurrentTime?: () => number;
  getDuration?: () => number;
  getPlayerState?: () => number;
  setShuffle?: (shuffle: boolean) => void;
  playVideoAt?: (index: number) => void;
  loadVideoById?: (videoId: string) => void;
  setLoop?: (loopPlaylists: boolean) => void;
}

export interface YTPlayerEvent {
  target: YTPlayerInstance;
  data?: number;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: {
      Player: new (
        elementId: string | HTMLElement,
        options: {
          events?: {
            onReady?: (event: YTPlayerEvent) => void;
            onStateChange?: (event: YTPlayerEvent) => void;
            onError?: (event: YTPlayerEvent) => void;
          };
        }
      ) => YTPlayerInstance;
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
      };
    };
  }
}

interface YouTubePlayerProps {
  onPlayerReady?: (player: YTPlayerInstance) => void;
  onStateChange?: (isPlaying: boolean, trackData?: { title: string; artist: string }) => void;
}

function parseYouTubeTrack(rawTitle?: string, author?: string): { title: string; artist: string } {
  if (!rawTitle) return PLAYLIST_CONFIG.fallbackTrack;

  // Clean common YouTube noise
  const cleaned = rawTitle
    .replace(/[\(\[\{].*?(official|lyric|video|hd|4k|audio|full song|visualizer|remastered|music video|lyrics).*?[\)\]\}]/gi, "")
    .trim();

  // Handle quoted song titles: e.g. Highway: "Maahi Ve"
  const quoteMatch = cleaned.match(/(?:(.*?):)?\s*["'“]([^"'”]+)["'”]/);
  if (quoteMatch) {
    const moviePrefix = quoteMatch[1] ? quoteMatch[1].trim() : "";
    const songTitle = quoteMatch[2].trim();
    const afterPart = cleaned.replace(quoteMatch[0], "").replace(/[-|:]/g, "").trim();

    let movieOrArtist = [moviePrefix, afterPart].filter(Boolean).join(" • ");
    if (!movieOrArtist) movieOrArtist = author || "Radio Pahad";

    return {
      title: songTitle,
      artist: movieOrArtist,
    };
  }

  // Split on - or | or :
  const parts = cleaned.split(/\s+[-|:]\s+/);
  if (parts.length >= 2) {
    return {
      title: parts[0].trim(),
      artist: parts.slice(1).join(" • ").trim(),
    };
  }

  return {
    title: cleaned,
    artist: author || "Radio Pahad • Pahadi Classics",
  };
}

export function YouTubePlayer({ onPlayerReady, onStateChange }: YouTubePlayerProps) {
  const playerRef = useRef<YTPlayerInstance | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const onPlayerReadyRef = useRef(onPlayerReady);
  const onStateChangeRef = useRef(onStateChange);

  useEffect(() => {
    onPlayerReadyRef.current = onPlayerReady;
    onStateChangeRef.current = onStateChange;
  });

  useEffect(() => {
    let isMounted = true;

    const attachPlayer = () => {
      if (!window.YT || !window.YT.Player || !iframeRef.current) return;

      console.log("[Pahado Player] Initializing YouTube IFrame API with playlist ID:", PLAYLIST_CONFIG.youtubePlaylistId);

      try {
        playerRef.current = new window.YT.Player(iframeRef.current, {
          events: {
            onReady: (event: YTPlayerEvent) => {
              if (isMounted) {
                console.log("[Pahado Player] YouTube Player is READY! Playlist loaded successfully.");
                onPlayerReadyRef.current?.(event.target);
              }
            },
            onStateChange: (event: YTPlayerEvent) => {
              if (!isMounted) return;
              const isPlaying = event.data === window.YT?.PlayerState.PLAYING;
              let trackInfo = PLAYLIST_CONFIG.fallbackTrack;

              if (event.target && typeof event.target.getVideoData === "function") {
                const videoData = event.target.getVideoData();
                if (videoData && videoData.title) {
                  trackInfo = parseYouTubeTrack(videoData.title, videoData.author);
                }
              }

              console.log(`[Pahado Player] Playback state changed: ${isPlaying ? "PLAYING" : "PAUSED"}`, trackInfo);
              onStateChangeRef.current?.(isPlaying, trackInfo);
            },
            onError: (err: YTPlayerEvent) => {
              console.warn(`[Pahado Player] YouTube Player error code: ${err.data}`);

              // Error 150 / 101: Video is embed-restricted by owner -> Auto-skip to next track in playlist
              if (err.data === 150 || err.data === 101 || err.data === 2) {
                console.log("[Pahado Player] Embed-restricted track detected (Error 150/101), automatically skipping to next track...");
                setTimeout(() => {
                  if (playerRef.current && typeof playerRef.current.nextVideo === "function") {
                    playerRef.current.nextVideo();
                  }
                }, 400);
              } else if (isMounted) {
                onStateChangeRef.current?.(false);
              }
            },
          },
        });
      } catch (err) {
        console.error("[Pahado Player] YouTube Player init exception:", err);
      }
    };

    if (window.YT && window.YT.Player) {
      attachPlayer();
    } else {
      const existingScript = document.getElementById("youtube-iframe-api");
      if (!existingScript) {
        const tag = document.createElement("script");
        tag.id = "youtube-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      }

      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        if (isMounted) attachPlayer();
      };
    }

    return () => {
      isMounted = false;
      if (playerRef.current && typeof playerRef.current.destroy === "function") {
        playerRef.current.destroy();
      }
    };
  }, []);

  const embedUrl = `https://www.youtube.com/embed/videoseries?list=${PLAYLIST_CONFIG.youtubePlaylistId}&enablejsapi=1&autoplay=0&controls=0&disablekb=1&fs=0&modestbranding=1&rel=0`;

  return (
    <iframe
      ref={iframeRef}
      id="youtube-hidden-player"
      src={embedUrl}
      title="Pahado Wale Gaane YouTube Engine"
      allow="autoplay; encrypted-media"
      className="fixed bottom-0 right-0 w-16 h-16 opacity-0 pointer-events-none -z-50 overflow-hidden"
    />
  );
}
