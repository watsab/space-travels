<template>
  <button v-bind="$attrs" @click="onClick">
    <slot/>
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  'click': [e: MouseEvent] }>()

const onClick = (e: MouseEvent) => emit('click', e);
</script>

<style scoped>
button {
  padding: 5px 10px;
  background-color: var(--vt-c-indigo);
  color: var(--vt-c-white);
  border-radius: 10px;
}
</style>
