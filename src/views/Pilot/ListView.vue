<template>
  <h2>Liste des pilotes</h2>

  <table>
    <thead>
    <tr>
      <th></th>
      <th>Nom</th>
      <th>Prénom</th>
      <th></th>
    </tr>
    </thead>
    <tbody v-if="pilots.length > 0">
    <tr v-for="pilot in pilots" :key="pilot.id">
      <td>
        <img  class="profile-picture" :src="pilot.picturePath" :alt="`${pilot.firstname} ${pilot.lastname}`">
      </td>
      <td>
        {{ pilot.lastname }}
      </td>
      <td>
        {{ pilot.firstname }}
      </td>
      <td>
        <router-link :to="{name: 'pilotDetails', params: { id: pilot.id }}">Voir les détails</router-link>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import type { ComputedRef } from 'vue';
import { computed } from 'vue';
import type Pilots from '@/store/modules/pilots';

const store = useStore();

store.dispatch('pilots/fetchPilots');
const pilots: ComputedRef<Pilots[]> = computed(() => {
  return store.state.pilots.items;
});
</script>

<style scoped>
.profile-picture {
  border-radius: 50%;
  width: 80px;
  height: 80px;
  object-fit: contain;
}

</style>
