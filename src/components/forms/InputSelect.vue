<template>
  <div class="relative">
    <label :for="label" class="block text-xl font-medium">{{ label }}</label>
    <div class="relative grid items-center">
      <input
        v-model="search"
        @input="onChange"
        @keydown.down="onArrowDown"
        @keydown.up="onArrowUp"
        @keydown.enter="onEnter"
        @keydown.tab="onTab"
        :placeholder="placeholder ?? label"
        :id="label"
        :type="type"
        :value="search"
        :required="!!required"
        autocomplete="off"
        class="block w-full px-4 py-4 transition border rounded-sm border-slate-400 focus:shadow-sm focus:outline-none"
        :class="{
          'border-rose-700 ': valid === false
        }"
      />
      <div class="!absolute pointer-events-none right-4" v-if="valid === true && search.length > 0">
        <svg class="w-6 h-6 text-green-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </div>
      <div class="!absolute pointer-events-none right-4" v-if="!valid && search.length > 0">
        <svg class="w-6 h-6 text-red-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </div>
    </div>
    <ul
      v-show="isOpen"
      class="absolute z-50 w-full bg-white border shadow-sm max-h-[calc(40*5px)] overflow-y-auto"
    >
      <li
        v-for="(result, i) in results"
        :key="i"
        @click="setResult(result)"
        class="p-2 hover:bg-gray-400"
        :class="{
          'bg-gray-400': i === arrowCounter
        }"
      >
        {{ result.label }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'InputSelect',
  props: {
    label: {
      type: String,
      required: false,
    },
    valueDefault: {
      type: [String, Object],
      required: false,
    }, 
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
    placeholder: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
      default: 'text'
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  data() {
    return {
      search: this.valueDefault ? this.valueDefault : '',
      results: [],
      isOpen: false,
      arrowCounter: -1,
      valid: null,
    };
  },
  watch: {
    valueDefault: {
      immediate: true, 
      handler(newVal) {
        this.search = newVal ? newVal : '';
        const match = this.items.find(
          (item) => item.label.toLowerCase() === this.search.toLowerCase()
        );

        if (match) {
          this.valid = true;
          if (this.valid) this.$emit('bindValue', match);
          this.arrowCounter = -1;
        }
      },
    },
  },
  mounted() {
    if (this.search && this.search !== null && this.search !== '') this.filterResults();
    document.addEventListener('click', this.handleClickOutside);
  },
  destroyed() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    filterResults() {
      this.results = this.items.filter(item => item.label.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
    },
    onChange() {
      this.loading = true;
      this.valid = false;
      this.$emit('bindValue', '');
      this.filterResults();
      this.isOpen = true;

      const match = this.items.find(
        (item) => item.label.toLowerCase() === this.search.toLowerCase()
      );

      if (match) {
        this.valid = true;
        if (this.valid) this.$emit('bindValue', match);
        this.arrowCounter = -1;
      }
    },
    setResult(result) {
      if (typeof result === 'object' && !Array.isArray(result) && result !== null) {
        this.valid = true;
        this.search = result.label;
        this.isOpen = false;
        if (this.valid) this.$emit('bindValue', result);
        this.arrowCounter = -1;
      }
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.arrowCounter = -1;
        this.isOpen = false;
      }
    },
    onArrowDown() {
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter = this.arrowCounter + 1;
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
      }
    },
    onEnter() {
      if(this.isOpen && this.results.length > 0 && this.arrowCounter !== -1) {
        this.setResult(this.results[this.arrowCounter])
        this.arrowCounter = -1;
        this.isOpen = false;
      }
    },
    onTab() {
      this.onEnter();
      this.isOpen = false;
      this.arrowCounter = -1;
    }
  },
}
</script>