<div align="center">

<img src="logo/mascot.svg" width="140" alt="Folio, the dogear mascot">

# dogear - Brand Identity

**A neighborhood bookstore, built like a habit app.**

*Reading, made a habit.*

[![Live demo](https://img.shields.io/badge/Live_demo-16A75C?style=for-the-badge&logoColor=white)](https://yusufabdi6356.github.io/dogear-brand-identity/)
[![Brand book](https://img.shields.io/badge/Brand_book_PDF-14181F?style=for-the-badge&logoColor=white)](dogear-brand-book.pdf)
[![Figma](https://img.shields.io/badge/Figma_design_system-FFC53D?style=for-the-badge&logoColor=14181F)](https://www.figma.com/design/AVFwXOwyFmcIKR0vpDCWZ7)

<a href="https://yusufabdi6356.github.io/dogear-brand-identity/website/home.html">
  <img src="screenshots/home.png" alt="dogear homepage" width="900">
</a>

</div>

## Overview

dogear is a brand identity for a neighborhood bookstore that uses the habit-building principles of reading streaks, small rewards, and a friendly mascot. The visual system combines warm editorial character with a clear, focused interface.

| Influence | Applied principle |
|---|---|
| Duolingo | Streaks, rewards, encouraging feedback, and a mascot readers root for |
| Apple | One idea per screen, confident typography, generous space, and a disciplined color palette |

## Website

The responsive website has nine pages and a shared design system:

| Page | Purpose |
|---|---|
| [Home](website/home.html) | Landing page, new books, events, and the reading streak |
| [Shop](website/shop.html) | Searchable, filterable book catalog |
| [Book](website/book.html) | Book details, saved items, and related reads |
| [Events](website/events.html) | Upcoming events and RSVP interactions |
| [Rewards](website/rewards.html) | Reading streaks, milestones, and progress logging |
| [Cart](website/cart.html) | Bag quantities, removals, and live totals |
| [About](website/about.html) | Store story, team, and visit information |
| [Sign in](website/signin.html) | Returning reader account entry |
| [Sign up](website/signup.html) | New reader registration flow |

<div align="center">
  <a href="https://yusufabdi6356.github.io/dogear-brand-identity/website/shop.html"><img src="screenshots/shop.png" alt="dogear shop page" width="440"></a>
  <a href="https://yusufabdi6356.github.io/dogear-brand-identity/website/rewards.html"><img src="screenshots/rewards.png" alt="dogear rewards page" width="440"></a>
</div>

### Interface features

- Responsive floating navigation with a single **Sign in / Sign up** account button
- Accessible mobile menu, including keyboard and backdrop close behavior
- Light and dark themes saved in local storage
- Search, category filters, and sorting for the book catalog
- Interactive cart controls, saved books, event RSVPs, streak logging, and newsletter feedback
- Client-side sign-in and sign-up experience with native form validation

## Brand system

<img src="screenshots/palette.svg" alt="dogear color palette" width="880">

The core palette uses Leaf green for action, Sunny yellow for special moments, and Cloud white for clarity. Fredoka gives the brand its rounded, friendly character; Nunito keeps long-form information highly readable.

- **Folio**: leaf-green mascot with one folded ear
- **Chunky press buttons**: tactile buttons with a darker lower edge
- **The fold**: a Sunny yellow corner fold that marks something special
- **The streak**: daily reading rewards at 7, 30, and 100 days

## Additional deliverables

| Item | Link |
|---|---|
| Live site | [Open the demo](https://yusufabdi6356.github.io/dogear-brand-identity/) |
| Package hub | [index.html](index.html) |
| Brand guidelines | [brand-guidelines.html](brand-guidelines.html) |
| Brand book | [dogear-brand-book.pdf](dogear-brand-book.pdf) |
| Mobile app concept | [mobile-design.html](mobile-design.html) |
| Social templates | [social-media.html](social-media.html) |
| Logo suite | [logo/](logo) |

## Run locally

No build step is required. This project is plain HTML, CSS, JavaScript, and SVG.

```bash
git clone https://github.com/Yusufabdi6356/dogear-brand-identity.git
cd dogear-brand-identity
npx http-server . -p 8080
```

Then open `http://localhost:8080` in a browser.

## Project structure

```text
.
|- index.html                 Package hub
|- brand-guidelines.html      Brand rules and rationale
|- dogear-brand-book.pdf      Clickable brand book
|- logo/                      Logos, mascot, and favicon
|- screenshots/               README previews
`- website/                   Responsive website
   |- styles.css              Shared design system
   |- theme.js                Shared interactions
   `- *.html                  Website and account pages
```

<div align="center">

Designed by [Yusuf Abdi](https://github.com/Yusufabdi6356)

*Reading, made a habit.*

</div>
