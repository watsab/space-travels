import { describe, it, expect, beforeEach } from 'vitest';
import type { VueWrapper } from '@vue/test-utils';
import ListView from '@/views/Traveler/ListView.vue';
import { shallowMount } from '@vue/test-utils';

describe('Traveler/ListView', () => {
  let wrapper: VueWrapper<InstanceType<typeof ListView>>;

  beforeEach(() => {
    wrapper = shallowMount(ListView);
  });


  it.todo('The rendering matches the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
})
