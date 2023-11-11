<template>
  <div>
    <router-link :to="{ name: 'pilots'}">Voir tous les pilotes</router-link>
  </div>

  <MyCard>
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
import { useRoute } from 'vue-router';

import { usePilotsManager } from '@/composable/usePilotsManager';
import type { Pilot } from '@/models/Pilot';
import MyCard from '@/components/MyCard.vue';

const route = useRoute();

const { getById } = usePilotsManager()
const pilot: Pilot = getById(Number.parseInt(route.params.id as string, 10)) as Pilot;
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
