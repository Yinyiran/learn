<template>
  <a-button type="primary">ant-design-button</a-button>
  <a-tree
    :tree-data="treeData"
    v-model:expandedKeys="expandedKeys"
    v-model:selectedKeys="selectedKeys"
    v-model:checkedKeys="checkedKeys"
  ></a-tree>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";

const treeData: any = [
  {
    title: "parent 1",
    key: "0-0",
    children: [
      {
        title: "parent 1-0",
        key: "0-0-0",
        children: [
          { title: "leaf", key: "0-0-0-1" },
          {
            title: "parent 1-0-0-0",
            key: "1-0-0-1",
            children: [
              { title: "leaf1", key: "1-0-0-2" },
              { title: "leaf2", key: "1-0-0-3" },
            ],
          },
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
