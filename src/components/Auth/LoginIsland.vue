<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from 'vue'
import { ROUTES } from '../../config/routes'
import { AuthService } from '../../api/auth.service'
import { createPinia, setActivePinia } from 'pinia'
import { useAppStore } from '../../store/store'
import Cookies from 'js-cookie'

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const store = ref()

onMounted(() => {
	const pinia = createPinia()
	const app = getCurrentInstance()?.appContext.app
	if (app) {
		app.use(pinia)
		setActivePinia(pinia)
		store.value = useAppStore()
	}
})

const handleLogin = async () => {
	error.value = ''
	loading.value = true

	try {
		const res = await AuthService.login(email.value, password.value)
		if (res.user && res.accessToken) {
			Cookies.set('accessToken', res.accessToken)
			localStorage.setItem('user', JSON.stringify(res.user))
			localStorage.setItem('userToken', res.user.userToken)
			window.location.href = '/profile'
		} else {
			Cookies.remove('accessToken')
			localStorage.removeItem('user')
		}
	} catch (e: any) {
		error.value = e.response?.data?.message || 'Ошибка авторизации'
	} finally {
		loading.value = false
	}
}
</script>

<template>
	<div class="auth-form">
		<h2>Вход</h2>
		<form @submit.prevent="handleLogin">
			<label>
				Почта:
				<input
					v-model="email"
					type="email"
					placeholder="Введите почту"
					required
				/>
			</label>

			<label>
				Пароль:
				<input
					v-model="password"
					type="password"
					placeholder="Введите пароль"
					required
				/>
			</label>

			<button type="submit" :disabled="loading">
				{{ loading ? 'Входим...' : 'Войти' }}
			</button>
		</form>

		<p v-if="error" class="text-red-500 mt-2">{{ error }}</p>

		<p class="auth-toggle">
			Нет аккаунта?
			<a :href="ROUTES.AUTH.REGISTER"> Зарегистрироваться </a>
		</p>
	</div>
</template>

<style scoped>
.auth-form {
	max-width: 400px;
	margin: 24px auto;
	padding: 20px;
	background: #faf7f2;
	border-radius: 12px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.auth-form h2 {
	margin-bottom: 16px;
	font-size: 1.4rem;
	color: #342116;
}

.auth-form form {
	display: flex;
	flex-direction: column;
	gap: 12px;
}

.auth-form label {
	display: flex;
	flex-direction: column;
	font-size: 0.95rem;
	color: #774f35;
}

.auth-form input {
	padding: 8px 12px;
	border: 1px solid #ddd;
	border-radius: 6px;
	margin-top: 4px;
}

.auth-form button {
	padding: 10px 16px;
	border: none;
	background: #bf8d50;
	color: #faf7f2;
	border-radius: 6px;
	cursor: pointer;
	font-size: 1rem;
	transition: background 0.2s;
}

.auth-form button:hover {
	background: #93613b;
}
.auth-toggle {
	margin-top: 16px;
	font-size: 0.9rem;
	color: #774f35;
	text-align: center;
}

.auth-toggle a {
	color: #bf8d50;
	text-decoration: underline;
	margin-left: 6px;
	cursor: pointer;
}

.auth-toggle a:hover {
	color: #93613b;
}
</style>
