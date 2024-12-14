// src/utils/auth.js
import router from '@/router';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '@/stores/auth'; // Import the Pinia store

const API = import.meta.env.VITE_CHOICE_API;

axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

const toast = useToast();

export async function login(username, password) {
  const authStore = useAuthStore(); // Access the store instance
  try {
    const response = await axios.post(`${API}/login`, {
      username: username,
      password: password,
    });

    // Update the store with user data and tokens
    authStore.setAuthData(
      response.data.userInfo,
      response.data.accessToken,
    );

    localStorage.setItem("refreshToken", response.data.refreshToken);

    router.go(-1);
    toast.success("Successfully Login");
  } catch (error) {
    if (error.response && error.response.data) {
      toast.error(error.response.data.error);
    } else {
      toast.error("Something went wrong. Please try again.");
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
      toast.error("Something went wrong. Please try again.");
    }
  }
}

export async function checkUsername(username) {
  try {
    const response = await axios.get(`${API}/check-username`, {
      params: { username },
    });
    return response.data.isAvailable;
  } catch (error) {
    console.error("Error checking username:", error);
    throw error;
  }
}

export async function logout() {
  const authStore = useAuthStore(); // Access the store instance
  try {
    localStorage.removeItem("refreshToken");
    authStore.clearAuthData(); // Reset auth data in the store

    const toastMessage = {
      status: "success",
      message: "Successfully logged out!",
    };
    localStorage.setItem("toastMessage", JSON.stringify(toastMessage));
    router.go(0);
  } catch (error) {
    toast.error("Something went wrong. Please try again.");
    authStore.clearAuthData(); // Reset auth data on error
  }
}
