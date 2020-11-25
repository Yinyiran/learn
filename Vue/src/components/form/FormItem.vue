<template>
  <div class="form-item">
    <label class="label" v-if="label">{{ label }}</label>
    <div class="slot-content">
      <slot></slot>
      <div class="err-msg" v-if="errorMsg">{{ errorMsg }}</div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["Form"],
  props: {
    prop: String,
    label: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      errorMsg: ""
    };
  },
  mounted() {
    this.$on("validate", this.validate);
    // this.$on("acceptBroad", params => {
    //   console.log("component:form-item, accept broadcase fn", params);
    // });
  },
  methods: {
    validate() {
      let val = this.Form.model[this.prop];
      let msg = this.Form.rules[this.prop].message;
      if (val) {
        this.errorMsg = "";
      } else {
        this.errorMsg = msg;
      }
    }
  }
};
</script>

<style>
.form-item {
  padding: 10px;
  text-align: left;
  display: flex;
}
.label {
  display: inline-block;
  min-width: 100px;
  text-align: right;
  padding-right: 10px;
}
.slot-content {
  position: relative;
}
.err-msg {
  position: absolute;
  font-size: 12px;
}
</style>
