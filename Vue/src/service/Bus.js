export default class Bus {
  constructor() {
    this.Cache = {};
  }
  on(key, fn) {
    this.Cache[key] = fn;
  }
  emit(key, value) {
    let fn = this.Cache[key];
    if (fn) fn(value);
  }
}
Bus.install = function(Vue) {
  Vue.prototype.$bus = new Bus();
};
