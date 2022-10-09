<template>
  <h1 class="title">indexFooter</h1>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      color: "red",
    };
  },
});
</script>
<style lang="less" scoped>
.title {
  color: v-bind(color);
}
</style>
