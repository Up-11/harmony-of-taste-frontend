<script setup lang="ts">
import { ref } from 'vue'
import type { Product } from './MenuIsland.vue'
import formatUrl from '../../lib/formatUrl'
import { ProductService } from '../../api/products.service'
import { cartService } from '../../api/cart.service'

const props = defineProps<{ product: Product }>()

const addToOrder = () => {
	const userToken = localStorage.getItem('userToken')
	cartService.addCartItem(userToken!, { productId: props.product.id })
}
</script>

<template>
	<div class="product-card">
		<img
			:src="formatUrl(product.imageUrl)"
			:alt="product.title"
			class="product-image"
		/>

		<div class="product-content">
			<h3 class="product-title">{{ product.title }}</h3>

			<p class="product-category">{{ product.category }}</p>
			<p class="product-category">{{ product.ingredients }}</p>

			<div class="product-info">
				<span class="product-price">{{ product.price }} ₽</span>
				<span class="product-cooktime"> {{ product.volume }} мл</span>
			</div>
			<button @click="addToOrder" class="btn-brown">В корзину</button>
		</div>
	</div>
</template>

<style scoped>
.product-card {
	background: #faf7f2;
	border-radius: 12px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	overflow: hidden;
	display: flex;
	flex-direction: column;
	min-width: 300px;
	max-width: 300px;
}

.product-image {
	width: 100%;
	height: 200px;
	object-fit: cover;
}

.product-content {
	padding: 16px;
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.product-title {
	margin: 0;
	font-size: 1.2rem;
	color: #342116;
}

.product-category {
	font-size: 0.9rem;
	color: #774f35;
}

.product-info {
	display: flex;
	justify-content: space-between;
	font-size: 0.95rem;
	color: #5c3a1d;
}

.btn-brown {
	padding: 8px 16px;
	background: #bf8d50;
	color: #faf7f2;
	border: none;
	border-radius: 6px;
	cursor: pointer;
	font-size: 0.95rem;
	transition: background 0.2s;
}

.btn-brown:hover {
	background: #93613b;
}
</style>
