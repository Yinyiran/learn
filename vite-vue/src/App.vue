<template>
  <div class="tab">
    <span
      v-for="tab in tabs"
      :class="{ active: curTab === tab.route }"
      @click="toRoute(tab.route)"
      >{{ tab.title }}</span
    >
  </div>
  <div class="router-view">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  watch,
  markRaw,
  toRaw,
  provide,
} from "vue";
import Routes from "./router";
export default defineComponent({
  setup() {
    let curTab = ref("/index");
    let tabs: Array<{ route: string; title: any }> = reactive([]);
    Routes.options.routes.forEach((r) => {
      if (r.meta) {
        tabs.push({
          route: r.path,
          title: r.meta.title,
        });
      }
    });
    provide("appData", "provide from app.vue");
    const testObj = { a: 1, b: 2, c: 0 };
    Object.defineProperty(testObj, "c", {
      set(val) {
        console.log(`设置c,${val}`);
      },
    });
    testObj.c = 20;
    window.testobj = testObj;

    const p = {
      name: "阿巴",
      age: 20,
    };
    const person = reactive(p);
    p.sex = 0;
    console.log(toRaw(person));
    console.log(toRaw(person) === p);

    watch(
      person,
      (newval, oldval) => {
        console.log(newval, oldval);
      },
      { immediate: true }
    );
    return {
      curTab,
      tabs,
      person,
      toRoute(route: string) {
        Routes.push(route);
        curTab.value = route;
      },
    };
  },
});
</script>
<style lang="less">
html,
body {
  height: 100%;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.tab {
  text-align: center;
  padding: 20px;
  span {
    display: inline-block;
    padding: 6px 10px;
    text-decoration: underline;
    cursor: pointer;
    font-size: 18px;
    &.active {
      color: dodgerblue;
    }
  }
}
.router-view {
  flex: 1;
}
</style>
