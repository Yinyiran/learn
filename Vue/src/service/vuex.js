import Vue from "vue";
import Vuex from "../Base/Store";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    login: ""
  },
  mutations: {
    loginFn(state, arg) {
      state.login = arg;
    }
  }
});
