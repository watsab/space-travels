<template>
  <h2>Liste des vaisseaux</h2>

  <form>
    <div class="form-group">
      <label for="search">Recherche un vaisseau :</label>
      <input id="search" name="search" v-model.trim="searchValue"/>
    </div>
  </form>

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
import { useStore } from '@/store';
import { ref, watch } from 'vue';

const store = useStore();

const searchValue = ref('');
store.dispatch('ships/fetchShips');
const ships = ref(store.state.ships.items);

watch(searchValue, (value: string) => {
  if (value === '') {
    ships.value = store.state.ships.items;
    return;
  }

  ships.value = store.state.ships.items
    .filter(
      ({ name }) => name.toLowerCase().includes(value.toLowerCase())
    )
    .sort(
      ({ name}, { name: secondName }) => {
        if (name < secondName) {
          return -1;
        }
        if (name > secondName) {
          return 1;
        }

        return 0;
      }
    );
});
</script>

<style scoped>
form {
  display: flex;
  align-items: center;

  label {
    margin-right: 20px;
  }
  input {
    background-color: var(--vt-c-white);
    padding: 5px;
    border-radius: 5px;
  }
}
</style>
