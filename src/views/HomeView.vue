<script setup lang="ts">
import { ref } from 'vue';
import MyTitle from '@/components/MyTitle';

const isItalic = ref(false);

const imageSrc = 'https://picsum.photos/550';
const alt = 'my-random-image';

const imgObjectAttributes = {
  src: imageSrc,
  alt
}
</script>

<template>
  <main>
    <router-link :to="{name: 'about'}">A propos</router-link>

  </main>
</template>

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
