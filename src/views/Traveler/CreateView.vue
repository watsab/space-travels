<template>

  <MyCard>
    <template v-slot:header>
      <h2>Créer un nouveau voyageur</h2>
    </template>
    <template v-slot:body>
      <form ref="form" id="creationForm" @submit.prevent="submit" >
        <fieldset>
          <legend>Identité</legend>
          <MyRadioGroup name="civility" :options="genderOptions" v-model="travelerData.civility" label="Civilité"/>
          <MyInput id="name" label="Prénom et Nom" v-model="travelerData.name"></MyInput>
          <MyInput id="email" label="Email" v-model="travelerData.email" type="email"></MyInput>
        </fieldset>
        <fieldset>
          <legend>Adresse</legend>
          <MyInput id="suite" label="Numéro" v-model="travelerData.address.suite"></MyInput>
          <MyInput id="street" label="Nom de rue" v-model="travelerData.address.street"></MyInput>
          <MyInput id="zipcode" label="Code postal" v-model="travelerData.address.street"></MyInput>
          <MyInput id="city" label="Ville" v-model="travelerData.address.zipcode"></MyInput>
        </fieldset>

      </form>
    </template>
    <template v-slot:footer>
      <router-link :to="{ name: 'travelers' }">Annuler</router-link>
      <MyButton type="submit" form="creationForm">Créer</MyButton>

    </template>
  </MyCard>

</template>

<script setup lang="ts">

import { reactive, type Ref, ref } from 'vue';
import { useStore } from '@/store';
import type { Traveler } from '@/models/Traveler';
import MyCard from '@/components/MyCard.vue';
import MyButton from '@/components/MyButton.vue';
import MyInput from '@/components/form/MyInput.vue';
import { Gender } from '@/models/Gender';
import MyRadioGroup from '@/components/form/MyRadioGroup.vue';

const travelerData = reactive({
  civility: '',
  name: '',
  email: '',
  address: {
    street: '',
    suite: '',
    city: '',
    zipcode: '',
  }
})

const store = useStore();
const form: Ref<null | ({ reset: () => void } & HTMLElement)> = ref(null);

const genderOptions = [
  {
    id: 'male',
    label: 'M.',
    value: Gender.Male as string
  },
  {
    id: 'female',
    label: 'Mme.',
    value: Gender.Female as string
  },
  {
    id: 'notSpecified',
    label: 'Non spécifié',
    value: Gender.NotSpecified as string
  },
];

const submit = () => {
  store.dispatch('travelers/fetchTravelers');
  const id = store.state.travelers.items.length + 1;

  const traveler: Traveler = {
    ...travelerData,
    id,
  }
  store.commit('travelers/addTraveler', traveler);

  form.value?.reset()

  store.commit('app/setFlashMessage', 'Nouveau voyageur créé');

  setTimeout(() => store.dispatch('app/resetFlashMessage'), 3000);
};

</script>

<style scoped>
button {
  margin-left: 30px;
}

fieldset {
  border: none;
  margin: 0;
  padding: 0;

  legend {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 15px;
  }
}
</style>
