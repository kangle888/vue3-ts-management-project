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
              <el-button plain type="primary" @click="handleDetail(row)">详情</el-button>
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
    <!-- 订单详情抽屉 -->

    <el-drawer v-model="drawerVisible" title="订单详情" :with-header="false">
      <div class="content">
        <div class="title">{{ drawerTitle }}</div>
        <div class="order-details">
          <div>
            <span>订单状态</span>
            <span>{{ getStatusText(selectedOrder?.status) }}</span>
          </div>
          <div>
            <span>客户姓名</span>
            <span>{{ selectedOrder?.address?.name }}</span>
          </div>
          <div>
            <span>下单地址</span>
            <span>{{ selectedOrder?.address?.city + selectedOrder?.address?.detailAddress }}</span>
          </div>
          <div>
            <span>支付金额</span>
            <span>¥ {{ selectedOrder?.amount }}</span>
          </div>
          <div v-if="selectedOrder?.payTime">
            <span>支付时间</span>
            <span>{{ selectedOrder?.payTime }}</span>
          </div>
        </div>
        <!-- // 产品盒子列表详情 -->
        <div v-if="selectedOrder?.productBoxList?.length > 0">
          <div
            class="product-box-list"
            v-for="(boxItem, index) in selectedOrder.productBoxList"
            :key="index"
          >
            <div class="left">
              <div class="box-name">{{ boxItem?.name }}</div>
              <div class="box-month" v-if="boxItem?.productBoxNumList?.length > 0">
                {{ Number(boxItem?.unit) + 1 }}月装
              </div>
            </div>
            <div class="center">
              <img :src="boxItem?.image" alt="Product Image" />
            </div>
            <div v-if="boxItem?.productBoxNumList?.length > 0" class="right">
              <div
                v-for="(item, index) in boxItem?.productBoxNumList"
                :key="index"
                class="box-item-deail-list"
              >
                <div class="box-item-list">
                  <span>{{ item?.name }}</span>
                  <span>￥{{ item?.price }}/{{ item?.unitName }}</span>
                  <span>数量{{ item?.num }}</span>
                </div>
              </div>
            </div>
            <div v-else>
              <div>数量 {{ boxItem?.num }}</div>
            </div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
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
watch(
  () => props.index,
  () => {
    orderListStore.getOrderList({ admin: 1 })
  }
)
const orderListStore = useOrderListStore()
const drawerVisible = ref<boolean>(false)
const selectedOrder = ref<any>(null)
const drawerTitle = ref('订单详情')
// 分页相关数据
const currentPage = ref<number>(1)
const pageSize = ref<number>(10)

const columns = [
  { label: '商户单号/商户号', prop: 'number', width: '300' },
  { label: '交易单号/支付时间', prop: 'transactionId', width: '300' },
  { label: '顺丰单号', prop: 'waybill', width: '300' },
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

// 查看订单详情
const handleDetail = (row: any) => {
  console.log(row)
  selectedOrder.value = row
  drawerVisible.value = true
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

<style scoped lang="less">
/* 添加你的样式 */
.pagination {
  padding: 20px;
  background-color: #ffffff;
}
.title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
}
.order-details {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 700px;
  width: 100%;
  margin: auto;
}
.order-details div {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.order-details div:last-child {
  margin-bottom: 0;
}
.order-details span {
  color: #666;
}

.product-box-list {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s;
  margin-top: 16px;
  &:hover {
    border-color: #bbb;
  }

  .left {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 8px;
    margin-right: 8px;
    color: #666;
    .box-month {
      margin-top: 8px;
    }
  }

  .center {
    flex: 0 0 100px;
    margin-right: 16px;

    img {
      width: 100%;
      height: auto;
      border-radius: 4px;
      object-fit: cover;
    }
  }

  .right {
    flex: 1;

    .box-item-deail-list {
      margin-top: 12px;

      .box-item-list {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        border-bottom: 1px solid #eee;

        p {
          margin: 0;
          font-size: 14px;
          color: #333;
        }

        span {
          font-size: 14px;
          color: #666;
          &:last-child {
            margin-center: 8px;
          }
        }
      }

      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
