<script>
import Navbar from '@/components/Navbar.vue';
import { useToast } from 'vue-toastification';
const toast = useToast();
export default {
  setup() {
    
  },
  components: {
    Navbar
  },
  mounted() {
    const toastMessage = localStorage.getItem('toastMessage');
    if (toastMessage) {
      const { status, message } = JSON.parse(toastMessage);
      if (status === 'success') {
        requestAnimationFrame(() => {
          toast.success(message);
        })
      } else if (status === 'error') {
        requestAnimationFrame(() => {
          toast.error(message);
        })
      }
      localStorage.removeItem('toastMessage');
    }
  },
}
</script>
<template>
  <div class="h-full">
    <Navbar />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style>
  html {
    scroll-behavior: smooth;
  }

  html, body {
   height: calc(100% - 72px);
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.4s ease-in-out;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>