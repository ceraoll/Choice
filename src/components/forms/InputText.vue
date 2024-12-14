<template>
  <div class="relative">
    <label :for="label" class="block text-xl font-medium">{{ label }}</label>
    <div class="relative">
      <input
        v-model="value"
        @input="onChange"
        :placeholder="placeholder ?? label"
        :id="label"
        :value="value"
        :type="type === 'currency' ? 'text' : type === 'decimal' ? 'number' : type"
        :step="type === 'decimal' ? '0.10' : ''"
        :required="!!required"
        class="block w-full px-4 py-4 transition border rounded-sm border-slate-400 focus:shadow-sm focus:outline-none focus:border-slate-700"
        :class="{
          'pr-[76px]': type === 'decimal'
        }"
      />
      <label :for="label" v-if="type === 'decimal'" class="absolute right-0 flex items-center justify-center w-16 h-full -translate-y-1/2 bg-white border top-1/2">Kg</label>
    </div>
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
    valueDefault: {
      type: [String, Number],
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
      value: this.type === 'currency'
      ? (this.valueDefault ? formatRupiah(this.valueDefault) : formatRupiah('00'))
      : (this.valueDefault || ''),
      realValue: '',
    };
  },
  emits: ['bindValue'],
  watch: {
    valueDefault: {
      immediate: true, 
      handler(newVal) {
        this.value = this.type === 'currency'
          ? (newVal ? formatRupiah(newVal) : formatRupiah('00'))
          : (newVal || '');
        this.realValue = this.type === 'currency'
          ? this.extractNumber(this.value)
          : this.value;
        this.$emit('bindValue', this.type === 'currency' ? this.realValue : this.value);
      },
    },
  },
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
