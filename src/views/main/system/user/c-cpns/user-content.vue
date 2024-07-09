<template>
  <div class="content">
    <div class="header">
      <h2>用户列表</h2>
      <el-button type="primary">新建数据</el-button>
    </div>
    <div class="table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
        <el-table-column prop="enable" label="状态">
          <template #default="scope">
            {{ scope.row.enable === 1 ? '启用' : '禁用' }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200px">
          <template #default="scope">
            <el-button link type="primary" icon="Edit" size="small" @click="edit(scope.row)">
              编辑
            </el-button>
            <el-button link type="danger" icon="Delete" size="small" @click="deleteRow(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        size="small"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const tableData = ref([
  { date: '2016-05-02', name: '王小虎', enable: 1, address: '上海市普陀区金沙江路 1518 弄' },
  { date: '2016-05-04', name: '王小虎', enable: 1, address: '上海市普陀区金沙江路 1517 弄' },
  { date: '2016-05-01', name: '王小虎', enable: 1, address: '上海市普陀区金沙江路 1519 弄' },
  { date: '2016-05-03', name: '王小虎', enable: 1, address: '上海市普陀区金沙江路 1516 弄' }
])

const edit = (row) => {
  console.log('Edit:', row)
}

const deleteRow = (row) => {
  console.log('Delete:', row)
}

// 页码相关逻辑
const currentPage = ref(1)
const pageSize = ref(10)
const handleSizeChange = (val) => {
  console.log(`每页 ${val} 条`)
}
const handleCurrentChange = (val) => {
  console.log(`当前页: ${val}`)
}
</script>

<style lang="less" scoped>
.content {
  background-color: #ffffff;
  margin-top: 20px;
  padding: 20px;
}

h2 {
  font-weight: 700;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
