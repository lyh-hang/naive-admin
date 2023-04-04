<script setup lang="ts">
import { useThemeVars } from 'naive-ui'
import { theme, toggleDark, setThemeOverrides } from '@/composables/theme'
import SettingDrawer from './components/SettingDrawer.vue'
import LayoutIcon from './components/LayoutIcon.vue'

const themeVars = useThemeVars()
const layout = useLayoutStore()
const { t } = useI18n()

const colorSelect = ref<HTMLInputElement | null>(null)
const colorList: string[] = [
  '#18a058',
  '#2080f0',
  '#f0a020',
  '#d03050',
  '#7f59ff',
  '#13c2c2',
  '#316c72'
]
const navStyle = [
  { name: 'lightSide', style: ['t-light', 'l-light'] },
  { name: 'darkSide', style: ['t-light', 'l-dark'] },
  { name: 'darkHead', style: ['t-dark', 'l-dark'] }
]
const navMode = [
  { name: 'left', style: ['l-dark'] },
  { name: 'top', style: ['t-dark'] },
  { name: 'mixin', style: ['t-dark', 'l-dark'] }
]

function menuModeText(mode:string): string {
  if(mode === 'left' || layout.device === 'desktop') return `setting.${mode}`
  return 'mobile disabled'
}
</script>

<template>
  <SettingDrawer>
    <div p-24px id="setting">
      <h3 text-center>{{ t('setting.title') }}</h3>
      <n-divider>{{ t('setting.theme') }}</n-divider>
      <n-switch w-full :value="theme !== null" :on-update:value="toggleDark">
        <template #checked-icon> <n-icon>
          <icon-ion:moon-outline />
        </n-icon> </template>
        <template #unchecked-icon>
          <n-icon>
            <icon-ion:sunny-outline />
          </n-icon>
        </template>
      </n-switch>
      <n-divider>{{ t('setting.color') }}</n-divider>
      <ul class="color-picker">
        <li
          v-for="color in colorList"
          :key="color"
          :style="{ backgroundColor: color }"
          @click="setThemeOverrides(color)"
        >
          <icon-ion:checkmark-outline v-show="themeVars.primaryColor === color" />
        </li>
        <li @click="colorSelect?.click()">
          <icon-ion:checkmark-outline
            v-show="!colorList.some(c => c === themeVars.primaryColor)"
          />
          <input
            ref="colorSelect"
            type="color"
            @input="
              setThemeOverrides(($event.target as HTMLInputElement).value)
            "
          />
        </li>
      </ul>
      <n-divider>{{ t('setting.style') }}</n-divider>
      <div flex justify-between>
        <n-popover
          v-for="(nav, i) in navStyle"
          :key="nav.name"
          to="#setting"
          trigger="hover"
        >
          <template #trigger>
            <LayoutIcon
              :class="nav.style"
              :check="layout.menuStyle === nav.name"
              cursor-pointer
              @click="layout.setMenuStyle(nav.name)"
            />
          </template>
          <span>{{ t(`setting.${nav.name}`) }}</span>
        </n-popover>
      </div>
      <n-divider>{{ t('setting.mode') }}</n-divider>
      <div flex justify-between>
        <n-popover
          v-for="nav in navMode"
          :key="nav.name"
          to="#setting"
          trigger="hover"
        >
          <template #trigger>
            <LayoutIcon
              :class="nav.style"
              :check="layout.menuMode === nav.name"
              cursor-pointer
              @click="layout.setMenuMode(nav.name)"
            />
          </template>
          <span>{{ t(menuModeText(nav.name)) }}</span>
        </n-popover>
      </div>
      <n-divider>{{ t('setting.other') }}</n-divider>
      <n-space vertical size="large">
        <div flex justify-between items-center>
          <span>{{ t('setting.tags') }}</span>
          <n-switch
            :value="layout.tags"
            @update:value="layout.toogleTags"
            size="small"
          />
        </div>
        <div flex justify-between items-center>
          <span>logo</span>
          <n-switch
            :value="layout.logo"
            @update:value="layout.toogleLogo"
            size="small"
          />
        </div>
      </n-space>
    </div>
  </SettingDrawer>
</template>

<style lang="scss" scoped>
.color-picker {
  display: flex;
  padding: 0;
  margin: 0;
  list-style: none;
  color: white;
  li {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    border-radius: 2px;
    cursor: pointer;
    &:last-child {
      position: relative;
      margin: 0;
      background: linear-gradient(
          217deg,
          rgba(255, 0, 0, 0.8),
          rgba(255, 0, 0, 0) 70.71%
        ),
        linear-gradient(127deg, rgba(0, 255, 0, 0.8), rgba(0, 255, 0, 0) 70.71%),
        linear-gradient(336deg, rgba(0, 0, 255, 0.8), rgba(0, 0, 255, 0) 70.71%);
    }
  }

  input[type='color'] {
    position: absolute;
    left: 0;
    top: 0;
    width: 20px;
    height: 20px;
    border: none;
    padding: 0;
    margin: 0;
    visibility: hidden;
  }
}
</style>
