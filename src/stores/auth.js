import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userinfo: {},       // User information
    accessToken: null,  // Access token
    isLoggedIn: false,  // Login status
  }),
  getters: {
    getToken(state) {
      return state.accessToken;
    },
    getUserInfo(state) {
      return state.userinfo;
    },
  },
  actions: {
    setAuthData(userinfo, accessToken) {
      this.userinfo = userinfo;
      this.accessToken = accessToken;
      this.isLoggedIn = !!accessToken;
    },
    clearAuthData() {
      this.userinfo = {};
      this.accessToken = null;
      this.isLoggedIn = false;
    },
  },
});
