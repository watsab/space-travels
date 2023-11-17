<script setup lang="ts">
import MyInput from '@/components/form/MyInput.vue';
import { reactive, ref } from 'vue';
import MyCard from '@/components/MyCard.vue';
import MyButton from '@/components/MyButton.vue';
import { useStore } from '@/store';

import { useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';

const credentials = reactive({
  email: '',
  password: '',
})
const loginError = ref(null);
const store = useStore();
const vuelidate = useVuelidate();
const login = async () => {
  console.log('tst');
  if (!await vuelidate.value.$validate()) {
    return;
  }

  try {
    await store.dispatch('auth/login', credentials)
  } catch (error) {
    loginError.value = error;
    console.error(error);
  }
};

</script>

<template>
  <MyCard>
    <template #header>
      <h1>Connexion à votre espace</h1>
    </template>
    <template #body>
      <form @submit.prevent="login" id="loginForm" novalidate>
        <MyInput id="email" label="Email" v-model="credentials.email" type="email" required/>
        <MyInput id="password" label="Mot de passe" v-model="credentials.password" required type="password"/>

        <router-link :to="{ name: 'register' }">
          Vous n'avez pas de compte ? Créez-en un !
        </router-link>

        <p v-if="loginError" class="error-message" aria-live="assertive">
          {{ loginError }}
        </p>
      </form>
    </template>
    <template #footer>
      <MyButton type="submit" form="loginForm">Connexion</MyButton>
    </template>
  </MyCard>

</template>

<style scoped>

</style>
