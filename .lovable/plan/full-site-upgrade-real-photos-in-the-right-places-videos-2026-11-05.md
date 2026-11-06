# Full-site upgrade: real photos in the right places + videos

## Goal
Every image on the site becomes a real, free-to-use photograph that matches the section it sits in, and a few short real video clips add motion where they help most.

## Photo map (each page, each spot)

| Page | Spot | Real photo subject |
|---|---|---|
| Home | Top banner | Background video (see below), real port photo as fallback |
| Home | "Who we are" image | Business people reviewing documents / meeting |
| Home | Sectors grid (5) | Same real sector photos as Industries |
| Home | Row of three | Cargo ship at sea, factory quality check, business handshake |
| About | Main image | Real warehouse with stacked pallets |
| Services | Banner | Container ship / container terminal |
| Industries | 5 sectors | Packaging cartons, chemical drums/tanks, building materials (cement, rebar, tiles), food & drinks, furniture |
| How We Work | Side images | Factory inspection, signing / handshake |
| Contact | New small image | Office / desk with documents (optional, subtle) |

All current AI-made photos (hero-port, sourcing-meeting, ship-sea, factory-inspection, partnership-handshake, warehouse) are replaced. Weak Industries matches (building materials, food without drinks) get better real photos.

## Videos
- Home top banner: silent looping background video of a container port / ship loading, dark overlay so the headline stays readable, still photo shown on phones with data saver and before the video loads.
- Industries or Services: one short looping clip (e.g. warehouse forklift or container crane) in a wide band between sections.
- Videos are short (10–20 s), muted, autoplay, loop, no sound controls needed.

## Sources
- Real free-license photos and clips (Pexels / Pixabay / Openverse / Wikimedia, commercial use allowed, no attribution required where possible).
- If a truly fitting real clip can't be found for a spot, I'll tell you rather than silently use an AI clip.

## Cleanup
- Delete unused old images (logo drafts kept only for the approved logo, old ind-/sector-/premium- AI photos).

## Technical details
- Download candidates to /tmp, review via contact sheets, crop to the spot's ratio, save to src/assets.
- Videos uploaded as CDN assets (`lovable-assets`, `.asset.json` pointers in src/assets/videos), compressed with ffmpeg to ~720p H.264, plus a poster frame.
- `<video autoPlay muted loop playsInline preload="metadata" poster=...>`; respect `prefers-reduced-motion` by showing the poster only.
- Verify every page on desktop and phone width with Playwright: images load, videos play, no overflow.
