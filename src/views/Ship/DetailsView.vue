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
import { useStore } from 'vuex';

interface Props {
  slug: string;
}

const props = defineProps<Props>();

const route = useRoute();
const store = useStore();
const currentShip: Ref<Ship | null> = ref(null);

watchEffect(async () => {
  await store.dispatch('ships/fetchShips');
  currentShip.value = store.getters['ships/getBySlug'](props.slug) ?? null;

  if (!currentShip.value) {
    const { push } = useRouter();
    push({ name: 'notFound' });
  }
})

</script>

<style scoped>

</style>
