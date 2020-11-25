<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  provide() {
    return { Form: this };
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: Object
  },
  data() {
    return {};
  },
  methods: {
    validate() {
      this.$children
        .filter(item => item.prop)
        .forEach(item => {
          item.validate();
        });
    }
  }
};
</script>

<style></style>
