export interface MaterialCategory {
  slug: string;
  name: string;
  icon: "cement" | "steel" | "brick" | "sand" | "tile" | "plumbing" | "electrical" | "paint" | "door";
  blurb: string;
  seoDescription: string;
}

export interface Material {
  id: string;
  category: MaterialCategory["slug"];
  name: string;
  brand: string;
  spec: string;
  unit: string;
  price: number; // indicative INR per unit
  mrp?: number;
  tag?: "Best seller" | "Recommended" | "Premium" | "Budget";
  minQty: number;
  step: number;
  note?: string;
}

export const materialCategories: MaterialCategory[] = [
  { slug: "cement", name: "Cement", icon: "cement", blurb: "OPC 53 and PPC from the top three brands, fresh stock within 4 weeks of manufacture.", seoDescription: "Buy UltraTech, Ambuja and ACC cement in Ahmedabad at contractor rates with site delivery. OPC 53 grade and PPC, fresh stock, 50 kg bags." },
  { slug: "steel", name: "TMT Steel", icon: "steel", blurb: "Fe500D TMT bars in 8 mm to 25 mm, ISI marked, weighed on delivery.", seoDescription: "Buy Fe500D TMT steel bars in Ahmedabad: Tata Tiscon, JSW Neosteel, SAIL. 8 mm to 25 mm, ISI marked, delivered and weighed at site." },
  { slug: "bricks-blocks", name: "Bricks & Blocks", icon: "brick", blurb: "Table-moulded red bricks, fly-ash bricks and AAC blocks for faster, lighter walls.", seoDescription: "Red bricks, fly-ash bricks and AAC blocks in Ahmedabad at wholesale rates. Delivered by truck to your construction site." },
  { slug: "sand-aggregates", name: "Sand & Aggregates", icon: "sand", blurb: "River sand, M-sand, 10 mm and 20 mm aggregates by the brass.", seoDescription: "River sand, M-sand, grit and 20 mm aggregate delivered in Ahmedabad. Measured per brass, honest quantity." },
  { slug: "tiles-flooring", name: "Tiles & Flooring", icon: "tile", blurb: "Vitrified, ceramic, anti-skid and parking tiles from Kajaria, Somany and Johnson.", seoDescription: "Buy vitrified and ceramic tiles in Ahmedabad at builder rates: Kajaria, Somany, Johnson. 600×600, 800×800, anti-skid and parking tiles." },
  { slug: "plumbing-sanitary", name: "Plumbing & Sanitaryware", icon: "plumbing", blurb: "CPVC and UPVC pipes, fittings, and sanitaryware from Jaquar, Hindware and Cera.", seoDescription: "CPVC/UPVC pipes, Jaquar and Hindware sanitaryware and bathroom fittings in Ahmedabad at contractor rates." },
  { slug: "electrical", name: "Electrical", icon: "electrical", blurb: "FR copper wires, modular switches, MCBs and distribution boards.", seoDescription: "Polycab and Finolex FR wires, Legrand and Anchor modular switches, MCBs and DBs in Ahmedabad at wholesale rates." },
  { slug: "paints-waterproofing", name: "Paints & Waterproofing", icon: "paint", blurb: "Asian Paints and Berger interior, exterior and waterproofing systems.", seoDescription: "Asian Paints, Berger and Dr. Fixit paints, primers and waterproofing in Ahmedabad at builder prices." },
  { slug: "doors-windows", name: "Doors & Windows", icon: "door", blurb: "Flush doors, teak frames and UPVC windows made to your sizes.", seoDescription: "Flush doors, teak door frames and UPVC windows in Ahmedabad made to measure, supplied and installed." },
];

export const materials: Material[] = [
  { id: "cem-ultratech-opc53", category: "cement", name: "UltraTech Cement OPC 53 Grade", brand: "UltraTech", spec: "OPC 53, IS 269, 50 kg bag", unit: "bag", price: 385, mrp: 420, tag: "Best seller", minQty: 50, step: 10, note: "Ideal for RCC: footings, columns, slabs" },
  { id: "cem-ambuja-ppc", category: "cement", name: "Ambuja Cement PPC", brand: "Ambuja", spec: "PPC, IS 1489, 50 kg bag", unit: "bag", price: 365, mrp: 400, tag: "Recommended", minQty: 50, step: 10, note: "Masonry, plaster and flooring" },
  { id: "cem-acc-gold", category: "cement", name: "ACC Gold Water Shield", brand: "ACC", spec: "PPC with water repellent, 50 kg bag", unit: "bag", price: 395, mrp: 430, minQty: 50, step: 10 },
  { id: "stl-tata-8", category: "steel", name: "Tata Tiscon 550SD TMT 8 mm", brand: "Tata Tiscon", spec: "Fe550SD, IS 1786, 12 m length", unit: "tonne", price: 62500, mrp: 66000, tag: "Best seller", minQty: 1, step: 0.5 },
  { id: "stl-tata-12", category: "steel", name: "Tata Tiscon 550SD TMT 12 mm", brand: "Tata Tiscon", spec: "Fe550SD, IS 1786, 12 m length", unit: "tonne", price: 61800, mrp: 65500, minQty: 1, step: 0.5 },
  { id: "stl-jsw-16", category: "steel", name: "JSW Neosteel Fe500D TMT 16 mm", brand: "JSW", spec: "Fe500D, IS 1786, 12 m length", unit: "tonne", price: 60200, mrp: 64000, tag: "Recommended", minQty: 1, step: 0.5 },
  { id: "stl-binding-wire", category: "steel", name: "Binding Wire 18 gauge", brand: "Tata Wiron", spec: "Annealed, 18 SWG, 25 kg coil", unit: "coil", price: 1750, minQty: 2, step: 1 },
  { id: "brk-red", category: "bricks-blocks", name: "Table-Moulded Red Clay Bricks", brand: "Local kiln, Class A", spec: "230×110×75 mm, 35+ kg/cm²", unit: "1,000 nos", price: 7800, tag: "Best seller", minQty: 2, step: 1, note: "Truck load = 3,000 to 4,000 bricks" },
  { id: "brk-flyash", category: "bricks-blocks", name: "Fly-Ash Bricks", brand: "Local, ISI", spec: "230×110×75 mm, 75+ kg/cm²", unit: "1,000 nos", price: 6200, tag: "Budget", minQty: 2, step: 1 },
  { id: "brk-aac", category: "bricks-blocks", name: "AAC Blocks 600×200×150", brand: "Siporex / Magicrete", spec: "Grade 1, 550–650 kg/m³", unit: "m³", price: 3450, tag: "Recommended", minQty: 5, step: 1, note: "Lighter walls, faster masonry, better insulation" },
  { id: "snd-river", category: "sand-aggregates", name: "River Sand (Coarse)", brand: "Sabarmati basin", spec: "Zone II, washed", unit: "brass", price: 4200, minQty: 1, step: 1, note: "1 brass = 100 cu. ft." },
  { id: "snd-msand", category: "sand-aggregates", name: "M-Sand (Manufactured)", brand: "Crusher grade", spec: "Zone II, IS 383", unit: "brass", price: 3300, tag: "Budget", minQty: 1, step: 1 },
  { id: "agg-20", category: "sand-aggregates", name: "Aggregate 20 mm (Kapchi)", brand: "Black trap", spec: "IS 383, cubical", unit: "brass", price: 3100, tag: "Best seller", minQty: 1, step: 1 },
  { id: "agg-10", category: "sand-aggregates", name: "Aggregate 10 mm (Grit)", brand: "Black trap", spec: "IS 383", unit: "brass", price: 3300, minQty: 1, step: 1 },
  { id: "til-kajaria-800", category: "tiles-flooring", name: "Kajaria Double-Charged Vitrified 800×800", brand: "Kajaria", spec: "Polished, 4 pcs/box = 2.56 m²", unit: "box", price: 1420, mrp: 1750, tag: "Best seller", minQty: 20, step: 5 },
  { id: "til-somany-600", category: "tiles-flooring", name: "Somany Glazed Vitrified 600×600", brand: "Somany", spec: "Matt, 4 pcs/box = 1.44 m²", unit: "box", price: 680, mrp: 850, tag: "Budget", minQty: 20, step: 5 },
  { id: "til-antiskid", category: "tiles-flooring", name: "Johnson Anti-Skid Ceramic 300×300", brand: "Johnson", spec: "Bathroom & balcony, 9 pcs/box", unit: "box", price: 390, minQty: 20, step: 5 },
  { id: "til-parking", category: "tiles-flooring", name: "Heavy-Duty Parking Tile 400×400", brand: "Kajaria", spec: "16 mm thick, 5 pcs/box", unit: "box", price: 560, minQty: 20, step: 5 },
  { id: "plb-cpvc", category: "plumbing-sanitary", name: "Astral CPVC Pipe 3/4\" SDR 11", brand: "Astral", spec: "Hot & cold water, 3 m length", unit: "length", price: 310, minQty: 10, step: 5 },
  { id: "plb-upvc", category: "plumbing-sanitary", name: "Supreme UPVC SWR Pipe 110 mm", brand: "Supreme", spec: "Type B, 3 m length", unit: "length", price: 720, minQty: 5, step: 1 },
  { id: "san-jaquar-wc", category: "plumbing-sanitary", name: "Jaquar Wall-Hung WC with Seat", brand: "Jaquar", spec: "Continental series, rimless", unit: "pc", price: 9800, mrp: 12500, tag: "Premium", minQty: 1, step: 1 },
  { id: "san-hindware-basin", category: "plumbing-sanitary", name: "Hindware Counter-Top Basin", brand: "Hindware", spec: "Ceramic, 500 mm", unit: "pc", price: 2900, mrp: 3600, minQty: 1, step: 1 },
  { id: "ele-polycab-1.5", category: "electrical", name: "Polycab FR Copper Wire 1.5 sq mm", brand: "Polycab", spec: "ISI, 90 m coil", unit: "coil", price: 1680, mrp: 2100, tag: "Best seller", minQty: 2, step: 1 },
  { id: "ele-polycab-2.5", category: "electrical", name: "Polycab FR Copper Wire 2.5 sq mm", brand: "Polycab", spec: "ISI, 90 m coil", unit: "coil", price: 2650, mrp: 3300, minQty: 2, step: 1 },
  { id: "ele-legrand-switch", category: "electrical", name: "Legrand Myrius Modular Switch 6A", brand: "Legrand", spec: "1-way, white", unit: "pc", price: 68, minQty: 20, step: 10 },
  { id: "ele-mcb", category: "electrical", name: "Havells MCB 32A SP C-curve", brand: "Havells", spec: "10 kA", unit: "pc", price: 310, minQty: 4, step: 1 },
  { id: "pnt-royale", category: "paints-waterproofing", name: "Asian Paints Royale Luxury Emulsion", brand: "Asian Paints", spec: "Interior, 20 L", unit: "bucket", price: 7400, mrp: 8900, tag: "Premium", minQty: 1, step: 1 },
  { id: "pnt-apex", category: "paints-waterproofing", name: "Asian Paints Apex Ultima Exterior", brand: "Asian Paints", spec: "Exterior, 20 L", unit: "bucket", price: 6900, mrp: 8200, tag: "Recommended", minQty: 1, step: 1 },
  { id: "pnt-tractor", category: "paints-waterproofing", name: "Asian Paints Tractor Emulsion", brand: "Asian Paints", spec: "Interior, 20 L", unit: "bucket", price: 2950, mrp: 3500, tag: "Budget", minQty: 1, step: 1 },
  { id: "wpf-drfixit", category: "paints-waterproofing", name: "Dr. Fixit Roofseal Waterproofing", brand: "Dr. Fixit", spec: "Terrace coating, 20 L", unit: "bucket", price: 5600, minQty: 1, step: 1 },
  { id: "dor-flush", category: "doors-windows", name: "Flush Door 32 mm, BWP Grade", brand: "Century / Greenply", spec: "Water-proof, made to size", unit: "pc", price: 3200, minQty: 1, step: 1 },
  { id: "dor-teak-frame", category: "doors-windows", name: "Teak Wood Door Frame 4×3\"", brand: "Burma teak", spec: "Seasoned, 7×3.5 ft", unit: "set", price: 9800, tag: "Premium", minQty: 1, step: 1 },
  { id: "win-upvc", category: "doors-windows", name: "UPVC Sliding Window (2-track)", brand: "Fenesta / LG Hausys", spec: "5 mm toughened glass, per sq. ft.", unit: "sq. ft.", price: 720, minQty: 10, step: 1 },
];

export function materialsIn(category: string) {
  return materials.filter((m) => m.category === category);
}
export function getCategory(slug: string) {
  return materialCategories.find((c) => c.slug === slug);
}
