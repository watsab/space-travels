import { createRouter, createWebHistory, useRouter } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TravelerListView from '@/views/Traveler/ListView.vue';
import TravelerDetailsView from '@/views/Traveler/DetailsView.vue';
import PilotListView from '@/views/Pilot/ListView.vue';
import PilotDetailsView from '@/views/Pilot/DetailsView.vue';
import ShipListView from '@/views/Ship/ListView.vue';
import ShipDetailsView from '@/views/Ship/DetailsView.vue';
import NotFound from '@/components/NotFound.vue';
import NetworkError from '@/components/NetworkError.vue';
import nProgress from 'nprogress';
import { getAll } from '@/services/travelersManager';
import store from '@/store';
import type { Traveler } from '@/models/Traveler';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 };
  },
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
      beforeEnter: async (to) => {
        let travelers: Traveler[] = [];
        try {
          travelers = await getAll(parseInt(to.query.page) || 1);
        } catch (error) {
          return ({ name: 'networkError' });
        } finally {
          store.travelers = travelers;
        }
      },
      children: [
        {
          path: '',
          name: 'travelers',
          component: TravelerListView,
          props: (route) => ({page: Number.parseInt(route.query.page as string, 10) || 1})
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
      path: '/ship/:url(.*)',
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
          path: ':slug([a-z-]+)',
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
});

router.beforeEach(() => {
  nProgress.start();

  return true;
});

router.afterEach(() => {
  nProgress.done();

  return true;
})

export default router
