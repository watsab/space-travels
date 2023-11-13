<template>
  <h2>Liste des pilotes</h2>

  <div class="header">
    <form>
      <div class="form-group">
        <label for="search">Recherche un pilote :</label>
        <input id="search" name="search" v-model.trim="searchValue"/>
      </div>
    </form>

    <div>
      <router-link :to="{name: 'pilotCreate'}">Créer un nouveau pilote</router-link>
    </div>
  </div>

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
import { useStore } from '@/store';
import { ref, watch } from 'vue';

const store = useStore();
store.dispatch('pilots/fetchPilots');

const searchValue = ref('');
const pilots = ref(store.state.pilots.items);

watch(searchValue, (value: string) => {
  if (value === '') {
    pilots.value = store.state.pilots.items;
    return;
  }

  pilots.value = store.state.pilots.items.filter(
    ({ firstname, lastname }) => firstname.toLowerCase().includes(value.toLowerCase()) || lastname.toLowerCase().includes(value.toLowerCase())
  ).sort(({ lastname}, { lastname: secondLastName }) => {
    if (lastname < secondLastName) {
      return -1;
    }
    if (lastname > secondLastName) {
      return 1;
    }

    return 0;
  });
});
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
}

.profile-picture {
  border-radius: 50%;
  width: 80px;
  height: 80px;
  object-fit: contain;
}

</style>
