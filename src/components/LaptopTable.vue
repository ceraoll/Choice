<template>
  <div class="overflow-x-auto w-full">
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
          <td class="px-4 py-2 border border-[#708DAA]">{{ index }}</td>
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
export default {
  setup() {
    const criteria = [
      { kode: "C1", nama: "Harga" },
      { kode: "C2", nama: "Berat" },
      { kode: "C3", nama: "Kapasitas ROM" },
      { kode: "C4", nama: "Kapasitas RAM" },
      { kode: "C5", nama: "Kecepatan RAM" },
      { kode: "C6", nama: "Resolusi Layar" },
      { kode: "C7", nama: "Tipe Processor" },
      { kode: "C8", nama: "Generasi Processor" },
    ];

    const data = [
      {
        "Harga": "Rp5.000.000",
        "Berat": "1.5 kg",
        "Kapasitas ROM": "512 GB",
        "Kapasitas RAM": "16 GB",
        "Kecepatan RAM": "3200 MHz",
        "Resolusi Layar": "1920x1080",
        "Tipe Processor": "Intel i7",
        "Generasi Processor": "11th Gen",
      },
      {
        "Harga": "Rp7.500.000",
        "Berat": "1.8 kg",
        "Kapasitas ROM": "1 TB",
        "Kapasitas RAM": "32 GB",
        "Kecepatan RAM": "3600 MHz",
        "Resolusi Layar": "2560x1440",
        "Tipe Processor": "Intel i9",
        "Generasi Processor": "12th Gen",
      },
      {
        "Harga": "Rp3.000.000",
        "Berat": "1.2 kg",
        "Kapasitas ROM": "256 GB",
        "Kapasitas RAM": "8 GB",
        "Kecepatan RAM": "2400 MHz",
        "Resolusi Layar": "1366x768",
        "Tipe Processor": "Intel i5",
        "Generasi Processor": "10th Gen",
      },
    ];

    return { criteria, data };
  },
};
</script>
