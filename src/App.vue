<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { usePrimeVue } from 'primevue/config'

type Theme = 'auto' | 'light' | 'dark'

const PrimeVue = usePrimeVue()

/* ------------- текущая тема ------------- */
const theme = ref<Theme>('auto')

/* ------------- инициализация ------------- */
onMounted(() => {
  const saved = localStorage.getItem('theme') as Theme | null
  if (saved && ['auto', 'light', 'dark'].includes(saved)) {
    theme.value = saved
  } else {
    theme.value = 'auto'
  }
  applyTheme(theme.value)
})

/* ------------- применить тему ------------- */
function applyTheme(t: Theme) {
  PrimeVue.changeTheme(
      t === 'dark' ? 'aura-light-green' : 'aura-dark-green', // старая
      t === 'dark' ? 'aura-dark-green' : 'aura-light-green', // новая
      'theme-link',
      () => {}
  )
  // CSS-класс для <html> (удобно для ручного CSS)
  const html = document.documentElement
  html.classList.remove('light', 'dark')
  if (t !== 'auto') html.classList.add(t)
}

/* ------------- переключение ------------- */
function toggleTheme() {
  const variants: Theme[] = ['auto', 'light', 'dark']
  const idx = variants.indexOf(theme.value)
  theme.value = variants[(idx + 1) % variants.length]
}

/* ------------- сохранять выбор ------------- */
watch(theme, (t) => {
  localStorage.setItem('theme', t)
  applyTheme(t)
})
</script>

<template>
  <div class="h-screen flex align-items-center justify-content-center">
    <h1>Hello world</h1>
  </div>

  <!-- Переключатель темы -->
  <Button
      icon="pi pi-palette"
      rounded
      aria-label="Switch theme"
      @click="toggleTheme"
      v-tooltip.top="`Тема: ${theme}`"
      class="theme-toggle"
  />
</template>

<style scoped>
/* фиксируем кнопку в правом-нижнем углу */
.theme-toggle {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 999;
}
</style>