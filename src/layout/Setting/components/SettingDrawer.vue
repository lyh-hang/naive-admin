<script setup lang="ts">
import { SettingsOutline, CloseOutline } from '@vicons/ionicons5'
import { useThemeVars } from 'naive-ui'

const themeVars = useThemeVars()
const show = ref<boolean>(true)
</script>

<template>
  <div :class="{ show: show }" select-none>
    <div class="setting-bg" @click="show = false"></div>
    <div class="setting" :style="{ backgroundColor: themeVars.baseColor, boxShadow: show ? themeVars.boxShadow2 : '' }">
      <div :style="{ backgroundColor: themeVars.primaryColor }" class="setting-btn center" @click="show = !show">
        <n-icon :size="26" :color="themeVars.baseColor" :component="show ? CloseOutline : SettingsOutline" />
      </div>
      <slot />
    </div>
  </div>
</template>


<style lang="scss" scoped>
.setting {
  position: fixed;
  width: auto;
  height: 100%;
  top: 0;
  right: 0;
  transform: translate(100%);
  transition: all 0.3s;
  z-index: 9999;
}
.setting-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba($color: #000, $alpha: 0.3);
  opacity: 0;
  transition: all 0.3s;
  z-index: -1;
}
.setting-btn {
  position: absolute;
  left: -48px;
  top: 50%;
  width: 48px;
  height: 48px;
  cursor: pointer;
  border-radius: 5px 0 0 5px;
}
.show {
  transition: all 0.2;
  .setting {
    transform: translate(0);
  }
  .setting-bg {
    opacity: 1;
    z-index: 8888;
  }
}
</style>