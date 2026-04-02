# Julia Lumina Rae Codespaces Prototype

This repository is a **zero-human-intervention GitHub Codespaces prototype** for the @JuliaLuminaRae artist website.

## What happens automatically in Codespaces

When a user clicks **Open in Codespaces**:

1. The dev container starts with Node.js preinstalled.
2. Dependencies are installed with `npm install`.
3. A build verification step runs (`npm run build`).
4. The development server starts automatically via `npm start`.
5. Port **3000** is auto-forwarded and opened in preview.

No manual setup is required.

## Prototype features included

- Branded landing page for @JuliaLuminaRae.
- Product demos:
  - Digital download with name-your-price (minimum enforced at $1).
  - Physical CD product with inventory simulation (starts at 25 units).
  - 420 merch selector.
- Subscription area with three tiers:
  - Tier 1: Zine + Stickers.
  - Tier 2: Tier 1 + monthly digital bonus track.
  - Tier 3: Tier 2 + quarterly exclusive merch.
- Free download pages/actions for:
  - “Exit Signs” (Burt Sucrose)
  - “Car Wars” (Amadeus)
- Checkout simulation:
  - NYS auto-renewal disclosure checkbox defaults unchecked.
  - Tax calculation varies by mock NY shipping city (NYC vs Albany/Rochester).
  - On-screen email acknowledgment mock.
- Click-to-cancel simulation from account area in one click.
- Responsive layout across desktop/mobile.

## Run locally (outside Codespaces)

```bash
npm install
npm start
```

Then open `http://localhost:3000`.

## Production customization guidance

To adapt this prototype for real use:

1. Replace static cart logic in `app.js` with API-backed checkout sessions (e.g., Stripe Checkout + tax provider).
2. Replace local storage inventory with a real inventory source (Shopify, WooCommerce, or custom DB).
3. Replace data URI free downloads with secure asset hosting and optional lead capture.
4. Hook email acknowledgment mock to a transactional email service (e.g., SendGrid, Postmark).
5. Add real authentication/account management before enabling actual subscriptions and cancellation.
6. Add backend/webhook logic for subscription lifecycle events and receipts.

## NYS legal compliance demonstration in this prototype

This prototype demonstrates compliance-oriented UX patterns only (not legal advice):

- **Auto-renewal disclosures**: checkout includes clear language and an unchecked consent checkbox.
- **Affirmative consent capture**: mock checkout blocks recurring purchases unless consent is checked.
- **Acknowledgment**: mock “email confirmation” is rendered with renewal/cancellation details.
- **Click-to-cancel**: account section provides one-click cancellation simulation.
- **Tax behavior demo**: physical goods/merch are treated as taxable; digital and subscription demo items are non-taxed in the mock logic.

Consult qualified counsel and implement real compliance logging before production launch.

## Key files

- `.devcontainer/devcontainer.json` – Codespaces automation config
- `index.html` – site structure and content
- `styles.css` – responsive design
- `app.js` – simulated cart, tax, renewal consent, and cancellation logic
- `package.json` – scripts/dependencies for local server
