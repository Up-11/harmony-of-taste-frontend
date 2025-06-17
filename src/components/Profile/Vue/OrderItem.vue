<script setup lang="ts">
import { OrderStatus, type Product } from '../../../types'

interface OrderItem {
	product: Product
	quantity: number
}

interface Props {
	items?: OrderItem[]
	time?: string
	status?: OrderStatus
	totalPrice?: number
	id: string
}

const props = withDefaults(defineProps<Props>(), {
	items: () => [],
	time: '00:00',
	status: OrderStatus.NEW,
	totalPrice: 0
})

// Функция для перевода статуса
const getStatusText = (status: OrderStatus) => {
	const statusMap = {
		[OrderStatus.NEW]: 'Новый',
		[OrderStatus.IN_PROGRESS]: 'Выполняется',
		[OrderStatus.READY]: 'Готов',
		[OrderStatus.CANCELLED]: 'Отменён',
		[OrderStatus.COMPLETED]: 'Завершен'
	}
	return statusMap[status] || status
}

// Функция для получения класса статуса
const getStatusClass = (status: OrderStatus) => {
	return {
		'status-новый': status === OrderStatus.NEW,
		'status-выполняется': status === OrderStatus.IN_PROGRESS,
		'status-готов': status === OrderStatus.READY,
		'status-отменён': status === OrderStatus.CANCELLED,
		'status-завершен': status === OrderStatus.COMPLETED
	}
}
</script>

<template>
	<div class="order-card">
		<p class="order-title">Заказ #{{ id.slice(0, 4) }}</p>
		<div class="order-info">
			<h3>Состав заказа:</h3>
			<div>
				<div v-for="(item, index) in items" :key="index">
					{{ item.product.title }} × {{ item.quantity }}
					<span class="item-price"
						>{{ item.product.price * item.quantity }} ₽</span
					>
				</div>
			</div>

			<p><strong>Время заказа:</strong> {{ time }}</p>
			<p>
				<strong>Статус:</strong>
				<span class="status" :class="getStatusClass(status)">
					{{ getStatusText(status) }}
				</span>
			</p>
			<p><strong>Общая сумма:</strong> {{ totalPrice }} ₽</p>
		</div>
	</div>
</template>

<style scoped>
.order-card {
	background-color: #faf7f2;
	padding: 20px;
	border-radius: 12px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
	max-width: 500px;
	margin: 16px auto;
}

.order-title {
	margin: 0 0 12px;
	font-size: 1.4rem;
	color: #342116;
}

.order-info h3 {
	font-size: 1.1rem;
	color: #774f35;
}

.order-info ul {
	list-style-type: none;
}

.order-info li {
	display: flex;
	justify-content: space-between;
	margin-bottom: 4px;
}

.item-price {
	color: #774f35;
	font-weight: 500;
}

.order-info p {
	font-size: 0.95rem;
}

.status {
	font-weight: bold;
	padding: 2px 6px;
	border-radius: 4px;
	margin-left: 4px;
}

.status-новый {
	background-color: #e0c097;
	color: #5c3a1d;
}

.status-выполняется {
	background-color: #f7d794;
	color: #725b33;
}

.status-готов {
	background-color: #a7e9af;
	color: #22543d;
}

.status-отменён {
	background-color: #f8b4b4;
	color: #721c24;
}

.status-завершен {
	background-color: #b4c6f8;
	color: #1c2c72;
}
</style>
