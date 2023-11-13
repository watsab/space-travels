<template>
  <div>
    <router-link :to="{ name: 'pilots'}">Voir tous les pilotes</router-link>
  </div>

  <MyCard v-if="pilot">
    <template v-slot:header>
      <h2>Détails du pilote - {{ pilot.firstname }} {{ pilot.lastname }}</h2>
    </template>
    <template v-slot:body>
      <div class="pilot-information">
        <ul class="pilot-identity">
          <li><span class="text-bold">Nom:</span> {{ pilot.lastname }}</li>
          <li><span class="text-bold">Prénom:</span> {{ pilot.firstname }}</li>
        </ul>

        <img  class="pilot-picture" :src="pilot.picturePath" :alt="`${pilot.firstname} ${pilot.lastname}`">
      </div>
    </template>
  </MyCard>
</template>

<script setup lang="ts">
import { type Ref, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import type { Pilot } from '@/models/Pilot';
import MyCard from '@/components/MyCard.vue';

interface Props {
  id: number;
}

const props = defineProps<Props>();
const store = useStore();
const pilot: Ref<Pilot | null> = ref(null);
watchEffect(() => {
  store.dispatch('pilots/fetchPilots');
  console.log(props.id);
  pilot.value = store.getters['pilots/getById'](props.id);
  console.log(pilot.value);

  if (!pilot.value) {
    const { push } = useRouter();
    push({ name: 'notFound' });
  }
})

</script>

<style scoped>
.pilot-information {
  display: flex;
  width: 100%;
  justify-content: space-between;

  & .pilot-picture {
    max-width: 150px;
  }
}
</style>
