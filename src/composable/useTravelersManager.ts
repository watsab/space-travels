import travelersData from "@/data/travelers.json";
import type { Traveler } from '@/models/Traveler';

export const useTravelersManager = () => {
  const travelers: Traveler[] = travelersData.map((traveler: {id: number, lastname: string, firstname: string, birthdate: string}): Traveler => ({
    ...traveler,
    birthdate: new Date(traveler.birthdate)
  }));

  return {
    getAll: (): Traveler[] => travelers,
    getById: (travelerId: number): Traveler | undefined => travelers.find(({ id }) => id === travelerId),
  }
}
