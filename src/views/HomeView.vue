<template>
  <main>

    <MyTitle/>

    <router-link :to="{name: 'about'}">A propos</router-link>

  </main>
</template>

<script setup lang="ts">
import MyTitle from '@/components/MyTitle';
</script>

<style scoped>
p {
    & .italic {
        font-style: italic;
    }
}
img {
    width: 500px;
    max-height: 100%;
}
</style>
