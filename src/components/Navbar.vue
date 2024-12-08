<script setup>
import { ref, computed, reactive } from 'vue';
import { useAuthState, logout } from '@/utils/useAuth';
  
  const authState = computed(() => {return useAuthState});
	const mobileMenu = ref(false);

	function toggleMobileMenu() {
		mobileMenu.value = !mobileMenu.value;
	}


</script>

<template>
	<div class="min-h-[72px]">
		<nav class="bg-white shadow-lg top-0 fixed z-50 w-full h-[72px] flex items-center">
			<div class="container flex items-center px-4 py-4 mx-auto">
				<!-- Logo -->
				<div class="text-2xl font-bold text-gray-800">
					<router-link :to="{name: 'home'}">
						<img src="/image/brand-logo.svg" alt="Choice Logo">
					</router-link>
				</div>
				
        <div class="flex flex-row items-center justify-end flex-grow gap-8">
          <!-- Navigation Links -->
          <div class="hidden md:flex space-x-8 text-[#486284]">
            <router-link :to="{ name: 'about' }" class="transition text-inherit hover:text-gray-800">About Us</router-link>
          </div>
  
          <!-- Navigation Links -->
          <div class="hidden md:flex space-x-8 text-[#486284]" v-if="!authState.isLoggedIn">
            <router-link :to="{ name: 'authenticate' }" class="transition text-inherit hover:text-gray-800">Login</router-link>
          </div>

          <div class="hidden md:flex space-x-8 text-[#486284]" v-else>
            <div @click="logout()" class="transition cursor-pointer text-inherit hover:text-gray-800">Logout</div>
          </div>
          
          <!-- Button -->
          <div v-if="authState.isLoggedIn">
            <router-link
              :to="{name: 'hitung'}"
              class="bg-[#213C57] text-[#BB99A0] block font-bold tracking-wide px-8 py-2 rounded-lg hover:bg-[#192f46] transition"
            >
              Hitung
            </router-link>
          </div>
    
          <!-- Mobile Menu Button -->
          <button
            class="text-gray-600 md:hidden focus:outline-none"
            @click="toggleMobileMenu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
			</div>
	
			<!-- Mobile Menu -->
			<div v-if="mobileMenu" class="shadow-md md:hidden bg-gray-50">
				<a href="#" class="block px-4 py-2 text-gray-600 hover:text-gray-800">About Us</a>
			</div>
		</nav>
	</div>
</template>