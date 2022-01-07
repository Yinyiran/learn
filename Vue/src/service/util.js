import Vue from "vue";

export const createEl = (component, props) => {
  const vm = new Vue({
    render(h) {
      return h(component, { props });
    },
  }).$mount();
  const comp = vm.$children[0];
  document.body.appendChild(comp.$el);
  // 提供删除dom方法
  comp.remove = () => {
    document.body.removeChild(vm.$el);
    vm.$destroy();
  };
  // setTimeout(() => {
  //   comp.remove();
  // }, 2000);
  return comp;
};

export const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    let r = (Math.random() * 16) | 0;
    let v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const delay2 = (() => {
  let timer = null;
  return (fn) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn();
    }, 500);
  };
})();

export const throttle = (() => {
  let timer = null;
  return (fn) => {
    if (timer) return;
    timer = setTimeout(() => {
      fn();
      clearTimeout(timer);
      timer = null;
    }, 500);
  };
})();
