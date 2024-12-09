<template>
  <div class="w-full overflow-x-auto">
    <table class="min-w-[576px] table-auto border-collapse w-full bg-white shadow-md rounded-lg">
      <thead>
        <tr class="bg-[#E1E9F6] text-[#697E93]">
          <th class="px-4 py-2 border border-[#708DAA] text-left">
            Ranking
          </th>
          <th v-for="header in tableHeaders" :key="header.id_header"
            class="px-4 py-2 border border-[#708DAA] text-left"
            :class="{'bg-green-500 text-black border-2': header.id_header == 9}">
            {{ header.nama }}
          </th>
        </tr>
      </thead>
      <tbody v-if="data.length">
        <tr v-for="(row, index) in data" :key="index" class="bg-[#FCFCFC] hover:bg-gray-100 text-[#8196AA]">
          <td class="px-4 py-2 border border-[#708DAA]">{{ index+1 }}</td>
          <td v-for="(value, key) in row" :key="key" class="px-4 py-2 border border-[#708DAA]">
            <div v-if="key == 'harga'" class="overflow-x-auto whitespace-nowrap max-w-32">
              {{ value }}
            </div>
            <div v-else-if="key == 'berat'" class="overflow-x-auto whitespace-nowrap max-w-16">
              {{ value }}
            </div>
            <div v-else>
              {{ value }}
            </div>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr class="bg-[#FCFCFC] hover:bg-gray-100 text-[#8196AA]">
          <td colspan="10" class="text-center px-4 py-2 border border-[#708DAA]">
            Anda belum menambahkan Laptop,
            <span
              @click="$emit('showModal')"
              class="mx-2 transition ease rounded font-normal text-slate-500 hover:text-slate-700 py-1.5 cursor-pointer text-lg">Tambah Laptop</span>
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
import { getNilaiAlternatifLaptop, getLaptop } from "@/utils/useLaptop";
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
      { id_header: "9", nama: "Score SAW"}
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

        const responseLaptop = await getLaptop();
        const dataLaptop = responseLaptop.map((laptop) => ({
          nama: laptop.nama_laptop,
          harga: "Rp. " + laptop.harga,
          berat: laptop.berat + " KG",
          kapasitas_rom: laptop.kapasitas_rom,
          kapasitas_ram: laptop.kapasitas_ram,
          kecepatan_ram: laptop.kecepatan_ram,
          resolusi: laptop.resolusi,
          processor: laptop.processor,
        }));
        
        const normalizedMatrix = normalizeMatrix(alternative.value, criteria.value);
        const finalScores = calculateFinalScores(normalizedMatrix, criteria.value, dataLaptop);
        
        data.value = finalScores.map((row) => {
          const formattedRow = {};
          Object.keys(row).forEach((key) => {
            formattedRow[key] = formatDecimals(row[key], 4);
          });
          return formattedRow;
        });
      } catch (error) {
        console.error("Failed to fetch Alternative Laptop Value data:", error);
      }
    });

    const normalizeMatrix = (alternatives, criteria) => {
      const normalized = [];
      const criteriaKeys = criteria.map((c) => c.name.toLowerCase().replace(/ /g, "_"));
      const pembagi = []

      for (let i = 0; i < criteriaKeys.length; i++ ) {
        pembagi.push(0)
        for (let j = 0; j < alternatives.length; j++) {
          if (criteria[i].jenis === "Cost") {
            if (j == 0) {
              pembagi[i] = alternatives[j][criteriaKeys[i]];
            } else {
              if (pembagi[i] > alternatives[j][criteriaKeys[i]]) {
                pembagi[i] = alternatives[j][criteriaKeys[i]]
              }
            }
          } else {
            if (j == 0) {
              pembagi[i] = alternatives[j][criteriaKeys[i]];
            } else {
              if (pembagi[i] < alternatives[j][criteriaKeys[i]]) {
                pembagi[i] = alternatives[j][criteriaKeys[i]]
              }
            }
          }
        }
      }

      alternatives.forEach((alt) => {
        const normalizedAlt = { nama: alt.nama };
        criteriaKeys.forEach((kode, index) => {
          if (criteria[index].jenis === "Cost") {
            normalizedAlt[kode] = pembagi[index] / alt[kode];
          } else {
            normalizedAlt[kode] = alt[kode] / pembagi[index];
          }
        });
        normalized.push(normalizedAlt);
      });

      return normalized;

    };

    const calculateFinalScores = (normalizedMatrix, criteria, responseLaptop) => {
      const scores = normalizedMatrix.map((alt, idx) => {
        let totalScore = 0;
        criteria.forEach((c) => {
          const key = c.name.toLowerCase().replace(/ /g, "_");
          totalScore += alt[key] * c.weight;
        });
        return { ...responseLaptop[idx], score: totalScore };
      });
      return scores.sort((a, b) => b.score - a.score);
    };

    const formatDecimals = (value, decimalPlaces = 2) => {
      if (typeof value === "number" && !Number.isInteger(value)) {
        return value.toFixed(decimalPlaces); 
      }
      return value; 
    };


    return { tableHeaders, criteria, alternative, data};
  },
};
</script>
