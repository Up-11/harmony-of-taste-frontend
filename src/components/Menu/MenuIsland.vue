<script setup lang="ts">
import Filters from './Filters.vue'
import ProductCard from './ProductCard.vue'
</script>

<template>
	<div class="d-flex flex-column">
		<Filters />
		<div class="menu-grid">
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
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
