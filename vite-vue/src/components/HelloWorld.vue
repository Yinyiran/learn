<template>
  <h1>{{ msg }}</h1>
  <div class="angle"></div>
  <p>
    <span class="tooltip" :data-tooltip="`Recommended IDE setup,${tooltip}`"
      >Recommended IDE setup:</span
    >
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
      tooltip: "this is a pure css tooltip",
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

<style scoped lang="less">
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
.angle {
  display: inline-block;
  border-width: 5px;
  border-style: solid;
  border-color: #062b45 transparent transparent transparent;
}
.tooltip {
  position: relative;
  border-bottom: 1px dotted black;
  &:hover {
    &::before,
    &::after {
      opacity: 1;
      visibility: visible;
    }
  }
}

/* Tooltip box */
.tooltip:before {
  content: attr(data-tooltip);
  position: absolute;
  background-color: #062b45;
  color: #fff;
  text-align: center;
  padding: 10px;
  line-height: 1.2;
  border-radius: 6px;
  max-width: 100%;
  min-width: 60%;
  opacity: 0;
  transition: opacity 0.6s;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.75em;
  visibility: hidden;
}

/* Tooltip arrow */
.tooltip:after {
  content: "";
  position: absolute;
  bottom: 75%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  opacity: 0;
  transition: opacity 0.6s;
  border-color: #062b45 transparent transparent transparent;
  visibility: hidden;
}
</style>
