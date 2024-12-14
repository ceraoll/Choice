<template>
  <div v-if="showModal" class="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen overflow-hidden">
    <div class="absolute top-0 left-0 w-full h-full bg-black/60" @click="handleCancel"></div>
    <div class="z-50 w-6/12 bg-white">
      <div>
        <div class="flex flex-row items-center justify-between px-8 py-8">
          <h2 class="text-xl">Edit Data Laptop</h2>
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
                :valueDefault="initialData.laptopType"
                @bindValue="(e) => formData.laptopType = e "
                />
            </div>

            <!-- Harga -->
            <div class="my-8">
              <InputText
                type="currency"
                label="Harga"
                placeholder="Rp."
                :valueDefault="initialData.price"
                @bindValue="(e) => formData.price = parseFloat(e) "
                />
            </div>
            
            <!-- Berat -->
            <div class="my-8">
              <InputText
                type="decimal"
                label="Berat"
                placeholder="0.0 Kg"
                :valueDefault="initialData.weight"
                @bindValue="(e) => formData.weight = parseFloat(e) "
                />
            </div>
            
            <!-- Kapasitas ROM -->
            <div class="my-8">
              <InputSelect 
                :items="items.ROMCapacity" 
                label="Kapasitas ROM"
                placeholder="Ex: 8GB"
                :valueDefault="initialData.ROMCapacity"
                @bindValue="(e) => formData.ROMCapacity = e "
              /> 
            </div>
            
            <!-- Kapasitas RAM -->
            <div class="my-8">
              <InputSelect 
                :items="items.RAMCapacity" 
                label="Kapasitas RAM"
                placeholder="Ex: 8GB"
                :valueDefault="initialData.RAMCapacity"
                @bindValue="(e) => formData.RAMCapacity = e "
              /> 
            </div>
            
            <!-- Kecepatan RAM -->
            <div class="my-8">
              <InputSelect 
                :items="items.RAMSpeed" 
                label="Kecepatan RAM"
                placeholder="Ex: 3200Mhz"
                :valueDefault="initialData.RAMSpeed"
                @bindValue="(e) => formData.RAMSpeed = e "
              /> 
            </div>
            
            <!-- Resolusi Layar -->
            <div class="my-8">
              <InputSelect 
                :items="items.resolution" 
                label="Resolusi Layar"
                placeholder="Ex: FHD"
                :valueDefault="initialData.resolution"
                @bindValue="(e) => formData.resolution = e "
              /> 
            </div>

            <!-- Processor -->
            <div class="my-8">
              <InputSelect
                :items="items.processor"
                label="Processor"
                placeholder="Ex: Intel Core i7-13100K"
                :valueDefault="initialData.processor"
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
              class="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import InputSelect from "./forms/InputSelect.vue";
import InputText from "./forms/InputText.vue";
import {
  getBrand,
  getKapasitasROM,
  getKapasitasRAM,
  getKecepatanRAM,
  getResolusi,
  getTipeProcessor,
  getGenerasiProcessor,
} from "@/utils/useCriteria";
import { fetchLaptopDetails, updateLaptop } from "@/utils/useLaptop";

export default {
  props: {
    showModal: {
      type: Boolean,
      required: true
    },
    id_laptop: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      initialData: reactive({
        laptopType: "",
        price: "",
        weight: "",
        processor: "",
        ROMCapacity: "",
        RAMCapacity: "",
        RAMSpeed: "",
        resolution: "",
      }),
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
      items: {
        ROMCapacity: [],
        RAMCapacity: [],
        RAMSpeed: [],
        resolution: [],
        processor: [],
      },
    };
  },
  components: {
    InputSelect,
    InputText,
  },
  methods: {
    async fetchItems() {
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

        // Group data by brand_id
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
    async fetchData() {
      try {
        const laptopDetails = await fetchLaptopDetails(this.id_laptop);
        this.initialData = {
          laptopType: laptopDetails.nama_laptop,
          price: laptopDetails.harga.replace(/.00$/, ''),
          weight: laptopDetails.berat,
          ROMCapacity: laptopDetails.kapasitas_rom,
          RAMCapacity: laptopDetails.kapasitas_ram,
          RAMSpeed: laptopDetails.kecepatan_ram,
          resolution: laptopDetails.resolusi,
          processor: laptopDetails.processor,
        };

      } catch (error) {
        console.error("Error fetching laptop details:", error);
      }
    },
    async handleSubmit() {
      if (this.validateForm(this.formData)) return;
      if (typeof this.formData.weight !== 'number') return;
      await updateLaptop(this.id_laptop, this.formData);
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
    handleCancel() {
      this.$emit("close"); // Notify parent to close modal
    },
    handleKeydown(event) {
      if (event.key === "Escape" && this.showModal) {
        this.handleCancel(); // Call handleCancel when Esc is pressed
      }
    },
  },
  watch: {
    id_laptop: {
      immediate: true, // Fetch data on initial mount
      handler(newId) {
        if (newId) {
          this.fetchData(newId);
        }
      },
    },
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
  mounted() {
    this.fetchItems();
  }
};
</script>
