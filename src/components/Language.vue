<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import type { DropdownOption } from 'naive-ui'
import { Language } from '@vicons/ionicons5'

const { locale, messages, t } = useI18n()

const { size } = defineProps({
  size: {
    type: [Number, String],
    default: 20
  }
})

const { setLocale } = useLayoutStore()

const options = ref<DropdownOption[]>(Object.keys(messages.value).map(i => ({ key: i, label: () => t(i) })))

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
    trigger="click"
    show-arrow
    :options="options"
    @select="handleSelect"
    inverted
  >
    <n-icon center cursor-pointer select-none v-bind="$attrs" :size="size">
      <Language />
    </n-icon>
  </n-dropdown>
</template>
