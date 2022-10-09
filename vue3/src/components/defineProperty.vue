<template>
  <input type="text" v-model="lalla" @focus="select" />
  <hr />
  <Children />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Children from "./children.vue";
export default defineComponent({
  components: { Children },
  data() {
    return {
      lalla: "afewf",
    };
  },
  mounted() {

  },
  beforeDestroy() {
    console.log("defineproperty beforeDestroy")

  },
  destroyed() {
    console.log("defineproperty destroyed")
  },
  methods: {
    select(event: any) {
      event.currentTarget.select();
      ["q", "d"].reduce((pre: any, cur: any) => {
        return pre + cur;
      }, 0);
    },
  },
});
</script>
<style lang=""></style>
