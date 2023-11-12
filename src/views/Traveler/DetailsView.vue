<template>
  <h2>Détails du voyageur - {{ traveler.id }}</h2>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useTravelersManager } from '@/composable/useTravelersManager';

const route = useRoute();

const { getById } = useTravelersManager();
const traveler = getById(Number.parseInt(route.params.id as string, 10));

if (!traveler) {
  const { push } = useRouter();
  push({ name: 'notFound' });
}

</script>

<style scoped>

</style>
