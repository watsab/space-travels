import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TravelerListView from '@/views/Traveler/ListView.vue';
import TravelerDetailsView from '@/views/Traveler/DetailsView.vue';
import PilotListView from '@/views/Pilot/ListView.vue';
import PilotDetailsView from '@/views/Pilot/DetailsView.vue';
import ShipListView from '@/views/Ship/ListView.vue';
import ShipDetailsView from '@/views/Ship/DetailsView.vue';
import NotFound from '@/components/NotFound.vue';
import NetworkError from '@/components/NetworkError.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/travelers',
      children: [
        {
          path: '',
          name: 'travelers',
          component: TravelerListView,
        },
        {
          path: ':id(\\d+)',
          name: 'travelerDetails',
          component: TravelerDetailsView
        },
      ]
    },
    {
      path: '/pilot',
      children: [
        {
          path: '',
          name: 'pilots',
          component: PilotListView,
        },
        {
          path: ':id(\\d+)',
          name: 'pilotDetails',
          component: PilotDetailsView
        }
      ]
    },
    {
      path: '/ship',
      children: [
        {
          path: '',
          name: 'ships',
          component: ShipListView,
        },
        {
          path: ':slug(\\w+)',
          name: 'shipDetails',
          component: ShipDetailsView
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/404',
      name: 'notFound',
      component: NotFound
    },
    {
      path: '/:notFound(.*)',
      component: NotFound
    },
    {
      path: '/network-error',
      name: 'networkError',
      component: NetworkError
    },
  ]
})

export default router
