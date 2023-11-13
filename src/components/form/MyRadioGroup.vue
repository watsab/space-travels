<template>
  <div class="form-group">
    <fieldset :class="['radio-group', direction]">
      <legend>{{ label }}</legend>

      <MyRadio
        v-for="option in options"
        :key="option.id"
        :id="option.id"
        :name="name"
        :label="option.label"
        :value="option.value"
        class="radio-button"
        v-model="checkedValue"
      />
    </fieldset>
  </div>
</template>

<script setup lang="ts">
import MyRadio from '@/components/form/MyRadio.vue';
import { computed } from 'vue';

interface Props {
  label: string;
  modelValue: string | number;
  name: string,
  direction: 'horizontal' | 'vertical',
  options: {
    id: string;
    label: string;
    value: string;
  }[]
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'horizontal'
});

const emit = defineEmits<{'update:modelValue': [value: string | number]}>();
const checkedValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

</script>

<style scoped>
.radio-group {
  display: flex;
  gap: 1rem;

  &.horizontal {
    align-items: center;
    justify-content: left;
  }


  &.vertical {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
