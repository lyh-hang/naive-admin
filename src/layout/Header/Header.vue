<script setup lang="ts">
import { theme } from '@/composables/theme'
import { toggleFullscreen, isFullscreen } from '@/composables/fullscreen'
import { useUserStore } from '@/store/user'

const { t } = useI18n()
const router = useRouter()
const userStore = useUserStore()
const breadcrumbs = computed(() =>
  router.currentRoute.value.matched.filter(i => i.name)
)
const color = computed(() => `hover-bg-${theme.value ? 'white' : 'black'}`)
</script>

<template>
  <n-layout-header
    class="h-50px flex items-center justify-between pl-4 pr-4 border-bottom-1"
  >
    <n-breadcrumb>
      <n-breadcrumb-item
        v-show="router.currentRoute.value.path !== '/'"
        @click="router.push('/')"
      >
        {{ t(`layout.Dashboard`) }}
      </n-breadcrumb-item>
      <n-breadcrumb-item
        v-for="b in breadcrumbs"
        :key="b.name"
        @click="router.push({ name: b.name })"
      >
        {{ t(`layout.${String(b.name)}`) }}
      </n-breadcrumb-item>
    </n-breadcrumb>
    <div class="h-full flex items-center">
      <n-icon
        class="w-35px h-full center cursor-pointer select-none hover-bg-op-10"
        :class="`hover-bg-${theme ? 'white' : 'black'}`"
        :size="20"
        @click="toggleFullscreen"
      >
        <ViconExpandOutline v-show="!isFullscreen" />
        <ViconContractOutline v-show="isFullscreen" />
      </n-icon>
      <Theme w-35px h-full hover-bg-op-10 :class="`hover-bg-${theme ? 'white' : 'black'}`" />
      <Language w-35px h-full mr-2 hover-bg-op-10 :class="`hover-bg-${theme ? 'white' : 'black'}`" />
      <n-avatar
        class="cursor-pointer select-none"
        size="medium"
        object-fit="cover"
        :src="userStore.userInfo?.avatar"
      />
    </div>
  </n-layout-header>
</template>
