<template>
  <label :for="label" class="block text-xl font-medium">{{ label }}</label>
  <input
    v-model="value"
    @input="onChange"
    :placeholder="placeholder ?? label"
    :id="label"
    :type="type"
    class="py-4 px-4 block w-full rounded-sm border border-slate-400 focus:shadow-sm focus:outline-none focus:border-slate-700 transition"
  />
</template>

<script>
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
      default: 'text'
    }
  },
  data() {
    return {
      value: '',
    }
  },
  emits: ['bindValue'],
  methods: {
    onChange() {
      this.$emit('bindValue', this.value)
    }
  }
}
</script>