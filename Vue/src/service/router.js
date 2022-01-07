import Vue from "vue";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import VueRouter from "../Base/Route";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    { path: "/", component: Home },
    { path: "/about", component: About },
  ],
});
