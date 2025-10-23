// src/composables/useTheme.ts

import { ref, onMounted, watch, computed }Next, { type Ref } from 'vue'
import Menu from 'primevue/menu' // Импортируем тип, если нужен для menuRef
import type { MenuItem } from 'primevue/menuitem'

// 1. Определяем наш кастомный тип для темы
type Theme = 'auto' | 'light' | 'dark'

// 2. Вся логика теперь внутри одной функции "useTheme"
export function useTheme() {

    // --- Логика определения и применения темы ---

    const getInitialTheme = (): Theme => {
        const storedTheme = localStorage.getItem('theme')
        if (storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'auto') {
            return storedTheme
        }
        return 'auto'
    }

    const selectedTheme = ref<Theme>(getInitialTheme())

    const applyTheme = (theme: Theme) => {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        let isDark = false

        if (theme === 'auto') {
            isDark = systemPrefersDark
        } else if (theme === 'dark') {
            isDark = true
        }

        document.documentElement.classList.toggle('app-dark', isDark)
        localStorage.setItem('theme', theme)
    }

    // Отслеживаем системные изменения
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleMediaChange = (e: MediaQueryListEvent) => {
        if (selectedTheme.value === 'auto') {
            document.documentElement.classList.toggle('app-dark', e.matches)
        }
    }

    // Применяем тему при загрузке и при изменении ref
    onMounted(() => {
        applyTheme(selectedTheme.value)
        mediaQuery.addEventListener('change', handleMediaChange)
    })

    watch(selectedTheme, (newTheme) => {
        applyTheme(newTheme)
    })

    // --- Логика для выпадающего меню ---

    const menuRef = ref<InstanceType<typeof Menu> | null>(null)

    // 1. Динамическая иконка для главной кнопки
    const currentThemeIcon = computed(() => {
        switch (selectedTheme.value) {
            case 'light': return 'pi pi-sun'
            case 'dark': return 'pi pi-moon'
            default: return 'pi pi-desktop' // 'auto'
        }
    })

    // 2. Модель для всплывающего меню
    const menuItems = ref<MenuItem[]>([
        {
            label: 'Авто',
            icon: 'pi pi-desktop',
            command: () => { selectedTheme.value = 'auto' }
        },
        {
            label: 'Светлая',
            icon: 'pi pi-sun',
            command: () => { selectedTheme.value = 'light' }
        },
        {
            label: 'Темная',
            icon: 'pi pi-moon',
            command: () => { selectedTheme.value = 'dark' }
        }
    ])

    // 3. Функция для открытия/закрытия меню
    const toggleMenu = (event: MouseEvent) => {
        menuRef.value?.toggle(event)
    }

    // 4. Возвращаем все, что нужно будет шаблону
    return {
        menuRef,
        currentThemeIcon,
        menuItems,
        toggleMenu
    }
}