<template>
  <div class="not-found-content">
    <h2>Oups !</h2>
    <p>La page demandée n'existe pas !</p>
    <p>
      <router-link :to="{ name: 'home' }">Retourner à l'accueil</router-link>
    </p>

    <img class="not-found-image" src="@/assets/not-found-astronaut.png" alt="Not found">
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.not-found-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  & h2,
  & p {
    text-align: center;
    padding-bottom: 25px;
  }

  & h2 {
    font-size: 3rem;
  }

  & p {
    font-size: 1.5rem;
  }


  & .not-found-image {
    max-width: 250px;
    height: auto;
}
}

</style>
