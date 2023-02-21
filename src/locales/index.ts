import { createI18n } from 'vue-i18n'
import { getStorage } from '@/utils/localStorage'

const messages = Object.fromEntries(
  Object.entries(
    import.meta.glob<{ default: any }>('../../src/locales/*.y(a)?ml', {
      eager: true
    })
  ).map(([key, value]) => {
    const yaml = key.endsWith('.yaml')
    return [key.slice(2, yaml ? -5 : -4), value.default]
  })
)

export const i18n = createI18n({
  legacy: false,
  locale: getStorage('locale') || 'zh-CN',
  messages
})
