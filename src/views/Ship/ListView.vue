<template>
  <div>
    <h2>Liste des vaisseaux</h2>

    <form>
      <MyInput id="search" label="Rechercher un vaisseau :" v-model.trim="searchValue"/>
      <MyCheckbox id="shipsWithPilots" label="Afficher les vaisseaux avec pilotes seulement" v-model="withPilotsOnly"/>
    </form>

    <MyDataTable :items="ships">
      <template #header>
        <th>Nom</th>
        <th>Pilote</th>
        <th>Prix du billet</th>
        <th></th>
      </template>
      <template v-slot:row="{ item }: {item: Ship}">
        <td>
          {{ item.name }}
        </td>
        <td>
          {{ item.pilot?.firstname }} {{ item.pilot?.lastname }}
        </td>
        <td>
          {{ n(item.price, 'currency') }}
        </td>
        <td>
          <router-link :to="{name: 'shipDetails', params: { slug: item.slug }}">
            Voir les détails
          </router-link>
        </td>
      </template>
    </MyDataTable>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import { ref, watchEffect } from 'vue';
import type { Ship } from '@/models/Ship';
import MyInput from '@/components/form/MyInput.vue';
import MyCheckbox from '@/components/form/MyCheckbox.vue';
import MyDataTable from '@/components/MyDataTable.vue';
import { useI18n } from 'vue-i18n';

const store = useStore();

const searchValue = ref('');
store.dispatch('ships/fetchShips');
const ships = ref(store.state.ships.items);
const withPilotsOnly = ref(false);

const { n } = useI18n();

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
</style>
