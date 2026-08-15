# TESTING.md

No formal test suite needed for a site this small, but these checks are non-negotiable before launch since a broken play button or a silent autoplay failure kills the entire product idea.

## Manual checks (run every time before deploy)
1. **Cold load → click Play → sound starts within ~1s.** This is the single most important interaction on the site. Test on throttled 4G, not just fast wifi.
2. **iOS Safari specifically.** iOS has the strictest autoplay policy of any major browser — confirm the player actually starts on first tap, first time, every time.
3. **Reload after playing** — confirm no stuck/ghost audio, no double players stacking.
4. **Next/prev/shuffle controls** actually change the track and the NowPlayingBar text updates.
5. **Share button** — X share intent opens with correct prefilled text + link; copy-link fallback works if share API unsupported.
6. **No playlist configured / player fails to load** — page must not crash; show a graceful fallback ("having trouble loading the playlist, try the Spotify link instead").
7. **Resize/rotate** — scene and controls reflow correctly at common breakpoints (360px, 390px, 768px, 1024px, 1440px).
8. **Keyboard only** — Tab reaches Play button, NowPlayingBar controls, Share button, in a sane order; Enter/Space activates them.
9. **Screen reader spot check** (VoiceOver or TalkBack) — play button announces its purpose, now-playing text is announced on change (or at least discoverable), no unlabeled icon buttons.
10. **prefers-reduced-motion** — animations (parallax, pulse) actually turn off when that OS setting is on.

## Automated (lightweight, optional but cheap to add)
- Lighthouse CI on the Vercel preview deploy (perf + accessibility score gate, e.g. fail build under 85 on either)
- One Playwright smoke test: page loads, play button is clickable, now-playing bar text is non-empty after click (mock the player if needed to keep this fast/deterministic)

## Sign-off before launch
All of "Manual checks" above pass on: 1 real Android phone, 1 real iPhone, desktop Chrome, desktop Safari. Record results in PROGRESS.md, then proceed to AUDIT.md.
