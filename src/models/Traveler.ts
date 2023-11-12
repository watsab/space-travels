import type { Address } from '@/models/Address';

export interface Traveler {
  id: number;
  name: string;
  email: string;
  address: Address
}
