import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Unocss from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      extensions: ['vue'],
      dts: 'src/components.d.ts',
      resolvers: [
        NaiveUiResolver(),
        componentName => {
          if (componentName.startsWith('Vicon'))
            return { name: componentName.slice(5), from: '@vicons/ionicons5' }
        }
      ]
    }),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core', 'vue-i18n', 'pinia'],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/store'],
      vueTemplate: true
    }),
    Unocss({
      presets: [presetAttributify(), presetUno()],
      rules: [
        ['center', {display: 'flex', 'align-items': 'center', 'justify-content': 'center'}]
      ]
    }),
    VueI18nPlugin({
      runtimeOnly: true,
      compositionOnly: true,
      include: [fileURLToPath(new URL('./src/locales/**', import.meta.url))]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      vue: 'vue/dist/vue.esm-bundler.js'
    }
  }
})
