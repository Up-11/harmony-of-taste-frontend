import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('appStore', () => {
	const isAuth = ref(false)

	return { isAuth }
})
