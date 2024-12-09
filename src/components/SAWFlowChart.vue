<template>
  <div class="relative flex flex-col items-center justify-center w-full">
    <div class="absolute -translate-x-1/2 -translate-y-1/2 -z-10 top-1/2 left-1/2">
      <svg class="hidden lg:block" width="50"  viewBox="0 0 61 817" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.99996 1.99996C6.99996 1.99996 106 105 27 278C-52.0001 451 85.9999 647 53.5001 816.5" stroke="#D9D9D9" stroke-width="3"/>
      </svg>


    </div>
    <!-- SVG for connecting lines -->
    <div class="relative flex-col hidden gap-12 xl:w-10/12 lg:flex">
    
      <!-- Step 1 -->
      <div class="relative flex w-full odd:justify-start even:justify-end">
        <div
          class="relative flex flex-col w-[48%] odd:items-start even:items-end before:content-['1'] before:w-16 before:text-3xl before:h-16 before:absolute before:bg-white before:shadow-darken before:rounded-full before:flex before:items-center before:justify-center before:top-1/2 before:-translate-y-1/2 odd:before:-right-8 even:before:-left-8"
        >
          <div class="flex flex-col w-full gap-8 px-16 py-8 bg-white rounded-lg shadow-darken">
            <h2 class="overflow-hidden text-3xl font-semibold text-ellipsis whitespace-nowrap">Menentukan Kriteria</h2>
            <p class="h-16 overflow-y-auto text-2xl text-gray-600 min-h-16">
              Kriteria ditentukan oleh sistem berdasarkan Tabel Kriteria
            </p>
          </div>
        </div>
      </div>
      <!-- Step 2 -->
      <div class="relative flex w-full odd:justify-start even:justify-end">
        <div
          class="relative flex flex-col w-[48%] odd:items-start even:items-end before:content-['2'] before:w-16 before:text-3xl before:h-16 before:absolute before:bg-white before:shadow-darken before:rounded-full before:flex before:items-center before:justify-center before:top-1/2 before:-translate-y-1/2 before:-left-10"
        >
          <div class="flex flex-col w-full gap-4 px-16 py-8 bg-white rounded-lg shadow-darken">
            <h2 class="overflow-hidden text-3xl font-semibold text-ellipsis whitespace-nowrap">Input Laptop</h2>
            <p class="h-16 overflow-y-auto text-2xl text-gray-600 min-h-16">
              Pengguna memasukkan data Laptop yang diinginkan
            </p>
          </div>
        </div>
      </div>
      <!-- Step 3 -->
      <div class="relative flex w-full odd:justify-start even:justify-end">
        <div
          class="relative flex flex-col w-[48%] odd:items-start even:items-end before:content-['3'] before:w-16 before:text-3xl before:h-16 before:absolute before:bg-white before:shadow-darken before:rounded-full before:flex before:items-center before:justify-center before:top-1/2 before:-translate-y-1/2 odd:before:-right-8"
        >
          <div class="flex flex-col w-full gap-4 px-16 py-8 bg-white rounded-lg shadow-darken">
            <h2 class="overflow-hidden text-3xl font-semibold text-ellipsis whitespace-nowrap">Pembobotan dan Normalisasi</h2>
            <p class="h-16 overflow-y-auto text-2xl text-gray-600 min-h-16">
              Data laptop akan dinilai sesuai dengan kriteria dan akan dilakukan normalisasi data
            </p>
          </div>
        </div>
      </div>
      <!-- Step 4 -->
      <div class="relative flex w-full odd:justify-start even:justify-end">
        <div
          class="relative flex flex-col w-[48%] odd:items-start even:items-end before:content-['4'] before:w-16 before:text-3xl before:h-16 before:absolute before:bg-white before:shadow-darken before:rounded-full before:flex before:items-center before:justify-center before:top-1/2 before:-translate-y-1/2 before:-left-10"
        >
          <div class="flex flex-col w-full gap-4 px-16 py-8 bg-white rounded-lg shadow-darken">
            <h2 class="overflow-hidden text-3xl font-semibold text-ellipsis whitespace-nowrap">Hasil Akhir</h2>
            <p class="h-16 overflow-y-auto text-2xl text-gray-600 min-h-16">
              Akan disajikan rekomendasi laptop terbaik menurut CHOICE...
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col w-full gap-8 lg:hidden">
      <div class="flex flex-col w-full gap-8 px-16 py-8 bg-white rounded-lg shadow-darken">
        <h2 class="overflow-hidden text-xl font-semibold md:text-2xl text-ellipsis whitespace-nowrap">Menentukan Kriteria</h2>
        <p class="h-16 overflow-y-auto text-lg text-gray-600 md:text-xl min-h-16">
          Kriteria ditentukan oleh sistem berdasarkan Tabel Kriteria
        </p>
      </div>
      <div class="flex flex-col w-full gap-4 px-16 py-8 bg-white rounded-lg shadow-darken">
        <h2 class="overflow-hidden text-xl font-semibold md:text-2xl text-ellipsis whitespace-nowrap">Input Laptop</h2>
        <p class="h-16 overflow-y-auto text-lg text-gray-600 md:text-xl min-h-16">
          Pengguna memasukkan data Laptop yang diinginkan
        </p>
      </div>
      <div class="flex flex-col w-full gap-4 px-16 py-8 bg-white rounded-lg shadow-darken">
        <h2 class="overflow-hidden text-xl font-semibold md:text-2xl text-ellipsis whitespace-nowrap">Pembobotan dan Normalisasi</h2>
        <p class="h-16 overflow-y-auto text-lg text-gray-600 md:text-xl min-h-16">
          Data laptop akan dinilai sesuai dengan kriteria dan akan dilakukan normalisasi data
        </p>
      </div>
      <div class="flex flex-col w-full gap-4 px-16 py-8 bg-white rounded-lg shadow-darken">
        <h2 class="overflow-hidden text-xl font-semibold md:text-2xl text-ellipsis whitespace-nowrap">Hasil Akhir</h2>
        <p class="h-16 overflow-y-auto text-lg text-gray-600 md:text-xl min-h-16">
          Akan disajikan rekomendasi laptop terbaik menurut CHOICE...
        </p>
      </div>
    </div>
  </div>



</template>