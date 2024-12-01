<template>
  <div v-if="showModal" class="fixed w-screen top-0 left-0 z-50 h-screen overflow-hidden flex justify-center items-center">
    <div class="w-full h-full absolute top-0 left-0 bg-black/60" @click="handleCancel"></div>
    <div class="bg-white w-6/12 z-50">
      <div>
        <div class="flex flex-row justify-between items-center py-8 px-8">
          <h2 class="text-xl">Tambah Data Laptop</h2>
          <span
            @click="handleCancel" 
            class="w-8 h-8 bg-slate-200 hover:bg-slate-300 transition cursor-pointer content-center text-center rounded-full">X</span>
        </div>
        <div class="w-full border-b border-black"></div>
      </div>
      <div class="px-8 py-4">
        <form @submit.prevent="handleSubmit">
          <div class="max-h-[320px] overflow-y-auto pb-48">

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
                type="text"
                label="Harga"
                placeholder="Rp."
                @bindValue="(e) => formData.price = parseInt(e) "
                />
            </div>
            
            <!-- Berat -->
            <div class="my-8">
              <InputText
                type="text"
                label="Berat"
                placeholder="Kg"
                @bindValue="(e) => formData.weight = parseInt(e) "
                />
            </div>
            
            <!-- Kapasitas ROM -->
            <div class="my-8">
              <InputSelect 
                :items="items.ROMCapacity" 
                label="Kapasitas ROM"
                placeholder="Ex: 8GB"
                @bindValue="(e) => formData.ROMCapacity = e "
              /> 
            </div>
            
            <!-- Kapasitas RAM -->
            <div class="my-8">
              <InputSelect 
                :items="items.RAMCapacity" 
                label="Kapasitas RAM"
                placeholder="Ex: 8GB"
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
                placeholder="Ex: FHD"
                @bindValue="(e) => formData.resolution = e "
              /> 
            </div>
            
            <!-- Tipe Processor -->
            <div class="my-8">
              <InputSelect 
                :items="items.processorType" 
                label="Tipe Processor"
                placeholder="Ex: Intel I5"
                @bindValue="(e) => formData.processorType = e "
              /> 
            </div>
            
            <!-- Generasi Processor -->
            <div class="my-8">
              <InputSelect 
                :items="items.processorGeneration" 
                label="Generasi Processor"
                placeholder="Ex: 12th Gen"
                @bindValue="(e) => formData.processorGeneration = e "
              /> 
            </div>

          </div>

          <!-- Buttons -->
          <div class="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              @click="handleCancel"
              class="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600"
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
        processorType: "",
        processorGeneration: ""
      }),
      items: {
        ROMCapacity: [
          {
            label: "128GB",
            value: 128
          },
          {
            label: "256GB",
            value: 256
          },
          {
            label: "512GB",
            value: 512
          },
          {
            label: "1024GB (1TB)",
            value: 1024
          },
        ],
        RAMCapacity: [
          {
            label: '4GB',
            value: 4
          },
          {
            label: '8GB',
            value: 8
          },
          {
            label: '16GB',
            value: 16
          },
          {
            label: '32GB',
            value: 32
          },
          {
            label: '64GB',
            value: 64
          },
        ],
        RAMSpeed: [
          {
            label: '2400MHz',
            value: 2400
          },
          {
            label: '2666MHz',
            value: 2666
          },
          {
            label: '3200MHz',
            value: 3200
          },
          {
            label: '4800MHz',
            value: 4800
          },
          {
            label: '6400MHz',
            value: 6400
          },
        ],
        resolution: [

        ],
        processorType: [

        ],
        processorGeneration: [

        ],
      }
    };
  },
  components: {
   InputSelect,
   InputText
  },
  methods: {
    handleSubmit() {
      console.log("Form submitted:", this.formData);
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
      console.log("Form reset");
      this.$emit('close');
    },
  },
};
</script>