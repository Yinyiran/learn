<template>
  <div class="tab">
    <span v-for="tab in tabs" @click="toRoute(tab.route)">{{ tab.title }}</span>
  </div>
  <div class="router-view">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Routes from "./router";
export default defineComponent({
  provide: {
    appData: "provide app.vue",
    hahah: ["ssss"],
  },
  methods: {
    toRoute(index: string) {
      this.$router.push(index);
    },
  },
  computed: {
    tabs() {
      let tabArr: Array<{ route: string; title: any }> = [];
      Routes.options.routes.forEach((r) => {
        if (r.meta) {
          tabArr.push({
            route: r.path,
            title: r.meta.title,
          });
        }
      });
      return tabArr;
    },
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
    padding: 6px 20px;
    color: dodgerblue;
    text-decoration: underline;
    cursor: pointer;
    font-size: 20px;
  }
}
.router-view {
  flex: 1;
}
</style>
