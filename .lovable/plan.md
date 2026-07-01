## Plan: Scroll-based hero animations for Mohit Packaging

### Recommended approach
Keep the existing hero layout, colors, and video background exactly as they are. Add three subtle, scroll-linked effects that feel industrial and premium, not flashy.

### What will change

1. **Video parallax**
   - The `<video>` background will translate vertically at ~0.3× scroll speed while the user scrolls through the hero.
   - This creates depth without distorting the video or the kraft overlay.

2. **Content reveal on scroll**
   - Left headline block and right logo card will fade in + slide up (`translateY` 20px → 0, opacity 0 → 1) as they enter the viewport.
   - Uses a tiny `useScrollProgress` or `useReveal` hook, no external animation library needed.

3. **Logo card scale-in**
   - The right-side logo card will scale from 0.95 → 1.0 as it becomes visible, giving the card a tactile "settling" feel.

### What will NOT change
- Hero text, colors, buttons, logo, or video source.
- The kraft overlay opacity/gradient.
- Trust strip or any section below the hero.

### Implementation details

- Add a `useScrollProgress` hook inside `src/routes/index.tsx` (or reuse the existing one if suitable).
- Wrap the hero content with a scroll-aware container and apply `transform: translateY(...)` to the video element.
- Apply `opacity` / `transform` transitions to the headline and logo card using the same scroll progress.
- Keep everything SSR-safe and JS-only; no CSS-only scroll-timeline usage so it works across all browsers.
- Verify with a production build and a quick Playwright scroll test.

### Alternatives considered (if you want a different feel)

- **Dramatic overlay reveal**: the kraft overlay fades out as you scroll, revealing more of the video behind the text. More cinematic but risks reducing readability.
- **Kinetic headline**: split the headline into lines and reveal each line as scroll progresses. Stronger impact but requires more markup changes.
- **Sticky hero with scroll-to-shrink**: the hero stays pinned while the rest of the page slides over it. High impact but changes the page scroll behavior.

The recommended option is the safest default: it adds polish while keeping the brand intact and the code simple.