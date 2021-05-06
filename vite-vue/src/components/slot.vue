<template>
  <slot-exam>
    <template #header> lllll {{ name }} </template>
    <template #default="{item}"> {{ item }} </template>
    <template #footer> footer </template>
  </slot-exam>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import SlotExam from "./slot-exam.vue";
export default defineComponent({
  components: { SlotExam },
  data() {
    return {
      name: "btn-name",
    };
  },
});
</script>
<style></style>
