export const RATE_CARD_MONTH = "November 2026";

export interface StructureRate {
  name: string;
  rate: number;
  unit: string;
  tag?: string;
  summary: string;
  inclusions: string[];
}

export const structureRates: StructureRate[] = [
  {
    name: "RCC Labour",
    rate: 220,
    unit: "sq. ft. built-up",
    summary: "You buy the material. We cast columns, beams, slabs and stairs.",
    inclusions: ["Bar bending and tying", "Shuttering with our plates and props", "Casting, vibrating and curing", "Full-time site supervisor"],
  },
  {
    name: "Grey Structure With Material",
    rate: 965,
    unit: "sq. ft. built-up",
    tag: "Most asked",
    summary: "Plinth to slab in M20 concrete, with brick walls, at one fixed rate.",
    inclusions: ["M20 concrete mixed 1:1.5:3", "Fe 550D TMT saria", "9\" outer walls, 4½\" inner walls", "First class bricks", "Lintel band on every wall", "Cube test on every pour"],
  },
  {
    name: "Brickwork Labour",
    rate: 1200,
    unit: "cubic metre",
    summary: "Masons and helpers for walls in your own bricks and mortar.",
    inclusions: ["Soaked bricks, full mortar joints", "Walls tied into columns", "Plumb and level checked daily", "Seven days of curing"],
  },
  {
    name: "Plaster With Material",
    rate: 42,
    unit: "sq. ft. of wall",
    summary: "Inside and outside plaster in 1:4 mortar, cement and sand included.",
    inclusions: ["12 mm inside, 20 mm outside in two coats", "Ceiling plaster included", "Corners and edges in line", "Seven days of curing"],
  },
];

export interface CostingLine {
  material: string;
  qty: string;
  amount: number;
}

export interface CostingPart {
  title: string;
  covers: string;
  lines: CostingLine[];
}

export const sampleHouse = {
  plot: "25' × 75'",
  builtUp: 1470,
  allowancePct: 5,
  parts: [
    {
      title: "Up to plinth beam",
      covers: "PCC bed, 20 footings, columns, 9\" brick wall, 4' soil fill and plinth beam",
      lines: [
        { material: "Cement", qty: "239 bags", amount: 92015 },
        { material: "TMT saria and binding wire", qty: "1,725 kg", amount: 109005 },
        { material: "Morang and gitti", qty: "1,703 cft", amount: 95303 },
        { material: "Bricks", qty: "18,700 nos", amount: 168300 },
        { material: "Filling soil", qty: "9,000 cft", amount: 126000 },
      ],
    },
    {
      title: "Plinth beam to slab",
      covers: "Columns, roof beams, 5\" slab, stair, brick walls and Malaysian sakhu frames",
      lines: [
        { material: "Cement", qty: "312 bags", amount: 120120 },
        { material: "TMT saria and binding wire", qty: "3,451 kg", amount: 218095 },
        { material: "Morang and gitti", qty: "1,755 cft", amount: 98267 },
        { material: "Bricks", qty: "21,300 nos", amount: 191700 },
        { material: "Door and window frames with fittings", qty: "33 cft", amount: 58500 },
      ],
    },
    {
      title: "Plaster",
      covers: "5,135 sq. ft. inside and 1,175 sq. ft. outside",
      lines: [
        { material: "Cement", qty: "79 bags", amount: 30415 },
        { material: "Plaster sand", qty: "387 cft", amount: 17415 },
      ],
    },
  ] satisfies CostingPart[],
};

export const marketRates = [
  { item: "Cement, PPC", rate: "₹385 per bag" },
  { item: "TMT saria, Fe 550D", rate: "₹63 per kg" },
  { item: "Morang", rate: "₹57 per cft" },
  { item: "Gitti, 20 mm", rate: "₹55 per cft" },
  { item: "Bricks, first class", rate: "₹9 each" },
  { item: "Malaysian sakhu", rate: "₹1,500 per cft" },
];

export const rateFaqs = [
  {
    q: "What does grey structure mean?",
    a: "It's the bare frame of the house: columns, beams, slabs, stairs and brick walls. Plaster, flooring, wiring and paint come after and are priced apart.",
  },
  {
    q: "Is the foundation inside the ₹965 rate?",
    a: "No. That rate runs from plinth beam to slab. The foundation depends on your soil and plot level, so we price it after a site visit.",
  },
  {
    q: "Why do you build in M20 and not a leaner mix?",
    a: "M20 is the lowest grade the Indian code allows for RCC. We mix 1 bag of cement to 1.5 boxes of morang and 3 boxes of gitti, and we test cubes from every pour.",
  },
  {
    q: "How long do these rates hold?",
    a: "They follow Lucknow market prices for the month shown. Once you sign, your rate is locked for the full job.",
  },
];
