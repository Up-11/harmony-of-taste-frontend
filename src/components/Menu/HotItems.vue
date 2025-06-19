<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ProductService } from '../../api/products.service'
import type { Product } from '../../types'
import ProductCard from './ProductCard.vue'

const products = ref<Product[]>([])

const getRandomProducts = (arr: Product[], count: number) => {
	const shuffled = [...arr].sort(() => 0.5 - Math.random())
	return shuffled.slice(0, count)
}

const loadProducts = async () => {
	try {
		const response = await ProductService.getProducts()
		products.value = getRandomProducts(response.data, 6)
	} catch (error) {
		console.error('Ошибка при загрузке продуктов:', error)
	}
}

onMounted(() => {
	loadProducts()
})
</script>

<template>
	<div class="recommended-section">
		<div class="recommended-header">
			<h2 class="line-header">Рекомендуем попробовать</h2>
			<a href="/menu" class="menu-link">Смотреть всё меню</a>
		</div>
		<div class="menu-grid">
			<ProductCard
				v-for="product in products"
				:key="product.id"
				:product="product"
			/>
		</div>
	</div>
</template>

<style scoped>
.recommended-section {
	padding: 22px;
	width: 100%;
}

.recommended-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
}

.line-header {
	font-size: 26px;
	font-weight: 600;
	border-bottom: 2px solid var(--primary-color, #d4a373);
	padding-bottom: 5px;
}

.menu-link {
	font-size: 16px;
	color: var(--primary-color, #d4a373);
	text-decoration: none;
	transition: color 0.3s;
}

.menu-link:hover {
	color: #a05f23;
}

.menu-grid {
	display: grid;
	grid-template-columns: repeat(3, minmax(250px, 1fr));
	gap: 10px;
	justify-content: center;
	margin-inline: auto;
	justify-items: center;
}
</style>
