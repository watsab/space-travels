<template>
  <div class="form-group">
    <fieldset :class="['radio-group', direction]">
      <legend>{{ label }}<span class="required">*</span></legend>

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
    <p v-if="v$.$errors.length > 0" class="error-message" aria-live="assertive">
      {{ v$.$errors[0]?.$message }}
    </p>
  </div>
</template>

<script setup lang="ts">
import MyRadio from '@/components/form/MyRadio.vue';
import { computed } from 'vue';
import { required as requiredValidator } from '@vuelidate/validators';
import useVuelidate,  { type ValidationRule } from '@vuelidate/core';

interface Props {
  label: string;
  modelValue: string | number;
  name: string,
  options: {
    id: string;
    label: string;
    value: string;
  }[],
  direction?: 'horizontal' | 'vertical',
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'horizontal'
});

const emit = defineEmits<{'update:modelValue': [value: string | number]}>();
const checkedValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const rules = computed(() => {
  const rules: { [key: string] : ValidationRule } = {};
  if (props.required) {
    rules['required'] = requiredValidator;
  }

  return {
    checkedValue: rules
  }
});

const v$ = useVuelidate(rules, { checkedValue });
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
