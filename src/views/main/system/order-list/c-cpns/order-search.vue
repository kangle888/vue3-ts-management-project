<template>
  <div class="search">
    <el-form :model="searchForm" ref="searchRef">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="商户单号" label-width="80px" prop="transactionId">
            <el-input
              v-model="searchForm.transactionId"
              style="width: 100%"
              placeholder="填写商户单号"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="交易单号" label-width="80px" prop="merchantTradeNo">
            <el-input
              v-model="searchForm.merchantTradeNo"
              style="width: 100%"
              placeholder="填写交易单号"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="支付时间" label-width="80px" prop="status">
            <el-select
              v-model="searchForm.time"
              @change="handleTimeChange"
              placeholder="选择支付时间段"
              style="width: 100%"
            >
              <el-option
                v-for="item in timeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="时间段" label-width="80px" prop="timeRange">
            <el-date-picker
              v-model="searchForm.timeRange"
              style="width: 100%"
              type="daterange"
              range-separator="—"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btns">
      <el-button icon="Refresh" @click="ResetFormContent">重置</el-button>
      <el-button icon="Search" type="primary" @click="searchOrderList">查询</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, type ElForm } from 'element-plus'
import { reactive, ref } from 'vue'
import useOrderListStore from '@/store/main/order-list/order-list'

type TimeOption = {
  value: string
  label: string
}
type DateRange = [Date, Date] | []
const searchRef = ref<InstanceType<typeof ElForm>>()
const searchForm = reactive({
  transactionId: '',
  merchantTradeNo: '',
  time: '',
  timeRange: [] as DateRange
})
const orderListStore = useOrderListStore()
const timeOptions: TimeOption[] = [
  {
    value: '1',
    label: '今天'
  },
  {
    value: '2',
    label: '近7天内'
  },
  {
    value: '3',
    label: '近30天内'
  },
  {
    value: '4',
    label: '近90天内'
  }
]

// 选择支付时间 联动时间段
const handleTimeChange = (value: string): void => {
  const today = new Date()
  let startDate: Date | null = null
  let endDate = new Date()

  switch (value) {
    case '1':
      startDate = new Date(today.setHours(0, 0, 0, 0))
      break
    case '2':
      startDate = new Date(today.getTime() - 3600 * 1000 * 24 * 7)
      break
    case '3':
      startDate = new Date(today.getTime() - 3600 * 1000 * 24 * 30)
      break
    case '4':
      startDate = new Date(today.getTime() - 3600 * 1000 * 24 * 90)
      break
    default:
      startDate = null
      endDate = null as any
  }
  searchForm.timeRange = startDate ? [startDate, endDate] : []
}

const ResetFormContent = () => {
  searchRef.value?.resetFields()
}
// 搜索功能
const searchOrderList = () => {
  // const params = {
  //   transactionId: searchForm.transactionId,
  //   merchantTradeNo: searchForm.merchantTradeNo,
  //   timeRange: searchForm.timeRange,
  //   page: 1,
  //   pageSize: 10
  // }
  // orderListStore.getOrderList(params)
  // 提示当前功能未开发，敬请期待~~~

  ElMessage({
    message: '当前功能暂未开放，敬请期待~~~',
    type: 'warning'
  })
}
</script>

<style lang="less" scoped>
.search {
  padding: 20px;
  background-color: #ffffff;
  // color: red;
}

.btns {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-right: 20px;
}
</style>
