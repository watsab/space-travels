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
import store from '@/store';

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
        try {
          await store.dispatch('travelers/fetchTravelers', parseInt(to.query.page as string));
        } catch (error) {
          return ({ name: 'networkError' });
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
          props: (route) => ({ id: Number.parseInt(route.params.id as string, 10) }),
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
          props: (route) => ({ id: Number.parseInt(route.params.id as string, 10) }),
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
          props: true,
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
