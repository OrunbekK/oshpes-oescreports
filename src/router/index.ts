// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/components/layout/MainLayout.vue'
import HomeView from '@/pages/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            // Все дочерние роуты будут рендериться внутри MainLayout
            path: '/',
            component: MainLayout,
            children: [
                {
                    path: '', // Главная страница
                    name: 'home',
                    component: HomeView
                },
                {
                    path: 'about', // Страница /about
                    name: 'about',
                    // Ленивая загрузка (рекомендуется)
                    component: () => import('@/pages/AboutView.vue')
                }
            ]
        }
    ]
})

export default router