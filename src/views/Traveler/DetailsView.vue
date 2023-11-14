<template>
  <h2>Détails du voyageur - {{ traveler?.id }}</h2>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { type Ref, ref, watchEffect } from 'vue';
import type { Traveler } from '@/models/Traveler';
import { getById } from '@/services/travelersManager';


interface Props {
  id: number;
}

const props = defineProps<Props>();

const traveler: Ref<Traveler | null> = ref(null);

watchEffect(async () => {
  const { push } = useRouter();
  try {
    traveler.value = await getById(props.id);
    if (!traveler.value) {
      push({ name: 'notFound' });
    }

  } catch (error) {
    console.log(push);
    push({name: 'networkError'});
  }
})


</script>

<style scoped>

</style>
