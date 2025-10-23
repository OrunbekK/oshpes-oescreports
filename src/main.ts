// src/main.ts
import { createApp } from 'vue'
import router from './router'
import './styles/main.css' // Здесь остаются стили .theme-switcher
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: '.app-dark',
            cssLayer: false
        }
    }
})

app.use(router)

app.mount('#app')