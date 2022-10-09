<template>
  <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
  <HelloWorld
    :msg="space"
    @hello-world="helloWorld"
    v-model:first-title="firstTitle"
    v-model:second-title="secondTitle"
  />
  <input :[value]="type" v-model="space" />
  <h3>FullTitle: {{ fullTitle }}</h3>
  <model-modifier
    v-model.capture="modifer"
    v-model:desc.capture="descModifer"
  ></model-modifier>
  <teleport to="#app">
    <h1>ljjemllljcmogpfapbkkighbhhppjdbglj</h1>
  </teleport>
  <Child />
  <button @click="changePerson('alal')">改变数据1</button>
  <button @click="changePerson('aa')">改变数据2</button>
</template>

<script lang="ts">
import { defineComponent, onMounted, onActivated, onUpdated } from "vue";
import HelloWorld from "./HelloWorld.vue";
import ModelModifier from "./ModelModifier.vue";
import Child from "./child.vue";
export default defineComponent({
  name: "App",
  components: { Child, HelloWorld, ModelModifier },
  data() {
    return {
      space: "Hello Vue 3 + TypeScript + Vite",
      type: "password",
      firstTitle: "App.vue first-title",
      secondTitle: "App.vue second-title",
      modifer: "",
      descModifer: "",
    };
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  updated() {
    console.log("updated");
  },
  setup() {
    let itemRefs: any[] = [];
    const setItemRef = (el: any) => {
      if (el) {
        itemRefs.push(el);
      }
    };
    onMounted(() => {
      itemRefs = [];
    });
    onUpdated(() => {
      console.log(itemRefs);
    });
    const person = { name: "" };
    return {
      setItemRef,
      changePerson(n: string) {
        person.name = n;
      },
    };
  },
  methods: {
    helloWorld() {
      console.log("helloWorld0");
    },
  },
  computed: {
    value() {
      return "ty" + "pe";
    },
    fullTitle(): string {
      return this.firstTitle + " " + this.secondTitle;
    },
  },
});
</script>

<style></style>
