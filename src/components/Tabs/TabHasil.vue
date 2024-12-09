<template>
  <div>
    <h1 class="py-2 text-2xl font-semibold">
      Tabel Ranking Laptop
    </h1>
    <div class="w-full border-b"></div>
    <div class="flex justify-center w-full">
      <SAWResultTable @showModal="showModal = true" />
    </div>
  </div>
  <ModalLaptopForm :showModal="showModal" @close="showModal = false"/>
</template>

<script setup>
import SAWResultTable from '../Tabel/SAWResultTable.vue';
import ModalLaptopForm from '../ModalLaptopForm.vue';
import { ref } from "vue";

const showModal = ref(false);
</script>
