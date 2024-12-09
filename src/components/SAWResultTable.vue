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
import { getCriteria } from "@/utils/useCriteria";
import { getNilaiAlternatifLaptop } from "@/utils/useLaptop";
import { ref, onMounted } from "vue";
export default {
  setup() {
    const tableHeaders = [
      { id_header: "1", nama: "Ranking"},
      { id_header: "2", nama: "Harga" },
      { id_header: "3", nama: "Berat" },
      { id_header: "4", nama: "Kapasitas ROM" },
      { id_header: "5", nama: "Kapasitas RAM" },
      { id_header: "6", nama: "Kecepatan RAM" },
      { id_header: "7", nama: "Resolusi Layar" },
      { id_header: "8", nama: "Tipe Processor" },
      { id_header: "9", nama: "Generasi Processor" },
      { id_header: "10", nama: "Score SAW"}
    ];
    const criteria = ref([]);

    const alternative = ref([]); 
    const data = ref([])

    onMounted(async () => {
      try {
        const responseCriteria = await getCriteria();
        criteria.value = responseCriteria.map((criteria) => ({
          kode: criteria.kode,
          name: criteria.name,
          jenis: criteria.jenis,
          weight: parseFloat(criteria.weight)
        }));

        const response = await getNilaiAlternatifLaptop();
        alternative.value = response.map((laptop) => ({
          nama: laptop.nama_laptop,
          harga: parseFloat(laptop.harga),
          berat: parseFloat(laptop.berat),
          kapasitas_rom: laptop.kapasitas_rom,
          kapasitas_ram: laptop.kapasitas_ram,
          kecepatan_ram: laptop.kecepatan_ram,
          resolusi: laptop.resolusi,
          tipe_processor: laptop.tipe_processor,
          generasi_processor: laptop.generasi_processor,
        }));

        normalizeAndCalculateSAW();
      } catch (error) {
        console.error("Failed to fetch Alternative Laptop Value data:", error);
      }
    });

    const normalizeMatrix = (alternatives, criteria) => {
      return criteria.map((criterion, i) => {
        criterion.name = criterion.name.toLowerCase().replace(/ /g, "_");
        const values = alternatives.map((laptop) => laptop[criterion.name]);
        const min = Math.min(...values);
        const max = Math.max(...values);

        if (min === max) {
          return values.map(() => 1); 
        }

        if (criterion.jenis === 'Benefit') {
          // Benefit: Max-Min normalization
          return values.map((value) => (value - min) / (max - min));
        } else if (criterion.jenis === 'Cost') {
          // Cost: Min-Max normalization (reversed)
          return values.map((value) => (max - value) / (max - min));
        }
      });
    };

    // Calculate SAW score for each laptop
    const calculateSAW = (normalizedMatrix, criteria) => {
      const sawScores = alternative.value.map((laptop, index) => {
        let score = 0;
        // Loop through each criterion and apply SAW formula
        criteria.forEach((criterion, i) => {
          score += normalizedMatrix[i][index] * criterion.weight; // SAW formula
        });

        return { ...laptop, sawScore: score };
      });

      // Sort the scores in descending order to get the rankings
      return sawScores.sort((a, b) => b.sawScore - a.sawScore); // Higher score = better rank
    };

    // Main function to normalize and calculate SAW
    const normalizeAndCalculateSAW = () => {
      // Normalize the decision matrix
      const normalizedMatrix = normalizeMatrix(alternative.value, criteria.value);
      // Calculate SAW scores and rank the alternatives
      data.value = calculateSAW(normalizedMatrix, criteria.value);
    };


    return { tableHeaders, criteria, alternative, data, calculateSAW, normalizeAndCalculateSAW };
  },
};
</script>
