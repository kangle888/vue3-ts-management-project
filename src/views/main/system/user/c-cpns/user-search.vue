<template>
  <div class="search">
    <el-form :model="searchForm" ref="searchRef">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名" label-width="80px" prop="username">
            <el-input
              v-model="searchForm.username"
              style="width: 100%"
              placeholder="请输入用户名"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" label-width="80px" prop="realname">
            <el-input v-model="searchForm.realname" style="width: 100%" placeholder="请输入姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码" label-width="80px" prop="cellphone">
            <el-input
              v-model="searchForm.cellphone"
              style="width: 100%"
              placeholder="请输入手机号"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" label-width="80px" prop="status">
            <el-select v-model="searchForm.status" placeholder="请选择状态" style="width: 100%">
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" label-width="80px" prop="createTime">
            <el-date-picker
              v-model="searchForm.createTime"
              style="width: 100%"
              type="daterange"
              range-separator="To"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btns">
      <el-button icon="Refresh" @click="ResetFormContent">重置</el-button>
      <el-button icon="Search" type="primary">搜索</el-button>
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
  status: 1,
  createTime: []
})
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
