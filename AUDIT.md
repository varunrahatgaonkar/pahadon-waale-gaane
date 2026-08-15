# AUDIT.md — Pre-launch audit checklist

Run this once, right before publishing/tweeting the link. This is where a viral moment can go wrong fast (copyright takedown, broken OG image, slow load on the exact traffic spike you wanted).

## Rights / legal
- [ ] Zero hotlinked Pinterest images anywhere (check network tab / grep codebase for `pinimg.com`)
- [ ] Scene art is either: (a) Unsplash/Pexels with license confirmed, or (b) commissioned/original — license/attribution noted in repo README
- [ ] No claim of ownership over the songs themselves — playlist is embedded from Spotify/YouTube, not hosted/rehosted by you
- [ ] Site copy doesn't imply affiliation with Spotify/YouTube/any Bollywood label — you're linking to their platforms, not endorsed by them

## Performance
- [ ] Lighthouse Performance ≥ 85 on mobile simulated 4G
- [ ] LCP < 2.0s, CLS near 0 (scene image has explicit width/height, no layout shift when player loads)
- [ ] YouTube/Spotify SDK confirmed lazy-loaded (only after Play is clicked, not on page load)
- [ ] Images served as `.webp`/`.avif` with proper `next/image` sizing, no oversized originals

## Accessibility
- [ ] Lighthouse Accessibility ≥ 90
- [ ] Text over the scene passes contrast check (use a scrim, don't eyeball it)
- [ ] All interactive elements keyboard-reachable and labeled

## Sharing / virality readiness (this is the actual "growth" mechanism for this genre)
- [ ] OG image renders correctly when pasted into X, WhatsApp, Instagram DM — test all three, they parse OG tags differently
- [ ] Page `<title>` and meta description are the actual caption copy, not a generic Next.js default
- [ ] Site is fast enough to survive a traffic spike from a viral tweet — confirm Vercel plan/limits, or that it's on the free tier's static-friendly path (this page has near-zero server compute, should scale fine)
- [ ] Mobile screenshot of the page (the play button + scene) actually looks good cropped square/portrait — that's the image people will actually post

## Final
- [ ] Domain resolves, HTTPS is on, no console errors on load
- [ ] One more full run of TESTING.md's manual checklist post-deploy (on the real production URL, not just preview)
