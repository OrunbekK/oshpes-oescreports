// src/main.ts
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'

import Aura from '@primevue/themes/aura'
import { definePreset } from '@primevue/themes'

import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import './styles/main.css'

import App from './App.vue'
import router from './router'

const AuraBlue = definePreset(Aura, {
    semantic: {
        primary: {
            50:  '{blue.50}',
            100: '{blue.100}',
            200: '{blue.200}',
            300: '{blue.300}',
            400: '{blue.400}',
            500: '{blue.500}',
            600: '{blue.600}',
            700: '{blue.700}',
            800: '{blue.800}',
            900: '{blue.900}',
        }
    }
})

const app = createApp(App)

app.use(PrimeVue, {
    theme: {
        preset: AuraBlue,
        options: {
            prefix: 'p',
            darkModeSelector: '.app-dark',
        }
    }
})

app.use(router)
app.mount('#app')