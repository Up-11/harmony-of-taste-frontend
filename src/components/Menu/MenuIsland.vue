<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
	ProductCategory,
	ProductService,
	type FiltersDtoType
} from '../../api/products.service'
import { useQuery } from '../../composables/useQuery'
import Filters from './Filters.vue'
import ProductCard from './ProductCard.vue'
import type { Product } from '../../types'

const products = ref<Product[]>([])

const loadProducts = async () => {
	try {
		const response = await ProductService.getProducts()
		products.value = response.data
	} catch (error) {
		console.error('Ошибка при загрузке продуктов:', error)
	}
}

const loadFilteredProducts = async (filters: FiltersDtoType) => {
	try {
		const response = await ProductService.getFilteredProducts(filters)
		products.value = response.data
	} catch (error) {
		console.error('Ошибка при загрузке продуктов:', error)
	}
}

onMounted(() => {
	loadProducts()
})
</script>

<template>
	<div class="d-flex flex-column">
		<Filters @get-filtered-products="loadFilteredProducts" />
		<div class="menu-grid">
			<ProductCard v-for="product in products" :product="product" />
		</div>
	</div>
</template>

<style scoped>
.menu-grid {
	display: grid;
	padding: 22px;
	grid-template-columns: repeat(4, 1fr);
	gap: 10px;
	justify-content: center;
}
</style>
