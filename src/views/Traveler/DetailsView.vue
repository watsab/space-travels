<template>
  <h2>Détails du voyageur - {{ travelerId }}</h2>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
const travelerId = route.params.id;

</script>

<style scoped>

</style>
