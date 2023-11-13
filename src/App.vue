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
    <div v-if="flashMessage && flashMessage.length > 0" class="flash-message">
      {{ flashMessage }}
    </div>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import MyHeader from '@/components/MyHeader.vue';
import { computed } from 'vue';
import { useStore } from '@/store';

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
];

const store = useStore();
const flashMessage = computed(() => {
  return store.state.app.flashMessage;
});

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

@keyframes fade {
   0%,
   100% {
     background-color: transparent;
     border: solid 1px transparent;
   }
   20% {
     background-color: var(--vt-c-indigo);
     border: solid 1px var(--vt-c-divider-light-1);
   }
 }

.container {
  height: 100vh;
  padding-top: 120px;
  overflow: auto;

  position: relative;

  & .flash-message {
    position: fixed;
    top: 115px;
    right: 25px;
    padding: 10px 20px;
    border-radius: 5px;
    color: var(--vt-c-white-mute);

    animation-name: fade;
    animation-duration: 3s;
  }

}
</style>
