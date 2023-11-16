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
      <td>
        <MyButton v-if="item.isInDB" @click="removeFromDb(item)">Supprimer d'IndexedDB</MyButton>
        <MyButton v-else @click="addToDB(item)">Enregistrer dans IndexedDB</MyButton>
      </td>
    </template>
  </MyDataTable>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import { ref, watch } from 'vue';
import MyDataTable from '@/components/MyDataTable.vue';
import type { Pilot } from '@/models/Pilot';
import MyButton from '@/components/MyButton.vue';
import { getPilot, addPilot, removePilot, getDatabase } from '@/services/indexedDb';

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

watch(pilots, async (value: Pilot) => {
  pilots.value = await Promise.all(value.map(async (pilot: Pilot) => {
    pilot.isInDB = await isInDB(pilot);
  }));
});

const isInDB = async (pilot: Pilot): Promise<boolean> => {
  const db = await getDatabase();
  return !!await getPilot(db, pilot.id);
};

const removeFromDb = async (pilot: Pilot) => {
  const db = await getDatabase();
  try {
    await removePilot(db, pilot);
    store.commit('app/setFlashMessage', 'Pilote supprimé d\'IndexedDB')
    pilot.isInDB = false;
  } catch (error) {
    console.error(error);
  }
};


const addToDB = async (pilot: Pilot) => {
  const db = await getDatabase();
  try {
    await addPilot(db, pilot);
    store.commit('app/setFlashMessage', 'Pilote ajouté à IndexedDB')
    pilot.isInDB = true;
  } catch (error) {
    console.error(error);
  }
}


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
