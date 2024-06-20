<template>
  <div class="main">
    <el-container>
      <el-aside width="200px">
        <main-menu></main-menu>
      </el-aside>
      <el-container>
        <el-header>
          <main-header></main-header>
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import MainHeader from '@/components/main-header/main-header.vue';
import MainMenu from '@/components/main-menu/main-menu.vue';
import hyRequest from '@/service';
hyRequest.request({
}).then(res => {
  console.log(res);
})
</script>

<style lang="less" scoped></style>
