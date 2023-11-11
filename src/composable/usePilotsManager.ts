import pilotData from "@/data/pilots.json";
import type { Pilot } from '@/models/Pilot';

export const usePilotsManager = () => {
  const pilots: Pilot[] = pilotData.map((pilot: Pilot): Pilot => {
    return {
      ...pilot,
      picturePath: new URL(`../assets/pilots/${pilot.picturePath}`, import.meta.url).toString()
    }
  });

  return {
    getAll: (): Pilot[] => pilots,
    getById: (pilotId: number): Pilot | undefined => pilots.find(({ id }) => id === pilotId),
  }
}
