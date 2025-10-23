import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')

    return {
        plugins: [
            vue(),
        ],
        server: {
            port: 8080,
        },
        // Заменяем переменные в index.html
        define: {
            __APP_TITLE__: JSON.stringify(env.VITE_APP_TITLE),
        },
    }
})
