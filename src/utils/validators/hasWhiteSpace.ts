import { helpers } from '@vuelidate/validators/dist/index';

export const hasWhiteSpace = helpers.withMessage(
  'Veuillez saisir votre prénom et votre nom',
  (value: string) => {
    const matches = value.match(/\s/);
    return matches !== null && matches.length > 0;
  }
)
