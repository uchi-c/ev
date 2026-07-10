# Evaregi Building & Maintenance (EBM) — website

A fast, mobile-first brochure site for **Evaregi Building & Maintenance Co. Ltd** —
a Zambian modular-building contractor. Built as plain, static **HTML + CSS + JS**
(no build step, no framework), so it deploys anywhere and loads quickly on mobile.

## Pages
| File            | Page                                   |
|-----------------|----------------------------------------|
| `index.html`    | Home — hero, sectors, services, proof  |
| `about.html`    | About + NCC/PACRA/ZRA credentials      |
| `services.html` | The six services                       |
| `products.html` | The 3 m × 6 m unit, customisation, rent/buy |
| `sectors.html`  | Office · Accommodation · Education      |
| `projects.html` | Gallery of installations               |
| `contact.html`  | Contact details + enquiry form          |

## Run locally
It's static — open `index.html` directly, or serve the folder:
```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Deploy
Upload the whole folder to any static host (Netlify, Vercel, GitHub Pages,
cPanel). No server-side code required.

## Before going live — checklist
- [ ] **Add real photos** to `assets/img/` — see `assets/img/README.md` for exact
      file names. Placeholders show until then.
- [ ] **Add certificate scans** on `about.html` (NCC, PACRA) and a **current, valid
      ZRA tax clearance** — the placeholders are clearly marked. Do **not** publish
      an expired certificate.
- [ ] **Wire up the contact form** (optional): add `data-endpoint="…"` to the
      `<form class="lead">` in `contact.html` pointing at a form service
      (e.g. Formspree / Web3Forms). Without it, the form opens the visitor's email
      app pre-filled to `evaregibuilding@gmail.com`.
- [ ] Confirm the WhatsApp number `260977211393` and phone `+260 977 211 393`.

## Deliberately **not** on this site
- **No bank account number.** Payment terms and bank details are "provided on
  invoice" only — the site collects no payment.
- No fabricated certificate validity dates.

## Brand
- **Red** `#C8102E` · **Charcoal** `#17191C` · **Steel greys** · **White**
- Typeface: **Archivo** (a grounded, technical grotesk)
- Design language: industrial + modular — exposed grid lines, corrugated-steel
  texture, a "stack the units" motif for the product system.
