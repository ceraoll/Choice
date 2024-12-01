<template>
  <div>
    <h1 class="font-semibold text-2xl py-2">
      Tabel Kriteria
    </h1>
    <div class="border-b w-full"></div>
    <div class="flex flex-row w-full justify-between py-4 font-semibold">
      <div class="flex flex-row gap-2 items-center">
        <span>Show</span>
        <input type="text" class="border bg-white px-2 py-1 border-black w-12 text-right font-normal" value="v">
        <span>Entries</span>
      </div>
      <div class="hidden sm:flex flex-row gap-4 items-center">
        <span>Search</span>
        <input type="text" class="border bg-white px-2 py-1 border-black font-normal">
      </div>
      <div class="flex sm:hidden items-center justify-center cursor-pointer w-8 h-8 bg-[#EFEFEF] hover:bg-[#CFCFCF] rounded-full">
        <IconSearch />
      </div>
    </div>
    <div class="w-full flex justify-center">
      <CriteriaTable />
    </div>
  </div>
</template>

<script setup>
import CriteriaTable from '../CriteriaTable.vue';
import IconSearch from '../ui/IconSearch.vue';

</script>
