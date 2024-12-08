<template>
  <main class="flex flex-col w-full h-full">
    <div class="bg-[#D9D9D9] w-full h-1/2 flex items-center md:px-16">
        <div class="text-6xl font-bold tracking-widest">
          <br>
          GET IN<br>
          TOUCH<br>
          WITH US
        </div>
    </div>
    <div class="md:absolute md:right-16 md:rounded-3xl border border-slate-400 md:top-1/2 md:-translate-y-1/2 md:w-1/2 bg-white shadow-darken p-16">
      <transition name="fade" mode="out-in">
        <div v-if="!isRegister" class="py-6">
          <h1 class="text-6xl font-bold tracking-wide">Login</h1>
          <form @submit.prevent="handleLogin()">
            <div class="py-4 grid grid-cols-5 items-center">
              <label for="username" class="font-medium text-xl py-4 col-span-2">Username</label>
              <input
                id="username"
                type="text"
                v-model="username"
                class="col-span-3 px-6 py-4 border border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div class="py-4 grid grid-cols-5 items-center">
              <label for="password" class="font-medium text-xl py-4 col-span-2">Password</label>
              <input
                id="password"
                type="password"
                v-model="password"
                class="col-span-3 px-6 py-4 border border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div class="grid grid-cols-2 my-8 items-center">
              <p class="text-gray-600">
                Don't have an account?
                <span @click="isRegister = true;" class="cursor-pointer hover:underline text-[#BB99A0] font-bold text-xl">Register</span>
              </p>
              <button
                type="submit"
                class=" bg-[#213C57] text-[#BB99A0] font-semibold tracking-wide text-lg py-2 px-4 rounded-lg hover:bg-[#162738] transition duration-300"
              >
                {{ (loading) ? "LOADING" : "LOGIN" }}
              </button>
            </div>
          </form>
        </div>
        <div v-else class="py-6">
          <h1 class="text-6xl font-bold tracking-wide">Register</h1>
          <form @submit.prevent="handleRegister()">
            <!-- Username -->
            <div class="py-4 grid grid-cols-5 items-center">
              <label for="username" class="font-medium text-xl py-4 col-span-2">Username</label>
              <input
                id="username"
                type="text"
                v-model="usernameRegister"
                class="col-span-3 px-6 py-4 border border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <!-- Password -->
            <div class="py-4 grid grid-cols-5 items-center">
              <label for="password" class="font-medium text-xl py-4 col-span-2">Password</label>
              <input
                id="password"
                type="password"
                v-model="passwordRegister"
                class="col-span-3 px-6 py-4 border border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <!-- Re-enter Password -->
            <div class="py-4 grid grid-cols-5 items-center">
              <label for="confirmPassword" class="font-medium text-xl py-4 col-span-2">Re-enter Password</label>
              <input
                id="confirmPassword"
                type="password"
                v-model="confirmPassword"
                class="col-span-3 px-6 py-4 border border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            
            <!-- Submit Button -->
            <div class="grid grid-cols-2 my-8 items-center">
              <!-- Login Link -->
              <p class="text-gray-600">
                Already have an account?
                <span @click="isRegister = false;" class="cursor-pointer hover:underline text-[#BB99A0] font-bold text-xl">Login</span>
              </p>
              <button
              type="submit"
              class=" bg-[#213C57] text-[#BB99A0] font-semibold tracking-wide text-lg py-2 px-4 rounded-lg hover:bg-[#162738] transition duration-300"
              >
              REGISTER
            </button>
          </div>
          </form>
        </div>
      </transition>
    </div>
  </main>
</template>

<script>
import { login, logout, useAuthState } from "@/utils/useAuth";
import { useToast } from "vue-toastification";

export default {
  data() {
    return {
      isRegister: false,
      loading: false,
      usernameRegister: '',
      passwordRegister: '',
      confirmPassword: '',
      username: '',
      password: '',
      toast: useToast(),
      error: {
        usernameKosong: "Username tidak boleh kosong!",
        passwordKosong: "Password tidak boleh kosong!",
        minimalUsername: "Username setidaknya 4 karakter",
        minimalPassword: "Password setidaknya 8 karakter",
        konfirmasiPasswordKosong: "Isi konfirmasi password!",
        konfirmasiPassword: "Password tidak sama!"
      }
    }
  },
  methods: {
    validateForm() {
      let messages = [];
      if (!this.isRegister) { // Login
        if (!this.username || this.username.trim() === '') {
          messages.push(this.error.usernameKosong); 
        } else if (this.username.length < 4) {
          messages.push(this.error.minimalUsername); 
        }
        if (!this.password || this.password.trim() === '') {
          messages.push(this.error.passwordKosong);
        } else if (this.password.length < 8) {
          messages.push(this.error.minimalPassword);
        }


        if (messages.length > 0) {
          messages.forEach((message) => this.toast.error(message));
          return false;
        }
        
        return true;
      } else {

        if (!this.usernameRegister || this.usernameRegister.trim() === '') {
          messages.push(this.error.usernameKosong); 
        } else if (this.usernameRegister.length < 4) {
          messages.push(this.error.minimalUsername); 
        }

        if (!this.passwordRegister || this.passwordRegister.trim() === '') {
          messages.push(this.error.passwordKosong);
        } else if (this.passwordRegister.length < 4) {
          messages.push(this.error.minimalPassword); 
        }

        if (!this.confirmPassword || this.confirmPassword.trim() === '') {
          messages.push(this.error.konfirmasiPasswordKosong); 
        } else if (this.passwordRegister !== this.confirmPassword) {
          messages.push(this.error.konfirmasiPassword); 
        }

        if (messages.length > 0) {
          messages.forEach((message) => this.toast.error(message));
          return false;
        }

        return true;
      }
    },
    async handleLogin() {
      if (!this.validateForm()) return;
      this.loading = true;
      login(this.username, this.password);
    },

    handleRegister() {
      this.validateForm();
      this.loading = true;
      logout();
    },
  }
}
</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease-in-out;
  }
</style>