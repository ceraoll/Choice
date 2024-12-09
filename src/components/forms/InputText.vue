<template>
  <div>
    <label :for="label" class="block text-xl font-medium">{{ label }}</label>
    <input
      v-model="value"
      @input="onChange"
      :placeholder="placeholder ?? label"
      :id="label"
      :type="type === 'currency' ? 'text' : type"
      :required="!!required"
      class="block w-full px-4 py-4 transition border rounded-sm border-slate-400 focus:shadow-sm focus:outline-none focus:border-slate-700"
    />
  </div>
</template>

<script>
import { formatRupiah } from '@/utils/useFormatRupiah';

export default {
  name: 'InputText',
  props: {
    label: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
      default: 'text',
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      value: this.type === 'currency' ? formatRupiah('00') : '',
      realValue: '',
    };
  },
  emits: ['bindValue'],
  methods: {
    onChange(event) {
      if (this.type === 'currency') {
        this.value = formatRupiah(event.target.value); 
        this.realValue = this.extractNumber(this.value)
      }
      this.$emit('bindValue', this.type === 'currency' ? this.realValue : this.value);
    },
    extractNumber(value) {
      return parseInt(value.replace(/[^0-9]/g, ''), 10);
    }

  },
};
</script>
