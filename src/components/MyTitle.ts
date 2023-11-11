import { h } from 'vue';

export default {
  render() {
    return h(
      'h1',
      {
        id: 'title'
      },
      [h('span', {class: 'some-class'}, 'Lorem ipsum')]
    );
  }
}
