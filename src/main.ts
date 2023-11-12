import 'vuetify/styles'

import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { clickOutside } from '@/directives/clickOutside';
import 'nprogress/nprogress.css';

import store from '@/store';

const app = createApp(App)
app.use(router);
app.provide('store', store);
app.directive('clickOutside', clickOutside);
app.mount('#app')
