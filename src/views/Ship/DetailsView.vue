<template>
  <div>
    <router-link :to="{ name: 'ships'}">Voir tous les vaisseaux</router-link>
  </div>


  <MyCard v-if="currentShip">
    <template v-slot:header>
      <h2>Détails du vaisseau - {{ currentShip?.name }}</h2>
    </template>
    <template v-slot:body>
      <p><span class="text-bold">Nom:</span> {{ currentShip?.name }}</p>
    </template>
  </MyCard>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref, type Ref, watchEffect } from 'vue';
import type { Ship } from '@/models/Ship';
import MyCard from '@/components/MyCard.vue';
import { useStore } from '@/store';

interface Props {
  slug: string;
}

const props = defineProps<Props>();

const store = useStore();
const currentShip: Ref<Ship | null> = ref(null);

watchEffect(async () => {
  await store.dispatch('ships/fetchShips');
  const { push } = useRouter();
  try {
    currentShip.value = store.getters['ships/getBySlug'](props.slug) ?? null;

    if (!currentShip.value) {
      push({ name: 'notFound' });
    }
  } catch (error) {
    console.error(error);
    push({ name: 'networkError' });
  }
})

</script>

<style scoped>

</style>
