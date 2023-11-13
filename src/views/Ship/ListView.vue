<template>
  <h2>Liste des vaisseaux</h2>

  <form>
    <div class="form-group">
      <label for="search">Recherche un vaisseau :</label>
      <input id="search" name="search" v-model.trim="searchValue"/>
    </div>


    <div class="form-group">
      <label for="shipsWithPilots">Afficher les vaisseaux avec pilotes seulement</label>
      <input id="shipsWithPilots" type="checkbox" v-model="withPilotsOnly">
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
import { ref, watchEffect } from 'vue';
import type { Ship } from '@/models/Ship';

const store = useStore();

const searchValue = ref('');
store.dispatch('ships/fetchShips');
const ships = ref(store.state.ships.items);
const withPilotsOnly = ref(false);

const filterShips = () => {
  ships.value = store.state.ships.items
    .filter(
      (ship: Ship) => {
        let isValid = true;
        if (searchValue.value.length > 0) {
          isValid = isValid && ship.name.toLowerCase().includes(searchValue.value.toLowerCase());
        }

        if (withPilotsOnly.value) {
          isValid = isValid && !!ship.pilot;
        }

        return isValid;
      }
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
}

watchEffect(filterShips);

</script>

<style scoped>
form {
  .form-group {
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

    + .form-group {
      margin-top: 10px;
    }
  }

}
</style>
