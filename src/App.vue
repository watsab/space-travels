<template>
  <MyHeader :menu-items="menuItems" class="header">
    <template v-slot:logo>
      <img src="@/assets/rocket.svg" class="logo" alt="space travels logo">
    </template>

    <template v-slot:title>
      <router-link :to="{name: 'home'}" class="title green">
        <h1>Space travels</h1>
      </router-link>
    </template>

    <template v-slot:menu-item="{ item }">
      <router-link :to="item.route">{{ item.label }}</router-link>
    </template>
  </MyHeader>

  <div class="container">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import MyHeader from '@/components/MyHeader.vue';

const menuItems = [
  {
    label: 'Nos pilotes',
    route: { name: 'pilots' }
  },
  {
    label: 'Nos vaisseaux',
    route: { name: 'ships' }
  },
  {
    label: 'Nos voyageurs',
    route: { name: 'travelers' }
  },
  {
    label: 'A propos',
    route: { name: 'about' }
  }
]

</script>

<style scoped>
.header {
  height: 100px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;

  & .logo {
    width: auto;
    max-height: 50px;
  }

  & .title {
    &:hover {
      background-color: transparent;
    }
  }
}

.container {
  height: 100vh;
  padding-top: 120px;
  overflow: auto;
}
</style>
