<script>
import Navbar from '@/components/Navbar.vue';
export default {
  setup() {
    
  },
  components: {
    Navbar
  }
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