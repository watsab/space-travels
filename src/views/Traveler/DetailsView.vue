<template>
  <h2>Détails du voyageur - {{ traveler?.id }}</h2>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useTravelersManager } from '@/composable/useTravelersManager';
import { type Ref, ref } from 'vue';
import type { Traveler } from '@/models/Traveler';

const route = useRoute();

const { getById } = useTravelersManager();
const { push } = useRouter();
const traveler: Ref<Traveler | null> = ref(null);
try {
  traveler.value = await getById(Number.parseInt(route.params.id as string, 10));
  if (!traveler.value) {
    push({ name: 'notFound' });
  }
} catch (e) {
  push({ name: 'networkError' });
}

</script>

<style scoped>

</style>
