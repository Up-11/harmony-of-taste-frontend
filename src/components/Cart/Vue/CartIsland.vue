<script setup lang="ts">
import CartItem from './CartItem.vue'
import CartSummary from './CartSummary.vue'
</script>

<template>
	<div class="cont">
		<div>
			<CartItem />
		</div>
		<div>
			<CartSummary :customer-name="'gosha'" />
		</div>
	</div>
</template>

<style>
.f {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
}
.cont {
	display: grid;
	grid-template-columns: 1fr 500px;
	gap: 10;
	gap: 20px;
}
</style>
