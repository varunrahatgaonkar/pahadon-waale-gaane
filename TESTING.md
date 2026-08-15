# TESTING.md - Verification Suite

This document logs all manual and diagnostic test procedures for **Pahado Wale Gaane** to ensure zero regression before deployment.

---

## 1. Diagnostics & Console Verification
- [x] **Play Button Console Logs**: When pressing the central Play/Pause button on the floating `MusicCard`, the browser Developer Console logs:
  - `[MusicCard] Play/Pause button clicked!`
  - `[Pahado Player Hook] handlePlayPause clicked!`
  - `[Pahado Player Hook] Sending play command to YouTube player...`
- [x] **YouTube Player Initialization**: On initial page load, YouTube IFrame API initializes with:
  - `[Pahado Player] Initializing YouTube IFrame API with playlist ID: PLecZCLJr4GNE`
  - `[Pahado Player] YouTube Player is READY! Playlist loaded successfully.`
- [x] **Playback State Sync**: When music starts or pauses:
  - `[Pahado Player] Playback state changed: PLAYING` (or `PAUSED`)

---

## 2. Favicon & Branding Verification
- [x] **Tab Icon**: Custom Pahadi mountain SVG favicon (`/favicon.svg`) configured in `app/layout.tsx`. Replaces Next.js default black triangle `▲` logo.
- [x] **Header Layout Alignment**: `LiveListenersBadge` ("1 person listening") and `ShareButton` grouped cleanly in the top-right corner (`fixed top-4 right-4 sm:top-6 sm:right-8 z-40`), preventing overlap with the Devanagari title `पहाड़ों वाले गाने` across all screen resolutions (360px to 1920px).

---

## 3. Media Controls & Playlist Verification
- [x] **357-Track Playlist**: Verified `youtubePlaylistId: "PLecZCLJr4GNE"` in `lib/playlist.ts`.
- [x] **Media Controls**: Next (`onNext`) and Previous (`onPrevious`) buttons skip tracks in the YouTube playlist engine.
- [x] **Dynamic Progress Bar**: Live `m:ss` elapsed / total duration updates and progress bar fill.
- [x] **Animated Equalizer**: 5-bar SVG waveform bounces while playing and pauses when idle.

---

## 4. Background Hero Carousel
- [x] **Self-Hosted Hero Images**: Auto-discovers images in `public/hero/` (`hero-1.jpg` through `hero-6.jpg`) via `/api/hero-images` and smoothly crossfades every 8 seconds.
- [x] **Clean Unobscured Hero**: Hero visual scene remains clean and readable with subtle vignette and signboard Devanagari typography.
