import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HitungView from '@/views/HitungView.vue'
import AboutView from '@/views/AboutView.vue'
import Authentication from '@/views/Authentication.vue'
import axios from 'axios'


const API = import.meta.env.VITE_CHOICE_API;

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
router.beforeEach(async (to, from, next) => {
  const accessToken = localStorage.getItem('accessToken'); // Retrieve access token
  const refreshToken = localStorage.getItem('refreshToken'); // Retrieve refresh token
  const isAuthenticated = !!accessToken; // Check if access token exists

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/authenticate');
  }

  if (isAuthenticated) {
    try {
      await axios.get(`${API}/userinfo`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return next();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        try {
          const response = await axios.post(`${API}/token`, { token: refreshToken });
          const newAccessToken = response.data.accessToken;

          localStorage.setItem('accessToken', newAccessToken);
          return next();
        } catch (refreshError) {
          console.error('Failed to refresh token:', refreshError);

          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('userinfo')
          return next('/authenticate');
        }
      } else {
        console.error('Error validating access token:', err);
        return next('/authenticate');
      }
    }
  }

  // If route is 'authenticate' and user is already authenticated, redirect to the previous page or home
  if (to.name === 'authenticate' && isAuthenticated) {
    return next(from.fullPath || '/');
  }

  // Proceed normally for all other cases
  next();
});


export default router
