import type { Ship } from '@/models/Ship';
import shipData from '@/data/ships.json';
import store from '@/store';


const getAll = (): Ship[] => {
  const pilots = store.state.pilots.items;
  return shipData.map((ship): Ship => {
    return {
      name: ship.name,
      slug: ship.slug,
      pilot: pilots.find(({ id }) => ship.pilotId === id)
    }
  });
}
export {
  getAll
}
