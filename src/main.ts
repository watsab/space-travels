import 'vuetify/styles'

import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { clickOutside } from '@/directives/clickOutside';
import 'nprogress/nprogress.css';

import { store, key } from '@/store';
import { setupI18n } from '@/i18n';


const i18n = await setupI18n();

createApp(App)
  .use(router)
  .use(store, key)
  .use(i18n)
  .directive('clickOutside', clickOutside)
  .mount('#app')
