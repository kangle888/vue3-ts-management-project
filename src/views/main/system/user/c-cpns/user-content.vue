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
      </el-table>
    </div>
    <div class="pagination">分页</div>
  </div>
</template>

<script setup lang="ts"></script>

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
</style>
