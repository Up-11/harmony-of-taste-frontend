<script setup lang="ts">
import { onMounted, ref } from 'vue'
import OrderItem from './OrderItem.vue'
import { OrdersService } from '../../../api/orders.serivce'

interface OrderItem {
	productId: string
	quantity: number
	product: {
		id: string
		title: string
		price: number
		imageUrl: string
	}
}

interface Order {
	id: string
	createdAt: string
	items: OrderItem[]
	status: 'NEW' | 'IN_PROGRESS' | 'READY' | 'CANCELLED' | 'COMPLETED'
	totalPrice: number
	userName: string
}

const getLocalStorageSafe = (key: string) => {
	if (typeof window !== 'undefined') {
		return localStorage.getItem(key)
	}
	return null
}

const user = ref()

const orders = ref<Order[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

const fetchOrders = async () => {
	try {
		isLoading.value = true
		error.value = null

		const userData = getLocalStorageSafe('user')
		user.value = JSON.parse(userData!)

		if (!user) {
			throw new Error('Пользователь не авторизован')
		}

		const response = await OrdersService.getOrdersById(user.value.id)
		orders.value = response.data
	} catch (err) {
		error.value =
			err instanceof Error ? err.message : 'Ошибка при загрузке заказов'
		console.error('Ошибка:', err)
	} finally {
		isLoading.value = false
	}
}

const getStatusText = (status: string) => {
	const statusMap: Record<string, string> = {
		NEW: 'Новый',
		IN_PROGRESS: 'В процессе',
		READY: 'Готов',
		CANCELLED: 'Отменён',
		COMPLETED: 'Завершён'
	}
	return statusMap[status] || status
}

onMounted(() => {
	fetchOrders()
})
</script>

<template>
	<div class="orders-container">
		<h1 class="orders-title">Список заказов</h1>

		<div v-if="isLoading" class="loading-state">Загрузка заказов...</div>

		<div v-else-if="error" class="error-state">
			{{ error }}
			<button @click="fetchOrders" class="retry-button">
				Попробовать снова
			</button>
		</div>

		<div v-else-if="orders.length === 0" class="empty-state">
			У вас пока нет заказов
		</div>

		<div v-else class="order-list">
			<OrderItem
				v-for="order in orders"
				:key="order.id"
				:title="`Заказ #${order.id.slice(-4)}`"
				:items="
					order.items.map(item => ({
						product: item.product,
						quantity: item.quantity
					}))
				"
				:time="
					new Date(order.createdAt).toLocaleTimeString([], {
						hour: '2-digit',
						minute: '2-digit'
					})
				"
				:status="getStatusText(order.status)"
				:totalPrice="order.totalPrice"
			/>
		</div>
	</div>
</template>

<style scoped>
.orders-container {
	max-width: 1200px;
	margin: 0 auto;
	padding: 20px;
}

.orders-title {
	font-size: 2rem;
	margin-bottom: 20px;
	color: #333;
}

.order-list {
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	gap: 20px;
}

.loading-state,
.empty-state,
.error-state {
	text-align: center;
	padding: 40px;
	font-size: 1.2rem;
}

.error-state {
	color: #e74c3c;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
}

.retry-button {
	background: #e74c3c;
	color: white;
	border: none;
	padding: 8px 16px;
	border-radius: 4px;
	cursor: pointer;
	margin-top: 10px;
}

@media (max-width: 768px) {
	.order-list {
		grid-template-columns: 1fr;
	}
}
</style>
