<script setup lang="ts">
import * as vicons from '@vicons/ionicons5'
import { copy } from '@/composables/clipboard'
import { Component } from 'vue'

const icons = shallowRef<{ [key: string]: Component }>(vicons)
const iconNameList: string[] = Object.keys(icons.value)
const currentLength = ref<number>(120)
const currentList = computed<string[]>(() =>
  iconNameList.slice(0, currentLength.value)
)

function load() {
  if (iconNameList.length <= currentLength.value) return
  currentLength.value += 120
}

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
    <infinite-scroll :load="load">
      <n-card embedded :bordered="false">
        <n-grid cols="2 s:4 m:6 l:8 xl:12 2xl:14" responsive="screen" x-gap="12" y-gap="12">
          <n-gi
            v-for="name in currentList"
            :key="name"
            class="flex flex-col items-center cursor-pointer"
            @click="copyHandle(name)"
          >
            <n-icon size="40" :component="icons[name]" />
            <span class="icon-name mt-2">{{ name }}</span>
          </n-gi>
        </n-grid>
      </n-card>
    </infinite-scroll>
  </div>
</template>

<style scoped lang="scss">
.icon-name {
  font-size: 12px;
}
</style>
