<template>
  <h2>Détails du voyageur - {{ traveler?.id }}</h2>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { type Ref, ref, watchEffect } from 'vue';
import type { Traveler } from '@/models/Traveler';
import { useStore } from 'vuex';


interface Props {
  id: number;
}

const props = defineProps<Props>();

const store = useStore();
const traveler: Ref<Traveler | null> = ref(null);

watchEffect(async () => {
  await store.dispatch('travelers/fetchTravelers');
  traveler.value = store.getters['travelers/getById'](props.id) ?? null;

  if (!traveler.value) {
    const { push } = useRouter();
    push({ name: 'notFound' });
  }
})


</script>

<style scoped>

</style>
