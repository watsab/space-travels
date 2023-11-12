import { usePilotsManager } from '@/composable/usePilotsManager';
import type { Ship } from '@/models/Ship';
import shipData from '@/data/ships.json';


const getAll = (): Ship[] => {
  const pilots = usePilotsManager().getAll();
  return shipData.map((ship): Ship => {
    return {
      name: ship.name,
      slug: ship.slug,
      pilot: pilots.find(({ id }) => ship.pilotId === id)
    }
  });
}

const getBySlug = (shipSlug: string): Ship | undefined => {
  getAll().find(({ slug }) => slug === shipSlug)
}

export {
  getAll,
  getBySlug,
}
