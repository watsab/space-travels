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

  <MyDataTable :items="pilots">
    <template #header>
      <th></th>
      <th>Nom</th>
      <th>Prénom</th>
      <th></th>
    </template>
    <template v-slot:row="{ item }: { item: Pilot }">
      <td>
        <img  class="profile-picture" :src="item.picturePath" :alt="`${item.firstname} ${item.lastname}`">
      </td>
      <td>
        {{ item.lastname }}
      </td>
      <td>
        {{ item.firstname }}
      </td>
      <td>
        <router-link :to="{name: 'pilotDetails', params: { id: item.id }}">Voir les détails</router-link>
      </td>
    </template>
  </MyDataTable>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import { ref, watch } from 'vue';
import MyDataTable from '@/components/MyDataTable.vue';
import type { Pilot } from '@/models/Pilot';

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
