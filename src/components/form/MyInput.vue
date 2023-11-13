<template>
  <div class="form-group">
    <label :for="id">{{ label }}</label>
    <input :id="id" :name="name" :type="type" v-model="innerValue"/>
  </div>
</template>


<script setup lang="ts">
import { computed, type WritableComputedRef } from 'vue';

const enum Type {
  Text = 'text',
  Email = 'email',
  Password = 'password',
  Number = 'number'
}
interface Props {
  id: string;
  name?: string;
  label: string;
  type?: Type;
  modelValue?: string | number;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: Type.Text
});

const emit = defineEmits<{ 'update:modelValue': [value: string | number] }>();
const innerValue: WritableComputedRef< string | number> = computed({
  get: () => props.modelValue,
  set: (value: string | number) => emit('update:modelValue', value)
})
</script>

<style scoped>
label {
  margin-right: 20px;
}

input {
  background-color: var(--vt-c-white-mute);
  padding: 5px;
  border-radius: 5px;
}
</style>
