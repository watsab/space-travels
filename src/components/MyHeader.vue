<template>
  <header>
    <slot name="logo"></slot>

    <slot name="title"></slot>

    <div class="nav-wrapper" v-click-outside="() => showNav = false">
      <button @click="showNav = !showNav">Menu</button>

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

<script setup>
import { ref } from "vue";

defineProps({
  menuItems: {
    type: Array,
    default: () => []
  }
})

const showNav = ref(false);
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
