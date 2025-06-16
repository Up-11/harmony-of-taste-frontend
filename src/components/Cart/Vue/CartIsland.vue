<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import CartItem from './CartItem.vue'
import CartSummary from './CartSummary.vue'
import { cartService } from '../../../api/cart.service'
import type { Product } from '../../Menu/MenuIsland.vue'

export interface CartItem {
	id: string
	quantity: number
	productId: string
	product: Product
}

const cartItems = ref<CartItem[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)
const user = ref({ name: 'Гость', id: '' })

const getLocalStorageSafe = (key: string) => {
	if (typeof window !== 'undefined') {
		return localStorage.getItem(key)
	}
	return null
}

const totalItems = computed(() =>
	cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
)
const totalPrice = computed(() =>
	cartItems.value.reduce(
		(sum, item) => sum + item.product.price * item.quantity,
		0
	)
)

const fetchCart = async () => {
	try {
		isLoading.value = true
		error.value = null
		const userToken = localStorage.getItem('userToken')

		if (!userToken) {
			throw new Error('Требуется авторизация')
		}
		const userData = getLocalStorageSafe('user')
		user.value = userData ? JSON.parse(userData) : { name: 'Гость' }

		const response = await cartService.getCart(userToken)
		cartItems.value = response.data
	} catch (err) {
		error.value =
			err instanceof Error ? err.message : 'Ошибка при загрузке корзины'
		console.error('Ошибка корзины:', err)

		// Очищаем корзину при ошибке авторизации
		if (error.value.includes('auth') || error.value.includes('token')) {
			cartItems.value = []
		}
	} finally {
		isLoading.value = false
	}
}

const handleItemUpdate = () => {
	fetchCart()
}

onMounted(() => {
	fetchCart()
})
</script>

<template>
	<div class="cart-container">
		<div v-if="isLoading" class="loading-indicator">
			<span class="loader"></span>
			Загрузка корзины...
		</div>

		<div v-else-if="error" class="error-message">
			{{ error }}
			<button @click="fetchCart" class="retry-button">Повторить</button>
		</div>

		<template v-else>
			<div class="cart-items">
				<div v-if="!cartItems.length" class="empty-cart">
					Ваша корзина пуста
				</div>

				<CartItem
					v-for="item in cartItems"
					:key="item.id"
					:id="item.id"
					:image-url="item.product.imageUrl"
					:price="item.product.price"
					:quantity="item.quantity"
					:title="item.product.title"
					@fetch-cart="handleItemUpdate"
				/>
			</div>

			<div class="cart-summary">
				<CartSummary
					:user-id="user.id"
					:items="cartItems"
					:user-name="'123'"
					:total-items="totalItems"
					:total-price="totalPrice"
				/>
			</div>
		</template>
	</div>
</template>

<style scoped>
.cart-container {
	display: grid;
	grid-template-columns: 1fr 500px;
	gap: 30px;
	padding: 20px;
}

.loading-indicator {
	grid-column: 1 / -1;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
	padding: 20px;
}

.loader {
	border: 3px solid #f3f3f3;
	border-top: 3px solid #3498db;
	border-radius: 50%;
	width: 20px;
	height: 20px;
	animation: spin 1s linear infinite;
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

.error-message {
	grid-column: 1 / -1;
	color: #e74c3c;
	background: #fdecea;
	padding: 15px;
	border-radius: 5px;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.retry-button {
	background: #e74c3c;
	color: white;
	border: none;
	padding: 5px 10px;
	border-radius: 3px;
	cursor: pointer;
}

.empty-cart {
	grid-column: 1 / -1;
	text-align: center;
	padding: 40px;
	color: #7f8c8d;
}

.cart-items {
	display: flex;
	flex-direction: column;
	gap: 15px;
}

@media (max-width: 768px) {
	.cart-container {
		grid-template-columns: 1fr;
	}

	.cart-summary {
		order: -1;
	}
}
</style>
