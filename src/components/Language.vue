<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import type { DropdownOption } from 'naive-ui'
import { toogleLocale } from '@/locales'

const { locale, messages, t } = useI18n()
const layout = useLayoutStore()

const { size } = defineProps({
  size: {
    type: [Number, String],
    default: 20
  }
})

const options = ref<DropdownOption[]>(Object.keys(messages.value).map(i => ({ key: i, label: () => t(i) })))

watch(
  locale,
  () => {
    options.value = options.value.map(item => {
      return { ...item, disabled: item.key === locale.value }
    })
  },
  { immediate: true }
)
</script>

<template>
  <n-dropdown
    trigger="click"
    show-arrow
    :options="options"
    @select="toogleLocale" 
    :inverted="layout.menuStyle === 'darkHead'"
  >
    <n-icon f-c-c cursor-pointer select-none v-bind="$attrs" :size="size">
      <icon-ion:language />
    </n-icon>
  </n-dropdown>
</template>
