<template>
  <div class="w-full overflow-x-auto">
    <table class="min-w-[576px] table-auto border-collapse w-full bg-white shadow-md rounded-lg">
      <thead>
        <tr class="bg-[#E1E9F6] text-[#697E93]">
          <th class="px-4 py-2 border border-[#708DAA] text-left">
            No
          </th>
          <th v-for="header in criteria" :key="header.kode" class="px-4 py-2 border border-[#708DAA] text-left">
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
import { getNilaiAlternatifLaptop } from "@/utils/useLaptop";
import { ref, onMounted } from "vue";
export default {
  setup() {
    const criteria = [
      { kode: "nama", nama: "Nama"},
      { kode: "C1", nama: "Harga" },
      { kode: "C2", nama: "Berat" },
      { kode: "C3", nama: "Kapasitas ROM" },
      { kode: "C4", nama: "Kapasitas RAM" },
      { kode: "C5", nama: "Kecepatan RAM" },
      { kode: "C6", nama: "Resolusi Layar" },
      { kode: "C7", nama: "Tipe Processor" },
      { kode: "C8", nama: "GenerasiProcessor" },
    ];

    const data = ref([]); // Reactive variable for laptop data

    // Fetch data
    onMounted(async () => {
      try {
        const response = await getNilaiAlternatifLaptop();
        data.value = response.map((laptop) => ({
          nama: laptop.nama_laptop,
          harga: laptop.harga,
          berat: laptop.berat,
          kapasitas_rom: laptop.kapasitas_rom,
          kapasitas_ram: laptop.kapasitas_ram,
          kecepatan_ram: laptop.kecepatan_ram,
          resolusi: laptop.resolusi,
          tipe_processor: laptop.tipe_processor,
          generasi_processor: laptop.generasi_processor,
        }));
      } catch (error) {
        console.error("Failed to fetch laptop data:", error);
      }
    });


    return { criteria, data };
  },
};
</script>
