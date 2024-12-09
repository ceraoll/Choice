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
    <div class="p-16 bg-white border md:absolute md:right-16 md:rounded-3xl border-slate-400 md:top-1/2 md:-translate-y-1/2 md:w-1/2 shadow-darken">
      <transition name="fade" mode="out-in">
        <div v-if="!isRegister" class="py-6">
          <h1 class="text-6xl font-bold tracking-wide">Login</h1>
          <form @submit.prevent="handleLogin()">
            <div class="grid items-center grid-cols-5 py-4">
              <label for="username" class="col-span-2 py-4 text-xl font-medium">Username</label>
              <input
                id="username"
                type="text"
                v-model="username"
                class="col-span-3 px-6 py-4 border border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div class="grid items-center grid-cols-5 py-4">
              <label for="password" class="col-span-2 py-4 text-xl font-medium">Password</label>
              <input
                id="password"
                type="password"
                v-model="password"
                class="col-span-3 px-6 py-4 border border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div class="grid items-center grid-cols-2 my-8">
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
            <div class="relative grid items-center grid-cols-5 py-4">
              <label for="username" class="col-span-2 py-4 text-xl font-medium">Username</label>
              <input
                id="username"
                type="text"
                v-model="usernameRegister"
                class="col-span-3 px-6 py-4 border border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <div
                class="absolute right-5 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-black"
                role="status" v-if="checkingUsername">
                <span
                  class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                  >Loading...</span
                >
              </div>
              <div class="!absolute right-4" v-if="usernameAvailable && usernameRegister.length > 0">
                <svg class="w-6 h-6 text-green-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="!absolute right-4" v-if="!usernameAvailable && usernameRegister.length > 0">
                <svg class="w-6 h-6 text-red-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>

            <!-- Password -->
            <div class="grid items-center grid-cols-5 py-4">
              <label for="password" class="col-span-2 py-4 text-xl font-medium">Password</label>
              <input
                id="password"
                type="password"
                v-model="passwordRegister"
                class="col-span-3 px-6 py-4 border border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <!-- Re-enter Password -->
            <div class="grid items-center grid-cols-5 py-4">
              <label for="confirmPassword" class="col-span-2 py-4 text-xl font-medium">Re-enter Password</label>
              <input
                id="confirmPassword"
                type="password"
                v-model="confirmPassword"
                class="col-span-3 px-6 py-4 border border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            
            <!-- Submit Button -->
            <div class="grid items-center grid-cols-2 my-8">
              <!-- Login Link -->
              <p class="text-gray-600">
                Already have an account?
                <span @click="isRegister = false;" class="cursor-pointer hover:underline text-[#BB99A0] font-bold text-xl">Login</span>
              </p>
              <button
              type="submit"
              class=" bg-[#213C57] text-[#BB99A0] font-semibold tracking-wide text-lg py-2 px-4 rounded-lg hover:bg-[#162738] transition duration-300"
              >
              {{ (loading) ? "LOADING" : "REGISTER" }}
            </button>
          </div>
          </form>
        </div>
      </transition>
    </div>
  </main>
</template>

<script>
import { checkUsername, login, logout, register, useAuthState } from "@/utils/useAuth";
import { useToast } from "vue-toastification";

export default {
  data() {
    return {
      isRegister: false,
      loading: false,
      checkingUsername: false,
      usernameAvailable: false,
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
  watch: {
    usernameRegister: async function() {
      this.checkingUsername = true;
      this.usernameAvailable = false;
      if(this.usernameRegister.length > 3) {
        const isAvailable = await checkUsername(this.usernameRegister); // Wait for the async function to resolve
        
        if(this.usernameRegister.length > 0) {
          this.usernameAvailable = isAvailable; // Update the availability state
        } else {
          this.usernameAvailable = false
        }
      }
      this.checkingUsername = false;
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
      await login(this.username, this.password);
      this.loading = false;
    },

    handleRegister() {
      this.validateForm();
      this.loading = true;
      register(this.usernameRegister, this.passwordRegister);
      this.username = this.usernameRegister;
      this.password = this.passwordRegister;
      this.usernameRegister = "";
      this.passwordRegister = "";
      this.confirmPassword = "";
      this.loading = false;
      this.isRegister = false;
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