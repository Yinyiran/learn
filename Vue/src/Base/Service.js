import Vue from "vue"

Vue.directive("click-outside", {
  bind: function (el, binding, vnode) {
    if (!el == event.target || el.contain(event.target)) {
      if (typeof vnode.context[binding.expression] === "function") {
        vnode.context[binding.expresssiong](event)
      }
    }
  }
})