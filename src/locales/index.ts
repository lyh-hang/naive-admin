import { createI18n } from 'vue-i18n'
import { zhCN, dateZhCN, enUS, dateEnUS, NDateLocale, NLocale } from 'naive-ui'
import { getStorage, setStorage } from '@/utils/localStorage'

interface localeType {
  [key: string]: {
    locale: NLocale
    dateLocale: NDateLocale
  }
}

const locales: localeType = {
  'zh-CN': {
    locale: zhCN,
    dateLocale: dateZhCN
  },
  en: {
    locale: enUS,
    dateLocale: dateEnUS
  }
}

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

export const language = computed(() => locales[i18n.global.locale.value])

export function toogleLocale(locale: string) {
  i18n.global.locale.value = locale
  setStorage('locale', locale)
}
