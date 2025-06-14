<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')

const handleSubmit = () => {
	console.log('Имя:', name.value)
	console.log('Почта:', email.value)
	console.log('Пароль:', password.value)
	alert('Данные успешно отправлены!')
}
</script>

<template>
	<div class="profile-form">
		<h2>Личные данные</h2>
		<form @submit.prevent="handleSubmit">
			<label>
				Имя:
				<input v-model="name" type="text" placeholder="Введите имя" />
			</label>

			<label>
				Почта:
				<input v-model="email" type="email" placeholder="Введите почту" />
			</label>

			<label>
				Пароль:
				<input
					v-model="password"
					type="password"
					placeholder="Введите новый пароль"
				/>
			</label>

			<button type="submit">Сохранить</button>
		</form>
	</div>
</template>

<style scoped>
.profile-form {
	max-width: 400px;
	margin: 24px auto;
	padding: 20px;
	background: #faf7f2;
	border-radius: 12px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.profile-form h2 {
	margin-bottom: 16px;
	font-size: 1.4rem;
	color: #342116;
}

.profile-form form {
	display: flex;
	flex-direction: column;
	gap: 12px;
}

.profile-form label {
	display: flex;
	flex-direction: column;
	font-size: 0.95rem;
	color: #774f35;
}

.profile-form input {
	padding: 8px 12px;
	border: 1px solid #ddd;
	border-radius: 6px;
	margin-top: 4px;
}

.profile-form button {
	padding: 10px 16px;
	border: none;
	background: #bf8d50;
	color: #faf7f2;
	border-radius: 6px;
	cursor: pointer;
	font-size: 1rem;
	transition: background 0.2s;
}

.profile-form button:hover {
	background: #93613b;
}
</style>
