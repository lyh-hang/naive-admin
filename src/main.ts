import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { i18n } from './locales'
import useDiscreteApi from './utils/createDiscreteApi'

import 'default-passive-events'
import 'uno.css'
import './styles/index.scss'

// 安装Naive-UI独立的Api(在setup外使用)
useDiscreteApi()

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)

app.mount('#app')
