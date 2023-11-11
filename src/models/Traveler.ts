import type { Person } from '@/models/Person';
import type { Gender } from '@/models/Gender';

export interface Traveler extends Person {
  birthdate: Date;
  gender: Gender;
}
