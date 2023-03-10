<script setup lang="ts">
import { SunnyOutline, MoonOutline, CheckmarkOutline } from '@vicons/ionicons5'
import { useThemeVars } from 'naive-ui'
import { theme, toggleDark, themeOverrides } from '@/composables/theme'
import { colorLighten } from '@/utils'
import SettingDrawer from './components/SettingDrawer.vue'
import LayoutIcon from './components/LayoutIcon.vue'

interface PrimaryColor {
  primaryColor: string
  primaryColorHover: string
  primaryColorPressed: string
  primaryColorSuppl: string
}

const themeVars = useThemeVars()

const layoutStore = useLayoutStore()
const { t } = useI18n()

const systemColor: PrimaryColor[] = [
  {
    primaryColor: '#18a058',
    primaryColorHover: '#36ad6a',
    primaryColorPressed: '#0c7a43',
    primaryColorSuppl: '#36ad6a'
  },
  {
    primaryColor: '#2080f0',
    primaryColorHover: '#4098fc',
    primaryColorPressed: '#1060c9',
    primaryColorSuppl: '#4098fc'
  },
  {
    primaryColor: '#f0a020',
    primaryColorHover: '#fcb040',
    primaryColorPressed: '#c97c10',
    primaryColorSuppl: '#fcb040'
  },
  {
    primaryColor: '#d03050',
    primaryColorHover: '#de576d',
    primaryColorPressed: '#ab1f3f',
    primaryColorSuppl: '#de576d'
  },
  {
    primaryColor: '#7f59ff',
    primaryColorHover: colorLighten('#7f59ff', 5),
    primaryColorPressed: colorLighten('#7f59ff', -9),
    primaryColorSuppl: colorLighten('#7f59ff', 5)
  },
  {
    primaryColor: '#13c2c2',
    primaryColorHover: colorLighten('#13c2c2', 5),
    primaryColorPressed: colorLighten('#13c2c2', -9),
    primaryColorSuppl: colorLighten('#13c2c2', 5)
  }
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
const colorSelect = ref<HTMLInputElement | null>(null)
const colorIpt = ref<string>('')

function setThemeColor(common: PrimaryColor) {
  themeOverrides.value.common = common
  // themeOverrides.value.LoadingBar.colorLoading = common.primaryColor
}

watch(colorIpt, c => {
  themeOverrides.value.common = {
    primaryColor: c,
    primaryColorHover: colorLighten(c as string, 5),
    primaryColorPressed: colorLighten(c as string, 9),
    primaryColorSuppl: colorLighten(c as string, 5)
  }
})
</script>

<template>
  <SettingDrawer>
    <div p-24px id="setting">
      <h3 text-center>{{ t('setting.title') }}</h3>
      <n-divider>{{ t('setting.theme') }}</n-divider>
      <n-switch w-full :value="theme !== null" :on-update:value="toggleDark">
        <template #checked-icon> <n-icon :component="MoonOutline" /> </template>
        <template #unchecked-icon>
          <n-icon :component="SunnyOutline" />
        </template>
      </n-switch>
      <n-divider>{{ t('setting.color') }}</n-divider>
      <ul class="color-picker">
        <li
          v-for="color in systemColor"
          :key="color.primaryColor"
          :style="{ backgroundColor: color.primaryColor }"
          @click="setThemeColor(color)"
        >
          <CheckmarkOutline
            v-show="themeVars.primaryColor === color.primaryColor"
          />
        </li>
        <li @click="colorSelect?.click()">
          <CheckmarkOutline
            v-show="
              !systemColor.some(c => c.primaryColor === themeVars.primaryColor)
            "
          />
          <input v-model="colorIpt" ref="colorSelect" type="color" />
        </li>
      </ul>
      <n-divider>{{ t('setting.style') }}</n-divider>
      <div flex justify-between>
        <n-popover
          v-for="nav in navStyle"
          :key="nav.name"
          to="#setting"
          trigger="hover"
        >
          <template #trigger>
            <LayoutIcon :check="!true" :class="nav.style" cursor-pointer />
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
            <LayoutIcon :check="!true" :class="nav.style" cursor-pointer />
          </template>
          <span>{{ t(`setting.${nav.name}`) }}</span>
        </n-popover>
      </div>
      <n-divider>{{ t('setting.other') }}</n-divider>
      <n-space vertical size="large">
        <div flex justify-between items-center>
          <span>{{ t('setting.tags') }}</span> <n-switch :value="layoutStore.tags"
            @update:value="layoutStore.toogleTags" size="small" />
        </div>
        <div flex justify-between items-center>
          <span>logo</span>
          <n-switch
            :value="layoutStore.logo"
            @update:value="layoutStore.toogleLogo"
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
