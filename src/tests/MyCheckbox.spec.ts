import { describe, it, expect, beforeEach } from 'vitest';
import MyCheckbox from '@/components/form/MyCheckbox.vue';
import { mount, VueWrapper } from '@vue/test-utils';

describe('MyCheckbox', () => {
  let wrapper: VueWrapper<InstanceType<typeof MyCheckbox>>;
  beforeEach(() => {
    wrapper = mount(MyCheckbox, {
      props: {
        id: '1',
        label: 'My label'
      }
    })

  });

  it('The id and label are correctly rendered', () => {
    expect(wrapper.find('label').text()).toBe('My label');
    expect(wrapper.find('input').attributes('id')).toBe('1');
  });

  it('The checkbox checked state follows the given model value', async () => {
    await wrapper.setProps({
      modelValue: true
    })
    expect(wrapper.find('input[type="checkbox"]:checked').exists()).toBe(true)

    await wrapper.setProps({
      modelValue: false
    })
    expect(wrapper.find('input[type="checkbox"]:checked').exists()).toBe(false)
  });

  it('When checkbox checked state changes, so does the given model value', async () => {
    await wrapper.get('input[type="checkbox"]').setValue(true);
    await wrapper.get('input[type="checkbox"]').setValue(false);

    const emittedEvents = wrapper.emitted('update:modelValue');


    expect(emittedEvents).toBeDefined();
    expect(emittedEvents).toHaveLength(2);
    if (emittedEvents && emittedEvents[0]) {
      expect(emittedEvents[0]).toEqual([true]);
    }
    if (emittedEvents && emittedEvents[1]) {
      expect(emittedEvents[1]).toEqual([false]);
    }
  });

})
