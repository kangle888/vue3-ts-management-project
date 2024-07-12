<!-- src/components/OrderList.vue -->
<template>
  <div class="order-list">
    <TableList :data="pagedOrders" :columns="columns">
      <template #actions="{ row }">
        <div>
          <el-button plain type="danger" @click="handleEdit(row)" v-if="row.orderState === 1"
            >取消订单</el-button
          >
          <el-button plain type="primary" @click="handleDetail(row)" v-if="row.orderState !== 1"
            >发货</el-button
          >
          <el-button plain type="primary" @click="handleShip(row)" v-if="row.orderState === 4"
            >详情</el-button
          >
        </div>
      </template>
    </TableList>
    <!-- 引入分页组件 -->
    <div class="pagination">
      <Pagination
        :total="filteredOrders.length"
        :page-size="pageSize"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30]"
        size="medium"
        :disabled="false"
        :background="true"
        @pageChange="handlePageChange"
        @sizeChange="handleSizeChange"
        @update:currentPage="updateCurrentPage"
        @update:pageSize="updatePageSize"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import TableList from '@/components/table-list/table-list.vue'
import Pagination from '@/components/pagination/pagination.vue'

const props = defineProps({
  index: {
    type: String,
    required: true
  }
})
// 分页相关数据
const currentPage = ref<number>(1)
const pageSize = ref<number>(10)
// 模拟的订单数据 for 循环 生产数据50条
const allOrders = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  merchantTradeNo: `2024062511333925944822${index}`,
  transactionId: `420000221420240625571753980${index}`,
  paidAmount: `${22800 + index}`,
  payTime: `2021-05-0${index}`,
  orderState: index % 6
}))

const columns = [
  { label: '商户单号/商户号', prop: 'merchantTradeNo', width: '350' },
  { label: '交易单号/支付时间', prop: 'transactionId', width: '350' },
  { label: '支付金额', prop: 'paidAmount' },
  { label: '支付时间', prop: 'payTime' },
  { label: '状态', prop: 'orderState' }
]

// 根据不同的 index 过滤订单数据
const filteredOrders = computed(() => {
  switch (props.index) {
    case '1':
      return allOrders
    case '2':
      return allOrders.filter((order) => order.orderState === 1)
    case '3':
      return allOrders.filter((order) => order.orderState === 2)
    case '4':
      return allOrders.filter((order) => order.orderState === 3)
    case '5':
      return allOrders.filter((order) => order.orderState === 4)
    case '6':
      return allOrders.filter((order) => order.orderState === 5)
    default:
      return []
  }
})

// 编辑订单
const handleEdit = (row: any) => {
  console.log('编辑订单', row)
}
// 查看订单详情
const handleDetail = (row: any) => {
  console.log('查看订单详情', row)
}
// 分页

const pagedOrders = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredOrders.value.slice(start, end)
})
// 处理分页变化事件
const handlePageChange = (page: number) => {
  currentPage.value = page
}

// 处理每页显示条数变化事件
const handleSizeChange = (size: number) => {
  pageSize.value = size
}

// 更新 currentPage 和 pageSize
const updateCurrentPage = (page: number) => {
  currentPage.value = page
}

const updatePageSize = (size: number) => {
  pageSize.value = size
}
</script>

<style scoped>
/* 添加你的样式 */
.pagination {
  padding: 20px;
  background-color: #ffffff;
}
</style>
