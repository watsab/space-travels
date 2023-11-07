<script setup lang="ts">
import { RouterView } from 'vue-router'
import MyHeader from '@/components/MyHeader.vue';
</script>

<template>
  <MyHeader>
  </MyHeader>

    <div class="container">
        <RouterView />
    </div>
</template>

<style scoped>
.container {
    height: 100vh;
    padding-top: 100px;
    overflow: auto;
}
</style>
