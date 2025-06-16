import { API } from '../config/api'
import { privateApi, publicApi } from './interceptors'

interface CreateOrderDto {
	userId: string
	items: Array<{
		productId: string
		quantity: number
	}>
	totalPrice: number
	userName: string
}

export const OrdersService = {
	async getOrdersById(id: string) {
		return await privateApi.get(API.ORDERS.GET_BY_ID(id))
	},
	async createOrder(dto: CreateOrderDto) {
		return await privateApi.post(API.ORDERS.CREATE, { ...dto })
	}
}
