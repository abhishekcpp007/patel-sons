export interface Guide {
  slug: string;
  title: string;
  material: string;
  category: string; // materials category slug
  summary: string;
  cover: string;
  sections: { h: string; items: string[] }[];
  consumption?: string;
  faqs: { q: string; a: string }[];
}

const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;

export const guides: Guide[] = [
  {
    slug: "cement",
    title: "Cement: OPC vs PPC, how to check a bag, and storage",
    material: "Cement",
    category: "cement",
    summary: "Which grade to use for slabs, masonry and plaster, how to spot stale or adulterated cement on delivery, and how to store bags on site.",
    cover: u("1541888946425-d81bb19240f5"),
    sections: [
      { h: "Which cement where", items: ["OPC 53 for RCC: footings, columns, beams and slabs where early strength matters.", "PPC for masonry, plaster, flooring bed and tiling: slower gain, fewer cracks, better finish.", "Never mix brands or grades in the same pour."] },
      { h: "Check on delivery", items: ["Manufacturing date on the bag: use within 90 days; reject anything older than 6 months.", "Press the bag: lumps mean moisture damage. Reject lumpy bags.", "Rub a pinch between fingers: it should feel smooth, not gritty; colour uniform grey-green.", "Weigh 2 random bags: 50 kg ±1 kg."] },
      { h: "Storage", items: ["Stack on a raised platform or pallets, 30 cm off the floor and away from walls.", "Max 10 bags high, cover with tarpaulin, use oldest stock first.", "Do not store longer than 4 weeks in monsoon."] },
    ],
    consumption: "Approx. 0.4 bags per sq. ft. of built-up area for a standard RCC home (structure + finishing).",
    faqs: [
      { q: "Is 53-grade always better than 43 or PPC?", a: "No. 53-grade gains strength faster and is right for RCC. For plaster and masonry it causes more shrinkage cracks; PPC is better there." },
      { q: "How many bags for one slab?", a: "Roughly 2.2 bags of cement per cubic metre of M25 concrete at a 1:1:2 mix with admixture; a 1,000 sq. ft. 5-inch slab needs about 12 cubic metres, so around 90 to 100 bags including beams." },
    ],
  },
  {
    slug: "tmt-steel",
    title: "TMT steel: Fe500 vs Fe500D vs 550SD, sizes and checking weight",
    material: "TMT Steel",
    category: "steel",
    summary: "Which grade and diameters your home needs, how to verify ISI marking and weight per metre on delivery, and how to store bars to avoid rust.",
    cover: u("1504307651254-35680f356dfd"),
    sections: [
      { h: "Grades", items: ["Fe500D: 'D' means ductile, better for earthquake zones. Ahmedabad is zone III, so insist on Fe500D or 550SD.", "Fe550SD gives higher strength, letting engineers reduce steel in beams and columns.", "Avoid re-rolled or unbranded bars; they fail bend tests."] },
      { h: "Where each size goes", items: ["8 mm: stirrups, slab distribution steel.", "10 and 12 mm: slab main bars, lintels, chajja.", "12 to 16 mm: beams and columns of G+1/G+2 homes.", "20 and 25 mm: columns and footings of buildings above G+3."] },
      { h: "Check on delivery", items: ["Look for the ISI mark, brand name and grade rolled onto every bar.", "Weigh a 1 m sample: 8 mm = 0.395 kg, 10 mm = 0.617, 12 mm = 0.888, 16 mm = 1.58, 20 mm = 2.47. Under-weight bars are under-diameter.", "Bend a bar 180° by hand with a pipe: no cracks on the outer surface.", "We weigh every delivery on a calibrated scale in front of you."] },
      { h: "Storage", items: ["Keep bars on wooden sleepers off the ground, covered from rain.", "Light surface rust is fine; flaky rust that leaves pits must be rejected."] },
    ],
    consumption: "Approx. 3.5 to 4.5 kg of steel per sq. ft. of built-up area for a G+1 RCC home.",
    faqs: [
      { q: "Is more steel always safer?", a: "No. Steel must match the structural drawing. Over-reinforcing wastes money and makes concrete harder to compact, creating honeycombs." },
      { q: "Can I use two brands on the same site?", a: "Yes, if both are the same grade and ISI marked, but keep them in separate stacks and do not mix within one member." },
    ],
  },
  {
    slug: "red-bricks",
    title: "Red clay bricks: quality tests, classes and where they belong",
    material: "Red Bricks",
    category: "bricks-blocks",
    summary: "The ring, drop, water and scratch tests you can do at the truck, and when red bricks still beat blocks.",
    cover: u("1600047509807-ba8f99d2cdde"),
    sections: [
      { h: "Simple tests at delivery", items: ["Ring test: strike two bricks together; a clear metallic ring means well burnt. A dull thud means under-burnt.", "Drop test: drop from 1 m onto hard ground; it should not break.", "Water test: soak 24 hours; weight gain should be under 20%.", "Scratch with a fingernail: no mark should appear.", "Count: we deliver counted stacks; a truck is typically 3,000 to 4,000 bricks."] },
      { h: "Classes", items: ["Class A (table-moulded): sharp edges, uniform colour, 35+ kg/cm². Use for external and load-bearing walls.", "Class B: slight irregularity, 70% of Class A strength. Internal partitions, compound walls.", "Class C: over-burnt or warped. Only for filling and foundations below ground."] },
      { h: "Using them well", items: ["Soak bricks before laying so they do not suck water from mortar.", "Mortar 1:6 for 9-inch walls, 1:4 for 4.5-inch partitions.", "Cure masonry for 7 days."] },
    ],
    consumption: "Approx. 500 bricks per 100 sq. ft. of 9-inch wall; 250 for a 4.5-inch wall.",
    faqs: [
      { q: "Red bricks or AAC blocks for my home?", a: "Red bricks for compound walls, plinth and load-bearing designs; AAC blocks for infill walls in RCC-frame homes where lightness and speed matter. Many homes use both." },
    ],
  },
  {
    slug: "fly-ash-bricks",
    title: "Fly-ash bricks: strength, savings and the right mortar",
    material: "Fly-Ash Bricks",
    category: "bricks-blocks",
    summary: "Why fly-ash bricks are stronger and cheaper than most red bricks, how to check them, and the mistakes that cause cracks.",
    cover: u("1590725140246-20acdee442be"),
    sections: [
      { h: "Why builders use them", items: ["Compressive strength 75 to 100 kg/cm², two to three times a Class A red brick.", "Uniform size and sharp edges: thinner mortar joints, less plaster.", "Lower water absorption (12 to 15%), fewer efflorescence stains.", "About 20% cheaper than good red bricks and eco-friendly (uses power-plant ash)."] },
      { h: "Check on delivery", items: ["ISI mark (IS 12894) on the pallet docket.", "Colour uniform grey; no soft, crumbly corners.", "Break one: dense, no large voids.", "Count per pallet should match the invoice; we count in front of you."] },
      { h: "Avoid these mistakes", items: ["Do not use rich cement mortar; 1:6 is enough. Rich mortar plus a strong brick means cracks in plaster.", "Wet lightly before laying; do not soak like red bricks.", "Provide expansion joints on long walls and use chicken mesh at RCC-masonry junctions."] },
    ],
    consumption: "Approx. 480 bricks per 100 sq. ft. of 9-inch wall.",
    faqs: [
      { q: "Are fly-ash bricks safe for external walls?", a: "Yes. Their low absorption actually performs better in monsoon. Use a good external plaster and waterproof paint as with any wall." },
    ],
  },
  {
    slug: "aac-blocks",
    title: "AAC blocks: lighter walls, faster masonry, cooler rooms",
    material: "AAC Blocks",
    category: "bricks-blocks",
    summary: "When autoclaved aerated concrete blocks make sense, how to lay them with thin-bed adhesive, and how to fix fittings into them.",
    cover: u("1590650153855-d9e808231d41"),
    sections: [
      { h: "Benefits", items: ["One-third the weight of clay brick walls: smaller beams and foundations on taller buildings.", "Thermal insulation keeps rooms 3 to 5 °C cooler in Ahmedabad summers.", "One 600×200×150 block replaces about 7 bricks; masonry is three times faster."] },
      { h: "Laying", items: ["Use AAC block adhesive (thin-bed, 3 mm joints), not conventional mortar, or you lose the insulation and get cracks.", "Start on a 25 mm cement-mortar bed over the plinth or beam.", "Leave a 15 mm gap under beams and fill with compressible material to avoid load cracks.", "Fix chicken mesh at all RCC junctions before plaster; use a 12 mm plaster with polymer-modified mortar."] },
      { h: "Fixing things into AAC", items: ["Use AAC-specific anchors or chemical anchors for heavy items like geysers and kitchen cabinets.", "Chase electrical conduits with a router, not a hammer."] },
    ],
    consumption: "Approx. 8.3 blocks (600×200×150) per sq. m. of wall; 1 m³ = 55 blocks.",
    faqs: [
      { q: "Can AAC be used for load-bearing walls?", a: "Only for single-storey structures with engineer approval. In RCC-frame homes AAC is used as non-load-bearing infill, which is where it excels." },
    ],
  },
  {
    slug: "sand-and-aggregates",
    title: "Sand and aggregates: river vs M-sand, zones and silt tests",
    material: "Sand & Aggregates",
    category: "sand-aggregates",
    summary: "How to check sand for silt and clay with a bottle test, what a brass is, and which aggregate size each job needs.",
    cover: u("1431576901776-e539bd916ba2"),
    sections: [
      { h: "Sand", items: ["River sand (Zone II) for plaster and masonry; M-sand (Zone II, IS 383) for concrete and increasingly for everything as river sand gets scarce.", "Bottle test: fill a bottle one-third with sand, add water, shake, rest 1 hour. Silt layer over 6% of sand height means reject.", "Sea sand or sand with shells is never acceptable."] },
      { h: "Aggregates", items: ["20 mm (kapchi) for footings, columns, beams and slabs.", "10 mm (grit) for thin sections, lintels and PCC under tiles.", "Cubical, hard black-trap stone; flaky or elongated stone weakens concrete."] },
      { h: "Quantity", items: ["1 brass = 100 cubic feet = 2.83 m³. A standard tractor trolley is about 1 brass; a 6-wheel truck about 2.5 brass.", "We measure the trolley body (L×B×H) in front of you; short-filled loads are topped up free."] },
    ],
    consumption: "Approx. 1.2 brass of sand and 1.0 brass of aggregate per 100 sq. ft. of built-up area (whole house).",
    faqs: [
      { q: "Is M-sand as good as river sand?", a: "For concrete, yes or better when properly graded. For plaster, use plaster-grade M-sand or a 50:50 blend to keep workability." },
    ],
  },
  {
    slug: "tiles",
    title: "Tiles: vitrified vs ceramic, sizes, grades and laying tips",
    material: "Tiles & Flooring",
    category: "tiles-flooring",
    summary: "Which tile for which room, how to read grade and batch numbers, how much to order, and how to avoid hollow tiles and lippage.",
    cover: u("1600607687939-ce8a6c25118c"),
    sections: [
      { h: "Choosing", items: ["Double-charged vitrified (600×600, 800×800) for living, bedrooms: hard, polished, 8 to 10 mm thick.", "Glazed vitrified (GVT) for patterns and wood/marble looks.", "Anti-skid ceramic (300×300) for bathrooms, balconies, utility.", "Heavy-duty 16 mm parking tiles for driveways and parking.", "Wall tiles 300×450 or 300×600 for bathroom and kitchen dado."] },
      { h: "Check on delivery", items: ["Same batch/shade number on every box; mixed batches show colour difference.", "'Premium' or 'Standard' grade printed on the box; reject 'Commercial' grade for homes.", "Open 2 boxes: no chips, warped or cracked tiles; lay 4 together flat to check size and flatness."] },
      { h: "Laying", items: ["Order 7 to 10% extra for cutting and future repairs; keep 2 boxes after the job.", "Use tile adhesive on a cured, level base; tap each tile and listen for hollow sound.", "Keep 2 to 3 mm joints and fill with epoxy grout in wet areas.", "Slope bathroom floors 1:100 toward the drain."] },
    ],
    consumption: "Boxes needed = (floor area in sq. ft. ÷ sq. ft. per box) × 1.08.",
    faqs: [
      { q: "Why do some tiles crack after a year?", a: "Usually hollow bedding (no adhesive under part of the tile) or no expansion joint. Full-bed adhesive and joints every 4 m prevent it." },
    ],
  },
  {
    slug: "plumbing-and-sanitary",
    title: "Plumbing & sanitaryware: CPVC vs UPVC, pressure testing and brands",
    material: "Plumbing & Sanitaryware",
    category: "plumbing-sanitary",
    summary: "Which pipe goes where, how to pressure test before closing walls, and how to pick sanitaryware that lasts.",
    cover: u("1600566753086-00f18fb6b3ea"),
    sections: [
      { h: "Pipes", items: ["CPVC (Astral, Ashirvad) for hot and cold supply lines inside walls.", "UPVC SWR (Supreme, Prince) for soil, waste and rain water.", "Use solvent cement from the same brand; dry-fit first, then weld."] },
      { h: "Before closing walls", items: ["Pressure-test supply lines at 7 kg/cm² for 24 hours; mark the gauge reading.", "Water-test drainage lines and floor traps before tiling.", "Photograph every concealed line; you will need the photos when drilling later."] },
      { h: "Sanitaryware", items: ["Wall-hung WCs with concealed cisterns (Jaquar, Hindware, Kohler) save space and are easier to clean.", "Check ISI mark, glaze uniformity and fittings in the box.", "Buy all bathroom items of one brand so finishes match."] },
    ],
    faqs: [
      { q: "Why not GI pipes?", a: "GI corrodes and reduces flow in 10 to 15 years. CPVC is cheaper to install, does not scale and carries hot water safely." },
    ],
  },
  {
    slug: "electrical",
    title: "Electrical: wire sizes, FR vs FRLS, MCB ratings and switch brands",
    material: "Electrical",
    category: "electrical",
    summary: "Which wire gauge each circuit needs, how to read an ISI wire coil, and how to size your distribution board.",
    cover: u("1621905251189-08b45d6a269e"),
    sections: [
      { h: "Wire sizes", items: ["1.0 sq mm: lights and fans.", "1.5 sq mm: light circuits and 6A sockets.", "2.5 sq mm: 16A power sockets, kitchen.", "4 sq mm: AC points, geysers.", "6 sq mm: main line from meter to DB (for a 3 to 5 kW home)."] },
      { h: "Quality", items: ["Buy FR (flame retardant) or FRLS copper wires from Polycab, Finolex, Havells, KEI; check ISI 694 mark and 90 m length printed on the coil.", "Use one colour code throughout: red/yellow/blue phase, black neutral, green earth.", "Earthing: one chemical earth pit per home, tested under 1 ohm."] },
      { h: "Protection", items: ["RCCB 30 mA for the whole house plus MCBs per circuit: 6A lights, 16A sockets, 20A AC, 32A main.", "Modular switches from Legrand, Anchor, Havells; buy plates and modules of the same series."] },
    ],
    faqs: [
      { q: "How many points for a 3 BHK?", a: "Typically 90 to 120 points including lights, fans, sockets, AC and TV; plan the layout before conduits are chased." },
    ],
  },
  {
    slug: "paint-and-waterproofing",
    title: "Paint & waterproofing: primers, coats and stopping the monsoon leaks",
    material: "Paints & Waterproofing",
    category: "paints-waterproofing",
    summary: "The right sequence of putty, primer and emulsion, exterior paint choices for Ahmedabad heat, and terrace waterproofing that lasts.",
    cover: u("1600210492486-724fe5c67fb0"),
    sections: [
      { h: "Interior sequence", items: ["Cure plaster 28 days, then 2 coats of putty, sanding, 1 coat primer, 2 coats emulsion.", "Royale / Velvet Touch for living areas; Tractor Emulsion for budget; washable paint in kids' rooms and kitchen."] },
      { h: "Exterior", items: ["Apex Ultima / WeatherCoat with exterior primer; light colours reflect heat.", "Fill cracks with crack-filler, apply primer within 24 hours of sanding."] },
      { h: "Waterproofing", items: ["Terrace: Dr. Fixit Roofseal or brush-bond coating with 2 coats plus fibre mesh at parapet joints, then a protective screed with slope to the drain.", "Bathrooms: cementitious coating on floor and 300 mm up the wall before tiling.", "Water tanks: food-grade epoxy coating inside."] },
    ],
    consumption: "1 litre of emulsion covers approx. 100 to 120 sq. ft. for 2 coats; 20 L bucket ≈ 1,000 sq. ft. of wall.",
    faqs: [
      { q: "Why does paint peel in the first year?", a: "Almost always moisture: painting before the plaster cured, or a leaking terrace behind the wall. Fix the water first, never the paint." },
    ],
  },
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}
