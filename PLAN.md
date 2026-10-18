# Patel Sons — Construction Company Website: Build Plan

## Status (11 Oct 2026)
Built and verified: Home, About, Services, Contracts (labour-rate + with-material, packages, estimator, FAQ),
Projects list with filters, 6 dummy project detail pages (gallery, EMI calculator, enquiry form, map), Gallery,
Contact (form saves to data/leads.json), Privacy, Terms, 404, sitemap.xml, robots.txt, JSON-LD structured data,
dummy Instagram / Facebook / YouTube links, WhatsApp button. See README.md for how to run and edit.

Remaining (needs real inputs): real photos, real phone/address/socials, email notifications for leads,
Google Analytics ID, deploy to Vercel + domain, Google Search Console + Business Profile, optional admin panel.


Company builds row houses and residential buildings (own developments) and takes private construction contracts.
Goal of the site: generate buyer inquiries for projects and quote requests for contract work, and show credibility.

## 1. Audience
- Home buyers looking at row houses / flats (ongoing, upcoming, completed projects)
- Landowners / individuals who want a house built on their plot (private contract, turnkey)
- Landowners for joint-venture development
- Investors / channel partners

## 2. Sitemap (pages)
1. Home — hero with featured project, services strip, ongoing projects, why us, stats, testimonials, CTA
2. About — story, founder/team, mission, certifications (RERA / ISO / licences), process, awards
3. Services
   - Row House Development
   - Residential Buildings / Apartments
   - Private Contract Construction (turnkey on client's plot)
   - Renovation & Extension (optional)
4. Projects — list with filters (status: ongoing / completed / upcoming; type: row house / building; location)
   - Project detail: gallery, floor plans, unit configs (2BHK/3BHK/plot size), amenities, specifications,
     location map, status/progress, RERA number, brochure PDF download, "Book site visit", "Enquire"
5. Private Contract Construction — how it works (6 steps), packages (basic / standard / premium with
   per-sq-ft rate), material brand list, timeline, payment stages, construction cost estimator, request quote form
6. Gallery — photos & videos by project / category, lightbox
7. Testimonials — client reviews, video testimonials
8. Blog / News — progress updates, launches, buying guides (SEO)
9. Careers — open positions + apply form (optional)
10. Contact — form, phone, WhatsApp, email, office address, Google Map, working hours
11. Legal — Privacy Policy, Terms, Disclaimer (prices subject to change, images for representation)
12. Admin panel (later phase) — manage projects, gallery, testimonials, leads

## 3. Key features
- Lead forms: general enquiry, project enquiry, site-visit booking, contract quote request
  → saved to database + email notification + WhatsApp click-to-chat
- Brochure download (collect name/phone before download)
- EMI calculator on project pages
- Construction cost estimator (area × rate per package)
- Floor plan viewer (zoomable images)
- Project progress timeline with monthly site photos
- Floating WhatsApp + call button on mobile
- SEO: metadata per page, Open Graph, sitemap.xml, robots.txt, JSON-LD (Organization, LocalBusiness, Product)
- Google Analytics / Meta Pixel
- Fully responsive, fast (Lighthouse 90+), accessible
- Optional: English + Hindi/Gujarati language switch

## 4. Tech stack
- Framework: Next.js 15 (App Router) + TypeScript
- Styling: Tailwind CSS + shadcn/ui components
- Animations: Framer Motion (light use)
- Forms: React Hook Form + Zod validation
- Database: Prisma + SQLite (dev) / PostgreSQL (prod, Neon or Supabase) — stores leads
- Email: Resend (or Nodemailer SMTP) for lead notifications
- Images: next/image, assets in /public or Cloudinary
- Maps: Google Maps embed
- Content: Phase 1 = JSON/MDX files in repo; Phase 2 = Payload CMS (runs inside Next.js) for admin panel
- Hosting: Vercel (free tier to start) + custom domain; Cloudflare DNS
- Tooling: ESLint, Prettier, Git

## 5. Folder structure
```
patel/
  app/
    (site)/
      page.tsx                 # Home
      about/page.tsx
      services/page.tsx
      services/[slug]/page.tsx
      projects/page.tsx
      projects/[slug]/page.tsx
      contract-construction/page.tsx
      gallery/page.tsx
      testimonials/page.tsx
      blog/page.tsx, blog/[slug]/page.tsx
      careers/page.tsx
      contact/page.tsx
      privacy/page.tsx, terms/page.tsx
    api/
      enquiry/route.ts         # form submissions
      brochure/route.ts
    sitemap.ts, robots.ts, layout.tsx
  components/
    layout/ (Header, Footer, MobileNav, WhatsAppButton)
    home/ (Hero, Stats, FeaturedProjects, WhyUs, Testimonials, CTA)
    projects/ (ProjectCard, ProjectFilters, Gallery, FloorPlans, EmiCalculator, Specs)
    forms/ (EnquiryForm, SiteVisitForm, QuoteForm, BrochureForm)
    ui/ (shadcn)
  content/
    projects/*.json
    services/*.json
    testimonials.json
    company.json              # name, phones, address, socials, RERA
  lib/ (prisma, email, validation, utils)
  prisma/schema.prisma
  public/ (images, brochures, logo)
```

## 6. Design direction
- Colors: deep navy or charcoal base, warm orange/gold accent, off-white backgrounds
- Fonts: bold display font for headings (e.g. Montserrat / Oswald), clean body font (Inter)
- Big real photography of projects, subtle construction-grid pattern, strong CTAs ("Enquire Now", "Book Site Visit")
- Trust elements everywhere: years in business, homes delivered, sq ft built, RERA badges, client logos

## 7. Build phases
- Phase 0 — Setup: Next.js, Tailwind, shadcn, layout (header/footer/nav), company.json, design tokens
- Phase 1 — Core pages: Home, About, Services, Contact + enquiry form (DB + email)
- Phase 2 — Projects: listing with filters, detail page, gallery, floor plans, brochure download, EMI calculator
- Phase 3 — Contract construction page: packages, process, cost estimator, quote form, site-visit booking
- Phase 4 — Testimonials, Gallery, Blog, Careers, Legal pages
- Phase 5 — SEO, performance, analytics, WhatsApp button, deploy to Vercel with domain
- Phase 6 — Admin panel (Payload CMS) so staff can update projects/leads without a developer

## 8. Content needed from the company
- Company name, logo, tagline, brand colors (if any)
- Office address, phone numbers, WhatsApp number, email, social links, Google Map location
- Founder/team names, photos, short bios; year founded; certifications / RERA numbers
- Project list: name, location, type, status, unit configs, sizes, price (or "on request"),
  amenities, specifications, photos, floor plans, brochure PDF, map link
- Contract construction packages and per-sq-ft rates, material brands, payment stages
- Testimonials (name, project, quote, photo/video)
- Any awards, press, client logos

## 9. Open decisions
- Country/state (affects RERA, currency, language)
- Show prices publicly or "price on request"
- Admin panel needed at launch or later
- Languages: English only or + Hindi/Gujarati
