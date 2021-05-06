<template>
  <div class="container">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot :item="{ hehe: 1 }"></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
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
.container {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
}
header {
  padding: 20px;
  background-color: rgb(255, 225, 225);
}
main {
  flex: 1;
  padding: 20px;
  background-color: rgb(231, 232, 255);
}
footer {
  padding: 20px;
  background-color: rgb(228, 255, 223);
}
</style>
