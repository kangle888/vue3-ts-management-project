<template>
  <div class="order">
    <order-search />
    <order-content />
  </div>
</template>

<script setup lang="ts">
import OrderSearch from './c-cpns/order-search.vue'
import OrderContent from './c-cpns/order-content.vue'
</script>

<style lang="less" scoped>
.order {
  border-radius: 8px;
  overflow: hidden;
}
</style>
