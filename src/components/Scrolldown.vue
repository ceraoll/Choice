<!-- src/components/ScrollDownIcon.vue -->
<template >
  <transition name="fade">
    <div v-if="!scrolledDown" class="hidden sm:flex flex-col items-center">
      <div class="relative flex justify-center items-center">
        <svg
          class="w-12 h-12 stroke-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="7"
            y="4"
            width="10"
            height="16"
            rx="5"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></rect>
          <path
            class="animate-scroll"
            d="M12 6v4"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </div>
      <div class="text-center text-gray-500">Scroll Down</div>
    </div>
  </transition>
</template>
  
<script>
  export default {
    name: "ScrollDownIcon",
    data() {
      return {
        scrolledDown: false,
      };
    },
    mounted() {
      window.addEventListener("scroll", this.handleScroll);
    },
    beforeDestroy() {
      window.removeEventListener("scroll", this.handleScroll);
    },
    methods: {
      handleScroll() {
        this.scrolledDown = window.scrollY > 100;
      },
    },
  };
  </script>
  
  <style scoped>
  @keyframes scroll {
    0%,
    100% {
      opacity: 0;
      transform: translateY(-4px);
    }
    50% {
      opacity: 1;
      transform: translateY(4px);
    }
  }
  
  .animate-scroll {
    animation: scroll 1.5s infinite;
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
  }
  </style>
  