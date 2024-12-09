<template>
  <div class="w-full overflow-x-auto">
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
      <tbody>
        <tr v-for="(row, index) in data" :key="index" class="bg-[#FCFCFC] hover:bg-gray-100 text-[#8196AA]">
          <td class="px-4 py-2 border border-[#708DAA]">{{ index+1 }}</td>
          <td v-for="(value, key) in row" :key="key" class="px-4 py-2 border border-[#708DAA]">
            {{ value }}
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
import { ref, onMounted } from "vue";
export default {
  setup() {
    const tableHeaders = [
      { id_header: "1", nama: "Nama"},
      { id_header: "2", nama: "Harga" },
      { id_header: "3", nama: "Berat" },
      { id_header: "4", nama: "Kapasitas ROM" },
      { id_header: "5", nama: "Kapasitas RAM" },
      { id_header: "6", nama: "Kecepatan RAM" },
      { id_header: "7", nama: "Resolusi Layar" },
      { id_header: "8", nama: "Processor" },
    ];

    const data = ref([]); 

    onMounted(async () => {
      try {
        const response = await getLaptop();
        data.value = response.map((laptop) => ({
          nama: laptop.nama_laptop,
          harga: "Rp. " + laptop.harga,
          berat: laptop.berat + " KG",
          kapasitas_rom: laptop.kapasitas_rom,
          kapasitas_ram: laptop.kapasitas_ram,
          kecepatan_ram: laptop.kecepatan_ram,
          resolusi: laptop.resolusi,
          processor: laptop.processor,
        }));
      } catch (error) {
        console.error("Failed to fetch laptop data:", error);
      }
    });


    return { tableHeaders, data };
  },
};
</script>
