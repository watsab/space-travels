<template>
  <header>
    <slot name="logo"></slot>

    <slot name="title"></slot>

    <div class="nav-wrapper" v-click-outside="() => showNav = false">
      <MyButton @click="showNav = !showNav">Menu</MyButton>

      <transition
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @leave="onLeave"
        :css="false"
      >
        <nav v-show="showNav" class="nav">
          <ul>
            <li v-for="(item, index) in menuItems" :key="index">
              <slot name="menu-item" :item="item"></slot>
            </li>
          </ul>
        </nav>
      </transition>
    </div>
  </header>
</template>

<script setup lang="ts">
import { type Ref, ref } from 'vue';
import MyButton from '@/components/MyButton.vue';
// import Velocity from 'velocity-animate';
import { gsap } from 'gsap';

interface Props {
  menuItems: any[];
}

defineProps<Props>()

const showNav: Ref<boolean> = ref(false);

const onBeforeEnter = (el: HTMLElement) => {
  el.style.right = '-150px';
};
const onEnter = (el: HTMLElement, done: () => void) => {
  gsap.to(el, {
    x: -150
  });
  // Velocity(
  //   el,
  //   { right: 0},
  //   { duration: 500, easing: 'easeOutCubic', complete: done}
  // );
};
const onLeave = (el: HTMLElement, done: () => void) => {
  gsap.to(el, {
    x: 150
  });

  // Velocity(
  //   el,
  //   { right: '-150px'},
  //   { duration: 250, easing: 'easeInCubic', complete: done}
  // );
};
</script>

<style scoped>
header {
  background: var(--color-background-soft);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px;

  & .nav-wrapper {
    position: relative;

    & .nav {
      position: fixed;
      right: 0;
      top: 0;
      z-index: 1;
      background: var(--vt-c-indigo);
      width: 150px;
      padding: 10px;
      height: 100vh;

      & ul {
        list-style: none;
      }
    }
  }
}
</style>
