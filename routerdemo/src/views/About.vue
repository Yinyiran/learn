<template>
  <div class="about">
    <router-view></router-view>
    <h1 @click="$router.push('child')">This is an about page</h1>
  </div>
</template>
<script>
import AboutChild from "../components/about-child";
export default {
  components: { AboutChild },
};
</script>
