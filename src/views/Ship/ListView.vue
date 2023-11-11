<template>
  <h2>Liste des vaisseaux</h2>

  <table>
    <thead>
    <tr>
      <th>Nom</th>
      <th>Pilote</th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="ship in ships" :key="ship.slug">
      <td>
        {{ ship.name }}
      </td>
      <td>
        <router-link v-if="ship.pilot" :to="{name: 'pilotDetails', params: { id: ship.pilot.id }}">
          {{ ship.pilot.firstname }} {{ ship.pilot.lastname }}
        </router-link>
      </td>
      <td>
        <router-link :to="{name: 'shipDetails', params: { slug: ship.slug }}">
          Voir le détail
        </router-link>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { useShipsManager } from '@/composable/useShipsManager';

const { getAll } = useShipsManager();

const ships = getAll();
</script>

<style scoped>

</style>
