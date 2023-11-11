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
