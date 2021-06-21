import Vue from "vue";
export class Store {
  constructor(options = {}) {
    const { state = {}, mutations = {} } = options;
    this._vm = new Vue({
      data: {
        $$state: state,
      },
    });
    this._mutations = mutations;
  }
  commit(type, payload) {
    if (this._mutations[type]) {
      this._mutations[type](this.state, payload);
    }
  }
}

Object.defineProperty(Store.prototype, {
  state: {
    get: function() {
      return this._vm.data.$$state;
    },
  },
});
// 可以直接改，不需要clone?
