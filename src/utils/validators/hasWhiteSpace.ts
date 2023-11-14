import { helpers } from '@vuelidate/validators';

export const hasWhiteSpace = helpers.withMessage(
  'forms.validations.firstnameAndLastname',
  (value: string) => {
    const matches = value.match(/\s/);
    return matches !== null && matches.length > 0;
  }
);
