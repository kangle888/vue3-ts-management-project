<template>
  <el-drawer :title="title" v-model:visible="drawerVisible" :width="width" @close="handleClose">
    <slot></slot>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  visible: {
    type: Boolean,
    required: true
  },
  width: {
    type: String,
    default: '30%'
  }
})

const emit = defineEmits(['update:visible'])
const drawerVisible = ref(props.visible)

watch(
  () => props.visible,
  (newVal) => {
    drawerVisible.value = newVal
  }
)

watch(drawerVisible, (newVal) => {
  emit('update:visible', newVal)
})

const handleClose = () => {
  drawerVisible.value = false
  emit('update:visible', false)
}
</script>
