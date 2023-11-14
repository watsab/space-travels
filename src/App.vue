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

    <template v-slot:menu-item="{ item }: {item: { label: string; route: { name: string } } }">
      <router-link :to="item.route">{{ item.label }}</router-link>
    </template>
  </MyHeader>

  <div class="container">
    <transition name="slide-down">
      <div v-if="flashMessage && flashMessage.length > 0" class="flash-message" ref="flash">
        {{ flashMessage }}
      </div>
    </transition>


    <router-view v-slot="{ Component }">
      <transition name="slide-right" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
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

@keyframes slide-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up {
  from {
    opacity: 1;
    transform: translateY(0);

  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
}

.container {
  height: calc(100vh - 100px);
  padding: 20px 0;
  overflow: auto;
  position: relative;
  top: 100px;

  & .flash-message {
    position: fixed;
    top: 115px;
    right: 25px;
    padding: 10px 20px;
    border-radius: 5px;
    background-color: var(--vt-c-indigo);
    color: var(--vt-c-white-mute);
  }
}
</style>
