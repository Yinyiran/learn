<template>
  <h2>v-model修饰符</h2>
  首字母大写 :
  <input type="text" :value="modelValue" @input="emitValue" /> 尾字母大写 :
  <input type="text" :value="desc" @change="emitDesc" />
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    modelValue: String,
    modelModifiers: {
      default: () => ({}),
    },
    desc: String,
    descModifiers: {
      default: () => ({}),
    },
  },
  emits: ["update:modelValue", "update:desc"],
  data() {
    return {};
  },
  created() {
    // console.log(this.modelModifiers);
  },
  methods: {
    emitValue(e: any) {
      let value = e.target.value;
      if (this.modelModifiers.capture) {
        value = value.charAt(0).toUpperCase() + value.slice(1);
      }
      this.$emit("update:modelValue", value);
    },
    emitDesc(e: any) {
      let value = e.target.value;
      if (this.descModifiers.capture) {
        value = value.slice(0, -1) + value.slice(-1).toUpperCase();
      }
      this.$emit("update:desc", value);
    },
  },
});
</script>
