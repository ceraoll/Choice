<script setup>
  import Scrolldown from './Scrolldown.vue';
</script>

<template>
  <div class="relative bg-gray-900 text-white">
    <!-- Background Image -->
    <img
      src="/image/ales-nesetril-Im7lZjxeLhg-unsplash.jpg"
      alt="Laptop Background"
      class="absolute inset-0 w-full h-full object-cover opacity-60"
    />
    <div class="relative z-10 flex flex-col items-center justify-center h-[calc(100dvh-72px)] text-center px-4">
      <!-- Title -->
      <img src="/image/choice.svg" alt="Choice">
      <!-- Subtitle -->
      <p class="mt-4 text-lg md:text-2xl">
        Help you recommend a Laptop
      </p>
      <!-- Button -->
      <button
        class="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition"
      >
        Hitung
      </button>
    </div>
    <!-- Gradient Overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-gray-900 via-transparent to-gray-900 opacity-70"
    ></div>
    <Scrolldown class="absolute bottom-8 z-50 left-1/2 -translate-x-1/2" />
  </div>
</template>