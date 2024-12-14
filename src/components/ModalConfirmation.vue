<template>
  <div v-if="showModal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full overflow-x-hidden overflow-y-auto md:inset-0 md:h-full">
      <div class="absolute top-0 left-0 w-full h-full bg-black/70" @click="handleCancel"></div>
      <div 
        class="relative z-50 w-full h-full md:h-auto"
        :class="{
          'max-w-md': type !== 'terms&conditions',
          'max-w-[80%]': type == 'terms&conditions'
        }"
        >
          <!-- Modal content -->
          <div class="relative p-4 text-left bg-white rounded-lg shadow dark:bg-customdark sm:p-5">
              <button type="button" class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" @click="handleCancel">
                  <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  <span class="sr-only">Close modal</span>
              </button>
              <div v-if="type === 'delete'">
                <h1 class="mb-4 text-lg font-semibold text-black">Delete Laptop</h1>
                <div class="bg-[#feecdc] w-full flex flex-col text-[#b42307] p-4 items-start mb-4">
                  <div class="flex flex-row items-center w-full py-1 font-semibold">
                    <div class="w-5 mr-2">
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#b42307"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M13.995 1.827a1.745 1.745 0 0 0-2.969 0l-9.8 17.742a1.603 1.603 0 0 0 0 1.656 1.678 1.678 0 0 0 1.48.775H22.28a1.68 1.68 0 0 0 1.484-.775 1.608 1.608 0 0 0 .003-1.656zM12 8h1v7h-1zm.5 10.5a1 1 0 1 1 1-1 1.002 1.002 0 0 1-1 1z"></path><path fill="none" d="M0 0h24v24H0z"></path></g></svg>
                    </div>
                    <h2>Warning</h2>
                  </div>
                  <p>Laptop akan dihapus secara permanen.</p>
                </div>
              </div>
              <div v-if="type === 'terms&conditions'" class="w-full">
                <h1 class="mb-4 text-lg font-semibold text-black">Choice Terms & Conditions</h1>
                <Termsconditions />
              </div>
              <div v-if="type !== 'terms&conditions'" class="flex items-center justify-center space-x-4">
                  <button data-modal-toggle="logoutModal" type="button" class="px-3 py-2 text-sm font-medium text-black bg-white border border-gray-200 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-white focus:z-10"
                  @click="handleCancel">
                      Batal
                  </button>
                  <button v-if="type !== 'terms&conditions'" type="submit" class="px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                  @click="handleSubmit">
                      Hapus
                  </button>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { deleteLaptop } from '@/utils/useLaptop';
import Termsconditions from '@/components/TermsConditions.vue';

  export default {
    props: {
      showModal: {
        type: Boolean,
        required: true,
      },
      id_laptop: {
        type: Number,
        required: false,
        default: 0
      },
      type: {
        type: [String, null],
        required: true,
        default: null
      }
    },
    components: {
      Termsconditions
    },
    data() {
      return {
        
      }
    },
    methods: {
      async handleSubmit() {
        if (this.type === null || this.id_laptop === 0) this.handleCancel();
        if (this.type === "delete") await deleteLaptop(this.id_laptop);
      },
      handleCancel() {
        this.$emit("close"); 
      },
      handleKeydown(event) {
        if (event.key === "Escape" && this.showModal) {
          this.handleCancel();
        }
      },
    },
    watch: {
      showModal(newVal) {
        if (newVal) {
          window.addEventListener("keydown", this.handleKeydown);
        } else {
          window.removeEventListener("keydown", this.handleKeydown);
        }
      },
    }
  }
</script>