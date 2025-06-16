<script setup lang="ts">
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { computed, ref } from 'vue'
import type { CartItem } from './CartIsland.vue'
import { OrdersService } from '../../../api/orders.serivce'

interface Props {
	totalPrice?: number
	userName?: string
	items: CartItem[]
	userId: string
}

const props = defineProps<Props>()
const emit = defineEmits(['order-created'])

const name = ref(props.userName || '')
const selectedTime = ref<Date | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)
const success = ref(false)

const btnDisabled = computed(() => {
	return !name.value || !props.totalPrice
})

const prepareOrderData = () => {
	return {
		userId: props.userId,
		items: props.items.map(item => ({
			productId: item.productId,
			quantity: item.quantity
		})),
		totalPrice: props.totalPrice || 0,
		userName: name.value
	}
}

const submitOrder = async () => {
	try {
		isLoading.value = true
		error.value = null
		success.value = false

		const orderData = prepareOrderData()
		const response = await OrdersService.createOrder(orderData)

		if (response.data) {
			success.value = true
			emit('order-created', response.data)
			// Можно добавить сброс формы или редирект
		}
	} catch (err) {
		error.value =
			err instanceof Error ? err.message : 'Ошибка при оформлении заказа'
		console.error('Order error:', err)
	} finally {
		isLoading.value = false
	}
}
</script>

<template>
	<div class="summary">
		<h2 class="summary-title">Итого:</h2>
		<h2 class="summary-price">{{ totalPrice || 0 }} ₽</h2>

		<!-- 	<Datepicker
			v-model="selectedTime"
			time-picker
			:min-time="{ hours: 9, minutes: 0 }"
			:max-time="{ hours: 18, minutes: 0 }"
			:enable-seconds="false"
			placeholder="Когда приготовить?"
			:disabled="isLoading"
		/> -->

		<input
			type="text"
			v-model="name"
			placeholder="Ваше имя"
			class="summary-name"
			:disabled="isLoading"
		/>

		<div v-if="error" class="error-message">
			{{ error }}
		</div>

		<div v-if="success" class="success-message">Заказ успешно оформлен!</div>

		<button
			class="btn-brown"
			:disabled="btnDisabled || isLoading"
			@click="submitOrder"
		>
			<span v-if="isLoading">Обработка...</span>
			<span v-else>Оформить заказ</span>
		</button>
	</div>
</template>

<style scoped>
.summary {
	padding: 16px;
	border: 1px solid #ccc;
	border-radius: 8px;
	background-color: #faf7f2;
	display: flex;
	flex-direction: column;
	gap: 12px;
	max-width: 320px;
}

.summary-title {
	font-size: 1.25rem;
	color: #342116;
	margin: 0;
}

.summary-price {
	font-size: 1.5rem;
	color: #774f35;
	margin: 0;
}

.summary-name {
	padding: 8px;
	border: 1px solid #ccc;
	border-radius: 4px;
}

.btn-brown {
	background-color: #774f35;
	color: white;
	padding: 10px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	transition: opacity 0.3s;
}

.btn-brown:disabled {
	opacity: 0.6;
	cursor: not-allowed;
}

.error-message {
	color: #e74c3c;
	font-size: 0.9rem;
}

.success-message {
	color: #27ae60;
	font-size: 0.9rem;
}
</style>
