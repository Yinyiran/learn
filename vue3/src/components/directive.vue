<template>
  <div class="vertical">
    <div class="tip"></div>
    <div class="around">
      <div class="left" v-drag:x="{ width: 270 }"></div>
      <div class="right"></div>
    </div>
  </div>
  <div class="updown">
    <div class="top" v-drag:y="{ height: 270 }"></div>
    <div class="bottom"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>
<style lang="less">
.vertical {
  height: 50%;
  display: flex;
  padding-left: 200px;
}
.tip {
  width: 100px;
  background-color: aquamarine;
}
.around {
  flex: 1;
  height: 100%;
}
.updown {
  height: 50%;
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
.sddd {
  height: 200px;
}
</style>
