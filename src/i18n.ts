import { createI18n, type I18n } from 'vue-i18n';
import { nextTick } from 'vue';

let globalI18n: I18n;

export const getGlobalI18n = () => {
  if (globalI18n) {
    return globalI18n;
  }

  return setupI18n()
}

export const setupI18n = async (options = {}): Promise<I18n> => {
  if (globalI18n) {
    return globalI18n;
  }

  const locale = window.navigator.languages[0].slice(0,2);
  globalI18n = createI18n({
    legacy: false,
    fallbackLocale: 'fr',
    numberFormats: {
      'fr': {
        currency: {
          style: 'currency',
          currency: 'EUR'
        }
      },
      'en': {
        currency: {
          style: 'currency',
          currency: 'USD'
        }
      }
    },
    ...options
  });

  setI18nLanguage(globalI18n, locale);

  await loadLocaleMessages(globalI18n, locale);

  return globalI18n;
}


export const updateCurrentLocale =  async (i18n: I18n<{}, {}, {}, string, false>, locale: string) => {
  if (!i18n.global.availableLocales.includes(locale)) {
    await loadLocaleMessages(i18n, locale)
  }

  // set i18n language
  setI18nLanguage(i18n, locale)
}

const setI18nLanguage = (i18n: I18n<{}, {}, {}, string, false>, locale: string) => {
  i18n.global.locale.value = locale;
  document?.querySelector('html')?.setAttribute('lang', locale);

}

const loadLocaleMessages = async (i18n: I18n, locale: string) => {
  // load locale messages with dynamic import
  const messages = await import(
    /* webpackChunkName: "locale-[request]" */ `./assets/locales/${locale}.json`
    )

  // set locale and locale message
  i18n.global.setLocaleMessage(locale, messages.default)

  return nextTick()
}
