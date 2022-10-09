class Vue {
  options = null;
  constructor(options) {
    this.$options = options;
    this.$data = options.data;
    this.observe(this.$data);
  }
  observe(value) {
    if (!value || typeof value !== "object") {
      return;
    }
    Object.keys(value).forEach((key) => {
      this.defineReactive(value, key, value[key]);
      this.proxyData(key);
    });
  }
  defineReactive(obj, key, val) {
    Object.defineProperty(obj, key, {
      get() {
        console.log(`获取${key}属性，值是${val}`);
        return val;
      },
      set(newVal) {
        console.log(`设置${key}属性，值是${newVal}`);
        val = newVal;
      },
    });
  }
  // 将data的数据挂载到this上
  proxyData(key) {
    Object.defineProperty(this, key, {
      get() {
        return this.$data[key];
      },
      set(newVal) {
        this.$data[key] = newVal;
      },
    });
  }
}

export default Vue;
