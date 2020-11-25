<template>
  <div class="form-input">
    <input :type="type" :value="value" @input="oninput" v-bind="$attrs" />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    }
  },
  methods: {
    oninput() {
      this.$emit("input", event.target.value);
      this.$parent.$emit("validate", event.target.value);
    }
  }
};
</script>

<style>
.form-input {
  display: inline-block;
}
</style>
