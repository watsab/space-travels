import 'vuetify/styles'

import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { clickOutside } from '@/directives/clickOutside';
import 'nprogress/nprogress.css';

import { store, key } from '@/store';

createApp(App)
  .use(router)
  .use(store, key)
  .directive('clickOutside', clickOutside)
  .mount('#app')
