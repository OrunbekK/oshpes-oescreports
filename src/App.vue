<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import Button from 'primevue/button'
import Menu from 'primevue/menu'
import type { MenuItem } from 'primevue/menuitem'

// кастомный тип для темы
type Theme = 'auto' | 'light' | 'dark'

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

  // Переключаем класс на <html>
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

// --- Новая логика для выпадающего меню ---
const menuRef = ref<Menu | null>(null)

// 1. Динамическая иконка для главной кнопки
const currentThemeIcon = computed(() => {
  switch (selectedTheme.value) {
    case 'light': return 'pi pi-sun'
    case 'dark': return 'pi pi-moon'
    default: return 'pi pi-desktop' // 'auto'
  }
})

// Модель для всплывающего меню
// При клике на пункт меню, мы просто меняем selectedTheme.
// Watcher выше сделает всю остальную работу.
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

// Функция для открытия/закрытия меню
const toggleMenu = (event: MouseEvent) => {
  menuRef.value?.toggle(event)
}
</script>

<template>
  <h1>Hello world</h1>

  <div class="theme-switcher">
    <Button
        :icon="currentThemeIcon"
        @click="toggleMenu"
        text
        rounded
        aria-label="Переключатель тем"
        aria-haspopup="true"
    />

    <Menu ref="menuRef" :model="menuItems" :popup="true" />
  </div>
</template>