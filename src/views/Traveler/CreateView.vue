<template>
  <MyCard>
    <template v-slot:header>
      <h2>Créer un nouveau voyageur</h2>
    </template>
    <template v-slot:body>
      <form ref="form" id="creationForm" @submit.prevent="submit" novalidate>
        <fieldset>
          <legend>Identité</legend>
          <MyRadioGroup name="civility" :options="genderOptions" v-model="travelerData.civility" label="Civilité" required/>
          <MyInput id="name" label="Prénom et Nom" v-model="travelerData.name" :validation-rules="rules.name" required/>
          <MyInput id="email" label="Email" v-model="travelerData.email" type="email" required/>
        </fieldset>

        <fieldset>
          <legend>Adresse</legend>
          <MyInput id="suite" label="Numéro" v-model="travelerData.address.suite" required/>
          <MyInput id="street" label="Nom de rue" v-model="travelerData.address.street" required/>
          <MyInput id="zipcode" label="Code postal" v-model="travelerData.address.street" required/>
          <MyInput id="city" label="Ville" v-model="travelerData.address.zipcode" required/>
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
import { hasWhiteSpace } from '@/utils/validators/hasWhiteSpace';
import useVuelidate from '@vuelidate/core';

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

const rules = {
  name: {
    hasWhiteSpace
  }
};

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

const v$ = useVuelidate();

const submit = async () => {
  if (!await v$.value.$validate()) {
    return;
  }
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

  & legend {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 15px;
  }
}
</style>
