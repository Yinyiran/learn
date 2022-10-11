<template>
  <div class="wrap" @mouseup="mouseDown" @mousedown="mouseDown">拖拽</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {};
  },
  methods: {
    mouseDown(args: any) {
      console.log(args);

      const block = document.createElement("div");
      block.classList.add("drag-block");
      block.style.cssText = `left:${args.getBoundingClientRect().left}px`;
      document.onmousemove = (event: any) => {
        block.style.width = `${
          event.clientX - args.getBoundingClientRect().left - 10
        }px`;
      };
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
      el.appendChild(block);
    },
  },
});
</script>
<style lang="less">
.wrap {
  position: relative;
  height: 50px;
  background-color: #e8e8e8;
  border: 1px solid #aaa;
  margin: 50px 20px;
}
.drag-block {
  position: absolute;
  top: 0;
  background-color: #999;
  bottom: 0;
}
</style>
