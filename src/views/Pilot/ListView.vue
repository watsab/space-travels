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
    <tbody>
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
import { usePilotsManager } from '@/composable/usePilotsManager';
const { getAll } = usePilotsManager();

const pilots = getAll();
</script>

<style scoped>
.profile-picture {
  border-radius: 50%;
  width: 80px;
  height: 80px;
  object-fit: contain;
}

</style>
