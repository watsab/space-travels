import { helpers } from '@vuelidate/validators';

export const noWhiteSpace = helpers.withMessage(
  'forms.validations.noWhiteSpace',
  (value: string) => {
    return value.match(/\s/) === null;
  }
);
