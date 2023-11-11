import type { Ship } from '@/models/Ship';
import shipData from '@/data/ships.json';
import { usePilotsManager } from '@/composable/usePilotsManager';

export const useShipsManager = () => {
  const pilots = usePilotsManager().getAll();
  const ships: Ship[] = shipData.map((ship): Ship => {
    return {
      name: ship.name,
      slug: ship.slug,
      pilot: pilots.find(({ id }) => ship.pilotId === id)
    }
  });

  return {
    getAll: (): Ship[] => ships,
    getBySlug: (shipSlug: string): Ship | undefined => ships.find(({ slug }) => slug === shipSlug),
  }
}
