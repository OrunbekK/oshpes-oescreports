<template>
  <div :class="{ 'app-dark': isDarkMode }" class="min-h-screen flex flex-col">
    <div class="flex-1 p-6">
      <h1 class="text-3xl font-bold">Hello world</h1>
    </div>

    <!-- Переключатель тем -->
    <div class="p-4 flex gap-2">
      <Button
          v-for="mode in themes"
          :key="mode.value"
          :label="mode.label"
          :severity="themeMode === mode.value ? 'info' : 'secondary'"
          @click="setTheme(mode.value)"
          size="small"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import Button from 'primevue/button'

const themeMode = ref<'auto' | 'dark' | 'light'>('auto')
const systemDark = ref(false)

const isDarkMode = computed(() => {
  if (themeMode.value === 'auto') return systemDark.value
  return themeMode.value === 'dark'
})

const themes = [
  { value: 'auto', label: 'Авто' },
  { value: 'light', label: 'Светлая' },
  { value: 'dark', label: 'Темная' }
]

const setTheme = (mode: 'auto' | 'dark' | 'light') => {
  themeMode.value = mode
  localStorage.setItem('themeMode', mode)
  updateTheme()
}

const updateTheme = () => {
  const html = document.documentElement
  isDarkMode.value ? html.classList.add('app-dark') : html.classList.remove('app-dark')
}

onMounted(() => {
  const saved = localStorage.getItem('themeMode')
  if (saved === 'auto' || saved === 'dark' || saved === 'light') {
    themeMode.value = saved
  }

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  systemDark.value = mediaQuery.matches
  mediaQuery.addEventListener('change', (e) => {
    systemDark.value = e.matches
    if (themeMode.value === 'auto') updateTheme()
  })

  updateTheme()
})
</script>