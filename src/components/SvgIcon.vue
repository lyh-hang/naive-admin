<template>
  <svg aria-hidden="true">
    <use :href="symbolId" />
  </svg>
</template>

<script setup lang="ts">
interface IProps {
  prefix?: string
  icon: string
}

const props = withDefaults(defineProps<IProps>(), {
    prefix: 'icon'
})
const symbolId = computed(() => `#${props.prefix}-${props.icon}`)
</script>
