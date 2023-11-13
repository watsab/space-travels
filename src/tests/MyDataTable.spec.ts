import { describe, it, expect } from 'vitest';
import MyDataTable from '@/components/MyDataTable.vue';
import { mount } from '@vue/test-utils';
import { faker } from '@faker-js/faker';

describe('MyDataTable', () => {
  it('The table renders the headers correctly', () => {
    const headerSlotContent = '<th>Col 1</th><th>Col 2</th><th>Col 3</th>';

    const wrapper = mount(MyDataTable, {
      props: {
        items:[]
      },
      slots: {
        header: headerSlotContent,
      }
    });

    expect(wrapper.find('table thead tr').html({raw: true})).toBe(`<tr>${headerSlotContent}</tr>`);
  });

  it('The table renders all the rows', () => {
    const items= [
      {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName()
      },
      {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName()
      },
      {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName()
      },
      {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName()
      },
      {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName()
      },
    ];

    const wrapper = mount(MyDataTable, {
      props: {
        items
      },
      slots: {
        header: '<th>First name</th><th>Last name</th>',
        row: '<template v-slot:row="item"><td>{{ item.firstName }}</td><td>{{ item.lastName }}</td></template>'
      }
    });

    expect(wrapper.findAll('table tbody tr')).toHaveLength(items.length);
  });

})
