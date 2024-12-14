<template>
  <div>
    <h1 class="py-2 text-2xl font-semibold">
      Tabel Data Laptop
    </h1>
    <div class="w-full border-b"></div>
    <div class="flex flex-row justify-end w-full py-4 font-semibold">
      <div v-if="true"
      :click="() => {console.log('Modal Laptop')}"
      class="flex flex-row items-center gap-4">
        <div class="flex-row items-center hidden gap-4 sm:flex">
          <span>Search</span>
          <input v-model="searchQuery" type="text" class="px-2 py-1 font-normal bg-white border border-black">
        </div>
        <div class="flex sm:hidden items-center justify-center cursor-pointer w-8 h-8 bg-[#EFEFEF] hover:bg-[#CFCFCF] rounded-full">
          <IconSearch />
        </div>
        <div 
          @click="showModal = true"
          class="bg-[#6DE08A] hover:bg-[#57bb70] transition ease rounded font-normal text-white py-1.5 px-3 cursor-pointer text-xl">Tambah Laptop</div>
      </div>
    </div>
    <div class="flex justify-center w-full">
      <LaptopTable :searchQuery="searchQuery" @showModalUpdate="handleModalUpdate" @showModalDelete="handleModalDelete" />
    </div>
  </div>
  <ModalLaptopForm :showModal="showModal" @close="showModal = false"/>
  <ModalLaptopUpdateForm :showModal="showModalUpdate" :id_laptop="selectedIdLaptop ? selectedIdLaptop : 0" @close="showModalUpdate = false" />
  <ModalConfirmation type="delete" :showModal="showModalDelete" :id_laptop="selectedIdLaptop ? selectedIdLaptop : 0" @close="showModalDelete = false;" />
</template>

<script setup>
import LaptopTable from '../Tabel/LaptopTable.vue';
import ModalLaptopUpdateForm from '../ModalLaptopUpdateForm.vue';
import ModalConfirmation from '../ModalConfirmation.vue';
import ModalLaptopForm from '../ModalLaptopForm.vue';
import IconSearch from '../ui/IconSearch.vue';
import { ref } from 'vue';

const showModal = ref(false);
const showModalUpdate = ref(false);
const showModalDelete = ref(false);
const selectedIdLaptop = ref(null);
const searchQuery = ref('');

const handleModalUpdate = (id_laptop) => {
  selectedIdLaptop.value = id_laptop; 
  showModalUpdate.value = true;
};

const handleModalDelete = (id_laptop) => {
  selectedIdLaptop.value = id_laptop
  showModalDelete.value = true;
}

</script>
