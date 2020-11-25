let Vue;

class VueRouter {
  constructor(options) {
    this.$options = options;
    this.routeMap = {};
    this.app = new Vue({
      data: {
        current: "/"
      }
    });
  }
  init() {
    this.bindEvents();
    this.createRouteMap(this.$options);
    this.initComponent();
  }
  bindEvents() {
    window.addEventListener("hashchange", this.onHashChange.bind(this));
    window.addEventListener("load", this.onHashChange.bind(this));
  }
  onHashChange() {
    // http://location/#/home
    this.app.current = window.location.hash.slice(1) || "/";
  }
  createRouteMap(options) {
    options.routes.forEach(item => {
      this.routeMap[item.path] = item;
    });
  }
  initComponent() {
    // 声明两个全局组件
    Vue.component("router-link", {
      props: {
        to: String
      },
      render(h) {
        // 目标是：<a :href="to">xxx</a>
        return h("a", { attrs: { href: "#" + this.to } }, this.$slots.default);
        // return <a href={this.to}>{this.$slots.default}</a> 这种会报错
      }
    });

    Vue.component("router-view", {
      render: h => {
        const Comp = this.routeMap[this.app.current].component;
        return h(Comp);
      }
    });
  }
  static install = _Vue => {
    Vue = _Vue;
    Vue.mixin({
      beforeCreate() {
        if (this.$options.router) {
          // Vue.prototype.$router = this.$options.router;
          this.$options.router.init();
        }
      }
    });
  };
}

export default VueRouter;
