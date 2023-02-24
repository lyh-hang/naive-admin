import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Unocss from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import Icons from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'

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
        IconsResolver({ prefix: false, customCollections: ['svg'] })
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
        svg: FileSystemIconLoader('src/icons/svg')
      }
    }),
    // css引擎
    // https://github.com/unocss/unocss
    Unocss({
      presets: [presetAttributify(), presetUno()],
      rules: [
        [
          'center',
          {
            display: 'flex',
            'align-items': 'center',
            'justify-content': 'center'
          }
        ]
      ]
    }),
    // 国际化
    // https://github.com/intlify/vite-plugin-vue-i18n
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
