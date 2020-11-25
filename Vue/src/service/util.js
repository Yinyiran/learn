import Vue from "vue";

export const createEl = (component, props) => {
  const vm = new Vue({
    render(h) {
      return h(component, { props });
    }
  }).$mount();
  const comp = vm.$children[0];
  document.body.appendChild(comp.$el);
  // 提供删除dom方法
  comp.remove = () => {
    document.body.removeChild(vm.$el);
    vm.$destroy();
  };
  setTimeout(() => {
    comp.remove();
  }, 2000);
  return comp;
};
