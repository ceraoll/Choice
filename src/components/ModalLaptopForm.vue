<template>
  <div v-if="showModal" class="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen overflow-hidden">
    <div class="absolute top-0 left-0 w-full h-full bg-black/60" @click="handleCancel"></div>
    <div class="z-50 w-6/12 bg-white">
      <div>
        <div class="flex flex-row items-center justify-between px-8 py-8">
          <h2 class="text-xl">Tambah Data Laptop</h2>
          <span
            @click="handleCancel" 
            class="content-center w-8 h-8 text-center transition rounded-full cursor-pointer bg-slate-200 hover:bg-slate-300">X</span>
        </div>
        <div class="w-full border-b border-black"></div>
      </div>
      <div class="px-8">
        <form @submit.prevent="handleSubmit">
          <div class="h-[480px] pb-48 overflow-y-auto">

            <!-- Merk dan Tipe Laptop -->
            <div class="my-8">
              <InputText
                type="text"
                label="Merk dan Tipe Laptop"
                placeholder="Ex: Lenovo V14 G2"
                @bindValue="(e) => formData.laptopType = e "
                />
            </div>

            <!-- Harga -->
            <div class="my-8">
              <InputText
                type="currency"
                label="Harga"
                placeholder="Rp."
                @bindValue="(e) => formData.price = parseFloat(e) "
                />
            </div>
            
            <!-- Berat -->
            <div class="my-8">
              <InputText
                type="decimal"
                label="Berat"
                placeholder="0.0 Kg"
                @bindValue="(e) => formData.weight = parseFloat(e) "
                />
            </div>
            
            <!-- Kapasitas ROM -->
            <div class="my-8">
              <InputSelect 
                :items="items.ROMCapacity" 
                label="Kapasitas ROM"
                placeholder="Ex: 128 GB"
                @bindValue="(e) => formData.ROMCapacity = e "
              /> 
            </div>
            
            <!-- Kapasitas RAM -->
            <div class="my-8">
              <InputSelect 
                :items="items.RAMCapacity" 
                label="Kapasitas RAM"
                placeholder="Ex: 8 GB"
                @bindValue="(e) => formData.RAMCapacity = e "
              /> 
            </div>
            
            <!-- Kecepatan RAM -->
            <div class="my-8">
              <InputSelect 
                :items="items.RAMSpeed" 
                label="Kecepatan RAM"
                placeholder="Ex: 3200Mhz"
                @bindValue="(e) => formData.RAMSpeed = e "
              /> 
            </div>
            
            <!-- Resolusi Layar -->
            <div class="my-8">
              <InputSelect 
                :items="items.resolution" 
                label="Resolusi Layar"
                placeholder="Ex: Full HD"
                @bindValue="(e) => formData.resolution = e "
              /> 
            </div>

            <div class="my-8">
              <InputSelect
                :items="items.processor"
                label="Processor"
                placeholder="Ex: Intel Core i7 13th Gen"
                @bindValue="(e) => formData.processor = e " 
              />
            </div>
            
          </div>

          <!-- Buttons -->
          <div class="flex justify-end py-4 space-x-4">
            <button
              type="button"
              @click="handleCancel"
              class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import InputSelect from './forms/InputSelect.vue';
import InputText from './forms/InputText.vue';
import {
  getBrand,
  getKapasitasROM,
  getKapasitasRAM,
  getKecepatanRAM,
  getResolusi,
  getTipeProcessor,
  getGenerasiProcessor,
} from "@/utils/useCriteria";
import { insertLaptop } from "@/utils/useLaptop";

export default {
  props: {
    showModal: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      formData: reactive({
        laptopType: "",
        price: "",
        weight: "",
        processor: "",
        ROMCapacity: "",
        RAMCapacity: "",
        RAMSpeed: "",
        resolution: "",
      }),
      brand: "",
      items: {
        ROMCapacity: [
        ],
        RAMCapacity: [
        ],
        RAMSpeed: [
        ],
        resolution: [
        ],
        processor: [
        ],
      }
    };
  },
  components: {
   InputSelect,
   InputText
  },
  methods: {
    async fetchData() {
      try {
        const [
          brandData,
          romCapacityData,
          ramCapacityData,
          ramSpeedData,
          resolutionData,
          tipeProcessorData,
          generasiProcessorData,
        ] = await Promise.all([
          getBrand(),
          getKapasitasROM(),
          getKapasitasRAM(),
          getKecepatanRAM(),
          getResolusi(),
          getTipeProcessor(),
          getGenerasiProcessor(), // Misalnya RAMCapacity diisi oleh generasi processor
        ]);

        // Assign data ke items
        this.items.ROMCapacity = romCapacityData || [];
        this.items.RAMCapacity = ramCapacityData || [];
        this.items.RAMSpeed = ramSpeedData || [];
        this.items.resolution = resolutionData || [];

        const groupedProcessors = [];

        const brands = brandData.map((brand) => ({
          id: brand.id,
          label: brand.label,
        }));

        brands.forEach((brand) => {
          const tipeProcessors = tipeProcessorData.filter(
            (item) => item.brand_id === brand.id
          );

          const generasiProcessors = generasiProcessorData.filter(
            (item) => item.brand_id === brand.id
          );

          let autoIncrementId = 1;

          tipeProcessors.forEach((tipe) => {
            generasiProcessors.forEach((generasi) => {
              groupedProcessors.push({
                id: autoIncrementId++, // Auto-increment ID
                label: `${brand.label} ${tipe.label} ${generasi.label}`, // Concatenated label
                value: {
                  tipe: tipe.value,
                  generasi: generasi.value
                }
              });
            });
          });
        });


        this.items.processor = groupedProcessors;
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        this.loading = false; 
      }
    },
    validateForm (value) {
      if (typeof value === 'object' && value !== null) {
        for (const v of Object.values(value)) {
          if (this.validateForm(v)) return true;
        }
      }

      return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
      );
    },
    async handleSubmit() {
      if(this.validateForm(this.formData)) return;
      if(typeof this.formData.weight !== 'number') return;
      await insertLaptop(this.formData);
    },
    handleCancel() {
      this.formData = {
        laptopType: "",
        price: "",
        weight: "",
        processor: "",
        ROMCapacity: "",
        RAMCapacity: "",
        RAMSpeed: "",
      };
      this.$emit('close');
    },
    handleKeydown(event) {
      if (event.key === "Escape" && this.showModal) {
        this.handleCancel(); // Call handleCancel when Esc is pressed
      }
    },
  },
  watch: {
    showModal(newVal) {
      if (newVal) {
        // Add keydown listener when modal is opened
        window.addEventListener("keydown", this.handleKeydown);
      } else {
        // Remove keydown listener when modal is closed
        window.removeEventListener("keydown", this.handleKeydown);
      }
    },
  },
  beforeUnmount() {
    // Ensure listener is removed when component is destroyed
    window.removeEventListener("keydown", this.handleKeydown);
  },
  mounted() {
    this.fetchData();
  }
};
</script>