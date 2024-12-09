<template>
  <div>
    <h1 class="py-2 text-2xl font-semibold">
      Tabel Normalisasi Kriteria
    </h1>
    <div class="w-full border-b"></div>
    <div class="flex justify-center w-full">
      <AlternativeValueTable @showModal="showModal = true" />
    </div>
  </div>
  <ModalLaptopForm :showModal="showModal" @close="showModal = false"/>
</template>

<script setup>
import AlternativeValueTable from '../Tabel/AlternativeValueTable.vue';
import ModalLaptopForm from '../ModalLaptopForm.vue';
import { ref } from "vue";

const showModal = ref(false);
</script>
