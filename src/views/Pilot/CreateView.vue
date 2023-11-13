<template>

  <MyCard>
    <template v-slot:header>
      <h2>Créer un nouveau pilote</h2>
    </template>
    <template v-slot:body>
      <form ref="form" id="creationForm" @submit.prevent="submit" novalidate>
        <MyInput id="firstname" label="Prénom" v-model="pilotData.firstname" required></MyInput>
        <MyInput id="lastname" label="Nom" v-model="pilotData.lastname" required></MyInput>
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
import MyInput from '@/components/form/MyInput.vue';
import useVuelidate from '@vuelidate/core';

const pilotData = reactive({
  firstname: '',
  lastname: '',
  picturePath: null
})

const store = useStore();
const form: Ref<null | ({ reset: () => void } & HTMLElement)> = ref(null);

const vuelidate = useVuelidate();
const submit = async  () => {
  if (!await vuelidate.value.$validate()) {
    return;
  }
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
