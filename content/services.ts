export interface Service {
  slug: string;
  title: string;
  short: string;
  description: string;
  image: string;
  points: string[];
  icon: "house" | "building" | "hardhat" | "package" | "compass" | "truck";
  seoTitle: string;
  seoDescription: string;
  longDescription: string[];
  included: string[];
  faqs: { q: string; a: string }[];
}

const u = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const services: Service[] = [
  {
    slug: "row-house-development",
    title: "Row House Development",
    short: "Gated communities of independent homes with gardens and terraces.",
    description:
      "We acquire land, design and build gated row house communities, and sell homes directly to families. From layout planning to clubhouse handover, everything is done in-house.",
    image: u("1600585154340-be6161a56a0c"),
    points: ["Vastu-compliant layouts", "Private garden & terrace", "Clubhouse & amenities", "RERA registered projects"],
    icon: "house",
    seoTitle: "Row House Builders in Ahmedabad | Gated Row House Projects",
    seoDescription: "Patel Sons develops RERA-registered gated row house communities in Ahmedabad: South Bopal, Shela and more. 3 & 4 BHK homes with private gardens. Book a site visit.",
    longDescription: [
      "A row house gives a family what an apartment cannot: its own entrance, a private garden, a terrace, and no lift to wait for. Patel Sons has developed row house communities in West Ahmedabad since 2004, from the first eight homes in Shela to the 48-home Shivalik Greens in South Bopal.",
      "We buy the land, obtain approvals, design with our panel architects, build with our own engineers and sell directly to families. There is no broker layer and no middle contractor, so what we promise in the sample house is what you receive on handover day.",
    ],
    included: ["Land acquisition and clear title", "AUDA/AMC plan approval and RERA registration", "Architectural and structural design", "Earthquake-resistant RCC construction", "Clubhouse, gardens and infrastructure", "Society formation and handover with completion certificate"],
    faqs: [
      { q: "Which areas of Ahmedabad do you develop row houses in?", a: "Our current and completed row house projects are in South Bopal and Shela, with upcoming land parcels in Bopal and Ghuma. We focus on West Ahmedabad where demand for gated independent homes is strongest." },
      { q: "Can I customise the interior of my row house?", a: "Yes. Buyers who book before the finishing stage can choose from flooring, kitchen and bathroom upgrade options at transparent prices listed in the agreement." },
      { q: "Are your row house projects RERA registered?", a: "Every project we sell is registered with Gujarat RERA. The registration number is on each project page and in your agreement." },
    ],
  },
  {
    slug: "residential-buildings",
    title: "Residential Buildings",
    short: "Mid-rise and high-rise apartment towers with modern amenities.",
    description:
      "Well-planned 2 & 3 BHK apartment buildings with efficient floor plates, ample parking and lifestyle amenities, built to strict structural and fire safety standards.",
    image: u("1460317442991-0ec209397118"),
    points: ["Earthquake-resistant RCC", "Fire safety compliant", "Lifts, parking & power backup", "Society formation at handover"],
    icon: "building",
    seoTitle: "Residential Building Contractors in Ahmedabad | Apartment Construction",
    seoDescription: "Apartment building construction in Ahmedabad by Patel Sons: own developments like Patel Heights in Vastral, plus G+3 to 14-storey buildings for landowners and societies.",
    longDescription: [
      "From a 7-storey building of 56 flats in Nikol to the 14-storey Patel Heights tower in Vastral, we design and build residential buildings that are structurally honest and easy to maintain for decades.",
      "Landowners and housing societies also hire us to construct buildings on their plots under a with-material contract, including redevelopment of old societies in Satellite and Paldi. We manage structural design, fire NOC, lift installation and society handover.",
    ],
    included: ["Structural design and soil testing", "RCC shear-wall or frame structure", "Fire safety, lifts and electrical substation coordination", "Parking, drainage and rainwater harvesting", "Common amenities and landscaping", "Occupation certificate and society formation"],
    faqs: [
      { q: "Do you build apartment buildings for societies on their own land?", a: "Yes. We take with-material contracts from landowners and housing societies for new buildings and redevelopment projects, with a fixed per sq. ft. rate and stage-wise payments." },
      { q: "How long does a G+4 building take?", a: "A typical G+4 residential building with 20 flats takes 14 to 18 months from excavation to occupation certificate, depending on approvals." },
      { q: "Which safety standards do you follow?", a: "All structures are designed to IS 1893 for earthquake resistance (Ahmedabad is seismic zone III) and comply with the Gujarat fire safety norms for the building height." },
    ],
  },
  {
    slug: "labour-rate-contract",
    title: "Labour Rate Contract",
    short: "You buy the materials. We bring the skilled team and supervision.",
    description:
      "Ideal when you want full control over material brands and purchasing. Patel Sons supplies masons, carpenters, bar-benders, plumbers, electricians and a full-time supervisor, billed per sq. ft. of built-up area.",
    image: u("1504307651254-35680f356dfd"),
    points: ["Per sq. ft. labour billing", "Full-time site supervisor", "Skilled, verified workforce", "You control material brands"],
    icon: "hardhat",
    seoTitle: "Labour Rate Contract for House Construction in Ahmedabad | From ₹260/sq ft",
    seoDescription: "Labour-only construction contract in Ahmedabad: you buy materials, Patel Sons supplies skilled masons, carpenters, plumbers, electricians and a full-time supervisor. Rates from ₹260 per sq ft.",
    longDescription: [
      "A labour-rate contract is the right choice when you want to buy every bag of cement yourself. You decide the brands, you negotiate with suppliers, and you pay us only for skilled manpower, supervision and site management, billed per square foot of built-up area.",
      "What you get is not a loose gang of workers. Every Patel Sons labour contract comes with a full-time site supervisor, a weekly engineer visit, a written scope and a stage-wise schedule, the same discipline we apply on our own projects.",
    ],
    included: ["Masons, carpenters, bar-benders, plumbers, electricians and helpers", "Full-time site supervisor and weekly engineer visit", "Scaffolding, shuttering material and tools", "Curing, housekeeping and safety on site", "Material requirement schedule so you can order on time", "Stage-wise quality checklist and photo reports"],
    faqs: [
      { q: "What is included in the ₹260 per sq. ft. structure rate?", a: "Excavation, PCC, RCC footings, columns, beams and slabs, brick or block masonry, internal and external plaster, with scaffolding, shuttering and supervision. Materials are purchased by you." },
      { q: "Will you tell me what materials to order and when?", a: "Yes. You receive a material requirement schedule at the start and a weekly update so cement, steel and bricks arrive before the team needs them." },
      { q: "What if work stops because material is late?", a: "Idle days caused by late material are logged and shared with you the same day. We plan deliveries together to avoid them, and there is no extra charge for the first two idle days per month." },
    ],
  },
  {
    slug: "with-material-contract",
    title: "With Material Contract",
    short: "Turnkey construction with a fixed per sq. ft. price including materials.",
    description:
      "One contract, one price, one point of contact. We handle procurement, labour, supervision and finishing with a fixed per sq. ft. rate locked at signing and stage-wise payments.",
    image: u("1541888946425-d81bb19240f5"),
    points: ["Fixed price locked at signing", "Branded materials as per package", "Stage-wise payment schedule", "Weekly photo & progress reports"],
    icon: "package",
    seoTitle: "With Material Turnkey House Construction in Ahmedabad | From ₹1,750/sq ft",
    seoDescription: "Turnkey with-material construction contract in Ahmedabad. Patel Sons supplies materials, labour and supervision at a fixed per sq ft rate: Standard ₹1,750, Premium ₹2,150, Luxury ₹2,650.",
    longDescription: [
      "With-material means one contract, one price and one phone number. We procure every material as per a written specification sheet, build with our own supervised teams and hand over a finished home at the per sq. ft. rate agreed on day one.",
      "It is the model most of our clients choose because it removes the two biggest headaches of building a home: chasing material deliveries and arguing about extras. Payments are stage-wise and tied to inspected work, and you receive photo progress reports every Saturday.",
    ],
    included: ["All materials as per the package specification sheet", "Labour, supervision and site management", "Plan coordination with our panel architect and structural engineer", "Plumbing, electrical, flooring, doors, windows and painting", "Waterproofing and external finish", "Snag-list clearance and 12-month defect liability"],
    faqs: [
      { q: "Is the per sq. ft. rate really fixed?", a: "Yes. The rate in your agreement is locked for the full duration. Only changes you request in writing are billed as extras, at rates listed in the agreement before work starts." },
      { q: "Can I upgrade individual items in a package?", a: "Yes. Common upgrades like larger tiles, a modular kitchen or UPVC windows are priced per item so you can mix a Standard structure with Premium finishes." },
      { q: "How do payments work?", a: "Ten percent at agreement, then stage-wise on foundation, each slab, masonry and plaster, finishing, and five percent at handover after the snag list is cleared." },
    ],
  },
  {
    slug: "real-estate-guidance",
    title: "Real Estate & Construction Guidance",
    short: "Expert advice before you buy a plot, sign a contract or start building.",
    description:
      "Buying land and building on it involves title checks, zoning, approvals, valuations and contractor decisions most families make only once. Our partners and panel lawyers, architects and valuers guide you through every step, whether or not you build with us.",
    image: u("1503387762-592deb58ef4e"),
    points: ["Plot & land buying advisory", "Title search & legal due diligence", "AUDA/AMC & NA approvals", "Plan, BOQ & contractor audits"],
    icon: "compass",
    seoTitle: "Real Estate Advisory & Construction Consultant in Ahmedabad",
    seoDescription: "Plot buying guidance, title and legal checks, valuation, AUDA/AMC approvals and independent construction consultation in Ahmedabad. First consultation free with Patel Sons.",
    longDescription: [
      "Most people buy a plot and build a home once in their life. The decisions are large, the paperwork is unfamiliar and the wrong advice is expensive. Our guidance service exists so you have an experienced builder on your side before money changes hands.",
      "We help you shortlist plots in the right zone, run a title search with our panel advocate, verify NA status and FSI, estimate construction cost before you commit, and review drawings, bills of quantity and quotes from any contractor, including our competitors. If you already have a contractor, we can audit the site at key stages so you know the work matches the agreement.",
    ],
    included: ["Plot shortlisting and locality guidance with price benchmarks", "Title search, 7/12 extract, NA permission and encumbrance check via panel advocate", "FSI, margin and zoning check for your intended building", "AUDA/AMC plan approval coordination with panel architect", "Construction cost estimate and BOQ review", "Contractor quote comparison and agreement review", "Stage-wise site audit with written report (optional)", "Resale and investment guidance for row houses and apartments"],
    faqs: [
      { q: "Is the first consultation really free?", a: "Yes. A 45-minute consultation at our office or on video is free. Legal searches, valuations and site audits are quoted in advance as fixed fees." },
      { q: "Will you advise me even if I build with another contractor?", a: "Yes. Guidance is an independent service. Many clients use us to review a competitor's quote or audit their site, and we report honestly even when it costs us the construction work." },
      { q: "Which areas of Ahmedabad do you cover?", a: "All of Ahmedabad and Gandhinagar district, including Bopal, Shela, Thaltej, Satellite, Gota, Chandkheda, Vastral, Nikol and Sanand." },
    ],
  },
  {
    slug: "building-materials",
    title: "Building Materials Supply",
    short: "Buy cement, steel, bricks, tiles and fittings at contractor rates, delivered to your site.",
    description:
      "The same brands and grades we use on our own projects, supplied to you at the volume rates we negotiate as a builder. Browse the catalogue, add items to your basket and request an order; we confirm price, stock and delivery slot the same day.",
    image: u("1541888946425-d81bb19240f5"),
    points: ["Contractor rates on trusted brands", "Quality-checked, correct grades", "Delivered to your site in Ahmedabad", "Pay on confirmation, no advance online"],
    icon: "truck",
    seoTitle: "Buy Building Materials Online in Ahmedabad | Cement, TMT Steel, Bricks, Tiles",
    seoDescription: "Order quality building materials in Ahmedabad at contractor rates: UltraTech/Ambuja cement, Fe500D TMT steel, bricks, AAC blocks, tiles, sanitaryware, paints. Site delivery by Patel Sons.",
    longDescription: [
      "Material quality decides how a house ages. The wrong cement grade, under-weight steel or porous bricks cannot be fixed with paint later. Because we buy for our own projects in volume, we can supply the same quality-checked materials to individual home builders at rates a single buyer never gets.",
      "Every order is confirmed by a Patel Sons engineer who checks that the grade and quantity match your stage of construction. Payment is on confirmation, by bank transfer or UPI, with delivery to your site anywhere in Ahmedabad.",
    ],
    included: ["Cement (OPC 53, PPC) from UltraTech, Ambuja, ACC", "TMT steel Fe500D in all diameters from Tata Tiscon, JSW, SAIL", "Red bricks, fly-ash bricks and AAC blocks", "River sand, M-sand and aggregates", "Vitrified, ceramic and anti-skid tiles", "Sanitaryware, CPVC/UPVC plumbing and fittings", "Wiring, switches and electrical fittings", "Interior and exterior paints and waterproofing"],
    faqs: [
      { q: "Can I buy materials even if Patel Sons is not building my house?", a: "Yes. The catalogue is open to anyone building in Ahmedabad: homeowners, small contractors and societies." },
      { q: "How do I pay?", a: "After you request an order we confirm the final price, stock and delivery date on call or WhatsApp. You pay by bank transfer or UPI against a proforma invoice. There is no advance payment on the website." },
      { q: "What is the minimum order and delivery time?", a: "Cement and steel are delivered within 48 hours for orders above 50 bags or 1 tonne. Tiles, sanitaryware and fittings take 3 to 7 days depending on stock." },
    ],
  },
];

export interface ContractPackage {
  name: string;
  rate: number; // per sq ft
  tag?: string;
  summary: string;
  inclusions: string[];
}

export const labourPackages: ContractPackage[] = [
  {
    name: "Structure Only",
    rate: 260,
    summary: "Footing to slab: excavation, RCC, masonry and plaster.",
    inclusions: ["Excavation & PCC", "RCC footing, columns, beams, slabs", "Brick / block masonry", "Internal & external plaster", "Site supervisor", "Curing & scaffolding"],
  },
  {
    name: "Structure + Finishing",
    rate: 390,
    tag: "Most popular",
    summary: "Complete civil labour from foundation to final finishing.",
    inclusions: ["Everything in Structure Only", "Flooring & tile laying", "Plumbing & electrical labour", "Waterproofing", "Door & window fixing", "Painting labour"],
  },
];

export const materialPackages: ContractPackage[] = [
  {
    name: "Standard",
    rate: 1750,
    summary: "Solid build with reliable ISI brands.",
    inclusions: ["M20 concrete, Fe500 TMT", "600×600 vitrified tiles", "Flush doors, aluminium windows", "ISI wiring & switches", "CPVC plumbing", "Tractor emulsion paint"],
  },
  {
    name: "Premium",
    rate: 2150,
    tag: "Most popular",
    summary: "Upgraded finishes for a modern family home.",
    inclusions: ["M25 concrete, Fe500D TMT", "800×800 double-charged tiles", "Teak main door, UPVC windows", "Modular switches, AC points", "Jaquar / equivalent fittings", "Royale emulsion paint"],
  },
  {
    name: "Luxury",
    rate: 2650,
    summary: "Designer finishes and complete turnkey handover.",
    inclusions: ["Italian marble flooring", "Modular kitchen with chimney & hob", "Home automation provision", "False ceiling in living & bedrooms", "Premium sanitaryware", "Texture / exterior cladding"],
  },
];

export const process = [
  { step: "01", title: "Site visit & requirement", text: "We visit your plot, understand your needs, budget and timeline." },
  { step: "02", title: "Plan & estimate", text: "Architectural plan, detailed BOQ and a transparent cost estimate." },
  { step: "03", title: "Agreement", text: "Scope, rate, payment stages and timeline locked in a written contract." },
  { step: "04", title: "Construction", text: "Dedicated engineer, weekly reports, quality checks at every stage." },
  { step: "05", title: "Handover", text: "Final inspection, snag list cleared, keys handed over with warranty." },
];

export const testimonials = [
  {
    name: "Rajesh Mehta",
    role: "With-material contract, Thaltej",
    text: "The per sq. ft. rate was fixed on day one and never changed. Weekly photo reports meant I never had to visit the site unannounced. Honest people.",
    rating: 5,
  },
  {
    name: "Priya & Nikhil Shah",
    role: "Homeowners, Sarthak Villas",
    text: "We got our villa two months before the promised date. The finishing quality is exactly what was shown in the sample house.",
    rating: 5,
  },
  {
    name: "Harshad Desai",
    role: "Labour-rate contract, Sanand",
    text: "I wanted to buy my own materials and they respected that. The supervisor was on site every single day and the masonry work is top class.",
    rating: 5,
  },
  {
    name: "Dr. Anjali Patel",
    role: "Apartment owner, Ambika Residency",
    text: "Society formation and OC were done before handover. Zero follow-up needed from our side. Would recommend to anyone.",
    rating: 5,
  },
];
