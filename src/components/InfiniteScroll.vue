<script setup lang="ts">
export interface Props {
  load: Function
  disabled?: boolean
  debounceDelay?: number
  infiniteScrollDistance?: number
}

const props = withDefaults(
  defineProps<Props>(),
  {
    disabled: false,
    debounceDelay: 200,
    infiniteScrollDistance: 0
  }
)

const scrollHandle = useDebounceFn(function (e: Event) {
  if (props.disabled) return
  const { scrollTop, clientHeight, scrollHeight } = e.target as HTMLElement

  if (scrollHeight - scrollTop - clientHeight <= props.infiniteScrollDistance) props.load()
}, props.debounceDelay)
</script>

<template>
  <n-scrollbar trigger="none" :on-scroll="scrollHandle">
    <slot />
  </n-scrollbar>
</template>
