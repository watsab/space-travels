<template>
  <h2>Liste des voyageurs</h2>

  <table>
    <thead>
    <tr>
      <th>Nom</th>
      <th>Prénom</th>
      <th>Date de naissance</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="traveler in travelers" :key="traveler.id">
      <td>
        {{ traveler.firstname }}
      </td>
      <td>
        {{ traveler.lastname }}
      </td>
      <td>
        {{ traveler.birthdate.toDateString()}}
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { useTravelersManager } from '@/composable/useTravelersManager';

const { getAll } = useTravelersManager();

const travelers = getAll();

</script>

<style scoped>

</style>
