export const API = {
	BASE_URL:
		'http://harmoney-of-taste-backend-xw2ufl-fa7a2f-5-129-207-103.traefik.me',
	AUTH: {
		LOGIN: '/auth/login',
		REGISTER: '/auth/register',
		EDIT_PROFILE: (id: string) => `/auth/edit/${id}`
	},
	PRODUCTS: {
		GET: '/products',
		GET_FILTERED: '/products/get-filtered'
	},
	ORDERS: {
		CREATE: '/orders',
		GET_BY_ID: (id: string) => `/orders/get-by-id/${id}`
	},
	CART: {
		GET_CART: '/cart',
		ADD_CART_ITEM: '/cart/add',
		INCREASE: (id: string) => `/cart/${id}/increase`,
		DECREASE: (id: string) => `/cart/${id}/decrease`,
		REMOVE_CART_ITEM: (id: string) => `/cart/${id}`
	}
}
