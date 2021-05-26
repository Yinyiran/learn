<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>{{ model }}</h1>
    <m-form :model="model" :rules="rules" ref="formRef">
      <form-item label="用户名" prop="username" ref="aaa">
        <m-input v-model="model.username"></m-input>
      </form-item>
      <form-item label="密码" prop="password">
        <m-input v-model="model.password" type="password"></m-input>
      </form-item>
      <form-item>
        <button @click="submit">保存</button>
      </form-item>
    </m-form>
  </div>
</template>

<script lang="ts">
import MForm from "./form/MForm.vue";
import FormItem from "./form/FormItem.vue";
import MInput from "./form/MInput.vue";
import { createEl } from "../service/util.js";
import Message from "./notice/Message.vue";

export default {
  components: { FormItem, MInput, MForm },
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      model: {
        username: "",
        password: ""
      },
      rules: {
        username: { require: true, message: "用户名必填" },
        password: { require: true, message: "密码必填" }
      }
    };
  },
  methods: {
    submit() {
      this.$refs.formRef.validate();
      createEl(Message, { message: "保存成功" });
      this.$bus.emit("test$bus", "this is a test about $bus");
    }
  }
};
</script>

<style scoped></style>
