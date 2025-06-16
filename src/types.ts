import type { ProductCategory } from './api/products.service'

export interface Product {
	id: string
	createdAt: string
	title: string
	volume: string
	ingredients: string
	category: ProductCategory
	price: number
	imageUrl: string
}
export enum OrderStatus {
	NEW = 'NEW',
	IN_PROGRESS = 'IN_PROGRESS',
	READY = 'READY',
	CANCELLED = 'CANCELLED',
	COMPLETED = 'COMPLETED'
}
