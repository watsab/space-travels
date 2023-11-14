import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { VueWrapper } from '@vue/test-utils';
import DetailsView from '@/views/Traveler/DetailsView.vue';
import { mount } from '@vue/test-utils';
import { getById } from '@/services/travelersManager';


const mocks = vi.hoisted(() => ({
  getById: vi.fn()
}));

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn()
  })),
}));

vi.mock('@/services/travelersManager', () => ({
  getById: mocks.getById
}));


describe('Traveler/DetailsView', () => {
  let wrapper: VueWrapper<InstanceType<typeof DetailsView>>;

  beforeEach(() => {
    vi.clearAllMocks();

    wrapper = mount(DetailsView, {
      props: {
        id: 1
      }
    });
  });

  it('The rendering matches the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('The component calls the manager to retrieve the traveler information on id change', async () => {
    await wrapper.setProps({
      id: 123
    });

    expect(getById).toHaveBeenCalledTimes(2);
  });
})
