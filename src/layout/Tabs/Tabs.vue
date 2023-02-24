<script setup lang="ts">
const { t } = useI18n()

const router = useRouter()

const currentRoute = computed(() => router.currentRoute.value.name)
const tags = ref<Array<string>>([])

function addTag(name: string) {
  tags.value.indexOf(name) === -1 &&
    name !== 'Dashboard' &&
    tags.value.push(name)
}

function removeTag(name: string) {
  tags.value = tags.value.filter(i => i !== name)
  if(name === currentRoute.value) {
    router.push({ name: tags.value[tags.value.length - 1] || 'Dashboard' })
  }
}

watch(
  () => router.currentRoute.value.name,
  name => {
    addTag(name as string)
  },
  { immediate: true }
)
</script>

<template>
  <n-layout-header class="border-bottom-1 p-1 pl-4">
    <n-tag
      size="small"
      :type="currentRoute === 'Dashboard' ? 'primary' : 'default'"
      cursor-pointer
      @click="$router.push('/')"
    >
      {{ t('layout.Dashboard') }}
    </n-tag>
    <n-tag
      v-for="tag in tags"
      :key="tag"
      size="small"
      :type="currentRoute === tag ? 'primary' : 'default'"
      class="cursor-pointer ml-2"
      closable
      @click="$router.push({ name: tag })"
      @close="removeTag(tag)"
    >
      {{ t(`layout.${tag}`) }}
    </n-tag>
  </n-layout-header>
</template>
