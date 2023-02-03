<script setup lang="ts">
import * as vicons from '@vicons/ionicons5'
import { copy } from '@/composables/clipboard'

async function copyHandle(text: string) {
  try {
    await copy(text)
    window.$message.success('复制成功')
  } catch (error) {
    window.$message.error('复制失败，请重试')
  }
}
</script>

<template>
  <div h-full>
    <n-scrollbar>
      <n-card>
        <n-grid x-gap="12" y-gap="12" cols="12">
          <n-gi
            v-for="icon in vicons"
            :key="icon.name"
            class="flex flex-col items-center cursor-pointer"
            @click="copyHandle(icon.name)"
          >
            <n-icon size="40" :component="icon" />
            <span class="icon-name mt-2">{{ icon.name }}</span>
          </n-gi>
        </n-grid>
      </n-card>
    </n-scrollbar>
  </div>
</template>

<style scoped lang="scss">
.icon-name {
  font-size: 12px;
}
</style>
