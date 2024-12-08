import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HitungView from '@/views/HitungView.vue'
import AboutView from '@/views/AboutView.vue'
import Authentication from '@/views/Authentication.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/hitung',
      name: 'hitung',
      component: HitungView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/about-us',
      name: 'about',
      component: AboutView
    },
    {
      path: '/authenticate',
      name: 'authenticate',
      component: Authentication
    }
  ],
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('accessToken'); // Check if token exists

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/authenticate'); 
  } else if (to.name === 'authenticate' && isAuthenticated) {
    next(from.fullPath || '/');
  } else {
    next(); 
  }
});

export default router
