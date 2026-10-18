export type ProjectStatus = "ongoing" | "completed" | "upcoming";
export type ProjectType = "row-house" | "building" | "contract";

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  type: ProjectType;
  status: ProjectStatus;
  location: string;
  city: string;
  cover: string;
  gallery: string[];
  units: string;
  sizes: string;
  priceFrom?: number;
  priceLabel?: string;
  progress: number; // 0-100
  startDate: string;
  completionDate: string;
  rera?: string;
  description: string;
  highlights: string[];
  amenities: string[];
  specifications: { label: string; value: string }[];
  mapQuery: string;
}

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const projects: Project[] = [
  {
    slug: "shivalik-greens",
    name: "Shivalik Greens",
    tagline: "Premium 3 & 4 BHK row houses in a gated community",
    type: "row-house",
    status: "ongoing",
    location: "South Bopal",
    city: "Ahmedabad",
    cover: u("1600585154340-be6161a56a0c"),
    gallery: [
      u("1600585154340-be6161a56a0c"),
      u("1600566753086-00f18fb6b3ea"),
      u("1600607687939-ce8a6c25118c"),
      u("1605146769289-440113cc3d00"),
      u("1592595896551-12b371d546d5"),
      u("1512917774080-9991f1c4c750"),
    ],
    units: "48 row houses",
    sizes: "2,100 – 2,850 sq. ft.",
    priceFrom: 1_45_00_000,
    progress: 62,
    startDate: "Jan 2025",
    completionDate: "Dec 2026",
    rera: "GJ/AHM/2025/DUMMY-0142",
    description:
      "Shivalik Greens is a gated row house community of 48 independent homes with private gardens, terrace decks and a central clubhouse. Every home is designed around natural light, cross-ventilation and a double-height living space.",
    highlights: ["Private garden & terrace", "Vastu-compliant layouts", "Double-height living room", "Gated with 24×7 security"],
    amenities: ["Clubhouse & gym", "Swimming pool", "Children's play area", "Landscaped gardens", "Jogging track", "Power backup", "Rainwater harvesting", "EV charging points"],
    specifications: [
      { label: "Structure", value: "RCC frame, earthquake-resistant design" },
      { label: "Flooring", value: "800×800 double-charged vitrified tiles" },
      { label: "Kitchen", value: "Granite platform, SS sink, dado tiles up to 2 ft" },
      { label: "Doors & windows", value: "Teak wood main door, UPVC windows" },
      { label: "Electrical", value: "Concealed copper wiring, modular switches" },
      { label: "Plumbing", value: "CPVC piping, Jaquar / equivalent fittings" },
    ],
    mapQuery: "South Bopal, Ahmedabad",
  },
  {
    slug: "patel-heights",
    name: "Patel Heights",
    tagline: "14-storey residential tower with 2 & 3 BHK apartments",
    type: "building",
    status: "ongoing",
    location: "Vastral",
    city: "Ahmedabad",
    cover: u("1545324418-cc1a3fa10c00"),
    gallery: [
      u("1545324418-cc1a3fa10c00"),
      u("1574362848149-11496d93a7c7"),
      u("1567684014761-b65e2e59b9eb"),
      u("1541888946425-d81bb19240f5"),
      u("1590725140246-20acdee442be"),
      u("1431576901776-e539bd916ba2"),
    ],
    units: "112 apartments",
    sizes: "1,150 – 1,680 sq. ft.",
    priceFrom: 58_00_000,
    progress: 38,
    startDate: "Jun 2025",
    completionDate: "Mar 2027",
    rera: "GJ/AHM/2025/DUMMY-0198",
    description:
      "Patel Heights brings well-planned 2 and 3 BHK apartments with 3-side open layouts, two high-speed lifts per wing and a rooftop lounge. Located minutes from the metro, schools and hospitals.",
    highlights: ["3-side open apartments", "Rooftop lounge & garden", "2 lifts per wing", "Metro at 600 m"],
    amenities: ["Rooftop lounge", "Gym & yoga deck", "Indoor games", "Multipurpose hall", "Covered parking", "CCTV surveillance", "Intercom", "Fire safety system"],
    specifications: [
      { label: "Structure", value: "RCC shear-wall structure" },
      { label: "Flooring", value: "600×600 vitrified tiles, anti-skid in wet areas" },
      { label: "Kitchen", value: "Granite platform with SS sink" },
      { label: "Doors & windows", value: "Laminated flush doors, aluminium sliding windows" },
      { label: "Electrical", value: "Concealed ISI wiring, AC points in all bedrooms" },
      { label: "Lifts", value: "2 automatic lifts per wing" },
    ],
    mapQuery: "Vastral, Ahmedabad",
  },
  {
    slug: "sarthak-villas",
    name: "Sarthak Villas",
    tagline: "Completed row house enclave of 32 luxury villas",
    type: "row-house",
    status: "completed",
    location: "Shela",
    city: "Ahmedabad",
    cover: u("1568605114967-8130f3a36994"),
    gallery: [
      u("1568605114967-8130f3a36994"),
      u("1564013799919-ab600027ffc6"),
      u("1600047509807-ba8f99d2cdde"),
      u("1613490493576-7fde63acd811"),
      u("1580587771525-78b9dba3b914"),
      u("1555636222-cae831e670b3"),
    ],
    units: "32 villas",
    sizes: "2,400 – 3,200 sq. ft.",
    priceLabel: "Sold out",
    progress: 100,
    startDate: "Mar 2022",
    completionDate: "Aug 2024",
    rera: "GJ/AHM/2022/DUMMY-0077",
    description:
      "Sarthak Villas was delivered two months ahead of schedule. 32 independent villas with Italian marble flooring, home automation provision and a private clubhouse. Fully occupied community today.",
    highlights: ["Delivered 2 months early", "Italian marble flooring", "Home automation ready", "Fully occupied"],
    amenities: ["Private clubhouse", "Swimming pool", "Gym", "Garden & gazebo", "Solar street lighting", "Gated security"],
    specifications: [
      { label: "Structure", value: "RCC frame structure" },
      { label: "Flooring", value: "Italian marble in living, wooden in master bedroom" },
      { label: "Kitchen", value: "Modular kitchen with chimney & hob" },
      { label: "Doors & windows", value: "Teak wood doors, UPVC glazing" },
    ],
    mapQuery: "Shela, Ahmedabad",
  },
  {
    slug: "ambika-residency",
    name: "Ambika Residency",
    tagline: "Completed 7-storey building with 56 compact 2 BHK flats",
    type: "building",
    status: "completed",
    location: "Nikol",
    city: "Ahmedabad",
    cover: u("1515263487990-61b07816b324"),
    gallery: [
      u("1515263487990-61b07816b324"),
      u("1574362848149-11496d93a7c7"),
      u("1600607687939-ce8a6c25118c"),
      u("1600566753086-00f18fb6b3ea"),
    ],
    units: "56 apartments",
    sizes: "980 – 1,120 sq. ft.",
    priceLabel: "Sold out",
    progress: 100,
    startDate: "Oct 2021",
    completionDate: "Jan 2024",
    rera: "GJ/AHM/2021/DUMMY-0031",
    description:
      "An affordable yet well-finished 2 BHK building with wide passages, ample parking and a terrace garden. Handed over with full OC and society formation complete.",
    highlights: ["Handed over with OC", "Terrace garden", "Ample 2-wheeler & car parking", "Society formed at handover"],
    amenities: ["Terrace garden", "Children's play area", "Lift", "Power backup for common areas", "CCTV"],
    specifications: [
      { label: "Structure", value: "RCC frame structure" },
      { label: "Flooring", value: "600×600 vitrified tiles" },
      { label: "Kitchen", value: "Granite platform, SS sink" },
    ],
    mapQuery: "Nikol, Ahmedabad",
  },
  {
    slug: "mehta-bungalow",
    name: "Mehta Bungalow",
    tagline: "Private with-material contract: 4,200 sq. ft. bungalow",
    type: "contract",
    status: "ongoing",
    location: "Thaltej",
    city: "Ahmedabad",
    cover: u("1580587771525-78b9dba3b914"),
    gallery: [
      u("1580587771525-78b9dba3b914"),
      u("1600210492486-724fe5c67fb0"),
      u("1504307651254-35680f356dfd"),
      u("1581094794329-c8112a89af12"),
      u("1541888946425-d81bb19240f5"),
      u("1600596542815-ffad4c1539a9"),
    ],
    units: "1 private bungalow",
    sizes: "4,200 sq. ft. on 500 sq. yd. plot",
    priceLabel: "With-material contract",
    progress: 74,
    startDate: "Nov 2024",
    completionDate: "Feb 2026",
    description:
      "A turnkey with-material contract for a family bungalow. Patel Sons is handling everything from structure to finishing, with weekly site reports and a fixed per-sq-ft price locked at signing.",
    highlights: ["Fixed price locked at signing", "Weekly photo reports", "Premium material package", "Dedicated site engineer"],
    amenities: ["Home theatre", "Puja room", "Home office", "Terrace garden", "Solar rooftop"],
    specifications: [
      { label: "Contract type", value: "With material (turnkey)" },
      { label: "Package", value: "Premium" },
      { label: "Structure", value: "RCC frame, M25 grade concrete, Fe500D TMT" },
      { label: "Finishing", value: "Italian marble, teak doors, modular kitchen" },
    ],
    mapQuery: "Thaltej, Ahmedabad",
  },
  {
    slug: "desai-farmhouse",
    name: "Desai Farmhouse",
    tagline: "Labour-rate contract: weekend farmhouse with pool",
    type: "contract",
    status: "upcoming",
    location: "Sanand",
    city: "Ahmedabad",
    cover: u("1600047509807-ba8f99d2cdde"),
    gallery: [
      u("1600047509807-ba8f99d2cdde"),
      u("1613490493576-7fde63acd811"),
      u("1517581177682-a085bb7ffb15"),
      u("1621905251189-08b45d6a269e"),
    ],
    units: "1 farmhouse",
    sizes: "3,000 sq. ft. built-up",
    priceLabel: "Labour-rate contract",
    progress: 0,
    startDate: "Jan 2027",
    completionDate: "Oct 2027",
    description:
      "A labour-rate contract where the client procures materials and Patel Sons supplies skilled manpower, supervision and site management. Includes pool structure, landscaping civil work and boundary wall.",
    highlights: ["Client-sourced materials", "Transparent labour billing", "Skilled supervisors", "Pool & landscaping civil work"],
    amenities: ["Swimming pool", "Open lawn", "Gazebo", "Boundary wall", "Bore well"],
    specifications: [
      { label: "Contract type", value: "Labour rate" },
      { label: "Scope", value: "Structure, masonry, plaster, flooring, waterproofing" },
      { label: "Supervision", value: "Full-time site supervisor + weekly engineer visit" },
    ],
    mapQuery: "Sanand, Gujarat",
  },
];

export const statusLabel: Record<ProjectStatus, string> = {
  ongoing: "Ongoing",
  completed: "Completed",
  upcoming: "Upcoming",
};

export const typeLabel: Record<ProjectType, string> = {
  "row-house": "Row Houses",
  building: "Apartment Building",
  contract: "Private Contract",
};

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
