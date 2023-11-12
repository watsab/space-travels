import type { Pilot } from '@/models/Pilot';
import pilotData from '@/data/pilots.json';

const getAll = (): Pilot[] => {
  return pilotData.map((pilot: Pilot): Pilot => {
    return {
      ...pilot,
      picturePath: new URL(`../assets/pilots/${pilot.picturePath}`, import.meta.url).toString()
    }
  });
}

const getById = (pilotId: number): Pilot | undefined => getAll().find(({ id }) => id === pilotId);

export {
  getAll,
  getById
}
