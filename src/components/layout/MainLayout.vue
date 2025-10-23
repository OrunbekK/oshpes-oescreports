<template>
  <div class="app-wrapper">
    <Navbar />
    <main>
      <RouterView />
    </main>
    <ThemeSwitcher />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from '@/components/layout/Navbar.vue'
import ThemeSwitcher from '@/components/common/ThemeSwitcher.vue'
</script>

<style scoped>
.app-wrapper {
  min-height: 100vh;
}
main {
  padding: 2rem;
}
</style>