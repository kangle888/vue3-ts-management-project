<template>
  <div class="main-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="" />
      <h2 v-show="!isFold" class="title">番茄管理系统</h2>
    </div>
    <div class="menu">
      <el-menu text-color="#b7bdc3" active-text-color="#fff" background-color="#001529" default-active="1"
        :collapse="isFold">
        <template v-for="menu in userMeusList" :key="menu.id">
          <el-sub-menu :index="menu.id + ''">
            <template #title>
              <!-- 动态组件展示图标 -->
              <el-icon>
                <component :is="menu.icon"></component>
              </el-icon>
              <span>{{ menu.name }}</span>
            </template>
            <template v-for="item in menu.children" :key="item.id">
              <el-menu-item :index="item.id + ''">{{ item.name }}</el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import userLoginStore from '@/store/login/login'
import { ref } from 'vue'

defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

// 获取菜单
const loginStore = userLoginStore()
const userMeus = loginStore.userMenus
const userMeusList = ref([
  {
    id: 1,
    name: '系统总览',
    icon: 'location',
    children: [
      {
        id: 1,
        name: '用户分析'
      }
    ]
  },
  {
    id: 2,
    name: '商品中心',
    icon: 'location',
    children: [
      {
        id: 1,
        name: '商品类型'
      },
      {
        id: 2,
        name: '物流统计'
      }
    ]
  },
  {
    id: 3,
    name: '系统设置',
    icon: 'Setting',
    children: [
      {
        id: 1,
        name: '系统设置'
      }
    ]
  }
])
</script>

<style lang="less" scoped>
.main-menu {
  height: 100%;
  width: 211px;
  background-color: #001529;
}

.logo {
  display: flex;
  height: 60px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}
</style>
