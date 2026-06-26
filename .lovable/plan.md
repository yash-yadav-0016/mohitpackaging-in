# Plan: Add Instagram Handle Link to Footer

## What we'll build
Add an Instagram icon link in the site footer that opens your Instagram profile in a new tab. The icon will use the official Instagram gradient camera logo.

## Where
`src/routes/index.tsx` — the footer currently lives there, so the icon will sit in the first footer column next to/under the logo and "Since 2008" badge.

## How
1. Add an `INSTAGRAM_URL` constant near the other contact constants (around line 54):
   ```ts
   const INSTAGRAM_URL = "https://www.instagram.com/mohit.packaging/?utm_source=ig_web_button_share_sheet";
   ```
2. Create a small inline `InstagramIcon` component that renders the official Instagram gradient camera SVG (the classic rounded square + circle + dot shape).
3. Insert the icon in the first footer column, below the existing "Since 2008" badge, as a styled link button.
   - It opens in `_blank` with `noopener noreferrer` for security.
   - Includes an `aria-label` for accessibility.
   - Hover state matches the existing subtle footer styling.

## Design details
- Icon size: 20×20 px, inside a 36×36 px circular button.
- Button: subtle dark footer background, border white/15, hover border white/30, transition.
- Gradient: official Instagram `#f09433 → #e6683c → #dc2743 → #cc2366 → #bc1888`.
- No new dependencies or packages needed — the icon is a 1-file inline SVG.

## Outcome
Footer will show a recognizable Instagram icon that, when clicked, takes visitors directly to https://www.instagram.com/mohit.packaging/.