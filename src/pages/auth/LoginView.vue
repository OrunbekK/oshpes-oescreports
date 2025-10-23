<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'
import Message from 'primevue/message'

const router = useRouter()
const login = ref('')
const password = ref('')
const rememberMe = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    if (login.value !== 'admin' || password.value !== 'admin') {
      throw new Error('Ошибка входа');
    }
    // Конец заглушки
    /* // Ваш рабочий код
    const response = await fetch('/api/auth/login', { ... });
    if (!response.ok) { ... }
    const data = await response.json();
    localStorage.setItem('token', data.token);
    if (rememberMe.value) { ... }
    */
    await router.push('/')
  } catch (error) {
    errorMessage.value = 'Неверный логин или пароль'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  const savedLogin = localStorage.getItem('login');
  if (savedLogin) {
    login.value = savedLogin;
    rememberMe.value = true;
  }
});
</script>

<template>
  <div class="login-container">
    <div class="login-content">

      <div class="login-header">
        <h1 class="header-title">Авторизация</h1>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">

        <Message
            v-if="errorMessage"
            severity="error"
            :closable="false"
            class="w-full"
        >
          {{ errorMessage }}
        </Message>

        <div class="form-group">
          <label for="login">Логин</label>
          <InputText
              id="login"
              v-model="login"
              type="text"
              placeholder="Введите логин"
              class="w-full"
              required
              autofocus
          />
        </div>

        <div class="form-group">
          <label for="password">Пароль</label>
          <Password
              id="password"
              v-model="password"
              placeholder="Введите пароль"
              :feedback="false"
              toggleMask
              class="w-full"
              inputClass="w-full"
              required
          />
        </div>

        <div class="form-options">
          <div class="flex align-items-center">
            <Checkbox v-model="rememberMe" inputId="rememberMe" />
            <label for="rememberMe" class="ml-2">Запомнить меня</label>
          </div>
        </div>

        <Button
            type="submit"
            label="Войти"
            class="w-full login-button"
            :loading="isLoading"
        />
      </form>

      <div class="login-footer">
        © 2025 Ош ПЭС
      </div>

    </div>
  </div>
</template>


<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--p-surface-ground);
  box-sizing: border-box;
}

.login-content {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
}

/* 1. Заголовок */
.login-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.5rem;
}

.header-icon {
  font-size: 3.5rem;
  color: var(--p-primary-color);
  margin-bottom: 1.5rem;
}

.header-title {
  font-size: 2.25rem;
  font-weight: 700;
  margin: 0;
  color: var(--p-text-color);
}

.header-subtitle {
  font-size: 1.1rem;
  margin: 0.5rem 0 0 0;
  color: var(--p-text-secondary-color);
}

/* 2. Форма */
.login-form {
  display: flex;
  flex-direction: column;
  /* Отступы между элементами -
    ключевой элемент дизайна
  */
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--p-text-color);
}

/* Сделаем поля ввода чуть крупнее */
:deep(.p-inputtext),
:deep(.p-password-input) {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: var(--p-text-secondary-color);
}

.login-button {
  padding-top: 0.85rem;
  padding-bottom: 0.85rem;
  font-weight: 600;
  font-size: 1rem;
  margin-top: 0.5rem;
}

/* 3. Подвал */
.login-footer {
  margin-top: 3rem;
  text-align: center;
  color: var(--p-text-disabled-color);
  font-size: 0.9rem;
}

/* PrimeVue <Password> хак */
:deep(.p-password-input) {
  width: 100%;
}
</style>