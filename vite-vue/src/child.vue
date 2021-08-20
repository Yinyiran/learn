<template>
  <div class="child-name">子组件{{ appData }}</div>
  <h1>子组件{{ name }}</h1>
  <Descendant />
</template>
<script lang="ts" setup>
import Descendant from "./descendant.vue"
import { inject } from "vue"
const appData = inject("appData")
const name = "child-component"
</script>
<style lang="less">
.child-name {
  color: red;
  &:hover {
    color: blue;
  }
}
</style>