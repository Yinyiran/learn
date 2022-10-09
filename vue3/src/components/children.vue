<template>
  <!-- <a-button>$on</a-button> -->
  <button>child</button>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {};
  },
  mounted() {
    console.log("children mounted");
  },
  destroyed() {
    console.log("children destroyed")
  },
});
</script>
<style lang=""></style>

