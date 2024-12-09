<template>
  <div>
    <h1 class="py-2 text-2xl font-semibold">
      Tabel Kriteria
    </h1>
    <div class="w-full border-b"></div>
    <div class="flex justify-center w-full">
      <CriteriaTable />
    </div>
  </div>
</template>

<script setup>
import CriteriaTable from '../Tabel/CriteriaTable.vue';
import IconSearch from '../ui/IconSearch.vue';

</script>
