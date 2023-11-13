<template>
  <div class="radio-input">
    <label :for="id">{{ label }}</label>
    <input :id="id" :name="name" type="radio" :checked="props.modelValue === props.value" :value="value" @change="onChange"/>
  </div>
</template>


<script setup lang="ts">
interface Props {
  id: string;
  label: string;
  name: string;
  value: string | number;
  modelValue?: string | number;
}

const props = defineProps<Props>();
const emit = defineEmits<{ 'update:modelValue': [value: string | number]}>();

const onChange = () => {
  emit('update:modelValue', props.value);
}
</script>

<style scoped>
label {
  margin-right: 20px;
}
</style>
