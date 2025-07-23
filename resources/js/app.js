import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import axios from 'axios'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Toast
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'

const vuetify = createVuetify({
  components,
  directives,
})

axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Accept'] = 'application/json'
const api = import.meta.env.VITE_API_URL

axios.interceptors.request.use(
  async (config) => {
    config.url = `${api}${config.url}`

    return await config
  },
  (error) => {
    return Promise.reject(error)
  },
)

const app = createApp(App)
app.use(createPinia())
app.use(vuetify)
app.use(ToastPlugin)
app.mount('#app')
