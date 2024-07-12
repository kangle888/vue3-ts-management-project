<template>
  <div class="search">
    <el-form :model="searchForm" ref="searchRef">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="商户单号" label-width="80px" prop="username">
            <el-input
              v-model="searchForm.username"
              style="width: 100%"
              placeholder="填写商户单号"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="交易单号" label-width="80px" prop="realname">
            <el-input
              v-model="searchForm.realname"
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
          <el-form-item label="时间段" label-width="80px" prop="createTime">
            <el-date-picker
              v-model="searchForm.createTime"
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
      <el-button icon="Search" type="primary">查询</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'

const searchRef = ref<InstanceType<typeof ElForm>>()

const searchForm = reactive({
  username: '',
  realname: '',
  cellphone: '',
  time: '',
  createTime: []
})
const timeOptions = [
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
const handleTimeChange = (value: string) => {
  const today = new Date()
  let startDate: Date | null = null
  let endDate = new Date()

  switch (value) {
    case '1':
      startDate = new Date(today.setHours(0, 0, 0, 0))
      break
    case '2':
      startDate = new Date(today.setDate(today.getDate() - 7))
      break
    case '3':
      startDate = new Date(today.setDate(today.getDate() - 30))
      break
    case '4':
      startDate = new Date(today.setDate(today.getDate() - 90))
      break
    default:
      startDate = null
      endDate = null
  }

  searchForm.createTime = startDate ? [startDate, endDate] : []
}

const ResetFormContent = () => {
  searchRef.value?.resetFields()
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
