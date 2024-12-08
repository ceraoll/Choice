<template>
  <div class="relative">
    <label :for="label" class="block text-xl font-medium">{{ label }}</label>
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
      :required="!!required"
      autocomplete="off"
      class="block w-full px-4 py-4 transition border rounded-sm border-slate-400 focus:shadow-sm focus:outline-none focus:border-slate-700"
    />
    <ul
      v-show="isOpen"
      class="absolute z-50 w-full bg-white border shadow-sm"
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
      search: '',
      results: [],
      isOpen: false,
      arrowCounter: -1
    };
  },
  mounted() {
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
      this.$emit('bindValue', '');
      this.filterResults();
      this.isOpen = true;

      const match = this.items.find(
        (item) => item.label.toLowerCase() === this.search.toLowerCase()
      );

      if (match) {
        this.$emit('bindValue', match);
        this.arrowCounter = -1;
      } 
    },
    setResult(result) {
      if (typeof result === 'object' && !Array.isArray(result) && result !== null) {
        this.search = result.label;
        this.isOpen = false;
        this.$emit('bindValue', result)
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