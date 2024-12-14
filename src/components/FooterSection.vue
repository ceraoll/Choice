<template>
  <footer class="flex flex-row items-center justify-between w-full gap-16 px-8 py-8 md:px-24 shadow-darken-top">
    <div>
      <img src="/image/brand-logo.svg" alt="Choice">
    </div>
    <div class="flex flex-grow">
      <p class="text-sm lg:text-base">
        ©2024 Kelompok 3 - SPK. All rights reserved
      </p>
    </div>
    <div>
      <p class="text-sm lg:text-base">
        <button class="text-[#486284] hover:text-[#384e6a]" @click="showModal = true;">Terms & Conditions</button>
      </p>
    </div>
  </footer>
  <ModalConfirmation type="terms&conditions" :showModal="showModal" @close="showModal = false;" />
</template>

<script setup>
import ModalConfirmation from './ModalConfirmation.vue';
import { ref } from 'vue';

const showModal = ref(false);
</script>