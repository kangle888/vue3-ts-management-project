import 'normalize.css'
import './assets/css/index.less'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'
import registerIcons from './global/register-icons'

/**
 * 图标全局注册
 */
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component)
// }

/**
 * 抽离在global文件夹中的register-icons.ts文件
 * 全局注册element-icon
 */
app.use(registerIcons)

app.use(router)
app.use(pinia)
app.mount('#app')
