import { createPinia } from 'pinia'

declare global {
	interface Window {
		pinia?: ReturnType<typeof createPinia>
	}
}

export const getGlobalPinia = () => {
	if (!window.pinia) {
		window.pinia = createPinia()
	}
	return window.pinia
}
