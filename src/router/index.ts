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
      redirect: { name: 'travelers'},
      children: [
        {
          path: ':id(\\d+)',
          redirect: ({ name: 'travelerDetails' })
        },
      ]
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
      path: '/pilot/:url(.*)',
      redirect: (to) => ({ path: `pilots/${to.params.url}`})
    },
    {
      path: '/pilots',
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
      path: '/ships/:url(.*)',
      redirect: (to) => ({ path: `ships/${to.params.url}`})
    },
    {
      path: '/ships',
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
    }
  ]
})

export default router
