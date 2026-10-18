export interface Area {
  slug: string;
  name: string;
  zone: string;
  intro: string;
  why: string;
  landmarks: string[];
  projectSlugs: string[];
  popular: ("row-house-development" | "residential-buildings" | "labour-rate-contract" | "with-material-contract")[];
  plotRate: string;
  faqs: { q: string; a: string }[];
}

const faq = (name: string): { q: string; a: string }[] => [
  {
    q: `What does house construction cost per sq. ft. in ${name}?`,
    a: `In ${name}, Patel Sons with-material (turnkey) packages start at ₹1,750 per sq. ft. for Standard, ₹2,150 for Premium and ₹2,650 for Luxury finishes. Labour-only contracts start at ₹260 per sq. ft. Final cost depends on your plan, soil condition and finishing choices.`,
  },
  {
    q: `Do you take labour-rate contracts in ${name}?`,
    a: `Yes. For labour-rate contracts in ${name} you purchase the materials and Patel Sons supplies masons, carpenters, bar-benders, plumbers, electricians and a full-time site supervisor, billed per sq. ft. of built-up area.`,
  },
  {
    q: `How soon can you start a project in ${name}?`,
    a: `After a free site visit in ${name} we share a plan and estimate within a week. Construction typically starts 3 to 6 weeks after the agreement, once drawings and approvals are in place.`,
  },
];

export const areas: Area[] = [
  {
    slug: "bopal",
    name: "Bopal",
    zone: "West Ahmedabad",
    intro: "Bopal is one of Ahmedabad's fastest-growing residential belts, with wide roads, schools, hospitals and quick access to SG Highway and SP Ring Road.",
    why: "Plots in Bopal and South Bopal are in high demand for independent bungalows and row houses. Our team has built across the belt and knows the soil, the AUDA approval process and the local material suppliers.",
    landmarks: ["SG Highway", "SP Ring Road", "Bopal Lake", "DPS Bopal"],
    projectSlugs: ["shivalik-greens"],
    popular: ["row-house-development", "with-material-contract"],
    plotRate: "₹35,000 – ₹55,000 per sq. yd.",
    faqs: faq("Bopal"),
  },
  {
    slug: "south-bopal",
    name: "South Bopal",
    zone: "West Ahmedabad",
    intro: "South Bopal has become the preferred address for families who want gated row house communities close to the city but away from the traffic.",
    why: "Our ongoing project Shivalik Greens is in South Bopal, so our engineers are on site in the area every day. We also take private contracts for bungalows on plots across the locality.",
    landmarks: ["Shivalik Greens", "South Bopal Garden", "Sobo Centre", "Ambli Road"],
    projectSlugs: ["shivalik-greens"],
    popular: ["row-house-development", "with-material-contract"],
    plotRate: "₹30,000 – ₹48,000 per sq. yd.",
    faqs: faq("South Bopal"),
  },
  {
    slug: "shela",
    name: "Shela",
    zone: "West Ahmedabad",
    intro: "Shela is known for its villa communities, quiet lanes and green surroundings, with Bopal and the SG Highway only minutes away.",
    why: "We delivered Sarthak Villas in Shela two months ahead of schedule. The community is fully occupied, and many of our private contract clients in Shela come from referrals there.",
    landmarks: ["Sarthak Villas", "Shela Lake", "Applewoods Township", "Ghuma Road"],
    projectSlugs: ["sarthak-villas"],
    popular: ["row-house-development", "labour-rate-contract", "with-material-contract"],
    plotRate: "₹28,000 – ₹45,000 per sq. yd.",
    faqs: faq("Shela"),
  },
  {
    slug: "thaltej",
    name: "Thaltej",
    zone: "West Ahmedabad",
    intro: "Thaltej is an established premium neighbourhood with large plots, tree-lined roads and some of the city's best-known bungalows.",
    why: "Premium bungalow construction is our speciality in Thaltej. The Mehta Bungalow, a 4,200 sq. ft. with-material contract, is currently under construction here with weekly photo reports to the owner.",
    landmarks: ["Thaltej Cross Roads", "Drive-In Road", "Zydus Hospital", "Thaltej Lake"],
    projectSlugs: ["mehta-bungalow"],
    popular: ["with-material-contract", "labour-rate-contract"],
    plotRate: "₹60,000 – ₹1,00,000 per sq. yd.",
    faqs: faq("Thaltej"),
  },
  {
    slug: "vastral",
    name: "Vastral",
    zone: "East Ahmedabad",
    intro: "Vastral is an affordable, well-connected eastern suburb with a metro station, making it popular with first-time apartment buyers.",
    why: "Patel Heights, our 14-storey apartment tower, is coming up in Vastral 600 metres from the metro. We also build small apartment buildings and row houses for landowners in the area.",
    landmarks: ["Vastral Metro Station", "Vastral Lake", "Nikol Road", "Odhav Ring Road"],
    projectSlugs: ["patel-heights"],
    popular: ["residential-buildings", "with-material-contract"],
    plotRate: "₹12,000 – ₹22,000 per sq. yd.",
    faqs: faq("Vastral"),
  },
  {
    slug: "nikol",
    name: "Nikol",
    zone: "East Ahmedabad",
    intro: "Nikol is a dense, family-oriented suburb in East Ahmedabad with good schools, markets and an active housing society culture.",
    why: "Ambika Residency, a 56-flat building, was handed over in Nikol with full occupation certificate and society formation complete. We regularly build G+2 and G+3 buildings for landowners here.",
    landmarks: ["Nikol Gam", "Ambika Residency", "Nikol Lake Garden", "Naroda Road"],
    projectSlugs: ["ambika-residency"],
    popular: ["residential-buildings", "labour-rate-contract"],
    plotRate: "₹10,000 – ₹20,000 per sq. yd.",
    faqs: faq("Nikol"),
  },
  {
    slug: "sanand",
    name: "Sanand",
    zone: "Ahmedabad outskirts",
    intro: "Sanand, on the industrial corridor west of the city, is where families build weekend farmhouses and investors buy large plots.",
    why: "Farmhouse construction with pools, lawns and boundary walls is a growing part of our work in Sanand. The Desai Farmhouse labour-rate contract starts in early 2027.",
    landmarks: ["Sanand GIDC", "Tata Nano Plant", "Nal Sarovar Road", "Sanand Chokdi"],
    projectSlugs: ["desai-farmhouse"],
    popular: ["labour-rate-contract", "with-material-contract"],
    plotRate: "₹4,000 – ₹9,000 per sq. yd.",
    faqs: faq("Sanand"),
  },
  {
    slug: "gota",
    name: "Gota",
    zone: "North-West Ahmedabad",
    intro: "Gota offers mid-budget plots and apartments along SG Highway, with new schools and hospitals arriving every year.",
    why: "We build G+1 and G+2 homes and small apartment buildings for landowners in Gota and Chandlodia, with Standard and Premium packages that fit mid-range budgets.",
    landmarks: ["Gota Cross Roads", "SG Highway", "Vaishnodevi Circle", "Science City"],
    projectSlugs: [],
    popular: ["with-material-contract", "residential-buildings"],
    plotRate: "₹18,000 – ₹32,000 per sq. yd.",
    faqs: faq("Gota"),
  },
  {
    slug: "satellite",
    name: "Satellite",
    zone: "West Ahmedabad",
    intro: "Satellite is a mature, central neighbourhood where older bungalows are being rebuilt into modern homes and boutique apartment buildings.",
    why: "Demolish-and-rebuild projects on existing plots are common in Satellite. We handle demolition, new structure and finishing under one with-material contract with a fixed rate.",
    landmarks: ["Prahladnagar", "Jodhpur Cross Roads", "Shyamal Cross Roads", "Iscon Mall"],
    projectSlugs: [],
    popular: ["with-material-contract", "residential-buildings"],
    plotRate: "₹70,000 – ₹1,20,000 per sq. yd.",
    faqs: faq("Satellite"),
  },
  {
    slug: "chandkheda",
    name: "Chandkheda",
    zone: "North Ahmedabad",
    intro: "Chandkheda, near Gandhinagar and the IIT campus, is a fast-growing northern suburb popular with working professionals.",
    why: "Our with-material packages are popular with Chandkheda plot owners who work in Gandhinagar and want a turnkey build with weekly WhatsApp progress reports instead of daily site visits.",
    landmarks: ["IIT Gandhinagar", "Chandkheda Gam", "Sabarmati Riverfront", "Visat Circle"],
    projectSlugs: [],
    popular: ["with-material-contract", "labour-rate-contract"],
    plotRate: "₹15,000 – ₹28,000 per sq. yd.",
    faqs: faq("Chandkheda"),
  },
];

export function getArea(slug: string) {
  return areas.find((a) => a.slug === slug);
}
