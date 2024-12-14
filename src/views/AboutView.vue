<script setup>
import FooterSection from '@/components/FooterSection.vue';
</script>

<template>
  <main class="flex flex-col justify-between w-full min-h-screen">
    <!-- Hero Section -->
    <section class="px-10 py-20 text-center bg-gray-100">
      <h1 class="mb-4 text-4xl font-bold">Welcome to Choice</h1>
      <p class="text-lg text-gray-600">
        Your ultimate decision-making tool for selecting the best laptop.
      </p>
    </section>

    <!-- Content Section -->
    <section class="flex flex-col items-start justify-between w-full gap-16 px-10 py-16 lg:flex-row lg:px-28">
      <!-- About Us -->
      <div class="flex-1">
        <h2 class="mb-6 text-3xl font-semibold lg:text-4xl">About Us</h2>
        <p class="text-lg leading-relaxed text-gray-700">
          Choice is a project developed to simplify the laptop selection process using the
          <span class="font-bold">Simple Additive Weighting (SAW)</span> method. Designed for academic purposes, it is both a practical decision-support tool and an educational resource. With Choice, users can easily rank laptops based on key criteria like performance, price, and features.
        </p>
      </div>

      <!-- Why Choice -->
      <div class="flex-1">
        <h2 class="mb-6 text-3xl font-semibold lg:text-4xl">Why Choice?</h2>
        <ul class="ml-5 text-lg leading-relaxed text-gray-700 list-disc">
          <li>Streamlines the laptop selection process with intelligent ranking.</li>
          <li>Empowers users to make informed decisions quickly and effectively.</li>
          <li>Designed with simplicity and usability in mind for all users.</li>
          <li>An excellent educational resource for learning decision-support algorithms.</li>
        </ul>
      </div>
    </section>

    <!-- Footer -->
    <FooterSection />
  </main>
</template>
