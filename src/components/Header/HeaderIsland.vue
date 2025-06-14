<script setup lang="ts">
import { createPinia, setActivePinia } from 'pinia'
import { useAppStore } from '../../store/store'
import { getCurrentInstance, onMounted, ref } from 'vue'
import { ROUTES } from '../../config/routes'

const store = ref()

onMounted(() => {
	const pinia = createPinia()
	const app = getCurrentInstance()?.appContext.app
	if (app) {
		app.use(pinia)
		setActivePinia(pinia)
		store.value = useAppStore()
		console.log('isAuth:', store.value.isAuth)
	}
})
</script>

<template>
	<div v-if="store">
		<div v-if="store.isAuth">
			<a :href="ROUTES.PROFILE">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="1em"
					height="1em"
					viewBox="0 0 24 24"
				>
					<g
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
					>
						<circle cx="12" cy="12" r="10"></circle>
						<circle cx="12" cy="10" r="3"></circle>
						<path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path>
					</g>
				</svg>
			</a>
		</div>
		<div v-else>
			<a :href="ROUTES.AUTH.LOGIN">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="1em"
					height="1em"
					viewBox="0 0 24 24"
				>
					<path
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M11 20H2m9-15.438v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561zM11 4H8a2 2 0 0 0-2 2v14m8-8h.01M22 20h-3"
					/>
				</svg>
			</a>
		</div>
	</div>
	<div v-else></div>
</template>

<style scoped></style>
