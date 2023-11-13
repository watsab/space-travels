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
import { store } from '@/store';
import PilotCreateView from '@/views/Pilot/CreateView.vue';
import TravelerCreateView from '@/views/Traveler/CreateView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 };
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Accueil - %'
      }
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
          meta: {
            title: 'Nos voyageurs - %'
          },
          component: TravelerListView,
          props: (route) => ({page: Number.parseInt(route.query.page as string, 10) || 1})
        },
        {
          path: ':id(\\d+)',
          name: 'travelerDetails',
          meta: {
            title: 'Nos voyageurs - %'
          },
          props: (route) => ({ id: Number.parseInt(route.params.id as string, 10) }),
          component: TravelerDetailsView
        },
        {
          path: 'new',
          name: 'travelerCreate',
          meta: {
            title: 'Nouveau Voyageur - %'
          },
          component: TravelerCreateView
        }
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
          meta: {
            title: 'Nos pilotes - %'
          },
          component: PilotListView,
        },
        {
          path: ':id(\\d+)',
          name: 'pilotDetails',
          meta: {
            title: 'Nos pilotes - %'
          },
          props: (route) => ({ id: Number.parseInt(route.params.id as string, 10) }),
          component: PilotDetailsView
        },
        {
          path: 'new',
          name: 'pilotCreate',
          meta: {
            title: 'Nouveau pilote - %'
          },
          component: PilotCreateView
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
          meta: {
            title: 'Nos vaisseaux - %'
          },
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

router.beforeEach((to) => {
  nProgress.start();

  if (to.meta.title && 'string' === typeof to.meta.title) {
    document.title = to.meta.title.replace('%', 'Space Travels');
  } else {
    document.title = 'Space Travels';
  }

  return true;
});

router.afterEach(() => {
  nProgress.done();

  return true;
});

export default router
