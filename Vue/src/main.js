import Vue from "vue";
import App from "./App.vue";
import router from "./service/router";
import Bus from "./service/Bus";
import store from "./service/vuex";
import { Button } from "ant-design-vue";

Vue.use(Bus);
Vue.use(Button);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
