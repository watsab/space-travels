import type { Address } from '@/models/Address';
import type { Gender } from '@/models/Gender';

export interface Traveler {
  id: number;
  name: string;
  email: string;
  address: Address;
  gender?: Gender;
}
