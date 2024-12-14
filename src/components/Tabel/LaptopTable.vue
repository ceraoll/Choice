<template>
  <div class="w-full max-h-[calc(113*4px+65px)] overflow-auto">
    <table class="min-w-[576px] table-auto border-collapse w-full bg-white shadow-md rounded-lg">
      <thead>
        <tr class="bg-[#E1E9F6] text-[#697E93]">
          <th class="px-4 py-2 border border-[#708DAA] text-left">
            No
          </th>
          <th v-for="header in tableHeaders" :key="header.id_header" class="px-4 py-2 border border-[#708DAA] text-left">
            {{ header.nama }}
          </th>
        </tr>
      </thead>
      <tbody v-if="filteredData.length">
        <tr v-for="(row, index) in filteredData" :key="index" class="bg-[#FCFCFC] hover:bg-gray-100 text-[#8196AA]">
          <td class="px-4 py-2 border border-[#708DAA]">{{ index+1 }}</td>
          <td v-for="(value, key) in filteredRow(row)" :key="key" class="px-4 py-2 border border-[#708DAA]" >
            <div :class="{
              'overflow-x-auto whitespace-nowrap max-w-32': key === 'harga',
              'overflow-x-auto whitespace-nowrap max-w-16': key === 'berat',
              '': key !== 'harga' && key !== 'berat'
            }">
              {{ value }}
            </div>
          </td>
          <td class="px-4 py-2 border border-[#708DAA]">
            <div class="flex flex-row items-center justify-center gap-2 font-semibold text-white">
              <button 
                class="px-1.5 py-1 bg-[#6DE0DC]"
                @click="$emit('showModalUpdate', row.id_laptop)"
              >
                Edit
              </button>
              <button 
                class="px-1.5 py-1 bg-[#E06D6D]"
                @click="$emit('showModalDelete', row.id_laptop)"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr class="bg-[#FCFCFC] hover:bg-gray-100 text-[#8196AA]">
          <td colspan="10" class="text-center px-4 py-2 border border-[#708DAA]">
            Laptop tidak ditemukan
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
  th {
    font-weight: normal;
  }
</style>

<script>
import { getLaptop } from "@/utils/useLaptop";
import { formatRupiah } from "@/utils/useFormatRupiah";
import { ref, onMounted, computed, watch } from "vue";
export default {
  props: {
    searchQuery: {
      type: String,
      required: false
    }
  },
  setup(props) {
    // Props
    const { searchQuery } = props;
    const tableHeaders = [
      { id_header: "1", nama: "Nama"},
      { id_header: "2", nama: "Harga" },
      { id_header: "3", nama: "Berat" },
      { id_header: "4", nama: "Kapasitas ROM" },
      { id_header: "5", nama: "Kapasitas RAM" },
      { id_header: "6", nama: "Kecepatan RAM" },
      { id_header: "7", nama: "Resolusi Layar" },
      { id_header: "8", nama: "Processor" },
      { id_header: "9", nama: "Aksi"}
    ];

    const data = ref([]); 
    const filteredData = ref([]);

    function filteredRow (row) {
      const keysToSkip = ['id_laptop'];
      return Object.entries(row).reduce((acc, [key, value]) => {
        if (!keysToSkip.includes(key)) {
          acc[key] = value;
        }
        return acc;
      }, {});
    }

    onMounted(async () => {
      try {
        const response = await getLaptop();
        data.value = response.map((laptop) => ({
          id_laptop: laptop.id_laptop,
          nama: laptop.nama_laptop,
          harga: formatRupiah(Math.trunc(laptop.harga)),
          berat: laptop.berat + " KG",
          kapasitas_rom: laptop.kapasitas_rom,
          kapasitas_ram: laptop.kapasitas_ram,
          kecepatan_ram: laptop.kecepatan_ram,
          resolusi: laptop.resolusi,
          processor: laptop.processor,
        }));

        filteredData.value = data.value;
      } catch (error) {
        console.error("Failed to fetch laptop data:", error);
      }
    });

    watch(
      () => props.searchQuery,
      (newQuery) => {
        if (!newQuery) {
          filteredData.value = data.value;
        } else {
          filteredData.value = data.value.filter((item) =>
            Object.values(item).some((val) =>
              String(val).toLowerCase().includes(newQuery.toLowerCase())
            )
          );
        }
      },
      { immediate: true } 
    );

    return { tableHeaders, filteredData, searchQuery, filteredRow };
  },
};
</script>
