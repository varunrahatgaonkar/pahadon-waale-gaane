# RULES.md — Conventions all agents/humans must follow

## Stack
- Next.js 15+, App Router, TypeScript strict mode
- Tailwind CSS for styling (matches Stitch's typical export, fastest to hand-tune)
- Deploy target: Vercel
- No backend/database. If something feels like it needs one, push back — re-check PRD.md non-goals first.

## Folder structure
```
app/
  page.tsx                 # the single scene page
  layout.tsx
  opengraph-image.tsx
components/
  PlayerScene.tsx
  PlayButton.tsx
  NowPlayingBar.tsx
  ShareButton.tsx
lib/
  playlist.ts               # playlist config + track metadata
  youtube-player.ts          # IFrame API wrapper (if Option B chosen)
public/
  scene.webp / scene@2x.webp # illustration/photo, Unsplash/Pexels-sourced or commissioned
  og-scene.png
```

## Naming
- Components: PascalCase, one component per file, filename matches component name
- Hooks: `useXxx.ts` in `lib/hooks/`
- No default exports for components except page.tsx/layout.tsx (Next.js requires it there)

## Images
- No hotlinked Pinterest URLs anywhere in the codebase — ever. Pull the actual file, verify license (Unsplash/Pexels license or your own commission), store in `public/`, serve via `next/image`.
- All images in `.webp`, with 2x variant for retina. Illustration/scene target ≤ 300KB.
- Alt text required on every image (accessibility + this is a Devanagari-titled site, don't skip it).

## Performance budget (this audience is on mobile data)
- Largest Contentful Paint < 2.0s on simulated Fast 3G
- Total JS shipped for the page < 150KB gzipped before the YouTube IFrame API loads (that API is loaded lazily, on click, not on page load)
- Background scene image lazy-decoded but NOT lazy-loaded (it's above the fold, needs to paint immediately)

## Accessibility
- Play button must be a real `<button>`, keyboard-operable, with `aria-label="Play pahadi songs playlist"`
- Color contrast on text overlaying the scene must pass WCAG AA — use a scrim/gradient behind text, don't rely on the illustration's natural contrast
- Respect `prefers-reduced-motion` — disable the parallax/pulse animations for users who set it

## Copy / language
- Title and captions in Hindi/Devanagari + Latin transliteration side by side (see PRD.md section 3), not Hindi-only or English-only.
- Keep the tone of Salon.wtf-style copy: warm, specific, a little cheeky, never corporate.

## Git / commits
- Conventional commits (`feat:`, `fix:`, `chore:`)
- One agent task = one commit, not a giant squash — makes it possible to review what each agent actually did

## What NOT to do
- No user auth, no analytics beyond a single privacy-friendly pageview counter (Plausible/Vercel Analytics) if you want it — no ad trackers.
- No CMS. Copy and playlist config are files in the repo, edited directly.
- Don't build both the Spotify AND YouTube integration "just in case" — PRD.md section 7 says pick one.
