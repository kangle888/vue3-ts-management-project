<!-- src/components/Pagination.vue -->
<template>
  <el-pagination v-model:current-page="localCurrentPage" v-model:page-size="localPageSize" :page-sizes="pageSizes"
    :size="size" :disabled="disabled" :background="background" layout="total,sizes, ->, prev, pager, next, jumper"
    :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch, type PropType } from 'vue'

const props = defineProps({
  total: {
    type: Number,
    required: true
  },
  currentPage: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 10
  },
  pageSizes: {
    type: Array as PropType<number[]>,
    default: () => [10, 20, 30, 40, 50]
  },
  size: {
    type: String,
    default: 'medium'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  background: {
    type: Boolean,
    default: true
  }
})

const emits = defineEmits(['update:currentPage', 'update:pageSize', 'pageChange', 'sizeChange'])

const localCurrentPage = ref(props.currentPage)
const localPageSize = ref(props.pageSize)

watch(
  () => props.currentPage,
  (newVal) => {
    localCurrentPage.value = newVal
  }
)

watch(
  () => props.pageSize,
  (newVal) => {
    localPageSize.value = newVal
  }
)

const handleSizeChange = (size: number) => {
  emits('update:pageSize', size)
  emits('sizeChange', size)
}

const handleCurrentChange = (page: number) => {
  emits('update:currentPage', page)
  emits('pageChange', page)
}
</script>

<style scoped>
/* 添加你的样式 */
</style>
