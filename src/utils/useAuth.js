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

export function logout() {
  // Clear tokens and redirect
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  toast.success("Successfully Logout");
  useAuthState.isLoggedIn = false;
  router.go()
}