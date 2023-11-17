import 'vuetify/styles'

import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { clickOutside } from '@/directives/clickOutside';
import 'nprogress/nprogress.css';

import { store, key } from '@/store';

const userString = localStorage.getItem('user');
if (userString) {
  const userData = JSON.parse(userString);
  store.commit('auth/setUserData', userData);
}

createApp(App)
  .use(router)
  .use(store, key)
  .directive('clickOutside', clickOutside)
  .mount('#app')
