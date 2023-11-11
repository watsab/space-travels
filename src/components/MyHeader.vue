<template>
  <header>
    <slot name="logo"></slot>

    <slot name="title"></slot>

  <div class="nav-wrapper" v-click-outside="() => showNav = false">
    <MyButton @click="showNav = !showNav">Menu</MyButton>

      <nav v-show="showNav" class="nav">
        <ul>
          <li v-for="(item, index) in menuItems" :key="index">
            <slot name="menu-item" :item="item"></slot>
          </li>
        </ul>
      </nav>
    </div>

  </header>
</template>

<script setup lang="ts">
  import { type Ref, ref } from 'vue';
  import MyButton from '@/components/MyButton.vue';

  interface Props {
    menuItems: any[];
  }

  defineProps<Props>()

  const showNav: Ref<boolean> = ref(false);
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
      position: absolute;
      right: 0;
      z-index: 1;
      background: var(--vt-c-indigo);
      min-width: 150px;
      padding: 10px;
      border-radius: 5px;

      & ul {
        list-style: none;
      }
    }
  }
}
</style>
