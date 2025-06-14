<script setup lang="ts">
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { computed, ref } from 'vue'

interface Props {
	totalPrice?: number
	customerName?: string
}

const props = defineProps<Props>()

const name = ref(props.customerName)

const selectedTime = ref(null)

const btnDisabled = computed(() => {
	return (
		name.value === '' || selectedTime.value === null || props.totalPrice === 0
	)
})
</script>

<template>
	<div class="summary">
		<h2 class="summary-title">Итого:</h2>
		<h2 class="summary-price">{{ totalPrice || 0 }} ₽</h2>
		<Datepicker
			v-model="selectedTime"
			time-picker
			:min-time="{ hours: 9, minutes: 0 }"
			:max-time="{ hours: 18, minutes: 0 }"
			:enable-seconds="false"
			placeholder="Когда приготовить?"
		/>

		<input
			type="text"
			v-model="name"
			placeholder="Ваше имя"
			class="summary-name"
		/>

		<button class="btn-brown" :disabled="btnDisabled">Оформить заказ</button>
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

.summary-time,
.summary-name {
	padding: 8px;
	border: 1px solid #ccc;
	border-radius: 4px;
}
</style>
