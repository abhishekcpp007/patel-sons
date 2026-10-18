# Patel Sons — SEO Checklist

What the website already does for you is in the first section. The second section is the work only the
business owner can do; it is what moves a local construction company from page 5 to page 1.

## 1. Built into the website (done)

- Unique, keyword-led `<title>` (≤ 60 chars) and meta description on every page; canonical URLs; Open Graph + Twitter cards
- Branded Open Graph image generated for every page (`/opengraph-image`, `/projects/<slug>/opengraph-image`, …)
- Structured data (JSON-LD): Organization + LocalBusiness + GeneralContractor with geo, hours, founders, sameAs;
  BreadcrumbList on every page; Service (with per-sq-ft offers); Product for projects and materials; FAQPage;
  Article/Blog; ItemList/OfferCatalog
- `sitemap.xml` (all projects, services, areas, materials, blog) and `robots.txt`
- Landing pages for every service (`/services/<slug>`), every Ahmedabad locality (`/areas/<slug>`),
  every material category (`/materials/<slug>`), plus six long-form blog guides targeting money keywords
- Strong internal linking: footer area links, service ↔ area ↔ project ↔ blog cross-links
- Static, prerendered HTML; optimised images with explicit sizes; preconnect to the image CDN; font-display swap
- Security headers, HSTS, no `X-Powered-By`; web manifest and theme colour
- Google Analytics 4 and Search Console / Bing verification via env vars (see `.env.example`)
- `/account`, `/signup` and `/api` are noindex / disallowed

## 2. To do after deployment (owner)

### Week 1
1. **Buy the domain** (e.g. patelsons.in) and deploy on Vercel with `NEXT_PUBLIC_SITE_URL=https://patelsons.in`.
2. **Google Search Console**: add the property, paste the HTML-tag token into `GOOGLE_SITE_VERIFICATION`,
   redeploy, verify, then submit `https://patelsons.in/sitemap.xml`. Request indexing for `/`, `/contracts`,
   `/services/with-material-contract`, `/materials`.
3. **Google Business Profile** (the single biggest local-ranking factor): create or claim it with the EXACT
   same name, address and phone as `content/company.ts`. Category: "Construction company"; secondary:
   "General contractor", "Building materials supplier", "Real estate consultant". Add 20+ real site photos,
   services with prices, hours, website link, and post a weekly update.
4. **Google Analytics 4**: create a property, put the `G-…` ID in `NEXT_PUBLIC_GA_ID`.
5. Replace every placeholder: real phone, address, RERA numbers, team photos, project photos. Google ranks
   real photos and real reviews; stock images hurt trust.

### Month 1
6. **Reviews**: ask every past client for a Google review (send them the review link on WhatsApp). Target 25+
   reviews with photos. Reply to every review.
7. **Local citations** with identical NAP (name, address, phone): JustDial, Sulekha, IndiaMART, 99acres,
   MagicBricks, Housing.com, Facebook page, Instagram bio, YouTube "About", LinkedIn company page.
8. **Social**: post site-progress reels weekly on Instagram/YouTube with the area name in the caption
   ("Slab casting at Shivalik Greens, South Bopal") and link to the project page.
9. **RERA listing**: make sure the Gujarat RERA project pages link to the website.

### Ongoing
10. **One blog post every 2 weeks** targeting a question people search ("cost to build 3 BHK in Ahmedabad",
    "best cement for slab", "AUDA approval process"). Add it to `content/blog.ts`; sitemap updates itself.
11. **Backlinks**: ask material suppliers, architects, banks (home-loan partners) and happy clients with
    businesses to link to you. Get featured in local news for project launches.
12. **Project updates**: keep `progress` and photos current on project pages; Google rewards freshness.
13. Check Search Console monthly: fix any coverage errors, look at "queries" and add FAQs that answer them.
14. Core Web Vitals: run PageSpeed Insights after each deploy; keep LCP < 2.5 s (hero image already prioritised).

## 3. Keywords this site targets

| Page | Primary keyword |
|---|---|
| `/` | construction company in Ahmedabad |
| `/contracts` | construction contract rates Ahmedabad / labour rate contract |
| `/services/with-material-contract` | turnkey house construction Ahmedabad, with material contract |
| `/services/labour-rate-contract` | labour rate contract house construction |
| `/services/row-house-development` | row house builders Ahmedabad |
| `/services/residential-buildings` | residential building contractor Ahmedabad |
| `/services/real-estate-guidance` | real estate consultant / construction consultant Ahmedabad |
| `/materials` | buy building materials Ahmedabad, TMT steel price Ahmedabad |
| `/areas/<area>` | construction contractor in <area>, builders in <area> |
| `/blog/construction-cost-per-sq-ft-ahmedabad-2026` | construction cost per sq ft Ahmedabad |
