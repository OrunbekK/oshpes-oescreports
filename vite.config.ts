import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')

    return {
        plugins: [
            vue(),
        ],
        resolve: {
            alias: {
                // Эта строка говорит Vite, что "@" - это путь к папке "./src"
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        server: {
            port: 8080,
        },
        // Заменяем переменные в index.html
        define: {
            __APP_TITLE__: JSON.stringify(env.VITE_APP_TITLE),
        },
    }
})