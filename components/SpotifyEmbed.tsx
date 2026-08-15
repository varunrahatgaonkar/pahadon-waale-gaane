"use client";

import React, { useEffect, useRef } from "react";
import { PLAYLIST_CONFIG } from "@/lib/playlist";

export interface SpotifyControllerInstance {
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  resume: () => void;
  addListener: (
    event: string,
    callback: (e: { data: { isPaused: boolean; isBuffering: boolean; position: number; duration: number } }) => void
  ) => void;
  destroy: () => void;
}

export interface SpotifyIFrameAPI {
  createController: (
    element: HTMLElement | null,
    options: { uri?: string; width?: string | number; height?: string | number },
    callback: (embedController: SpotifyControllerInstance) => void
  ) => void;
}

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (IFrameAPI: SpotifyIFrameAPI) => void;
  }
}

interface SpotifyEmbedProps {
  isVisible: boolean;
  onClose?: () => void;
  onControllerReady?: (controller: SpotifyControllerInstance) => void;
  onStateChange?: (isPlaying: boolean, positionSec?: number, durationSec?: number) => void;
}

export function SpotifyEmbed({
  onControllerReady,
  onStateChange,
}: SpotifyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<SpotifyControllerInstance | null>(null);
  const onControllerReadyRef = useRef(onControllerReady);
  const onStateChangeRef = useRef(onStateChange);

  useEffect(() => {
    onControllerReadyRef.current = onControllerReady;
    onStateChangeRef.current = onStateChange;
  });

  useEffect(() => {
    let isMounted = true;

    const initSpotifyController = (IFrameAPI: SpotifyIFrameAPI) => {
      if (!containerRef.current || !isMounted) return;

      IFrameAPI.createController(
        containerRef.current,
        {
          uri: `spotify:playlist:${PLAYLIST_CONFIG.spotifyPlaylistId}`,
          width: "100%",
          height: "152",
        },
        (controller: SpotifyControllerInstance) => {
          if (!isMounted) return;
          controllerRef.current = controller;
          onControllerReadyRef.current?.(controller);

          controller.addListener("playback_update", (e) => {
            if (!isMounted) return;
            const isPlaying = !e.data.isPaused;
            const positionSec = Math.floor((e.data.position || 0) / 1000);
            const durationSec = Math.floor((e.data.duration || 0) / 1000);
            onStateChangeRef.current?.(isPlaying, positionSec, durationSec);
          });
        }
      );
    };

    if (typeof window !== "undefined") {
      const existingScript = document.getElementById("spotify-iframe-api");
      if (!existingScript) {
        const tag = document.createElement("script");
        tag.id = "spotify-iframe-api";
        tag.src = "https://open.spotify.com/embed/iframe-api/v1";
        tag.async = true;
        document.body.appendChild(tag);
      }

      const prevCallback = window.onSpotifyIframeApiReady;
      window.onSpotifyIframeApiReady = (IFrameAPI) => {
        if (prevCallback) prevCallback(IFrameAPI);
        initSpotifyController(IFrameAPI);
      };
    }

    return () => {
      isMounted = false;
      if (controllerRef.current && typeof controllerRef.current.destroy === "function") {
        controllerRef.current.destroy();
      }
    };
  }, []);

  return (
    /* Off-screen hidden mount container for Spotify Controller API so widget never interferes visually */
    <div
      aria-hidden="true"
      className="absolute -left-[9999px] top-0 w-1 h-1 opacity-0 pointer-events-none overflow-hidden"
    >
      <div ref={containerRef} id="spotify-embed-container" className="w-1 h-1" />
    </div>
  );
}
