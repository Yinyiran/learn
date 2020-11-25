<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="handle">测试fuction applly</button>
  </div>
</template>
<script>
const obj = {
  name: "apply",
  age: "1",
  fn(param1, param2) {
    let str = `${this.name}'s age:${this.age} ; ${param1}/${param2}`;
    console.log(str);
  }
};
export default {
  data() {
    return {
      name: "Vue",
      age: "5",
      callObj: {
        name: "call",
        age: 20
      }
    };
  },
  methods: {
    handle() {
      obj.fn.apply(this, ["a", "b"]);
      obj.fn.call(this.callObj, ...["aaw", "bawe"]);
      console.log(this.prototype);
      console.log(this.$store.state.login);
    }
  },
  mounted() {
    this.$bus.on("test$bus", params => {
      console.log(params);
    });
  }
};
</script>

<style></style>
