import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import App from './App.vue'
import Button from 'primevue/button'
import Tooltip from 'primevue/tooltip'

const app = createApp(App)

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: { darkModeSelector: '.dark' } // позволяет вручную вешать класс
    }
})

app.component('Button', Button)
app.directive('tooltip', Tooltip)

app.mount('#app')