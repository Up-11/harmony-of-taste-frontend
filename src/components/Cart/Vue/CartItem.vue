<script setup lang="ts">
import { ref } from 'vue'
import { cartService } from '../../../api/cart.service'
import formatUrl from '../../../lib/formatUrl'

interface Props {
	title: string
	price: number
	imageUrl: string
	quantity: number
	id: string
}

const props = defineProps<Props>()
const emit = defineEmits<{ fetchCart: [] }>()
const userToken = localStorage.getItem('userToken')
const { title, price, imageUrl } = props

const localQuantity = ref(props.quantity)
const isLoading = ref(false)
const error = ref<string | null>(null)

const updateQuantity = async (operation: 'inc' | 'dec') => {
	try {
		isLoading.value = true
		error.value = null

		if (operation === 'inc') {
			localQuantity.value++
		} else {
			if (localQuantity.value > 1) localQuantity.value--
		}

		const apiCall =
			operation === 'inc'
				? cartService.increaseCartItemQuantity
				: cartService.decreaseCartItemQuantity

		await apiCall(userToken!, props.id)
	} catch (err) {
		localQuantity.value = props.quantity
		error.value =
			err instanceof Error ? err.message : 'Ошибка при обновлении количества'
		console.error('Quantity update error:', err)
	} finally {
		emit('fetchCart')
		isLoading.value = false
	}
}

const inc = () => updateQuantity('inc')
const dec = () => updateQuantity('dec')

const deleteItem = async () => {
	await cartService.removeCartItem(userToken!, props.id)
	emit('fetchCart')
}
</script>

<template>
	<div class="cart-item">
		<div v-if="error" class="error-message">{{ error }}</div>

		<div class="cart-item__info">
			<img :src="formatUrl(imageUrl)" :alt="title" class="cart-item__image" />
			<div>
				<h3 class="cart-item__title">{{ title }}</h3>
				<p class="cart-item__price">Цена: {{ price }} ₽</p>
			</div>
		</div>

		<div class="cart-left">
			<div class="cart-item__controls">
				<button
					@click="dec"
					class="cart-item__button"
					:disabled="isLoading || localQuantity <= 1"
				>
					−
				</button>
				<span class="cart-item__count">{{ localQuantity }}</span>
				<button @click="inc" class="cart-item__button" :disabled="isLoading">
					+
				</button>
			</div>
			<button class="cart-item__delete" @click="deleteItem">X</button>
		</div>
	</div>
</template>
<style scoped>
.cart-left {
	display: flex;
	gap: 2px;
}
.cart-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 16px;
	margin-bottom: 16px;
	border-radius: 8px;
	background-color: #faf7f2;
}

.cart-item__info {
	display: flex;
	align-items: center;
}

.cart-item__image {
	width: 80px;
	height: 80px;
	object-fit: cover;
	border-radius: 4px;
	margin-right: 16px;
}

.cart-item__title {
	margin: 0 0 4px;
	color: #342116;
	font-size: 1.125rem;
	font-weight: 600;
}

.cart-item__price {
	margin: 0;
	color: #774f35;
	font-size: 0.875rem;
}

.cart-item__controls {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 8px;
}

.cart-item__button {
	background-color: #93613b;
	color: #faf7f2;
	border: none;
	padding: 4px;
	padding-inline: 8px;
	border-radius: 4px;
	cursor: pointer;
	transition: background-color 0.3s;
}

.cart-item__button:hover {
	background-color: #b17845;
}

.cart-item__delete {
	background-color: #61412d;
	color: #faf7f2;
	border: none;
	padding: 4px 8px;
	border-radius: 4px;
	cursor: pointer;
	transition: background-color 0.3s;
}

.cart-item__delete:hover {
	background-color: #774f35;
}
</style>
