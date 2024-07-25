<!-- src/components/OrderList.vue -->
<template>
  <div class="order-list">
    <el-skeleton :loading="orderListStore.loading" animated>
      <template #template>
        <!-- 骨架屏内容 -->
        <el-skeleton-item variant="text" style="width: 100%; height: 40px"></el-skeleton-item>
        <el-skeleton-item
          variant="text"
          style="width: 100%; height: 40px"
          v-for="i in 5"
          :key="i"
        ></el-skeleton-item>
      </template>
      <template #default>
        <!-- 实际内容 -->
        <TableList :data="pagedOrders" :columns="columns">
          <template #status="{ row }">
            <span>{{ getStatusText(row.status) }}</span>
          </template>
          <template #actions="{ row }">
            <div>
              <el-button plain type="danger" @click="handleCancel(row)" v-if="row.status === 3"
                >取消发货</el-button
              >
              <el-button plain type="primary" @click="handleDeliver(row)" v-if="row.status === 2"
                >发货</el-button
              >
              <el-button plain type="primary" @click="handleRefund(row)" v-if="row.status === 2"
                >退款</el-button
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
      </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import TableList from '@/components/table-list/table-list.vue'
import Pagination from '@/components/pagination/pagination.vue'
import useOrderListStore from '@/store/main/order-list/order-list'
import { refund, cancelDelivery, confirmDelivery } from '@/service/main/system/order-list'
import { ElMessage } from 'element-plus'
import type { refundInParams } from '@/types/order-list'

const props = defineProps({
  index: {
    type: String,
    required: true
  }
})
onMounted(() => {
  orderListStore.getOrderList({ admin: 1 })
})
const orderListStore = useOrderListStore()
// 分页相关数据
const currentPage = ref<number>(1)
const pageSize = ref<number>(10)

const columns = [
  { label: '商户单号/商户号', prop: 'number', width: '300' },
  { label: '交易单号/支付时间', prop: 'transactionId', width: '300' },
  { label: '支付金额', prop: 'amount' },
  { label: '支付时间', prop: 'payTime' }
]
// 获取状态文本
const getStatusText = (status: number) => {
  switch (status) {
    case 1:
      return '待付款'
    case 2:
      return '待发货'
    case 3:
      return '待收货'
    case 4:
      return '售后'
    case 5:
      return '已完成'
    default:
      return '未知状态'
  }
}

// 根据不同的 index 过滤订单数据
const filteredOrders = computed(() => {
  const orders = Array.isArray(orderListStore.orderList) ? orderListStore.orderList : []
  switch (props.index) {
    case '1':
      return orders
    case '2':
      return orders.filter((order) => order.status === 1)
    case '3':
      return orders.filter((order) => order.status === 2)
    case '4':
      return orders.filter((order) => order.status === 3)
    case '5':
      return orders.filter((order) => order.status === 4)
    case '6':
      return orders.filter((order) => order.status === 5)
    default:
      return []
  }
})

// 取消订单
const handleCancel = async (row: any) => {
  const { number } = row
  try {
    const res = await cancelDelivery({ number })
    if (res.code === 200) {
      ElMessage.success({
        message: '取消订单成功',
        duration: 2000 // 延迟关闭，单位为毫秒
      })

      // 在消息显示后，延迟调用 getOrderList
      setTimeout(() => {
        orderListStore.getOrderList({ admin: 1 })
      }, 2000)
    }
  } catch (e) {
    console.log(e)
  }
}

// 退款
const handleRefund = async (row: any) => {
  const { number, amount } = row
  const params: refundInParams = {
    number,
    amount,
    refundAmount: amount
  }
  try {
    const res = await refund(params)
    if (res.code === 200) {
      ElMessage.success({
        message: '退款成功',
        duration: 2000 // 延迟关闭，单位为毫秒
      })
      // 在消息显示后，延迟调用 getOrderList
      setTimeout(() => {
        orderListStore.getOrderList({ admin: 1 })
      }, 2000)
    }
  } catch (e) {
    console.log(e)
  }
}

// 发货
const handleDeliver = async (row: any) => {
  const { number } = row
  try {
    const res = await confirmDelivery({ number })
    if (res.code === 200) {
      ElMessage.success({
        message: '发货成功',
        duration: 2000 // 延迟关闭，单位为毫秒
      })
      // 在消息显示后，延迟调用 getOrderList
      setTimeout(() => {
        orderListStore.getOrderList({ admin: 1 })
      }, 2000)
    }
  } catch (e) {
    console.log(e)
  }
}

// 分页
const pagedOrders = computed(() => {
  // 如果 filteredOrders 不是数组，返回空数组
  if (!Array.isArray(filteredOrders.value)) {
    return []
  }
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
