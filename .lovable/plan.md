# Mohit Packaging Industries — Refinement Plan

Refine `src/routes/index.tsx` (and small bits of `__root.tsx`) without redesigning. Keep the orange/kraft palette, typography, layout components, animations, and responsiveness. Fix the SSR hydration mismatches in passing (they're caused by stale strings in the rendered HTML vs current source — a clean rebuild after edits resolves them).

## 1. Hero refinement
- Headline → `Corrugated Box Manufacturer & Supplier Since 2008`
- Subheadline → `Custom Corrugated Boxes, Corrugated Sheets, Wooden Pallets and Industrial Packaging Solutions for Bulk Supply Across India.`
- Primary CTA → `Request Bulk Quote` (anchors to contact form)
- Secondary CTA → `View Products` (anchors to `#products`)
- Remove the 3 hero `Stat` tiles (they move into the new trust strip below).

## 2. New Trust Strip (directly under Hero)
Compact single-row band on the existing beige surface, 5 items with lucide icons:
`ShieldCheck` ISO 9001:2008 Certified · `Clock` 15+ Years Experience · `Users` 26–50 Employees · `IndianRupee` ₹5–25 Cr Turnover · `Truck` Pan India Supply.
Responsive: 2-col on mobile, 5-col on `md+`. No new color tokens.

## 3. Process section
Keep component + scroll reveals. Update the 4 steps to:
1. Kraft Paper Sourcing
2. Corrugation Process
3. Cutting & Die Forming
4. Final Packaging Box
Reuse existing `process-1..4.jpg` assets; refine one-line descriptions to be factual.

## 4. About section
Rewrite body copy to factual manufacturing tone — established 2008, manufacturer & supplier, in-house corrugation, bulk production, QC, ISO certified, 15+ yrs industrial experience. Keep the existing 4 fact tiles (Since 2008 / 26–50 Employees / ₹5–25 Cr / ISO).

## 5. Products section — reorganize into 3 categories
Replace the flat grid with three labeled category blocks (same card component, just grouped under `SectionLabel` sub-headers):

- **Corrugated Packaging**: 3 Ply, 5 Ply, 7 Ply, Printed Corrugated, Industrial Corrugated Boxes
- **Die Cut Packaging**: Die Cut Folding Boxes, Plain Die Cut Boxes
- **Industrial Packaging**: Corrugated Sheets, Corrugated Rolls, Wooden Pallets, Wooden Boxes, Edge Protectors

Reuse existing product images where they match (3ply/5ply/7ply/diecut/sheets/pallet/woodbox/edge). For the 5 items without dedicated assets (Printed, Industrial Corrugated, Shoe (omit), Corrugated Rolls, Die Cut Folding, Plain Die Cut) — reuse the closest existing asset rather than generating new images, to avoid scope creep. (If new imagery is wanted, flag in a follow-up.)

Each card shows:
- Image, title
- 3 spec chips: `Custom Sizes` · `Bulk Orders` · `Industrial Grade`
- `Request Quote` button → scrolls to contact and prefills product field.

## 6. New Business Facts section (between Why and Industries)
A 6-tile grid on kraft surface:
Established 2008 · Manufacturer & Supplier · 26–50 Employees · ₹5–25 Cr Turnover · ISO 9001:2008 · Dharuhera, Haryana.

## 7. Why Choose Us
Replace items with: Quality Control, Bulk Manufacturing, Custom Packaging, Timely Delivery, Industrial Expertise, Long-Term Reliability. Headline stays factual.

## 8. Industries Served
Replace cards with: E-commerce, FMCG, Electronics, Warehouse & Logistics, Industrial Machinery — each with one practical sentence (e.g. "Double-wall shippers for D2C fulfilment and returns-safe transit").

## 9. Contact → Bulk Quote form
Heading → `Request a Bulk Packaging Quote`. Form fields: Full Name, Company Name, Phone, Email, Product Required (select populated from product list), Quantity Required, Message. Client-side Zod validation, length caps, no submission backend yet — `onSubmit` shows a success toast and a note that Web3Forms will be wired later. Form is structured so a `web3forms` `access_key` env can be dropped in later without UI changes.

## 10. WhatsApp CTA
Floating bottom-right pill button (`MessageCircle` icon) labeled `Get Instant Quote on WhatsApp`, plus a button inside the contact section. Uses `https://wa.me/<placeholder>` with a prefilled message built from form state when available. Number left as a clearly-marked placeholder constant `WHATSAPP_NUMBER` for the user to fill.

## 11. Footer
Add: tagline "Manufacturer & Supplier of Corrugated Packaging Solutions", `GST Registered Business`, full Dharuhera address, Quick Links (Home, Products, About, Contact), Contact (phone/email/WhatsApp placeholders), Business Hours (Mon–Sat 9:00–18:00), copyright `© 2026 Mohit Packaging Industries`.

## 12. SEO (`src/routes/__root.tsx`)
- `<title>`: `Corrugated Box Manufacturer & Supplier in Dharuhera | Mohit Packaging Industries`
- meta description: factual, < 160 chars
- Add JSON-LD `Organization` + `LocalBusiness` (address, foundingDate 2008, areaServed IN, productCategories).

## 13. Hydration fix
The two SSR mismatches (`15+` vs `Since`, old vs new Why headline) come from a stale prerender. Once the strings above are written and the dev server rebuilds, they resolve. No code branching on `typeof window` will be introduced.

## Technical notes
- All edits scoped to `src/routes/index.tsx`, `src/routes/__root.tsx`. No new routes, no new deps beyond `zod` (already present via shadcn form stack — verify before use; if missing, `bun add zod`).
- No new color tokens; reuse existing semantic classes in `src/styles.css`.
- No backend/Lovable Cloud work in this pass — form + WhatsApp are UI-only and integration-ready.
- Out of scope (call out explicitly): generating new product photos, wiring Web3Forms, real WhatsApp number, analytics.

## Deliverable
A refined single-page site that reads as an established Indian corrugated packaging manufacturer, with clearer product taxonomy, real trust signals, a usable bulk-quote form, and structure ready for future Web3Forms/WhatsApp/analytics integration.