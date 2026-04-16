# 82deg.com

Personal site for **Andreas Gerolemou** — AI-first Product Manager based in Amsterdam.

Static one-page site. No build step, no framework — just HTML, CSS, and JS.

## What's on the page

- **Hero** — positioning, quick stats, call to action
- **About** — background, current focus on AI products
- **What I do** — strategy, delivery, and measurement
- **Side projects** — Poetry Cove, word search books, handmade wallets
- **Experience** — Backbase role timeline (2016–present), client engagements, Studio 82 Degrees (2009–2016)
- **Contact** — LinkedIn, GitHub, email

## Stack

- Plain HTML / CSS / JS (no build tools)
- [Fraunces](https://fonts.google.com/specimen/Fraunces) (display) + [Hanken Grotesk](https://fonts.google.com/specimen/Hanken+Grotesk) (body) via Google Fonts
- Dark / light mode with toggle (persisted in localStorage)
- Scroll-driven decorative elements and reveal animations
- Hosted on [Vercel](https://vercel.com), domain via Namecheap

## Run locally

```bash
python3 -m http.server 5173
# open http://localhost:5173
```

## Customising

- **Copy:** edit sections in `index.html` — each section has a clear id (`#about`, `#work`, `#projects`, `#experience`, `#contact`).
- **Colours / fonts:** CSS custom properties at the top of `styles.css` (`--accent`, `--ink`, `--bg`, `--font-sans`, `--font-display`).
- **Projects / clients:** duplicate an `<li>` block in the relevant section to add more.
