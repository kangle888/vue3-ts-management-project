<!-- src/components/TableList.vue -->
<template>
  <el-table :data="data" style="width: 100%">
    <el-table-column
      v-for="column in columns"
      :key="column.prop"
      :prop="column.prop"
      :label="column.label"
      :width="column.width"
    />
    <el-table-column label="操作" width="200">
      <template #default="scope">
        <slot name="actions" :row="scope.row"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
defineProps<{
  data: any[]
  columns: { label: string; prop: string; width?: string }[]
}>()
</script>
