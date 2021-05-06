<template>
  <h1>{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a
      href="https://marketplace.visualstudio.com/items?itemName=octref.vetur"
      target="_blank"
      >Vetur</a
    >
    or
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    (if using
    <code>&lt;script setup&gt;</code>)
  </p>

  <p>
    See
    <code>README.md</code> for more information.
  </p>
  <p>{{ list }}</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank"
      >Vite Docs</a
    >
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button @click="count++">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
  <template v-for="(item, index) in list">
    <button @click="add(item, index), two(item, index)">{{ item }}</button>
  </template>
  <h4 @click="updateTitle1">firstTitle:{{ firstTitle }}</h4>
  <h4 @click="updateTitle2">secondTitle:{{ secondTitle }}</h4>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: {
      type: String,
      required: true,
    },
    firstTitle: String,
    secondTitle: String,
  },
  emits: ["helloWorld", "update:firstTitle", "update:secondTitle"],
  setup: () => {
    const count = ref(0);
    return { count };
  },
  data() {
    return {
      list: ["1", "2", "3", "4"],
    };
  },
  methods: {
    add(item: string, index: number) {
      let num = Number(item);
      num++;
      this.list[index] = num.toString();
    },
    two(item: string, index: number) {
      console.log(item, index);
    },
    updateTitle1() {
      this.$emit("update:firstTitle", "App.vue update firstTitle");
    },
    updateTitle2() {
      this.$emit("update:secondTitle", "App.vue update secondTitle");
    },
  },
});
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
