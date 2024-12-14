<script setup>
import { ref, computed, reactive } from 'vue';
import { useAuthState, logout } from '@/utils/useAuth';
  
  const authState = computed(() => {return useAuthState});
	const mobileMenu = ref(false);

  function closeMobileMenu() { // happen when close button is clicked
    mobileMenu.value = !mobileMenu.value;
    toggleBodyClass();
  }

  function toggleMobileMenu() {
    if (mobileMenu.value) {
      // Add a delay when closing the menu
      setTimeout(() => {
        mobileMenu.value = !mobileMenu.value;
        toggleBodyClass();
      }, 300);
    } else {
      // Immediately open the menu
      mobileMenu.value = !mobileMenu.value;
      toggleBodyClass();
    }
  }

  function toggleBodyClass() {
    if (document.body.classList.contains("overflow-hidden") && !mobileMenu.value) {
      document.body.classList.remove("overflow-hidden");
    } else {
      document.body.classList.add("overflow-hidden");
    }
  }


</script>

<template>
	<div class="min-h-[72px] relative">
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
	
		</nav>

    <button
      class="fixed z-[51] text-gray-600 right-4 top-6 md:hidden focus:outline-none"
      @click="closeMobileMenu"
      v-if="mobileMenu"
    >
      <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
      <span class="sr-only">Close modal</span>
    </button>
    <!-- Mobile Menu -->
    <div v-if="mobileMenu" class="fixed top-0 left-0 z-50 flex flex-col items-center justify-center w-full text-center transition bg-white shadow-md h-dvh md:hidden">
      <div class="text-[#486284] w-full border-b">
        <router-link
          @click="toggleMobileMenu"
          :to="{ name: 'about' }" 
          class="block w-full py-8 transition text-inherit hover:bg-gray-200 hover:text-gray-800">
          About Us
        </router-link>
      </div>
      <!-- Navigation Links -->
      <div class="text-[#486284] w-full" v-if="!authState.isLoggedIn">
        <router-link 
          @click="toggleMobileMenu"
          :to="{ name: 'authenticate' }" 
          class="block w-full py-8 transition text-inherit hover:bg-gray-200 hover:text-gray-800">
          Login
        </router-link>
      </div>

      <div class="text-[#486284] w-full" v-else>
        <div 
        @click="logout()" 
        class="w-full py-8 transition cursor-pointer text-inherit hover:bg-gray-200 hover:text-gray-800">
        Logout
      </div>
      </div>
    </div>
	</div>
</template>