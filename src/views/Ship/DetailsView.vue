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
import { computed,  type ComputedRef } from 'vue';
import type { Ship } from '@/models/Ship';
import { useShipsManager } from '@/composable/useShipsManager';
import MyCard from '@/components/MyCard.vue';

const route = useRoute();
const { getBySlug } = useShipsManager();
const currentShip: ComputedRef<Ship | undefined> = computed(() => {
  return getBySlug(route.params.slug as string)
})

if (!currentShip) {
  const { push } = useRouter();
  push({name: 'notFount'});
}
</script>

<style scoped>

</style>
