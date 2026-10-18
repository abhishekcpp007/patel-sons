# Patel Sons — Construction Company Website

Next.js 16 + TypeScript + Tailwind CSS 4 marketing site for Patel Sons (row houses, residential buildings, labour-rate and with-material construction contracts).

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
```

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the live domain (used for canonical URLs, sitemap and Open Graph).

## Where to change things

| What | File |
|---|---|
| Company name, phone, WhatsApp, address, social links, stats, RERA | `content/company.ts` |
| Projects (showcase sites), photos, prices, progress | `content/projects.ts` |
| Services, contract packages and per-sq-ft rates, process steps, testimonials | `content/services.ts` |
| FAQ text (also emitted as FAQ structured data for Google) | `content/faqs.ts` |
| SEO defaults, keywords, JSON-LD helpers | `lib/seo.ts` |
| Colours and fonts | `app/globals.css`, `app/layout.tsx` |
| Query form tabs, fields and validation | `lib/enquiry-schema.ts` |
| Animated 3D logo | `components/layout/logo.tsx` |

All photos are currently Unsplash placeholders. Replace the URLs in `content/*.ts` with the company's own photos (put them in `public/` and reference as `/photo.jpg`).

## Raise a Query (enquiries)

A "Raise a Query" button in the header opens a slide-over panel on every page (`components/forms/query-drawer.tsx`).
The same tabbed form is on `/contact`. Tabs: General query, Buy a home, Build on my plot, Book site visit, Request callback.
Each tab collects the relevant details (project, contract type, plot size and location, budget, timeline, preferred
contact channel, preferred date and time). Any component can open it pre-filled with `openQuery({...})` from
`lib/query-store.ts`, or link to `/contact?type=site-visit` / `/contact?interest=with-material-contract`.

Form submissions POST to `app/api/enquiry/route.ts` and are appended to `data/leads.json` (git-ignored). To get email or WhatsApp notifications, add a provider (e.g. Resend) in that route.

## Materials store, guidance service, areas and blog

- `/materials` and `/materials/<category>`: catalogue from `content/materials.ts` with basket (localStorage) and
  "Request order" which opens the query drawer on the **Order materials** tab with the item list prefilled.
  No online payment; orders arrive as leads (`queryType: "materials"`). Add Razorpay later if needed.
- `/services/real-estate-guidance`: advisory service; queries use the **Real estate guidance** tab.
- `/areas/<locality>`: local landing pages from `content/areas.ts`.
- `/blog/<slug>`: articles from `content/blog.ts` (block-based, no markdown parser needed).
- Leadership names live in `content/company.ts` → `founders`.

## Materials trust layer

- **Guarantee** (`components/materials/promise.tsx`): genuine products, quantity guarantee, market-rate match,
  engineer-checked grade, on-time-or-free delivery, help desk. Shown on `/materials` and every category page.
- **Reviews** (`/api/reviews`, `data/reviews.json`): anyone can post; "Verified buyer" badge when the phone or account
  matches a material order. Seed reviews in `content/reviews.ts` (placeholders, delete before launch).
- **Complaints / help desk** (`/support`, `/api/support`, `data/tickets.json`): ticket numbers `HELP-…`.
- **Live order tracking** (`/track`, `/api/track`): orders get `PS-…` numbers and a status timeline
  (received → confirmed → packed → dispatched → out for delivery → delivered). Page auto-refreshes every 30 s.
- **Staff panel** (`/admin`): sign in with `ADMIN_TOKEN` to update order status, vehicle, driver phone, ETA, and reply to
  complaints. Customers see updates live. Set a long random `ADMIN_TOKEN` in production.
- **Usage guides** (`/materials/guides/<slug>`, `content/material-guides.ts`): cement, TMT steel, red bricks,
  fly-ash bricks, AAC blocks, sand, tiles, plumbing, electrical, paint.

## SEO built in

- Unique title, description and canonical URL on every page (`lib/seo.ts`)
- Open Graph and Twitter card tags
- JSON-LD: Organization / LocalBusiness / GeneralContractor, BreadcrumbList, Service, Product for projects, FAQPage
- `sitemap.xml` and `robots.txt` generated from `app/sitemap.ts` and `app/robots.ts`
- One H1 per page, descriptive image alt text, static prerendered HTML

See `SEO-CHECKLIST.md` for the full on-site inventory and the owner's off-site to-do list. After deploying: verify the domain in Google Search Console, submit `/sitemap.xml`, and create a Google Business Profile with the same name, address and phone as `content/company.ts`.

## Sign up with Google + mobile number

Visitors can create an account at `/signup`: step 1 is Google sign-in, step 2 asks for their mobile number and
WhatsApp consent. Accounts are stored in `data/users.json`; queries raised while signed in are linked to the account
and listed on `/account`. The query form prefills name, phone and email for signed-in users.

Setup (one time):
1. In Google Cloud Console → APIs & Services → Credentials, create an **OAuth client ID** (Web application).
2. Add the authorised redirect URI `https://<your-domain>/api/auth/google/callback` (and `http://localhost:3000/api/auth/google/callback` for local dev).
3. Put the values in `.env.local` / Vercel env: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `AUTH_SECRET` (random 32+ chars), `NEXT_PUBLIC_SITE_URL`.
4. Make sure `AUTH_DEV_LOGIN` is **not** `true` in production. When it is `true`, `/signup` shows a yellow test sign-in box that skips Google.

Implementation: `lib/auth.ts` (PKCE OAuth, Google ID-token verification with `jose`, signed session cookie),
`app/api/auth/*`, `app/api/account/*`, `components/auth/*`.

## Deploy

Push to GitHub and import into Vercel (zero config). Set `NEXT_PUBLIC_SITE_URL` in Vercel environment variables.
