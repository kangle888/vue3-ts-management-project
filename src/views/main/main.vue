<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapseComputed ? '60px' : '220px'">
        <main-menu :is-fold="isCollapseComputed"></main-menu>
      </el-aside>
      <el-container>
        <el-header>
          <!--父组件接收自定义事件 -->
          <main-header @fold-change="handleFoldChange"></main-header>
        </el-header>
        <el-main>
          <!-- main页面的路由 -->
          <router-view v-slot="{ Component }">
            <transition name="slide-fade">
              <component :is="Component" />
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import MainHeader from '@/components/main-header/main-header.vue'
import MainMenu from '@/components/main-menu/main-menu.vue'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const isCollapse = ref(false)
const handleFoldChange = (val: boolean) => {
  isCollapse.value = val
}
// 监听窗口大小变化
const windowWidth = ref(window.innerWidth)
const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth
}
// 定义计算属性，用于根据窗口大小判断是否折叠侧边栏
const isCollapseComputed = computed(() => windowWidth.value < 768 || isCollapse.value)
onMounted(() => {
  window.addEventListener('resize', updateWindowWidth)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowWidth)
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
    scrollbar-width: none;
    /* firefox */
    -ms-overflow-style: none;
    /* IE 10+ */

    transition: width 0.3s ease;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    background-color: #f0f2f5;
  }


  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.7s ease;
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(100%);
    opacity: 0;
  }

}
</style>
