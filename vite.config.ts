import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Unocss from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'
import Icons from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { viteMockServe } from 'vite-plugin-mock'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 自动引入，按需引入
    // https://github.com/antfu/unplugin-vue-components
    Components({
      extensions: ['vue'],
      dts: 'src/components.d.ts',
      resolvers: [
        // naive-ui解析
        NaiveUiResolver(),
        // icon解析
        IconsResolver({ prefix: 'icon', customCollections: ['custom'] })
      ]
    }),
    // 自动导入API
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core', 'vue-i18n', 'pinia'],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/store'],
      vueTemplate: true
    }),
    // 按需导入图标
    // https://github.com/antfu/unplugin-icons
    Icons({
      compiler: 'vue3',
      customCollections: {
        custom: FileSystemIconLoader('src/icons/svg')
      }
    }),
    // 将指定文件夹中的图标插入html
    // https://github.com/vbenjs/vite-plugin-svg-icons
    createSvgIconsPlugin({
      iconDirs: [fileURLToPath(new URL('./src/icons', import.meta.url))],
      symbolId: 'icon-[dir]-[name]'
    }),
    // css引擎
    // https://github.com/unocss/unocss
    Unocss({
      presets: [presetAttributify(), presetUno()],
      shortcuts: {
        'f-c-c': 'flex items-center justify-center'
      }
    }),
    // 国际化
    // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
    VueI18nPlugin({
      runtimeOnly: true,
      compositionOnly: true,
      include: [fileURLToPath(new URL('./src/locales/**', import.meta.url))]
    }),
    // 数据模拟
    // https://github.com/vbenjs/vite-plugin-mock
    viteMockServe({
      mockPath: 'mock'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      vue: 'vue/dist/vue.esm-bundler.js'
    }
  }
})
