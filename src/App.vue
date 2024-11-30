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
  <div>
    <Navbar />
    <RouterView />
  </div>
</template>

<style>
  html {
    scroll-behavior: smooth;
  }
</style>