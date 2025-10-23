<script setup lang="ts">
import Button from 'primevue/button'
import Menu from 'primevue/menu'
import { useTheme } from '@/composables/useTheme'

const { menuRef, currentThemeIcon, menuItems, toggleMenu } = useTheme()
</script>

<template>
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
<style scoped>
.theme-switcher {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
}
</style>