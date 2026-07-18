# dogear — Brand Identity v2 Design Brief

**Date:** 2026-07-17 · **Status:** v2 — full rebrand (v1 "library card" palette rejected)

## The brand

**dogear** (Dog-Ear Books) is a neighborhood bookstore rebuilt as a modern,
habit-forming reading brand. The identity borrows its **psychology** from two
references the client named:

- **Duolingo:** one iconic brand color, a beloved mascot, gamified habit loops
  (streaks), chunky tactile components, playful voice. People come back because
  the brand *feels like a friend cheering them on.*
- **Apple:** generous white space, enormous confident typography, one idea per
  screen, restraint everywhere the mascot isn't. Clarity reads as premium.

**Tagline:** *Reading, made a habit.*

## The mascot — Folio

A green dog with **one folded ear** — the dog-ear itself, made alive.
Folio is the emotional core of the brand (Duolingo's Duo role): he celebrates
streaks, guards the logo, stars in social posts, and fills empty states.
His folded ear always shows a **sunny yellow lining** — the fold color.

## Palette — "Leaf"

Pages of a book are *leaves*; green = growth, "turn over a new leaf."
One hero color, used with Apple-like discipline on white.

| Token  | Hex       | Role |
|--------|-----------|------|
| Leaf   | `#16A75C` | The brand color. Buttons, mascot, heroes |
| Forest | `#0E7C43` | Depth: hovers, button shadows, dark accents |
| Sprout | `#DCF5E7` | Green tint backgrounds, success states |
| Sunny  | `#FFC53D` | The fold, stars, streaks, highlights |
| Ink    | `#14181F` | Text |
| Slate  | `#5A6472` | Secondary text |
| Cloud  | `#FFFFFF` | Primary surface |
| Mist   | `#F4F7F5` | Alternate sections, cards |

Genre chip support colors (small doses only): Sky `#38BDF8`, Coral `#FF6B6B`,
Violet `#8B5CF6`.

## Typography

| Role    | Face        | Notes |
|---------|-------------|-------|
| Display | **Fredoka** (500–600) | Rounded, chunky, friendly — the wordmark face |
| Body/UI | **Nunito** (400–800)  | Rounded terminals, warm, extremely readable |

Wordmark: **"dogear"** lowercase Fredoka SemiBold (Duolingo manner).

## Signature components

1. **Folio the mascot** — the one memorable thing.
2. **Chunky press buttons** — solid color with a 5px darker "3D" bottom shadow
   that depresses on click (Duolingo's tactile signature).
3. **The fold** — sunny folded top-right corner, still marking featured things.
4. **Streaks** — daily reading streak counter; the habit loop that powers
   rewards, the app, and half the social calendar.

## Deliverables

```
Brand Identity/
├── index.html               Hub
├── brand-guidelines.html    v2 guidelines incl. brand psychology
├── social-media.html        6 post templates + feed preview
├── mobile-design.html       6 app screens
├── logo/                    mascot, primary, stacked, app icon, mono ×2, favicon
└── website/                 Full site: home, shop, book, events, rewards, about, cart
    └── styles.css           Shared design system CSS
```

## Responsiveness

Every page is built mobile-first-tested at 375 / 768 / 1280: fluid type via
clamp(), grids collapse, nav condenses, no horizontal scroll at any width.
