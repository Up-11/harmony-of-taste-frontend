import { API } from '../config/api'
import { publicApi } from './interceptors'

export enum ProductCategory {
	FOOD = 'FOOD',
	COFFEE = 'COFFEE',
	COLD_DRINK = 'COLD_DRINK',
	HOT_DRINK = 'HOT_DRINK',
	DESSERT = 'DESSERT'
}

export type FiltersDtoType = {
	category?: ProductCategory
	priceFrom?: number
	priceTo?: number
	sortBy?: 'price-asc' | 'price-desc' | 'default'
}

export const ProductService = {
	async getProducts() {
		return await publicApi.get(API.PRODUCTS.GET)
	},
	async getFilteredProducts(dto: FiltersDtoType) {
		return await publicApi.get(API.PRODUCTS.GET_FILTERED, {
			params: { ...dto }
		})
	}
}
