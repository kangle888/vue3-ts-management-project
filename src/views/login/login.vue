<template>
  <div class="login">
    <LoginPage />
  </div>
</template>

<script setup lang="ts">
import LoginPage from './login-page/index.vue';
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url("../../assets/img/login-bg.svg");
}
</style>
