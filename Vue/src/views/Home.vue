<template>
  <div class="home">
    <img alt="Vue logo" @click="broadFn" src="../assets/logo.png" />
    <div class="content">
      <HelloWorld msg="Welcome to Your Vue.js App">
        <template v-slot:title>
          <p>slot-title</p>
        </template>
        <template v-slot>
          <p>slot-default</p>
        </template>
        <template v-slot:footer>Hello-world title</template>
        <template v-slot:hello="props">
          <h5>{{ props }}</h5>
        </template>
      </HelloWorld>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from "vue";
import HelloWorld from "@/components/HelloWorld.vue";
import { broadcase } from "../service/emiter";

export default {
  name: "Home",
  components: { HelloWorld },
  methods: {
    broadFn() {
      broadcase.call(this, "form-item", "acceptBroad", "Home  broadFn()");
    },
  },
  created() {
    Vue.component("comp-exam", {
      render() {
        return (
          <h1>
            <a>jsx写法</a>
          </h1>
        );
      },
      props: {
        name: {
          type: String,
        },
      },
    });
  },
};
</script>
<style>
.content {
  display: flex;
}
</style>
