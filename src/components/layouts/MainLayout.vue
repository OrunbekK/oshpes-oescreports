<script setup lang="ts">
import { RouterView } from 'vue-router'
import Button from 'primevue/button'
import Menu from 'primevue/menu'

// Импортируем нашу вынесенную логику!
import { useTheme } from '@/composables/useTheme.ts'

// Магия: вся логика (100+ строк) спрятана здесь.
// Мы получаем только то, что нужно для шаблона.
const { menuRef, currentThemeIcon, menuItems, toggleMenu } = useTheme()
</script>

<template>
  <div class="app-wrapper">
    <header>
      <nav>
        <RouterLink to="/">Главная</RouterLink> |
        <RouterLink to="/about">О проекте</RouterLink>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>

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
  </div>
</template>

<style scoped>
/* Добавим немного стилей для макета */
.app-wrapper {
  min-height: 100vh;
}
main {
  padding: 2rem;
}
header {
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--p-surface-border);
}
nav a {
  font-weight: bold;
  margin: 0 0.5rem;
  color: var(--p-text-color);
  text-decoration: none;
}
nav a.router-link-exact-active {
  color: var(--p-primary-color);
}
</style>