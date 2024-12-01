<template>
  <div class="fixed bottom-0 w-full flex flex-row justify-between h-24 bg-white shadow-darken-top px-28 gap-8">
    <button 
      v-for="tab in tabs" 
      :key="tab.id" 
      :class="['font-semibold text-3xl transition', 
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
