<template>
  <a-button type="primary">ant-design-button</a-button>
  <a-tree
    checkable
    :tree-data="treeData"
    v-model:expandedKeys="expandedKeys"
    v-model:selectedKeys="selectedKeys"
    v-model:checkedKeys="checkedKeys"
  >
    <template #title0010><span style="color: #1890ff">sss</span></template>
  </a-tree>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { TreeDataItem } from "ant-design-vue/es/tree/Tree";

const treeData: TreeDataItem[] = [
  {
    title: "parent 1",
    key: "0-0",
    children: [
      {
        title: "parent 1-0",
        key: "0-0-0",
        children: [
          { title: "leaf", key: "0-0-0-0" },
          { title: "leaf", key: "0-0-0-1" },
        ],
      },
      {
        title: "parent 1-1",
        key: "0-0-1",
        children: [{ key: "0-0-1-0", slots: { title: "title0010" } }],
      },
    ],
  },
];

export default defineComponent({
  setup() {
    const expandedKeys = ref<string[]>(["0-0-0", "0-0-1"]);
    const selectedKeys = ref<string[]>(["0-0-0", "0-0-1-0"]);
    const checkedKeys = ref<string[]>(["0-0-0", "0-0-1"]);
    watch(expandedKeys, () => {
      console.log("expandedKeys", expandedKeys);
    });
    watch(selectedKeys, () => {
      console.log("selectedKeys", selectedKeys);
    });
    watch(checkedKeys, () => {
      console.log("checkedKeys", checkedKeys);
    });

    return {
      treeData,
      expandedKeys,
      selectedKeys,
      checkedKeys,
    };
  },
});
</script>
<style lang=""></style>
