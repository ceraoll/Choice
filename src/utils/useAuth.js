// src/utils/auth.js
import router from '@/router';
import axios from 'axios';
import { reactive } from 'vue';
import { useToast } from 'vue-toastification';
const API = import.meta.env.VITE_CHOICE_API;


const toast = useToast();

export const useAuthState = reactive({
  isLoggedIn: !!localStorage.getItem('accessToken'),
});

export async function login(username, password) {
  try {
    const response = await axios.post(`${API}/login`, {
      username: username,
      password: password,
    });

    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);

    localStorage.setItem('userInfo', JSON.stringify(response.data.userInfo));

    useAuthState.isLoggedIn = true;
    router.go(-1);
    toast.success("Successfully Login");
  } catch (error) {
    if (error.response && error.response.data) {
      toast.error(error.response.data.error); 
    } else {
      toast.error('Something went wrong. Please try again.');
    }
  }
}

export async function register(username, password) {
  try {
    await axios.post(`${API}/register`, {
      username: username,
      password: password,
    });

    toast.success("Account successfully created");
  } catch (error) {
    if (error.response && error.response.data) {
      toast.error(error.response.data.error); 
    } else {
      toast.error('Something went wrong. Please try again.');
    }
  }
}

export async function checkUsername (username) {
  try {
    const response = await axios.get(`${API}/check-username`, {
      params: {
        username: username,
      },
    });
    return response.data.isAvailable;
  } catch (err) {
    console.error('Error checking username:', err);
    throw err;
  }
}

export function logout() {
  // Clear tokens and redirect
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  toast.success("Successfully Logout");
  useAuthState.isLoggedIn = false;
  router.go(0);
}