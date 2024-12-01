<template>
  <div class="relative">
    <label :for="label" class="block text-xl font-medium">{{ label }}</label>
    <input
      v-model="search"
      @input="onChange"
      :placeholder="placeholder ?? label"
      :id="label"
      :type="type"
      class="py-4 px-4 block w-full rounded-sm border border-slate-400 focus:shadow-sm focus:outline-none focus:border-slate-700 transition"
    />
    <ul
      v-show="isOpen"
      class="absolute w-full shadow-sm bg-white border z-50"
    >
      <li
        v-for="(result, i) in results"
        :key="i"
        @click="setResult(result)"
        class="hover:bg-gray-400 p-2"
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
    }
  },
  data() {
    return {
      search: '',
      results: [],
      isOpen: false,
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
        this.$emit('bindValue', match.value);
      } 
    },
    setResult(result) {
      this.search = result.label;
      this.isOpen = false;
      this.$emit('bindValue', result.value)
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false;
      }
    }
  },
}
</script>