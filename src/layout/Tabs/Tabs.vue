<script setup lang="ts">
import { DropdownOption, useThemeVars, NIcon } from 'naive-ui'
import { renderIcon } from '@/utils/icon'

const router = useRouter()
const themeVars = useThemeVars()
const { t, locale } = useI18n()

const currentRoute = computed(() => router.currentRoute.value.name)
const tags = ref<Array<string>>([])
const hiddenTags = ref<DropdownOption[]>([])

async function isOverflow(): Promise<boolean> {
  await nextTick()
  const tagsContainer = document.getElementById('tags-container')
  if (!tagsContainer) return false
  const offsetWidth = tagsContainer?.offsetWidth as number
  const children = tagsContainer?.children
  let total = 0
  for (let i = 0; i < children!.length - 1; i++) {
    const el = children![i] as HTMLElement
    // margin-left = 8
    total += el.offsetWidth + 8
  }
  // icon-width = 32 reserved = 5
  return total + 32 + 5 > offsetWidth
}

async function addTag(name: string) {
  if (
    tags.value.indexOf(name) === -1 &&
    !hiddenTags.value.some(i => i.key === name)
  ) {
    tags.value.push(name)
    if (await isOverflow()) {
      tags.value.pop()
      hiddenTags.value.push({
        key: name,
        // <div class: 'flex items-center justify-between'>
        //   <span></span>
        //   <n-icon></n-icon>
        // </div>
        label: () =>
          h('div', { class: 'flex items-center justify-between' }, [
            h('span', { style: { color: currentRoute.value === name && themeVars.value.primaryColor } }, { default: () => t(`layout.${name}`) }),
            renderIcon('ion:close-outline', { size: 20, class: 'ml-2 hover:bg-gray-3 dark:hover:bg-gray-6', onClick: closeHandle(name) })()
          ])
      })
    }
  }
}

function removeTag(name: string) {
  // 点击tag
  if(tags.value.includes(name)) {
    tags.value = tags.value.filter(i => i !== name)
    hiddenTags.value.length && addTag(hiddenTags.value.shift()?.key as string)
  // 点击dropdown
  } else {
    hiddenTags.value = hiddenTags.value.filter(i => i.key !== name)
  }

  if (name === currentRoute.value) {
    router.push({ name: hiddenTags.value.length ? hiddenTags.value.at(-1)?.key as any : tags.value.at(-1) })
  }
}

const closeHandle = (name: string) => (e: PointerEvent) => {
  e.stopPropagation()
  removeTag(name)
}

function selectHandle(key: string | number) {
  router.push({ name: String(key) })
}

function localeOrSizeChange() {
  let tagTotal: string[] = tags.value.concat(hiddenTags.value.map(i => String(i.key)))
  tags.value = []
  hiddenTags.value = []
  tagTotal.forEach(tag => {
    setTimeout(() => {
      addTag(tag)
    }, 10);
  })
}

watch(
  () => router.currentRoute.value.name,
  name => name !== 'Dashboard' && addTag(name as string),
  { immediate: true }
)

watch(locale, localeOrSizeChange)

const resizeHandle = useDebounceFn(localeOrSizeChange, 200)

onBeforeMount(() => window.addEventListener('resize', resizeHandle))

onUnmounted(() => window.removeEventListener('resize', resizeHandle))
</script>

<template>
  <n-layout-header id="tags-container" class="w-auto h-32px relative flex items-center border-bottom-1 px-8px">
    <n-tag
      size="small"
      :type="currentRoute === 'Dashboard' ? 'primary' : 'default'"
      cursor-pointer
      ml-8px
      @click="$router.push({ name: 'Dashboard' })"
    >
      {{ t(`layout.Dashboard`) }}
    </n-tag>
    <n-tag
      v-for="tag in tags"
      :key="tag"
      size="small"
      :type="currentRoute === tag ? 'primary' : 'default'"
      cursor-pointer
      ml-8px
      @click="$router.push({ name: tag })"
      @close="removeTag(tag)"
    >
      {{ t(`layout.${tag}`) }}
    </n-tag>
    <n-dropdown :options="hiddenTags" :show-arrow="true" size="small" @select="selectHandle">
      <n-icon
        v-show="hiddenTags.length"
        :size="20"
        class="absolute right-0 f-c-c h-full w-32px cursor-pointer"
      >
      <icon-ion:ellipsis-horizontal />
    </n-icon>
    </n-dropdown>
  </n-layout-header>
</template>
