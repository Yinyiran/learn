<template>
  <div>descendant {{ desc }}</div>
</template>
<script  lang="ts">
import { defineComponent, inject } from 'vue';
export default defineComponent({
  setup() {
    const desc = inject("appData")
    return { desc }
  }
});
</script>
<style lang=""></style>