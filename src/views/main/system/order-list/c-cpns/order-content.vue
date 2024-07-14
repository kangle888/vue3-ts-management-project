<template>
  <div class="content">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#ffffff"
      text-color="#737373" active-text-color="#353535" @select="handleSelect">
      <el-menu-item index="1">全部</el-menu-item>
      <el-menu-item index="2">待发货</el-menu-item>
      <el-menu-item index="3">48小时待发货</el-menu-item>
      <el-menu-item index="4">超时未发货</el-menu-item>
      <el-menu-item index="5">已发货</el-menu-item>
      <el-menu-item index="6">未发货</el-menu-item>
    </el-menu>
    <OrderList :index="activeIndex" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import OrderList from './order-list.vue'

const activeIndex = ref<string>('1')
const handleSelect = (key: string) => {
  activeIndex.value = key
}
</script>

<style lang="less" scoped>
.content {
  background-color: #ffffff;
  margin-top: 20px;
  padding: 20px;
}

h2 {
  font-weight: 700;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
