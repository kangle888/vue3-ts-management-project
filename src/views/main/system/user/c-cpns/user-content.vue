<template>
  <div class="content">
    <div class="header">
      <h2>用户列表</h2>
      <el-button type="primary">新建数据</el-button>
    </div>
    <div class="table">表格</div>
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
