import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HitungView from '@/views/HitungView.vue'
import AboutView from '@/views/AboutView.vue'
import Authentication from '@/views/Authentication.vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'


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
    },
    {
      path: '/:pathMatch(.*)*', // Catch-all route for undefined paths
      redirect: '/', // Redirect to the home page or any other default route
    }
  ],
});

// Navigation Guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore(); // Access the auth store

  const accessToken = authStore.accessToken; // Get access token from the store
  const refreshToken = localStorage.getItem('refreshToken'); // Get refresh token from the store
  const isAuthenticated = !!accessToken; // Check if access token exists

  // Redirect unauthenticated users to the login page for protected routes
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/authenticate');
  }

  // If authenticated, validate or refresh tokens
  if (isAuthenticated) {
    try {
      // Validate the current access token
      await axios.get(`${API}/userinfo`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return next(); // Access token is valid, proceed
    } catch (err) {
      if (err.response?.status === 401) {
        // Access token is invalid, attempt to refresh it
        try {
          const response = await axios.post(`${API}/token`, { token: refreshToken });
          const newAccessToken = response.data.accessToken;

          // Update the store with the new access token
          authStore.setAuthData(response.data.userInfo, newAccessToken);
          return next(); // Retry navigation after refreshing token
        } catch (refreshError) {
          console.error('Failed to refresh token:', refreshError);

          // Clear auth data and redirect to login
          authStore.clearAuthData();
          return next('/authenticate');
        }
      } else {
        console.error('Error validating access token:', err);

        // Clear auth data on validation error and redirect to login
        authStore.clearAuthData();
        return next('/authenticate');
      }
    }
  } else if (!isAuthenticated) {
    try {
      if (!refreshToken) throw new Error();
      const response = await axios.post(`${API}/token`, { token: refreshToken });
      if (!response) throw response.error;
      const userinfo = response.data.userInfo;
      const newAccessToken = response.data.accessToken;
      authStore.setAuthData(userinfo, newAccessToken);
      if (to.name === 'authenticate' && authStore.userinfo) {
        return next(from.fullPath || '/');
      }
    } catch (refreshError) {
      // Clear auth data and redirect to login
      localStorage.removeItem('refreshToken');
      authStore.clearAuthData();
      if (to.name === 'hitung') {
        return next('/authenticate')
      }
    }
  }

  // Prevent authenticated users from accessing the login page
  

  // Proceed for all other cases
  next();
});



export default router
