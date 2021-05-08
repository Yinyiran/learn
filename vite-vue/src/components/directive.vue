<template>
  <div class="around">
    <div
      class="left"
      v-drag:around="{ length: 270 }"
    ></div>
    <div class="right"></div>
  </div>
  <div class="updown">
    <div class="top" v-drag:updown="{ length: 270 }"></div>
    <div class="bottom"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {};
  },
  mounted() {
    // document.querySelector("id")?.classList.
  },
});
</script>
<style lang="less">
.around {
  height: 50%;
}
.updown {
  height: 70%;
}
.left {
  background-color: #ffd3d3;
}
.top {
  background-color: #fff1d3;
}
.right {
  background-color: #d3ffd9;
}
.bottom {
  background-color: #dfd3ff;
}
</style>
