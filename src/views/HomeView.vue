<script setup>
import HeroSection from '@/components/HeroSection.vue';
import CriteriaTable from '@/components/CriteriaTable.vue';
import SAWFlowChart from '@/components/SAWFlowChart.vue';
import FooterSection from '@/components/FooterSection.vue';
</script>

<template>
  <main>
    <HeroSection />
    <section class="py-8 px-12 md:py-16 md:px-32 flex flex-col items-center justify-center gap-8 md:gap-16 w-full">
      <a href="#calculateWithSAW" class="text-2xl md:text-5xl font-semibold text-center">
        See Detail
      </a>
      <p class="text-black md:font-semibold md:text-2xl text-center">
        This is how we help you recomend a Laptop with your reference 
      </p>
      <div class="border-b w-full"></div>
    </section>
    <section class="py-8 px-12 md:py-16 md:px-28 flex flex-col items-center justify-center gap-16 w-full">
      <h2 class="md:text-5xl font-semibold">
        Criteria Table
      </h2>
      <CriteriaTable />
    </section>
    <section class="py-8 px-12 md:py-16 md:px-28 flex flex-col items-center justify-center gap-16 w-full mb-8" id="calculateWithSAW">
      <h2 class="md:text-5xl font-semibold">
        Calculate with SAW
      </h2>
      <SAWFlowChart />
      <div class="border-b w-full"></div>
    </section>
    <FooterSection />
  </main>
</template>