<script setup lang="ts">
interface Props {
	title: string
	price: number
	imageUrl: string
}

const props = defineProps<Props>()
const { title, price, imageUrl } = props
</script>

<template>
	<div class="cart-item">
		<!-- Информация о товаре -->
		<div class="cart-item__info">
			<img :src="imageUrl" :alt="title" class="cart-item__image" />
			<div>
				<h3 class="cart-item__title">{{ title || 'tutle' }}</h3>
				<p class="cart-item__price">Цена: {{ price || '2000' }} ₽</p>
			</div>
		</div>

		<div class="cart-left">
			<div class="cart-item__controls">
				<button class="cart-item__button">−</button>
				<span class="cart-item__count">1</span>
				<button class="cart-item__button">+</button>
			</div>
			<button class="cart-item__delete">X</button>
		</div>
	</div>
</template>

<style scoped>
.cart-left {
	display: flex;
	gap: 2px;
}
.cart-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 16px;
	margin-bottom: 16px;
	border-radius: 8px;
	background-color: #faf7f2;
}

.cart-item__info {
	display: flex;
	align-items: center;
}

.cart-item__image {
	width: 80px;
	height: 80px;
	object-fit: cover;
	border-radius: 4px;
	margin-right: 16px;
}

.cart-item__title {
	margin: 0 0 4px;
	color: #342116;
	font-size: 1.125rem;
	font-weight: 600;
}

.cart-item__price {
	margin: 0;
	color: #774f35;
	font-size: 0.875rem;
}

.cart-item__controls {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 8px;
}

.cart-item__button {
	background-color: #93613b;
	color: #faf7f2;
	border: none;
	padding: 4px;
	padding-inline: 8px;
	border-radius: 4px;
	cursor: pointer;
	transition: background-color 0.3s;
}

.cart-item__button:hover {
	background-color: #b17845;
}

.cart-item__delete {
	background-color: #61412d;
	color: #faf7f2;
	border: none;
	padding: 4px 8px;
	border-radius: 4px;
	cursor: pointer;
	transition: background-color 0.3s;
}

.cart-item__delete:hover {
	background-color: #774f35;
}
</style>
