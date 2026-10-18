export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "tip"; text: string };

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  category: string;
  date: string; // ISO
  updated?: string;
  readMinutes: number;
  keywords: string[];
  blocks: Block[];
  related: string[]; // internal links (paths)
}

const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;

export const posts: Post[] = [
  {
    slug: "construction-cost-per-sq-ft-ahmedabad-2026",
    title: "Construction Cost per Sq. Ft. in Ahmedabad (2026 Guide)",
    excerpt: "What it really costs to build a house in Ahmedabad in 2026: structure, finishing, labour, and the difference between Standard, Premium and Luxury packages.",
    cover: u("1541888946425-d81bb19240f5"),
    category: "Cost guides",
    date: "2026-09-02",
    updated: "2026-10-01",
    readMinutes: 7,
    keywords: ["construction cost per sq ft Ahmedabad", "house construction cost Ahmedabad 2026", "building cost Gujarat"],
    blocks: [
      { type: "p", text: "The most common question we hear on a first site visit is simple: what will my house cost per square foot? The honest answer is that it depends on three things: the structure, the finishing package and who buys the materials. This guide breaks down 2026 prices in Ahmedabad so you can budget before you talk to any contractor." },
      { type: "h2", text: "Typical with-material (turnkey) rates in Ahmedabad" },
      { type: "table", head: ["Package", "Rate per sq. ft.", "Suits"], rows: [["Standard", "₹1,750", "Rental homes, budget bungalows, G+1 on small plots"], ["Premium", "₹2,150", "Family homes with vitrified tiles, UPVC windows, branded fittings"], ["Luxury", "₹2,650+", "Italian marble, modular kitchen, false ceilings, automation-ready"]] },
      { type: "p", text: "These rates include materials, labour, supervision, scaffolding, curing and site management. They exclude plan approval fees, borewell, compound wall beyond scope, and interior furniture." },
      { type: "h2", text: "Labour-only rates" },
      { type: "p", text: "If you prefer to buy cement, steel, bricks and tiles yourself, a labour-rate contract starts at ₹260 per sq. ft. for structure work and ₹390 per sq. ft. for structure plus finishing. You keep full control over brands, and you also carry the risk of wastage and delivery delays." },
      { type: "h2", text: "What changes the price" },
      { type: "ul", items: ["Soil condition: black cotton soil needs deeper footings or raft foundations.", "Number of floors: G+2 is cheaper per sq. ft. than G+1 because the foundation cost is shared.", "Finishing choices: flooring and sanitaryware alone can swing the rate by ₹300 per sq. ft.", "Site access: narrow lanes mean smaller trucks and more handling.", "Design complexity: cantilevers, double-height spaces and curved walls add steel and shuttering."] },
      { type: "h2", text: "Example: 2,000 sq. ft. G+1 home" },
      { type: "p", text: "A 1,000 sq. ft. plot area built as G+1 gives roughly 2,000 sq. ft. of built-up area. At the Premium rate of ₹2,150 the construction cost is about ₹43 lakh, paid in stages from agreement to handover over 10 to 12 months." },
      { type: "tip", text: "Use the cost estimator on our Contracts page to try different areas, floors and packages in seconds." },
      { type: "h2", text: "How to compare contractor quotes" },
      { type: "p", text: "Always compare the specification sheet, not just the rate. Ask which grade of concrete, which steel brand, which tile size and which fittings are included. A quote that is ₹200 cheaper per sq. ft. but uses M20 instead of M25 concrete and Fe500 instead of Fe500D steel is not cheaper, it is a different product." },
    ],
    related: ["/contracts", "/services/with-material-contract", "/blog/labour-rate-vs-with-material-contract"],
  },
  {
    slug: "labour-rate-vs-with-material-contract",
    title: "Labour Rate vs With Material Contract: Which Is Better for Your Home?",
    excerpt: "The two ways to hire a contractor in India explained with real numbers, risks and who each model suits.",
    cover: u("1504307651254-35680f356dfd"),
    category: "Contracts",
    date: "2026-08-18",
    readMinutes: 6,
    keywords: ["labour rate contract", "with material contract", "labour contract vs material contract house construction"],
    blocks: [
      { type: "p", text: "Every house construction contract in Gujarat falls into one of two models. In a labour-rate contract you buy the materials and the contractor supplies workers and supervision. In a with-material contract the contractor supplies everything at a single rate. Both work. The right choice depends on your time, your material knowledge and your appetite for risk." },
      { type: "h2", text: "Labour-rate contract" },
      { type: "ul", items: ["You purchase cement, steel, bricks, sand, tiles, fittings and paint.", "Contractor bills per sq. ft. for manpower and supervision, typically ₹260 to ₹390.", "You control every brand and can negotiate directly with suppliers.", "You or a family member must coordinate deliveries, storage and payments.", "Wastage, theft and delivery delays are your risk."] },
      { type: "h2", text: "With-material contract" },
      { type: "ul", items: ["Contractor procures everything as per an agreed specification sheet.", "Single fixed rate per sq. ft., typically ₹1,750 to ₹2,650, locked at signing.", "Stage-wise payments tied to completed, inspected work.", "Weekly progress reports; you visit when you want, not because you must.", "Wastage and price fluctuation are the contractor's risk."] },
      { type: "h2", text: "Who should choose which" },
      { type: "table", head: ["If you…", "Choose"], rows: [["Have a trusted material supplier and free time", "Labour rate"], ["Live abroad or work full-time", "With material"], ["Want the lowest headline cost and accept more risk", "Labour rate"], ["Want one accountable party and a fixed budget", "With material"]] },
      { type: "tip", text: "Many of our clients start with a labour-rate quote, add up the material estimates and realise the with-material rate is within 5 to 8 percent, with far less effort. Ask for both." },
    ],
    related: ["/contracts", "/services/labour-rate-contract", "/services/with-material-contract"],
  },
  {
    slug: "how-to-choose-construction-contractor-ahmedabad",
    title: "How to Choose a Construction Contractor in Ahmedabad: 12-Point Checklist",
    excerpt: "The questions to ask, documents to check and red flags to avoid before you sign a construction agreement.",
    cover: u("1503387762-592deb58ef4e"),
    category: "Guides",
    date: "2026-07-22",
    readMinutes: 8,
    keywords: ["construction contractor Ahmedabad", "best builder Ahmedabad", "how to choose house contractor"],
    blocks: [
      { type: "p", text: "A good contractor is the difference between a home that is handed over on time and one that drags on for two years. Use this checklist on every contractor you shortlist." },
      { type: "h2", text: "Before the first meeting" },
      { type: "ul", items: ["Visit at least two of their completed sites and one ongoing site.", "Talk to the owners without the contractor present.", "Check the company name on the GST portal and RERA website for registered projects.", "Search Google reviews and social media for the last 12 months."] },
      { type: "h2", text: "Questions to ask" },
      { type: "ul", items: ["Who is the site engineer and how many sites does he handle at once?", "Which concrete grade and steel brand will you use, and will it be on the specification sheet?", "What is the payment schedule, and is each stage tied to inspected work?", "How are extras priced, and do I approve them in writing first?", "What is the penalty for delay, and what is the defect-liability period after handover?", "How will you send progress updates?"] },
      { type: "h2", text: "Red flags" },
      { type: "ul", items: ["Large advance demanded before any work.", "A single-line quote with no specification sheet.", "No written agreement, or an agreement without a completion date.", "Supervision sub-contracted to someone you never meet."] },
      { type: "tip", text: "At Patel Sons every contract has a specification sheet, a stage-wise payment plan, a dated schedule and a 12-stage quality checklist signed off before each payment." },
    ],
    related: ["/about", "/contracts", "/projects"],
  },
  {
    slug: "row-house-vs-apartment-ahmedabad",
    title: "Row House vs Apartment in Ahmedabad: Which Should You Buy?",
    excerpt: "Space, cost, maintenance, resale and lifestyle compared, with current price ranges in West and East Ahmedabad.",
    cover: u("1600585154340-be6161a56a0c"),
    category: "Home buying",
    date: "2026-06-30",
    readMinutes: 6,
    keywords: ["row house Ahmedabad", "row house vs apartment", "buy row house Bopal", "2 BHK apartment Vastral"],
    blocks: [
      { type: "p", text: "Ahmedabad gives buyers a genuine choice that many Indian cities no longer can: a gated row house with a garden, or an apartment in a tower with shared amenities. Here is how they compare in 2026." },
      { type: "h2", text: "Price" },
      { type: "table", head: ["Type", "Typical size", "Price range"], rows: [["3 BHK row house, South Bopal / Shela", "2,100 – 2,850 sq. ft.", "₹1.4 – ₹2.2 Cr"], ["2 BHK apartment, Vastral / Nikol", "1,000 – 1,200 sq. ft.", "₹45 – ₹65 L"], ["3 BHK apartment, Vastral", "1,500 – 1,700 sq. ft.", "₹75 – ₹95 L"]] },
      { type: "h2", text: "Living" },
      { type: "ul", items: ["Row house: private garden and terrace, your own entrance, no lift dependence, easier to extend.", "Apartment: security desk, lift, lower maintenance effort, better for frequent travellers.", "Row house communities usually have 30 to 60 homes, so neighbours know each other.", "Apartment towers offer gyms, pools and halls that a small row house community cannot."] },
      { type: "h2", text: "Resale and rental" },
      { type: "p", text: "Row houses in West Ahmedabad have appreciated faster over the last five years because land is the scarce part. Apartments near the metro in East Ahmedabad rent faster and give better rental yield. Decide whether you are buying to live for 15 years or to earn." },
      { type: "tip", text: "Visit both. Shivalik Greens (row houses) and Patel Heights (apartments) are open for site visits six days a week." },
    ],
    related: ["/projects/shivalik-greens", "/projects/patel-heights", "/projects"],
  },
  {
    slug: "stage-wise-payment-schedule-house-construction",
    title: "Stage-Wise Payment Schedule for House Construction (With Percentages)",
    excerpt: "A fair payment schedule protects both owner and contractor. Here is the one we use and why each stage is weighted the way it is.",
    cover: u("1590725140246-20acdee442be"),
    category: "Contracts",
    date: "2026-05-14",
    readMinutes: 5,
    keywords: ["construction payment schedule", "stage wise payment house construction", "contractor payment terms India"],
    blocks: [
      { type: "p", text: "Never pay for work that has not been done. A stage-wise schedule ties every rupee to a milestone you can see and inspect." },
      { type: "table", head: ["Stage", "Share of contract"], rows: [["Agreement signing", "10%"], ["Foundation complete", "15%"], ["Slabs (split equally per slab)", "30%"], ["Masonry and plaster", "20%"], ["Flooring and finishing", "20%"], ["Handover and snag list cleared", "5%"]] },
      { type: "h2", text: "Why these weights" },
      { type: "ul", items: ["Foundation and slabs consume most of the steel and concrete, so they carry the largest share.", "Finishing is spread out so you keep leverage until the end.", "A 5% final payment after the snag list keeps the contractor motivated to fix small items."] },
      { type: "tip", text: "Ask for an inspection and photo report before each payment. We send one automatically at every stage." },
    ],
    related: ["/contracts", "/blog/labour-rate-vs-with-material-contract"],
  },
  {
    slug: "rera-checklist-homebuyers-gujarat",
    title: "RERA Checklist for Homebuyers in Gujarat",
    excerpt: "Seven things to verify on the Gujarat RERA website before you book a row house or apartment.",
    cover: u("1545324418-cc1a3fa10c00"),
    category: "Home buying",
    date: "2026-04-09",
    readMinutes: 4,
    keywords: ["Gujarat RERA", "RERA registered projects Ahmedabad", "RERA checklist homebuyer"],
    blocks: [
      { type: "p", text: "Every project sold in Gujarat with more than eight units must be registered with GujRERA. The registration number is public, and the website tells you more than any brochure." },
      { type: "h2", text: "Check these on gujrera.gujarat.gov.in" },
      { type: "ul", items: ["Registration number matches the one on the brochure and agreement.", "Promoter name matches the company you are paying.", "Approved plan and number of units match what is being sold.", "Declared completion date, and whether it has been extended.", "Quarterly progress updates are being filed.", "Land title documents are uploaded.", "Any complaints or orders against the project."] },
      { type: "h2", text: "What RERA guarantees" },
      { type: "p", text: "Your booking amount is capped at 10% before the agreement, 70% of collections must go into a project-specific account, and delays entitle you to interest or a refund. Buying unregistered is not cheaper; it is just unprotected." },
      { type: "tip", text: "All Patel Sons projects display their RERA number on the project page. Look it up before you visit." },
    ],
    related: ["/projects", "/blog/row-house-vs-apartment-ahmedabad"],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
