import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { VueWrapper } from '@vue/test-utils';
import ListView from '@/views/Traveler/ListView.vue';
import { shallowMount } from '@vue/test-utils';

vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn(() => ({
    push: () => {}
  }))
}));

const dispatch = vi.fn();
vi.mock('@/store', () => ({
  useStore: vi.fn(() => ({
    state: {
      travelers: {
        items: []
      }
    },
    dispatch,
  })),
}));


describe('Traveler/ListView', () => {
  let wrapper: VueWrapper<InstanceType<typeof ListView>>;

  beforeEach(() => {
    vi.clearAllMocks();

    wrapper = shallowMount(ListView, {
      props: {
        page: 1
      },
      global: {
        stubs: ['router-link']
      }
    });
  });

  it('The rendering matches the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('When the page is updated, it triggers the store to fetch the travelers', async () => {
    await wrapper.setProps({
      page: 2
    });

    expect(dispatch).toHaveBeenCalledOnce();
  })
})
