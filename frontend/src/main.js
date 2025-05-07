import { createApp } from 'vue'
import App from './App.vue'

// Vuetify first
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const vuetify = createVuetify({ components, directives })

// Pinia
import { createPinia } from 'pinia'
const pinia = createPinia()

// Router
import router from './router'

const app = createApp(App)

app.use(vuetify)
app.use(pinia)
app.use(router)

app.mount('#app')

// ✅ After mounting Pinia
import { useUserStore } from '@/stores/userStore'
const userStore = useUserStore()
userStore.initialize()
