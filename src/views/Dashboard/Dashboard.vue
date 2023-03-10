<script setup lang="ts">
import { useThemeVars } from 'naive-ui'
import { colorLighten } from '@/utils'

const themeVars = useThemeVars()
</script>

<template>
  <n-card h-full embedded :bordered="false">
    Dashboard
    <n-button>asdafa</n-button>
    <n-button type="primary">asdafa</n-button>
    <n-button type="info">asdafa</n-button>
    <n-button type="error">asdafa</n-button>
    <n-button type="success">asdafa</n-button>
    <n-button type="warning">asdafa</n-button>
    <n-switch></n-switch>

    <div mb-4 w-400px h-50px :style="{backgroundColor: themeVars.primaryColor}">primaryColor</div>
    <div mb-4 w-400px h-50px :style="{backgroundColor: themeVars.primaryColorPressed}">primaryColorPressed</div>
    <div mb-4 w-400px h-50px :style="{backgroundColor: themeVars.primaryColorHover}">primaryColorHover</div>
    <div mb-4 w-400px h-50px :style="{backgroundColor: themeVars.primaryColorSuppl}">primaryColorSuppl</div>
    <p>------------------------------</p>
    <!-- <div mb-4 w-400px h-50px :style="{backgroundColor: themeVars.primaryColor}">primaryColor</div>
    <div mb-4 w-400px h-50px :style="{backgroundColor: colorLighten(themeVars.primaryColor, -9)}">primaryColorPressed</div>
    <div mb-4 w-400px h-50px :style="{backgroundColor: colorLighten(themeVars.primaryColor, 5)}">primaryColorHover</div>
    <div mb-4 w-400px h-50px :style="{backgroundColor: themeVars.primaryColorSuppl}">primaryColorSuppl</div> -->
  </n-card>
</template>