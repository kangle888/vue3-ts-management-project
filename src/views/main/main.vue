<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '190px'">
        <main-menu :is-fold="isCollapse"></main-menu>
      </el-aside>
      <el-container>
        <el-header>
          <!--父组件接收自定义事件 -->
          <main-header @fold-change="handleFoldChange"></main-header>
        </el-header>
        <el-main>
          <!-- main页面的路由 -->
          <router-view> </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import MainHeader from '@/components/main-header/main-header.vue'
import MainMenu from '@/components/main-menu/main-menu.vue'
import hyRequest from '@/service'
import { ref } from 'vue'

const isCollapse = ref(false)

const handleFoldChange = (val: boolean) => {
  isCollapse.value = val
}

hyRequest.request({}).then((res) => {
  console.log(res)
})
</script>

<style lang="less" scoped>
.main {
  height: 100%;
}
.main-content {
  height: 100%;

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    transition: width 0.3s ease;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    background-color: #f0f2f5;
  }
}
</style>
