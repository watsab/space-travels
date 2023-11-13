<template>
  <div class="form-group">
    <label :for="id">{{ label }}</label>
    <input :id="id" :name="name" type="checkbox" v-model="innerChecked" :value="value"/>
  </div>
</template>


<script setup lang="ts">
import { computed, type WritableComputedRef } from 'vue';

interface Props {
  id: string;
  name?: string;
  label: string;
  value?: string;
  modelValue?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{ 'update:modelValue': [checked: boolean]}>();
const innerChecked: WritableComputedRef<boolean> = computed({
  get: () => props.modelValue,
  set: (checked: boolean) => emit('update:modelValue', checked)
});
</script>

<style scoped>
label {
  margin-right: 20px;
}
</style>
