<template>
  <div class="main-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="" />
      <h2 v-show="!isFold" class="title">番茄管理系统</h2>
    </div>
    <div class="menu">
      <el-menu
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
        :default-active="defaultActive"
        :collapse="isFold"
      >
        <template v-for="menu in userMeus" :key="menu.id">
          <el-sub-menu :index="menu.id + ''">
            <template #title>
              <!-- 动态组件展示图标 -->
              <el-icon>
                <component :is="menu.icon"></component>
              </el-icon>
              <span>{{ menu.name }}</span>
            </template>
            <template v-for="item in menu.children" :key="item.id">
              <el-menu-item :index="item.id + ''" @click="switchMenu(item)">{{
                item.name
              }}</el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import userLoginStore from '@/store/login/login'
import { pathMapToMenu } from '@/utils/map-menus'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

// 获取菜单
const loginStore = userLoginStore()
const userMeus = loginStore.userMenus

// el-menu 默认选中菜单
const route = useRoute()

const defaultActive = computed(() => {
  const pathMenu = pathMapToMenu(userMeus, route.path)
  return pathMenu.id + ''
})

// 切换菜单,监听item点击事件
const router = useRouter()
const switchMenu = (menu: any) => {
  const url = menu.url
  router.push(url)
  console.log(menu)
}
</script>

<style lang="less" scoped>
.main-menu {
  height: 100%;
  width: 221px;
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
