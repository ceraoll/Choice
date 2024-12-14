<script setup>
  import Scrolldown from './Scrolldown.vue';
</script>

<template>
  <div class="relative text-white bg-gray-900">
    <!-- Background Image -->
    <img
      src="/image/ales-nesetril-Im7lZjxeLhg-unsplash.jpg"
      alt="Laptop Background"
      class="absolute inset-0 object-cover w-full h-full opacity-60"
    />
    <div class="relative z-10 flex flex-col items-center justify-center h-[calc(100dvh-72px)] text-center px-4">
      <!-- Title -->
      <img src="/image/choice.svg" alt="Choice">
      <!-- Subtitle -->
      <p class="mt-4 text-lg md:text-2xl">
        Help you recommend a Laptop
      </p>
      <!-- Button -->
      <router-link
        :to="{ name: 'hitung' }"
        class="px-6 py-2 mt-6 font-semibold text-white transition bg-blue-600 rounded hover:bg-blue-700"
      >
        Hitung
      </router-link>
    </div>
    <!-- Gradient Overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-gray-900 via-transparent to-gray-900 opacity-70"
    ></div>
    <Scrolldown class="absolute z-20 -translate-x-1/2 bottom-8 left-1/2" />
  </div>
</template>