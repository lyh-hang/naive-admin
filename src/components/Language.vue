<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import type { DropdownOption } from 'naive-ui'

const { locale } = useI18n()

const { size } = defineProps({
  size: {
    type: [Number, String],
    default: 20
  }
})

const { setLocale } = useLayoutStore()

const options = ref<DropdownOption[]>([
  {
    label: '简体中文',
    key: 'zh-CN'
  },
  {
    label: 'English',
    key: 'en'
  }
])

function handleSelect(key: string) {
  locale.value = key
}

watch(
  locale,
  () => {
    options.value = options.value.map(item => {
      return { ...item, disabled: item.key === locale.value }
    })
    setLocale(locale.value)
  },
  { immediate: true }
)
</script>

<template>
  <n-dropdown
    trigger="hover"
    show-arrow
    :options="options"
    @select="handleSelect"
  >
    <n-icon center cursor-pointer select-none v-bind="$attrs" :size="size">
      <ViconLanguage />
    </n-icon>
  </n-dropdown>
</template>
