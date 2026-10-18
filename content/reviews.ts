export interface Review {
  id: string;
  name: string;
  rating: number; // 1-5
  product?: string;
  category?: string;
  text: string;
  date: string;
  verified: boolean;
  approved: boolean;
}

/** Seed reviews shown until real ones arrive (placeholders). */
export const seedReviews: Review[] = [
  { id: "seed-1", name: "Mukesh Prajapati", rating: 5, product: "Tata Tiscon 550SD TMT", category: "steel", text: "Steel was weighed in front of me on their scale, bar by bar. Exact quantity, ISI marked, delivered next morning.", date: "2026-09-21", verified: true, approved: true },
  { id: "seed-2", name: "Falguni Shah", rating: 5, product: "UltraTech OPC 53", category: "cement", text: "Fresh bags, manufacturing date within 3 weeks. Cheaper than my local dealer by ₹30 a bag.", date: "2026-09-12", verified: true, approved: true },
  { id: "seed-3", name: "Imran Sheikh", rating: 4, product: "Fly-ash bricks", category: "bricks-blocks", text: "Good uniform bricks, counted properly. Delivery was two hours late but they called ahead and waived the delivery charge.", date: "2026-08-30", verified: true, approved: true },
  { id: "seed-4", name: "Bhavna Trivedi", rating: 5, product: "Kajaria 800×800 vitrified", category: "tiles-flooring", text: "All boxes same batch number. Two cracked tiles in one box replaced the same day with no questions.", date: "2026-08-14", verified: true, approved: true },
];
