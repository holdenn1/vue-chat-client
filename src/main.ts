import './styles/index.scss'
import 'vue-toastify-3/style.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createToastifyPlugin } from 'vue-toastify-3'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(createToastifyPlugin, { autoClose: 3000, closeOnClick: true, pauseTimerOnHover: true })

app.mount('#app')
