# TASKS.md

Status legend: [ ] todo · [~] in progress · [x] done

## 0. Decisions (do these FIRST, by hand, before any agent runs)
- [ ] Pick music integration: Spotify embed vs YouTube IFrame API (PRD.md §7)
- [ ] Finalize scene art: Unsplash/Pexels photo collage vs commissioned illustration (PRD.md §8)
- [ ] Curate the actual playlist (20–30 tracks) on the chosen platform, get the playlist ID
- [ ] Register domain (a `.wtf`/`.lol`-style domain matches the genre; check availability)

## 1. Scaffold
- [ ] `npx create-next-app` with TypeScript + Tailwind + App Router
- [ ] Set up folder structure per RULES.md
- [ ] Add fonts (display serif + Devanagari-friendly sans) via `next/font`
- [ ] Set up Vercel project + preview deploys

## 2. Design → code (via Stitch + Antigravity)
- [ ] Run the Stitch prompt from DESIGN.md §8, generate desktop + mobile screens
- [ ] Export Stitch screens (image/spec) into Antigravity as reference
- [ ] Antigravity Component Agent builds `PlayerScene.tsx` matching the scene layout
- [ ] Build `PlayButton.tsx` with idle pulse animation + `prefers-reduced-motion` handling
- [ ] Build `NowPlayingBar.tsx` (track title/artist, prev/next, shuffle toggle)
- [ ] Build `ShareButton.tsx` (X share intent with prefilled caption + copy-link fallback)

## 3. Music player integration
- [ ] Build `lib/playlist.ts` config (playlist ID + fallback track list metadata)
- [ ] If YouTube: implement `lib/youtube-player.ts` wrapper around IFrame Player API, hidden player + custom controls, handle load failure gracefully
- [ ] If Spotify: implement embed component, add a visible note/UI acknowledging preview-only playback for logged-out visitors
- [ ] Wire play button → player start, handle the "nothing plays until user gesture" browser rule
- [ ] Wire NowPlayingBar to real track state (title/artist update on track change)

## 4. Sharing surface
- [ ] Build `app/opengraph-image.tsx` using the same scene asset + wordmark
- [ ] Verify OG image renders correctly when link is pasted into X/WhatsApp/Instagram DM preview
- [ ] Add page `<title>` and meta description matching PRD.md caption copy

## 5. Performance pass
- [ ] Compress/convert scene art to `.webp`, generate 2x variant
- [ ] Lighthouse run — confirm LCP < 2.0s target from RULES.md
- [ ] Confirm YouTube IFrame API / Spotify embed JS loads lazily (on click), not on initial page load

## 6. QA (see TESTING.md for full detail)
- [ ] Cross-browser: Chrome, Safari (incl. iOS Safari autoplay behavior), Firefox
- [ ] Mobile device pass on at least one real Android + one real iPhone
- [ ] Keyboard-only navigation pass
- [ ] Screen reader spot-check on the play button and now-playing bar

## 7. Audit + launch (see AUDIT.md)
- [ ] Run through AUDIT.md checklist end to end
- [ ] Confirm all imagery is properly licensed / not hotlinked from Pinterest
- [ ] Deploy to production domain
- [ ] Post the launch tweet/share (this IS the distribution channel for this genre)

## Backlog / v2 ideas (explicitly not v1)
- [ ] Multiple "moods" (monsoon pahad, winter pahad, road-trip pahad) as separate scenes
- [ ] Let visitors submit song suggestions (needs light backend — v2 only)
- [ ] Companion mithai-shop / dhaba variants if this one takes off
