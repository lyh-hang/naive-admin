<script setup lang="ts">
import { ExpandOutline, ContractOutline } from '@vicons/ionicons5'
import { theme } from '@/composables/theme'
import { toggleFullscreen, isFullscreen } from '@/composables/fullscreen'
import { DropdownOption } from 'naive-ui'
import { RouterLink } from 'vue-router';

const { t } = useI18n()
const router = useRouter()
const userStore = useUserStore()
const breadcrumbs = computed(() =>
  router.currentRoute.value.matched.filter(i => i.name)
)

const options = ref<DropdownOption[]>([
  {
    label: () => t('layout.git'),
    key: 1
  },
  {
    label: () => t('layout.logout'),
    key: 2
  },
])
function handleSelect(key: string | number) {
  switch (key) {
    case 1:
      window.open('https://github.com/lyh-hang/naive-admin')
      break
    case 2:
      userStore.logout()
      break
    default:
      break
  }
}
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
        <ExpandOutline v-show="!isFullscreen" />
        <ContractOutline v-show="isFullscreen" />
      </n-icon>
      <Theme
        w-35px
        h-full
        hover-bg-op-10
        :class="`hover-bg-${theme ? 'white' : 'black'}`"
      />
      <Language
        w-35px
        h-full
        mr-2
        hover-bg-op-10
        :class="`hover-bg-${theme ? 'white' : 'black'}`"
      />
      <n-dropdown
        trigger="click"
        show-arrow
        :options="options"
        @select="handleSelect"
      >
        <n-avatar
          class="cursor-pointer select-none"
          size="medium"
          object-fit="cover"
          :src="userStore.userInfo?.avatar"
        />
      </n-dropdown>
    </div>
  </n-layout-header>
</template>
