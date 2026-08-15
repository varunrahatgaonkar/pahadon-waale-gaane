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
                  const parts = videoData.title.split("-");
                  if (parts.length > 1) {
                    trackInfo = {
                      title: parts[1].trim(),
                      artist: parts[0].trim(),
                    };
                  } else {
                    trackInfo = {
                      title: videoData.title,
                      artist: videoData.author || "Pahadi Classics",
                    };
                  }
                }
              }

              console.log(`[Pahado Player] Playback state changed: ${isPlaying ? "PLAYING" : "PAUSED"}`, trackInfo);
              onStateChangeRef.current?.(isPlaying, trackInfo);
            },
            onError: (err: YTPlayerEvent) => {
              console.error("[Pahado Player] YouTube Player error code:", err.data);
              if (isMounted) {
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
