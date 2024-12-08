<template>
  <label :for="label" class="block text-xl font-medium">{{ label }}</label>
  <input
    v-model="value"
    @input="onChange"
    :placeholder="placeholder ?? label"
    :id="label"
    :type="type"
    :required="!!required"
    class="block w-full px-4 py-4 transition border rounded-sm border-slate-400 focus:shadow-sm focus:outline-none focus:border-slate-700"
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
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
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