import { NIcon, IconProps } from 'naive-ui'
import { Icon } from '@iconify/vue'
import { ComponentOptions } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'

export function renderIcon(
  icon: string,
  props: IconProps & ComponentOptions = { size: 16 }
) {
  return () => h(NIcon, props, { default: () => h(Icon, { icon }) })
}

export function renderCustomIcon(
  icon: string,
  props: IconProps & ComponentOptions = { size: 16 }
) {
  return () => h(NIcon, props, { default: () => h(SvgIcon, { icon }) })
}
