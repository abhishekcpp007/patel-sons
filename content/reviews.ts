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

export const seedReviews: Review[] = [];
