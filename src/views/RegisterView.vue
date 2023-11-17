<script setup lang="ts">
import MyInput from '@/components/form/MyInput.vue';
import { reactive, ref } from 'vue';
import { sameAs } from '@vuelidate/validators';
import MyCard from '@/components/MyCard.vue';
import MyButton from '@/components/MyButton.vue';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';

const userData = reactive({
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  passwordConfirmation: '',
})

const store = useStore();
const router = useRouter();
const vuelidate = useVuelidate();
const registerError = ref(null);
const register = async () => {
  if (!await vuelidate.value.$validate()) {
    return;
  }

  try {
    await store.dispatch('register', userData);
    await router.push({name: 'home'});
  } catch (error) {
    registerError.value = error.response.data.errors[0];
  }
};
</script>

<template>
  <MyCard>
    <template #header>
      Créez votre compte
    </template>
    <template #body>
      <form @submit.prevent="register" id="registerForm" novalidate>
        <MyInput id="firstname" label="Prénom" v-model="userData.firstname" required/>
        <MyInput id="lastname" label="Nom" v-model="userData.lastname" required/>
        <MyInput id="email" label="Email" v-model="userData.email" type="email" required/>
        <MyInput id="password" label="Mot de passe" v-model="userData.password" required type="password"/>
        <MyInput
          id="passwordConfirmation"
          label="Veuillez confirmer votre mot de passe"
          type="password"
          v-model="userData.passwordConfirmation"
          required
          :validation-rules="{sameAs: sameAs(userData.password)}"
        />

        <router-link :to="{ name: 'login' }">
          Vous avez déjà un compte ? Connectez-vous !
        </router-link>
      </form>
    </template>
    <template #footer>
      <MyButton type="submit" form="registerForm">Créer mon compte</MyButton>
    </template>
  </MyCard>

</template>

<style scoped>

</style>
