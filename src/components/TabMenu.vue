<template>
  <div class="fixed bottom-0 flex flex-row justify-between w-full h-24 bg-white lg:justify-center shadow-darken-top lg:px-28">
    <button 
      v-for="tab in tabs" 
      :key="tab.id" 
      :class="['font-semibold text-xl md:text-3xl transition hover:bg-gray-100 sm:px-8', 
      { 'text-[#16436F]': tab.id === activeTab },
      { 'text-[#D9D9D9]': tab.id !== activeTab }]" 
      @click="selectTab(tab.id)"
    >
      {{ tab.title }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      required: true
    },
    activeTab: {
      type: String,
      required: true
    }
  },
  methods: {
    selectTab(tabId) {
      this.$emit('select-tab', tabId);
    }
  }
};
</script>
