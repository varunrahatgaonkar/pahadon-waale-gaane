# PRD — Pahado Wale Gaane

## 1. What this is
A single-page nostalgia/aesthetic site in the "Salon.wtf" genre. One scene (a hill-station road, a dhaba, a bus stand in the mountains), one embedded playlist of Hindi mountain/road-trip songs, one line of caption copy. No login, no backend, no database. The entire value is: land on the page, hit play, feel something, screenshot it, share it.

## 2. Reference trend (why this format works)
- Originator: Salon.wtf (barbershop nostalgia) by Yash Bharadwaj, went viral on X Aug 8 2026.
- Spinoffs requested by the internet in the replies: bartan-dhone-wali (utensil washing), truck-wali (truck driver songs), bus-wali (bus journeys), 2009-wale (mid-2000s Bollywood), mithai-shop-wali.
- Common DNA across all of them:
  1. **One scene, one screen.** No nav, no pages, no scroll past the fold on desktop.
  2. **A visual anchor** — an illustrated or photographic scene that IS the memory (barber chair, truck dashboard, hill road) — not a generic hero banner.
  3. **A playlist embed**, not a custom player — nobody is licensing music, they're all embedding Spotify or YouTube.
  4. **A short, personal, slightly cheeky caption** in the "before you became fancy..." voice — this is what makes it shareable, not the code.
  5. **A jokey/absurd domain** (`.wtf`, `.lol`) — part of the meme.
  6. **Built and shipped fast** (days, by one person) — over-engineering kills this genre.

## 3. Our theme: Pahado Wale Gaane (Mountain Songs)
The memory we're recreating: the drive up to a hill station — bus/car winding up ghat roads, dhabas with steam rising off chai, pahadi shop speakers playing old Hindi songs, mist, deodar trees, a Maruti van radio.

**Caption direction (draft, refine later):**
> "gaane jo pahadiyon mein hi sahi lagte the. before Wi-Fi, before Google Maps ki 'no signal', bus ke radio pe yehi bajta tha."

## 4. Goals
- G1: Ship a shareable single page in days, not weeks.
- G2: Feel authentically nostalgic — not a generic travel-website hero.
- G3: Playlist plays with one click, no login required for the visitor.
- G4: Looks great as a screenshot/OG-image share on X/Instagram — this is the primary distribution channel.

## 5. Non-goals (explicitly out of scope for v1)
- User accounts, likes, comments
- Custom audio hosting / licensing music ourselves
- Multiple pages / multiple "moods" (v2 idea, not v1)
- CMS or admin panel
- Native mobile app

## 6. Core user flow
1. User lands on `pahadowalegaane.<tld>` (from a shared link/screenshot).
2. Sees the mountain-road scene, hears nothing yet (browsers block autoplay with sound).
3. Sees a single "🎵 Bajao" / "Play" button over the scene.
4. Clicks → playlist embed starts (Spotify embed or YouTube IFrame player hidden behind custom UI).
5. Optional: shuffle/next controls, a "share" button that copies the link or opens X share intent with a pre-filled caption.

## 7. Music integration decision
Two real options — pick ONE for v1, don't build both:

**Option A — Spotify embed (recommended for v1, fastest):**
- Use Spotify's public embed iframe: `https://open.spotify.com/embed/playlist/{PLAYLIST_ID}?utm_source=generator&theme=0`
- No OAuth, no backend, no Spotify Developer app needed for basic embed.
- Limitation: visitors who are NOT logged into Spotify in that browser only get 30-second previews; logged-in Free users get shuffle-only full playback; Premium users get full on-demand playback. This is a real, unavoidable constraint of the embed — decide if that's acceptable (it's fine for a shareable/aesthetic site, most of these viral clones accept it).
- You control the vibe entirely by curating the playlist on your own Spotify account and just embedding its ID.

**Option B — YouTube playlist via IFrame Player API (what gives "full song, no login" playback):**
- Use `youtube.com/iframe_api`, load a playlist by ID, keep the actual YouTube chrome hidden/behind your own play/pause/next UI.
- Full songs play for everyone, no login required.
- More engineering (custom controls, mobile autoplay quirks, ads on some videos you don't control).
- This is closer to what most of these viral sites actually do, because "click and the full song plays for anyone" is what makes them feel magical.

**Recommendation:** Build Option B (YouTube) as the real player since it's what makes the experience click-and-it-just-plays for any visitor with no login wall. Keep a Spotify embed as a secondary "listen on Spotify" link/button for people who want to save the playlist.

## 8. Content sourcing
- **Photos:** Do NOT hotlink Pinterest images directly — most are re-pinned without clear rights and Pinterest ToS disallows scraping/hotlinking. Use Pinterest only as a **moodboard/reference** for the vibe, then source actual images from Unsplash/Pexels (free, licensed for commercial use) or commission a simple illustration (matches Salon.wtf's illustrated style better than photos, and sidesteps rights issues entirely). Illustration also compresses better and looks more "meme-native."
- **Music list:** curate manually — 20–30 tracks (old Bollywood hill-station/road-trip songs, folk-pop pahadi fusion, etc.) into a YouTube playlist and a mirrored Spotify playlist.

## 9. Success metrics (informal, this is a meme site not a startup)
- Shares/screenshots on X and Instagram
- Play-button click-through rate
- Time to first play < 1s after click (perceived speed matters more than anything else here)

## 10. Tech constraints (stated for the build docs)
- Next.js (App Router), deployed on Vercel.
- No database. Playlist ID and copy live in a config file.
- Must be fast on 3G/4G Indian mobile networks — this audience is on phones.
