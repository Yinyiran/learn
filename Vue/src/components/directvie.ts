import Vue from "vue";

Vue.directive("focus", {
  // 只调用一次指令绑定时调用
  bind(el){

  },
  // 被绑定元素插入父节点时调用（仅保证父节点存在，但是不一定被插入文档中
  inserted: function (el) {
    el.focus()
  }
})