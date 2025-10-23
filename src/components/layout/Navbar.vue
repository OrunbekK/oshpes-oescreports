<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Главная</RouterLink> |
      <RouterLink to="/about">О проекте</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
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