import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TravelerListView from '@/views/Traveler/ListView.vue';
import TravelerDetailsView from '@/views/Traveler/DetailsView.vue';
import PilotListView from '@/views/Pilot/ListView.vue';
import PilotDetailsView from '@/views/Pilot/DetailsView.vue';
import ShipListView from '@/views/Ship/ListView.vue';
import ShipDetailsView from '@/views/Ship/DetailsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/traveler',
      name: 'travelers',
      component: TravelerListView
    },
    {
      path: '/traveler/:id(\\d+)',
      name: 'travelerDetails',
      component: TravelerDetailsView
    },
    {
      path: '/pilot',
      name: 'pilots',
      component: PilotListView
    },
    {
      path: '/pilot/:id(\\d+)',
      name: 'pilotDetails',
      component: PilotDetailsView
    },
    {
      path: '/ship',
      name: 'ships',
      component: ShipListView
    },
    {
      path: '/ship/:slug(\\w+)',
      name: 'shipDetails',
      component: ShipDetailsView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
