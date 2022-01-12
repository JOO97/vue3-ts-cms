import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import globalRegister from './global'

import { initState } from './store'

//全局样式
import 'normalize.css'
import './assets/css/index.less'

const app = createApp(App)

app.use(globalRegister)
app.use(router)
app.use(store)
initState()

app.mount('#app')
