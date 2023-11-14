import { useI18n } from 'vue-i18n';
import * as validators from '@vuelidate/validators';
import { hasWhiteSpace as hasWhiteSpaceValidator } from '@/utils/validators/hasWhiteSpace';
import { noWhiteSpace as noWhiteSpaceValidator } from '@/utils/validators/noWhiteSpace';

export const useI18nValidators = () => {
  const  i18n = useI18n();
  const { createI18nMessage } = validators;
  const messagePath = ({ $validator }: { $validator: string}) => `forms.validations.${$validator}`;

  const withI18nMessage = createI18nMessage({ t: i18n.t.bind(i18n), messagePath });

  const required = withI18nMessage(validators.required)
  const email = withI18nMessage(validators.email)
  const minLength = withI18nMessage(validators.minLength, { withArguments: true});
  const hasWhiteSpace = withI18nMessage(hasWhiteSpaceValidator)
  const noWhiteSpace = withI18nMessage(noWhiteSpaceValidator)

  return {
    required,
    email,
    hasWhiteSpace,
    minLength,
    noWhiteSpace
  }
};
