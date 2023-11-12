import type { Traveler } from '@/models/Traveler';

const getAll = async (page = 1, limit = 5) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=${limit}&_page=${page}`);
  if (!response.ok) {
    throw new Error('An error occurred');
  }
  return await response.json() as Traveler[]
};

const getById = async (id: number): Promise<Traveler | null> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }

    throw new Error('An error occurred');
  }
  return await response.json() as Traveler;
}


export {
  getAll,
  getById,
}
