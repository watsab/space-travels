<template>

  <MyCard>
    <template v-slot:header>
      <h2>Créer un nouveau pilote</h2>
    </template>
    <template v-slot:body>
      <form ref="form" id="creationForm" @submit.prevent="submit" >
        <div class="form-group">
          <label for="firstname">Prénom</label>
          <input id="firstname" type="text" v-model="pilotData.firstname"/>
        </div>
        <div class="form-group">
          <label for="lastname">Nom</label>
          <input id="lastname" type="text" v-model="pilotData.lastname"/>
        </div>
        <div class="form-group">
          <label for="picture">Image de profil</label>
          <input id="picture" type="file" />
        </div>

      </form>
    </template>
    <template v-slot:footer>
      <router-link :to="{ name: 'pilots' }">Annuler</router-link>
      <MyButton type="submit" form="creationForm">Créer</MyButton>

    </template>
  </MyCard>

</template>

<script setup lang="ts">

import { reactive, type Ref, ref } from 'vue';
import { useStore } from '@/store';
import type { Pilot } from '@/models/Pilot';
import MyCard from '@/components/MyCard.vue';
import MyButton from '@/components/MyButton.vue';

const pilotData = reactive({
  firstname: '',
  lastname: '',
  picturePath: null
})

const store = useStore();
const form: Ref<null | ({ reset: () => void } & HTMLElement)> = ref(null);
const submit = () => {
  store.dispatch('pilots/fetchPilots');
  const id = store.state.pilots.items.length + 1;

  const pilot: Pilot = {
    ...pilotData,
    id,
    picturePath: new URL('../../assets/pilots/silhouette.jpeg', import.meta.url).toString()
  }
  store.commit('pilots/addPilot', pilot);

  form.value?.reset()

  store.commit('app/setFlashMessage', 'Nouveau pilote créé');

  setTimeout(() => store.dispatch('app/resetFlashMessage'), 3000);
};

</script>

<style scoped>
button {
  margin-left: 30px;
}
</style>
