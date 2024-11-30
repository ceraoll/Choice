<template>
  <div class="overflow-x-auto w-full">
    <table class="table-auto border-collapse w-full bg-white shadow-md rounded-lg">
      <thead>
        <tr class="bg-[#E1E9F6] text-[#697E93]">
          <th class="px-4 py-2 border border-[#708DAA] text-left">Kode</th>
          <th class="px-4 py-2 border border-[#708DAA] text-left">Nama Kriteria</th>
          <th class="px-4 py-2 border border-[#708DAA] text-left">Jenis</th>
          <th class="px-4 py-2 border border-[#708DAA] text-left">Bobot</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in criteria" :key="index" class="bg-[#FCFCFC] hover:bg-gray-100 text-[#8196AA]">
          <td class="px-4 py-2 border border-[#708DAA]">{{ item.kode }}</td>
          <td class="px-4 py-2 border border-[#708DAA]">{{ item.nama }}</td>
          <td class="px-4 py-2 border border-[#708DAA]">{{ item.jenis }}</td>
          <td class="px-4 py-2 border border-[#708DAA]">{{ item.bobot }}</td>
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
  export default {
    setup() {
        const criteria = [
          { kode: 'C1', nama: 'Harga', jenis: 'Cost', bobot: 0.3 },
          { kode: 'C2', nama: 'Berat', jenis: 'Cost', bobot: 0.1 },
          { kode: 'C3', nama: 'Kapasitas ROM', jenis: 'Benefit', bobot: 0.2 },
          { kode: 'C4', nama: 'Kapasitas RAM', jenis: 'Benefit', bobot: 0.15 },
          { kode: 'C5', nama: 'Kecepatan RAM', jenis: 'Benefit', bobot: 0.1 },
          { kode: 'C6', nama: 'Resolusi Layar', jenis: 'Benefit', bobot: 0.05 },
          { kode: 'C7', nama: 'Tipe Processor', jenis: 'Benefit', bobot: 0.05 },
          { kode: 'C8', nama: 'Generasi Processor', jenis: 'Benefit', bobot: 0.05 },
        ]
      return {criteria};
    },
  };
  </script>