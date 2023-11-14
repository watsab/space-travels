import type { Pilot } from '@/models/Pilot';

export interface Ship {
  name: string;
  slug: string;
  price: number;
  pilot?: Pilot;
}
