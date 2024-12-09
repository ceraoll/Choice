<script setup>
import HeroSection from '@/components/HeroSection.vue';
import CriteriaTable from '@/components/Tabel/CriteriaTable.vue';
import SAWFlowChart from '@/components/SAWFlowChart.vue';
import FooterSection from '@/components/FooterSection.vue';
</script>

<template>
  <main>
    <HeroSection />
    <section class="flex flex-col items-center justify-center w-full gap-8 px-12 py-8 md:py-16 md:px-32 md:gap-16">
      <a href="#calculateWithSAW" class="text-2xl font-semibold text-center md:text-5xl">
        See Detail
      </a>
      <p class="text-center text-black md:font-semibold md:text-2xl">
        This is how we help you recomend a Laptop with your reference 
      </p>
      <div class="w-full border-b"></div>
    </section>
    <section class="flex flex-col items-center justify-center w-full gap-16 px-12 py-8 md:py-16 md:px-28 ">
      <h2 class="font-semibold md:text-5xl">
        Criteria Table
      </h2>
      <CriteriaTable />
    </section>
    <section class="flex flex-col items-center justify-center w-full gap-16 px-12 py-8 mb-8 md:py-16 md:px-28" id="calculateWithSAW">
      <h2 class="font-semibold md:text-5xl">
        Calculate with SAW
      </h2>
      <SAWFlowChart />
      <div class="w-full border-b"></div>
    </section>
    <FooterSection />
  </main>
</template>