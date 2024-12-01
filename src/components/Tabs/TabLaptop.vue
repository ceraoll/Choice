<template>
  <div>
    <h1 class="font-semibold text-2xl py-2">
      Tabel Data Laptop
    </h1>
    <div class="border-b w-full"></div>
    <div class="flex flex-row w-full justify-between py-4 font-semibold">
      <div class="flex flex-row gap-2 items-center">
        <span>Show</span>
        <input type="text" class="border bg-white px-2 py-1 border-black w-12 text-right font-normal" value="v">
        <span>Entries</span>
      </div>
      <div v-if="true"
      :click="() => {console.log('Modal Laptop')}"
      class="flex flex-row gap-4 items-center">
        <div class="hidden sm:flex flex-row gap-4 items-center">
          <span>Search</span>
          <input type="text" class="border bg-white px-2 py-1 border-black font-normal">
        </div>
        <div class="flex sm:hidden items-center justify-center cursor-pointer w-8 h-8 bg-[#EFEFEF] hover:bg-[#CFCFCF] rounded-full">
          <IconSearch />
        </div>
        <div 
          @click="showModal = true"
          class="bg-[#6DE08A] hover:bg-[#57bb70] transition ease rounded font-normal text-white py-1.5 px-3 cursor-pointer text-xl">Tambah Laptop</div>
      </div>
    </div>
    <div class="w-full flex justify-center">
      <LaptopTable />
    </div>
  </div>
  <ModalLaptopForm :showModal="showModal" @close="showModal = false"/>
</template>

<script setup>
import InputSelect from '../forms/InputSelect.vue';
import LaptopTable from '../LaptopTable.vue';
import ModalLaptopForm from '../ModalLaptopForm.vue';
import IconSearch from '../ui/IconSearch.vue';
import { ref } from 'vue';

const showModal = ref(false);

</script>
