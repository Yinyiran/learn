function broadcase(componentName, eventName, params) {
  this.$children.forEach(child => {
    const name = child.$options._componentTag;
    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcase.apply(child, [componentName, eventName].concat(params));
    }
  });
}

module.exports = {
  dispatch(componentName, eventName, params) {
    let parent = this.$parent || this.$root;
    let name = parent.$options.componentName;
    while (parent && (!name || !name === componentName)) {
      parent = parent.$parent;
      if (parent) {
        name = parent.$options._componentTag;
      }
    }
    if (parent) {
      parent.$emit.apply(parent, [eventName].concat(params));
    }
  },

  broadcase(componentName, eventName, params) {
    broadcase.call(this, componentName, eventName, params);
  }
};
