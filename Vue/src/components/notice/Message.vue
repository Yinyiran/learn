<template>
  <div class="message">
    <span class="title">{{ message }}</span>
  </div>
</template>

<script>
export default {
  props: {
    message: String
  }
};
</script>

<style>
.message {
  position: fixed;
  top: 20px;
  left: 50%;
  padding: 6px 20px;
  background-color: #32cd32;
  transform: translateX(-50px);
  max-width: 80%;
}
.title {
  color: #fff;
}
</style>
