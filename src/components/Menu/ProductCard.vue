<script setup lang="ts">
import { ref } from 'vue'

const title = ref('Капучино 250мл')
const price = ref(220)
const cookTime = ref(5)
const category = ref('Горячие напитки')
const image = ref('https://via.placeholder.com/300x200?text=Фото+продукта')

const addToOrder = () => {
	alert(`Добавлено в заказ: ${title.value}`)
}
</script>

<template>
	<div class="product-card">
		<img :src="image" :alt="title" class="product-image" />

		<div class="product-content">
			<h3 class="product-title">{{ title }}</h3>

			<p class="product-category">{{ category }}</p>

			<div class="product-info">
				<span class="product-price">{{ price }} ₽</span>
				<span class="product-cooktime">⏱ {{ cookTime }} мин</span>
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
