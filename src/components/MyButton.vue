<template>
  <button v-bind="$attrs" @click="onClick"><slot/></button>
</template>

<script setup>
  const emit = defineEmits(['click']);

  const onClick = (e) => {
    emit('click', e);
  }
</script>
