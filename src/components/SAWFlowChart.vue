<template>
  <div class="w-full relative flex items-center justify-center flex-col">
    <div class="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <svg class="hidden lg:block" width="50"  viewBox="0 0 61 817" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.99996 1.99996C6.99996 1.99996 106 105 27 278C-52.0001 451 85.9999 647 53.5001 816.5" stroke="#D9D9D9" stroke-width="3"/>
      </svg>


    </div>
    <!-- SVG for connecting lines -->
    <div class="w-11/2 xl:w-10/12 gap-12 hidden lg:flex flex-col relative">
    
      <!-- Step 1 -->
      <div class="flex w-full relative odd:justify-start even:justify-end">
        <div
          class="relative flex flex-col w-[48%] odd:items-start even:items-end before:content-['1'] before:w-16 before:text-3xl before:h-16 before:absolute before:bg-white before:shadow-darken before:rounded-full before:flex before:items-center before:justify-center before:top-1/2 before:-translate-y-1/2 odd:before:-right-8 even:before:-left-8"
        >
          <div class="py-8 px-16 rounded-lg shadow-darken bg-white w-full flex flex-col gap-8">
            <h2 class="font-semibold text-3xl overflow-hidden text-ellipsis whitespace-nowrap">Menentukan Kriteria</h2>
            <p class="text-gray-600 text-2xl min-h-16 h-16 overflow-y-auto">
              Kriteria ditentukan oleh sistem berdasarkan Tabel Kriteria
            </p>
          </div>
        </div>
      </div>
      <!-- Step 2 -->
      <div class="flex w-full relative odd:justify-start even:justify-end">
        <div
          class="relative flex flex-col w-[48%] odd:items-start even:items-end before:content-['2'] before:w-16 before:text-3xl before:h-16 before:absolute before:bg-white before:shadow-darken before:rounded-full before:flex before:items-center before:justify-center before:top-1/2 before:-translate-y-1/2 before:-left-10"
        >
          <div class="py-8 px-16 rounded-lg shadow-darken bg-white w-full flex flex-col gap-4">
            <h2 class="font-semibold text-3xl overflow-hidden text-ellipsis whitespace-nowrap">Input Laptop</h2>
            <p class="text-gray-600 text-2xl min-h-16 h-16 overflow-y-auto">
              Pengguna memasukkan data Laptop yang diinginkan
            </p>
          </div>
        </div>
      </div>
      <!-- Step 3 -->
      <div class="flex w-full relative odd:justify-start even:justify-end">
        <div
          class="relative flex flex-col w-[48%] odd:items-start even:items-end before:content-['3'] before:w-16 before:text-3xl before:h-16 before:absolute before:bg-white before:shadow-darken before:rounded-full before:flex before:items-center before:justify-center before:top-1/2 before:-translate-y-1/2 odd:before:-right-8"
        >
          <div class="py-8 px-16 rounded-lg shadow-darken bg-white w-full flex flex-col gap-4">
            <h2 class="font-semibold text-3xl overflow-hidden text-ellipsis whitespace-nowrap">Pembobotan dan Normalisasi</h2>
            <p class="text-gray-600 text-2xl min-h-16 h-16 overflow-y-auto">
              Data laptop akan dinilai sesuai dengan kriteria dan akan dilakukan normalisasi data
            </p>
          </div>
        </div>
      </div>
      <!-- Step 4 -->
      <div class="flex w-full relative odd:justify-start even:justify-end">
        <div
          class="relative flex flex-col w-[48%] odd:items-start even:items-end before:content-['4'] before:w-16 before:text-3xl before:h-16 before:absolute before:bg-white before:shadow-darken before:rounded-full before:flex before:items-center before:justify-center before:top-1/2 before:-translate-y-1/2 before:-left-10"
        >
          <div class="py-8 px-16 rounded-lg shadow-darken bg-white w-full flex flex-col gap-4">
            <h2 class="font-semibold text-3xl overflow-hidden text-ellipsis whitespace-nowrap">Hasil Akhir</h2>
            <p class="text-gray-600 text-2xl min-h-16 h-16 overflow-y-auto">
              Akan disajikan rekomendasi laptop terbaik menurut CHOICE...
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>



</template>