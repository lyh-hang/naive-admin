import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { i18n } from './locales'
import useMock from './mock'
import useDiscreteApi from './utils/createDiscreteApi'

import 'uno.css'
import './style.scss'

// 使用mockjs
useMock()

// 安装Naive-UI独立的Api(在setup外使用)
useDiscreteApi()

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)

app.mount('#app')
