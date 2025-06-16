<script setup lang="ts">
import { ref } from 'vue'
import {
	ProductCategory,
	type FiltersDtoType
} from '../../api/products.service'

const filterPayload = <T,>(value: T): Partial<{ value: T }> =>
	value !== undefined && value !== null && value !== '' ? { value } : {}

const emit = defineEmits<{ getFilteredProducts: [filters: FiltersDtoType] }>()

const priceFrom = ref<number | null>(null)
const priceTo = ref<number | null>(null)

const category = ref('')

const sortBy = ref('')

const applyFilters = () => {
	const payload = Object.fromEntries(
		Object.entries({
			priceFrom: priceFrom.value,
			priceTo: priceTo.value,
			category: category.value,
			sortBy: sortBy.value
		}).filter(
			([_, value]) => value !== undefined && value !== null && value !== ''
		)
	)
	console.log(payload)
	emit('getFilteredProducts', payload)
}
</script>

<template>
	<div class="filters">
		<h2>Фильтры:</h2>
		<input
			v-model="priceFrom"
			:max="priceTo || 0"
			type="number"
			placeholder="Цена от"
		/>
		<input
			v-model="priceTo"
			:min="priceFrom || 0"
			type="number"
			placeholder="Цена до"
		/>

		<select v-model="category">
			<option value="">Категория</option>
			<option :value="ProductCategory.COFFEE">Кофе</option>
			<option :value="ProductCategory.COLD_DRINK">Холодные напитки</option>
			<option :value="ProductCategory.DESSERT">Десерты</option>
			<option :value="ProductCategory.FOOD">Еда</option>
			<option :value="ProductCategory.HOT_DRINK">Горячие напитки</option>
		</select>

		<select v-model="sortBy">
			<option value="">Сортировка</option>
			<option value="price-asc">По цене ↑</option>
			<option value="price-desc">По цене ↓</option>
		</select>

		<button @click="applyFilters" class="btn-brown">Применить</button>
	</div>
</template>

<style scoped>
.filters {
	display: flex;
	flex-wrap: wrap;
	gap: 12px;
	padding: 10px;
	background: #faf7f2;
	border-radius: 8px;
}

.filters input,
.filters select {
	padding: 6px 10px;
	border: 1px solid #ddd;
	border-radius: 6px;
}

.filters button {
	padding: 8px 16px;
	background: #bf8d50;
	color: #faf7f2;
	border: none;
	border-radius: 6px;
	cursor: pointer;
	transition: background 0.2s;
}

.filters button:hover {
	background: #93613b;
}
</style>
