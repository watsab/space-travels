import { describe, it, expect, vi } from 'vitest';
import { Response } from 'happy-dom';
import { getById } from '@/services/travelersManager';
import type { Mock } from '@vitest/spy';

const mocks: { response: { body: undefined, init: {status: number}},  fetch: Mock} = vi.hoisted(() => ({
  response: {
    body: undefined,
    init: {
      status: 200
    }
  },
  fetch: vi.fn(() =>
    new Response(mocks.response.body, mocks.response.init)
  )}
));

vi.stubGlobal('fetch', mocks.fetch);

describe('TravelersManager', () => {
  it('The getId method throws an error when the status code is invalid and not a 404', async () => {
    mocks.response.init.status = 500;
    await expect(getById(123)).rejects.toThrowError('An error');
  });

  it.todo('The getId method returns null the status code is a 404', async () => {
    mocks.response.init.status = 404;
    await expect(getById(123)).resolves.toBeNull();

  });
});
