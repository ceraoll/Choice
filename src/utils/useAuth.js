// src/utils/auth.js
import router from '@/router';
import axios from 'axios';
import { reactive } from 'vue';
import { useToast } from 'vue-toastification';
const API = import.meta.env.VITE_CHOICE_API;

axios.interceptors.response.use(
  response => response,
  error => {
    // Tangani error di sini tanpa logging ke konsol
    return Promise.reject(error);
  }
);

const toast = useToast();

export const useAuthState = reactive({
  isLoggedIn: !!localStorage.getItem('accessToken'),
});

export async function login(username, password) {
  await axios.post(`${API}/login`, {
    username: username,
    password: password,
  }).then((response) => {
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);

    localStorage.setItem('userinfo', JSON.stringify(response.data.userInfo));

    useAuthState.isLoggedIn = true;
    router.go(-1);
    toast.success("Successfully Login");
  }).catch((error) => {
    if (error.response && error.response.data) {
      toast.error(error.response.data.error);
    } else {
      toast.error('Something went wrong. Please try again.');
    }
  }) 
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

export async function logout() {
  try {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userinfo');
    useAuthState.isLoggedIn = false;
    
    const toastMessage = {
      status: 'success',
      message: 'Berhasil logout!',
    };
    localStorage.setItem('toastMessage', JSON.stringify(toastMessage));
    router.go(0);

  } catch (error) {
    if (error.response && error.response.data) {
      toast.error(error.response.data.error); 
    } else {
      toast.error('Something went wrong. Please try again.');
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userinfo');
    useAuthState.isLoggedIn = false;
  }
  
}