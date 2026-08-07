# Master Prompt — Trip Planner App Redesign

**Stack:** React + TypeScript + Tailwind, component-split architecture
**Scope:** Landing page, My Trips page, Create Trip page, plus a new global sidebar
**References:** `/design-references/01-06.png` (mapped below)

---

## 0. Reference Mapping (what to extract from each image)

| # | Image | What it's for | Extract |
|---|-------|---------------|---------|
| 01 | "Турпоходы по России" hiking site | Landing page | Full-bleed nature hero, torn-paper/parchment section dividers, large serif display headline, route cards with thin outline buttons |
| 02 | "Marwa" desert tours contact page | Reusable form pattern | Two-column form + photo layout, soft rounded inputs, floating "Reserve" pill button, icon-row footer (call / hours / email) |
| 03 | "Globe Xpress" travel site | Landing page | Split hero: full-height photo left, dark-overlay destination card rail right, horizontal carousel arrows, pill nav |
| 04 | Jewelry "Our Works" showcase | Sidebar + card motion | Warm dark gradient background, oversized bold wordmark behind a photo carousel, floating circular action buttons (visit/expand), drag-style card stack |
| 05 | Dark VR-style trip carousel ("Russia") | My Trips page | Center-focused 3D card carousel, blurred side cards, stat pills under the active card (distance / rating / duration), ambient dark-room background |
| 06 | Smart-home dashboard | My Trips + sidebar | Icon-only collapsed sidebar, soft neumorphic cards, live status chip, grouped "Rooms"-style list → becomes grouped "Trips" list, mini profile avatar pinned at sidebar bottom |

---

## Phase 1 — Design System Foundations

Before touching any page, establish shared tokens so all three pages and the sidebar feel like one product:

- **Palette:** warm neutral base (cream/parchment #F5F1E8 family from ref 01) + one deep ambient dark mode surface (charcoal #1A1917 from refs 05/06) — the app should support both a "daylight" and "night trip" theme toggle, since two references are dark and two are light.
- **Typography:** one condensed/serif display face for hero headlines (ref 01 style), one clean geometric sans for UI/body (ref 03/06 style). Define scale: display 56–72px, h2 32px, body 16px, micro-label 12px uppercase tracked.
- **Texture layer:** a subtle grain/paper overlay component (from ref 01) reusable as a section-break element — this becomes the app's signature texture, used sparingly (hero backgrounds, empty states only, never on data-dense UI).
- **Motion primitives:** soft spring easing for card hover-lift (ref 04), smooth horizontal snap-scroll for carousels (refs 03/05).
- **Iconography:** thin-stroke line icons throughout (matches refs 02/06).

Deliverable: a `tokens.ts` / Tailwind config extension + a `<Texture />`, `<Carousel />`, and `<StatPill />` shared component before Phase 2 starts.

---

## Phase 2 — Global Sidebar (unique)

This is the one element every page shares, so build it once, standalone, before the pages.

**Concept:** hybrid of ref 06's icon-rail dashboard sidebar and ref 04's warm floating-button carousel — not a flat list of links, but a **collapsible "trip rail"**:

- Default state: 72px icon-only rail, dark warm-gradient fill (not flat charcoal — a soft diagonal gradient like ref 04's background), floating (not edge-to-edge — 12px margin on all sides, rounded 24px corners, subtle drop shadow so it reads as a floating panel over the page, not a docked bar).
- Icons: Home / My Trips / Create Trip / Saved / Settings, each with a soft pill highlight on active state (rounded-full background, not underline).
- **Unique touch:** hovering (or long-press on mobile) expands the rail inline to 220px with labels sliding in — no overlay, no push of page content, just an absolutely-positioned overlap so the main content never reflows.
- Bottom of rail: circular avatar (from ref 06's pinned profile pattern) that opens a small popover, not a full page nav.
- On My Trips / Create Trip specifically, the rail gains a thin vertical progress/status indicator strip along its inner edge (borrowed conceptually from ref 05's stat pills) showing trip count or in-progress step.

---

## Phase 3 — Landing Page (refs 01 + 03)

**Hero (ref 01 primary influence):**
- Full-bleed photographic hero (rotating background, 3 curated destination photos, slow crossfade — not a hard cut).
- Large serif display headline centered or left-aligned over a soft dark gradient scrim for legibility, not a flat overlay box.
- Handwritten-style tagline beneath the headline (small script accent font), same emotional beat as "Собирай впечатления, а не деньги."
- Thin-outline "Start Planning" CTA button, no fill — matches ref 01's restrained button style.

**Route/Destination rail (ref 03 primary influence):**
- Directly below hero: a horizontal card rail (not a grid) of 4–5 destination cards, each a tall photo card with a dark gradient at the bottom holding the place name + tiny location pin icon.
- Left/right chevron nav controls, subtle numbered counter (e.g. "01") bottom-right of the rail like ref 03.
- Cards lift and slightly scale on hover; the rest dim to 80% opacity to focus attention (ref 03's spotlight behavior).

**Below the fold (ref 01 continued):**
- Paper-texture section break, then a 3-item "Popular Journeys" list reusing the outline-button card style from ref 01 (photo left, text block right, alternating sides down the page).

---

## Phase 4 — My Trips Page (refs 05 + 06 + 04)

**Primary layout (ref 05 — the standout reference for this page):**
- Ambient dark "room" background (soft blurred interior photo or gradient, very low contrast so cards pop).
- Center-stage 3D carousel of trip cards: active card full-size and sharp, adjacent cards scaled down ~80% and blurred, drag or arrow-navigated.
- Above the active card: destination name + date range in small caps.
- Below the active card: a **stat pill row** — distance traveled, duration, number of activities, budget indicator — icon + value pairs in a single rounded pill strip (directly from ref 05's `⏱ 110km  🚶 2347m  ⚡ 40  🏔 113km` pattern, relabeled for trip context: duration / distance / activities / elevation-or-budget).
- Small thumbnail rail beneath for jumping between trips (like ref 05's "Dombay / Teletskiy / Rosa Khutor / Sheregesh" strip).

**Supplementary grid (ref 06 influence, for a "list view" toggle):**
- A view-switch icon lets users flip from the 3D carousel to a grouped dashboard-style list: soft neumorphic cards grouped by status ("Upcoming," "Past," "Drafts") mirroring ref 06's "Rooms" grouping, each card showing a mini live-status chip (e.g. "In 4 days," "Completed").

**Empty state:** paper-texture illustration (tie back to landing page's material language) with a CTA into Create Trip.

---

## Phase 5 — Create Trip Page (unique, ref 02 as a loose base)

This page should NOT just be ref 02's form — reimagine it as a **guided, visual trip builder**, not a static form:

- **Step-based canvas, not a scroll form:** left 60% of the screen is a live-updating photo/map preview that changes as the user fills fields (destination search → hero photo updates; date range → a small calendar visualization animates; traveler count → avatar stack grows). Right 40% is the input rail, styled with ref 02's soft rounded inputs and floating pill submit button ("Reserve Your Spot" → "Generate My Trip").
- **Unique interaction:** instead of a dropdown for "Select Tour," use a horizontally scrollable chip-selector of trip *styles* (Adventure / Relaxation / Culture / Food) with icon + micro-illustration per chip — pulling the playful card-carousel energy of ref 04 into a functional form control.
- **Progress indicator:** the sidebar's thin status strip (from Phase 2) fills in as steps complete — the sidebar and this page are visually linked, not decorative.
- **AI assist strip:** a slim input at the top ("Describe your dream trip...") that pre-fills the form fields below it, styled as a floating pill matching ref 02's search/reserve button language — ties into the existing Gemini-based trip planning logic.
- Final review step reuses the stat-pill component from My Trips (Phase 4) so the trip summary *feels* like a preview of its own future My Trips card — closing the design loop between the two pages.

---

## Phase 6 — Integration & QA

- Confirm the sidebar's floating/overlay behavior doesn't clip on smaller viewports; define a bottom-tab fallback for mobile (icons only, same pill-highlight active state).
- Verify the light (landing) → dark (my trips) theme transition feels intentional, not jarring — animate the shift rather than hard-cutting when navigating between pages.
- Run the paper-texture and grain overlays through a performance check (should be a single reusable SVG/CSS texture, not a heavy image asset repeated per section).
- Accessibility pass: contrast on hero scrims, focus states on carousel controls, keyboard nav through the sidebar's hover-expand.