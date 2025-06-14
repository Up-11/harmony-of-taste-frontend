<script setup lang="ts">
import { ref } from 'vue'

const priceFrom = ref<number | null>(null)
const priceTo = ref<number | null>(null)

const productType = ref('')

const category = ref('')

const sortBy = ref('')

const cookTime = ref('')

const applyFilters = () => {
	console.log({
		priceFrom: priceFrom.value,
		priceTo: priceTo.value,
		productType: productType.value,
		category: category.value,
		sortBy: sortBy.value,
		cookTime: cookTime.value
	})
}
</script>

<template>
	<div class="filters">
		<h2>Фильтры:</h2>
		<input v-model="priceFrom" type="number" placeholder="Цена от" />
		<input v-model="priceTo" type="number" placeholder="Цена до" />

		<select v-model="productType">
			<option value="">Тип продукта</option>
			<option value="еда">Еда</option>
			<option value="кофе">Кофе</option>
		</select>

		<select v-model="category">
			<option value="">Категория</option>
			<option value="горячее">Горячие напитки</option>
			<option value="холодное">Холодные напитки</option>
			<option value="торты">Торты</option>
		</select>

		<select v-model="sortBy">
			<option value="">Сортировка</option>
			<option value="price-asc">По цене ↑</option>
			<option value="price-desc">По цене ↓</option>
		</select>

		<select v-model="cookTime">
			<option value="">Время готовки</option>
			<option value="5">До 5 мин</option>
			<option value="10">До 10 мин</option>
			<option value="15">До 15 мин</option>
			<option value="20">До 20 мин</option>
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
