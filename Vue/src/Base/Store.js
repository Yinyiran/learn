let Vue;

class Store {
  constructor(options) {
    this.$options = options;
    this.state = new Vue({
      data: options.state
    });
    this.mutations = options.mutations || {};
    this.actions = options.actions || {};
    options.getters && this.handlerGetters(options.getters);
  }

  commit = (type, arg) => {
    const fn = this.mutations[type];
    fn(this.state, arg);
  };
  dispatch = (type, arg) => {
    let fn = this.mutations[type];
    fn({ commit: this.commit, state: this.state }, arg);
  };
  handlerGetters(getters) {
    this.getters = {};
    Object.keys(getters).forEach(key => {
      Object.defineProperty(this.getters, key, {
        get: () => {
          return getters[key](this.state);
        }
      });
    });
  }
}

function install(_vue) {
  Vue = _vue;
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store;
      }
    }
  });
}
export default { Store, install };
