<template>
  <div class="form-group">
    <label :for="id">{{ label }}</label>
    <input :id="id" :name="name" :type="type" v-model="innerValue"/>
  </div>
</template>


<script setup lang="ts">
import { computed } from 'vue';

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
  type: Type;
  value?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{ input: [value: string]}>();

const innerValue = computed({
  get: () => {
    return props.value;
  },
  set: (value: string) => {
    emit('input', value)
  }
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
