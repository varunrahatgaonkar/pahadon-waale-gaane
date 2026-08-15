# DESIGN.md — Pahado Wale Gaane

This file is written as the "source of truth" you paste into Stitch (stitch.withgoogle.com) to generate the first screen, then hand to Antigravity to implement. Keep it this literal/specific — vague prompts produce generic SaaS-looking output, which is the opposite of what this genre needs.

## 1. Visual concept
A single illustrated (or photo-collage) scene of a Himalayan/Western-Ghat hill road at golden hour: a winding mountain road, a rickety wooden dhaba with a tin roof and steam rising off chai kettles, a parked state-transport bus or a Maruti 800/Omni, deodar/pine trees, mist rolling over the ridgeline, a hand-painted shop signboard, an old transistor radio or a speaker wired outside the dhaba.

Style reference: warm, slightly desaturated, hand-illustrated/gouache-poster feel (like old Indian Railways travel posters or 90s calendar art) — NOT a modern flat-illustration SaaS style, NOT a photorealistic stock-photo hero.

## 2. Layout (single viewport, no scroll on desktop)
- Full-bleed scene as background, edge to edge.
- Center-bottom or center: one large circular/pill "Play" button sitting on the scene (e.g., styled like an old cassette-player button or a dhaba speaker knob).
- Top-left or top-center: site wordmark "पहाड़ों वाले गाने" in a warm hand-lettered/serif Devanagari-friendly font, small "Pahado Wale Gaane" latin subtitle underneath.
- Bottom strip (thin, semi-transparent): now-playing track title + artist, next/prev arrows, a small "🔀 shuffle" toggle.
- Corner: small "Share" icon (X/Twitter bird or generic share) and a "Listen on Spotify" pill link.
- Mobile: same scene reflows to portrait crop, play button stays large and centered (must be thumb-reachable), now-playing strip pins to bottom safe-area.

## 3. Color palette
- Base: warm dusk palette — burnt orange (#D97B4C), deep pine green (#2F4538), dusty mountain blue-grey (#5C6E79)
- Accent (play button / interactive): mustard-gold (#E8A33D) — evokes old bus paint / dhaba signage
- Text on scene: warm off-white (#F7EFE2) with subtle dark shadow/backdrop-blur for legibility
- Avoid: neon, glassmorphism, corporate blue/purple gradients — this is the opposite aesthetic of what we want.

## 4. Typography
- Display/wordmark: a warm serif or hand-lettered display font (e.g., something like "Yeseva One" / "Rozha One" for Devanagari-adjacent warmth), used ONLY for the title.
- Body/UI (track names, buttons): a clean rounded sans (e.g., "Inter" or "Poppins") so it stays legible small.
- Devanagari support required for the title if using Hindi script — pick a font pairing that actually renders Devanagari well (e.g., "Hind" or "Baloo 2" work nicely alongside Latin sans).

## 5. Motion
- Subtle parallax or slow drift on the background scene (clouds/mist moving, ~30s loop) — cheap CSS animation, not heavy video.
- Play button: soft pulse/glow when idle (invites the click), settles to a steady state once playing.
- Now-playing strip: text marquee/crossfade on track change, not a hard cut.
- Keep total motion budget low — this needs to load and feel instant on mid-range Android phones.

## 6. Sound-first UX rule
Nothing plays with sound before a user gesture (browser autoplay policy — also just good UX for this concept: the silence-then-click IS the moment). The play button's job is to be the single most obvious, most inviting element on the screen.

## 7. Sharing surface (OG image)
Design a static OG/share image (1200×630) using the same scene + wordmark, since this is a "screenshot and post on X" product — the OG image people see before clicking is doing as much work as the site itself.

## 8. Stitch prompt (paste this into Stitch, Web project type, Gemini 3-class model)
```
Design a single-viewport nostalgic Indian travel website called "Pahado Wale Gaane"
(Mountain Songs). Full-bleed warm, slightly desaturated hand-illustrated scene of a
Himalayan hill road at golden hour: winding mountain road, a wooden roadside dhaba
with tin roof and steam rising from a chai kettle, an old state-transport bus parked
nearby, pine/deodar trees, mist over the ridgeline. Style like vintage Indian Railways
travel posters, not flat modern SaaS illustration.

Palette: burnt orange, deep pine green, dusty blue-grey, with a mustard-gold accent
for the single interactive element.

Layout: no navbar, no scrolling. Centered large circular "Play" button sitting on the
scene like an old radio/speaker knob, gently pulsing. Top: hand-lettered warm serif
wordmark "पहाड़ों वाले गाने" with smaller latin subtitle "Pahado Wale Gaane" beneath it.
Bottom thin translucent strip: current track title + artist, prev/next arrows, shuffle
toggle. Top-right corner: small share icon and a "Listen on Spotify" pill button.
Mobile variant: portrait crop of the same scene, play button large and centered,
now-playing strip pinned above the safe area.
```

## 9. What Antigravity should build from this file
- `app/page.tsx` — the single scene + play button + now-playing strip
- `components/PlayerScene.tsx` — background scene + parallax
- `components/PlayButton.tsx`
- `components/NowPlayingBar.tsx`
- `lib/playlist.ts` — config: playlist source (YouTube playlist ID / Spotify playlist ID), track metadata
- `app/opengraph-image.tsx` — Next.js OG image route reusing the same scene assets
