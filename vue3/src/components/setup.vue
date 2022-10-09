<template>
  <div>{{ inputStr }}</div>
  <input type="text" v-model="str" />
  <div>{{ appData }}</div>
</template>
<script lang="ts">
import {
  defineComponent,
  toRefs,
  ref,
  h,
  reactive,
  watch,
  inject,
  computed,
  onMounted,
  onActivated,
} from "vue";
export default defineComponent({
  props: {
    title: String,
  },
  setup(props, context) {
    console.log(toRefs(props).title);
    console.log(context);
    let str = ref("sss");
    let inputStr = computed(() => {
      return `${str.value}/${str.value}`;
    });
    watch(str, () => {
      console.log(str.value);
    });
    onMounted(() => {
      console.log("onMounted");
    });
    onActivated(() => {
      console.log("onActivated");
    });
    return {
      str,
      inputStr,
      appData: inject("appData"),
    };
  },
  // setup() {
  //   const readersNumber = ref(0);
  //   const book = reactive({ title: "Vue 3 Guide" });
  //   return () => h("h2", [readersNumber.value, book.title]);
  // },
});
</script>
<style lang="less"></style>
