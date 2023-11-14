<template>
  <div class="form-group">
    <label :for="id">{{ label }}<span class="required" v-if="required">*</span></label>
    <input :id="id" :name="name" :type="type" v-model="innerValue" :required="required" :minlength="minLength"/>

    <p v-if="v$.$errors.length > 0" class="error-message" aria-live="assertive">
      {{ v$.$errors[0].$message }}
    </p>
  </div>
</template>


<script setup lang="ts">
import { computed, type WritableComputedRef } from 'vue';
import useVuelidate, { type ValidationRule} from '@vuelidate/core';
import { useI18nValidators } from '@/composable/useI18nValidators';

interface Props {
  id: string;
  label: string;
  validationRules?: { [key: string]: (value: any) => ValidationRule };
  name?: string;
  type?: string;
  modelValue?: string | number;
  required?: boolean;
  minLength?: number;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  minLength: 0,
  validationRules: () => ({})
});

const emit = defineEmits<{ 'update:modelValue': [value: string | number] }>();
const innerValue: WritableComputedRef< string | number> = computed({
  get: () => props.modelValue,
  set: (value: string | number) => emit('update:modelValue', value)
});

const i18Validators = useI18nValidators();
const rules = computed(() => {
  const rules: { [key: string]: ValidationRule} = {};

  if (props.required) {
    rules['required'] = i18Validators.required;
  }

  if (props.minLength) {
    rules['minLength'] = i18Validators.minLength(props.minLength);
  }

  if (props.type === 'email') {
    rules['email'] = i18Validators.email;
  }

  return {
    innerValue: {
      ...rules,
      ...props.validationRules
    }
  }
});
const v$ = useVuelidate(rules, { innerValue });

</script>

<style scoped>
input {
  background-color: var(--vt-c-white-mute);
  padding: 5px;
  border-radius: 5px;
}
</style>
