# 82deg.com

Personal site for **Andreas Gerolemou** — AI-first Product Manager based in
Amsterdam. Trading under **82 Degrees** (ZZP / freelance, Netherlands).

A simple one-page static site. No build step, no framework — just HTML, CSS and
a tiny bit of JS.

## Structure

```
.
├── index.html      # markup + copy
├── styles.css      # all styles
├── main.js         # nav scroll state + contact form handler
├── vercel.json     # Vercel static-build config (optional)
└── README.md
```

## Run locally

No build tools required. Any static server works, e.g.:

```bash
cd /opt/82deg
python3 -m http.server 5173
# then open http://localhost:5173
```

Or just double-click `index.html` in a browser.

## Contact form

The form posts to [Formspree](https://formspree.io) (free tier, no backend
needed).

1. Create a free Formspree account.
2. Create a new form and copy its endpoint URL (looks like
   `https://formspree.io/f/xxxxxxxx`).
3. Open [`index.html`](index.html) and replace the placeholder:

   ```html
   <form ... action="https://formspree.io/f/your-form-id" method="POST">
   ```

   with your real URL.

That's it — the form will start delivering messages to the email on your
Formspree account.

Alternatives if you'd rather not use Formspree:

- [Web3Forms](https://web3forms.com) — similar no-backend form service.
- Vercel Serverless Function under `api/contact.js` using [Resend](https://resend.com).

## Deploy

### Vercel (recommended, matches your existing setup)

1. Push this repo to GitHub (see below).
2. In the Vercel dashboard, **Add New → Project** and import the repo.
3. Framework preset: **Other**. Root directory: `./`. Leave build command blank.
4. Deploy. You'll get a `*.vercel.app` URL immediately.
5. **Project → Settings → Domains**, add `82deg.com` and `www.82deg.com`.
6. Update DNS at your registrar per Vercel's instructions (typically an `A`
   record for the apex and a `CNAME` for `www`).

### Cloudflare Pages (alternative)

1. Push to GitHub.
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Build command: _(empty)_. Build output directory: `./`.
4. Add custom domain `82deg.com` under **Custom domains**. Cloudflare will set
   up DNS automatically if the domain is on Cloudflare.

## Push to GitHub

```bash
cd /opt/82deg
git add .
git commit -m "Initial 82deg.com site"
gh repo create agerolemou/82deg --public --source=. --remote=origin --push
# or manually: git remote add origin ... && git push -u origin main
```

## Customising

- **Copy:** edit sections in [`index.html`](index.html). Each section has a
  clear comment / id (`#about`, `#work`, `#projects`, `#contact`).
- **Colours / type:** CSS variables at the top of [`styles.css`](styles.css)
  (`--accent`, `--ink`, `--bg`, fonts). Dark mode is automatic via
  `prefers-color-scheme`.
- **Projects:** duplicate a `<li class="project">` block in the `#projects`
  section to add more.
