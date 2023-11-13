import { helpers } from '@vuelidate/validators';

export const noWhiteSpace = helpers.withMessage(
  'Votre saisie ne peut pas contenir d\'espace',
  (value: string) => {
    return value.match(/\s/) === null;
  }
);
