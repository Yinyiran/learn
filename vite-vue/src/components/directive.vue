<template>
  <div class="around">
    <div class="left" v-drag:around></div>
    <div class="right"></div>
  </div>
  <div class="updown">
    <div class="top"></div>
    <div class="bottom" v-drag:updown></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {};
  },
});
</script>
<style lang="less">
.around {
  height: 30%;
  display: flex;
  .left,
  .right {
    width: 50%;
    height: 100%;
  }
}
.updown {
  height: 70%;
  .top,
  .bottom {
    height: 50%;
    width: 100%;
  }
}
.left {
  background-color: rgb(255, 211, 211);
}
.top {
  background-color: rgb(255, 241, 211);
}
.right {
  background-color: rgb(211, 255, 217);
}
.bottom {
  background-color: rgb(223, 211, 255);
}
</style>
