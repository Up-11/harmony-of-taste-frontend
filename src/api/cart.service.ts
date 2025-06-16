import { API } from '../config/api'
import { privateApi, publicApi } from './interceptors'

interface AddCartItemDto {
	productId: string
	quantity?: number
}

export const cartService = {
	async getCart(userToken: string) {
		return await publicApi.get(API.CART.GET_CART, { params: { userToken } })
	},
	async addCartItem(userToken: string, dto: AddCartItemDto) {
		return await publicApi.post(API.CART.ADD_CART_ITEM, dto, {
			params: { userToken }
		})
	},
	async increaseCartItemQuantity(userToken: string, cartItemId: string) {
		return await publicApi.patch(API.CART.INCREASE(cartItemId), {
			params: { userToken }
		})
	},
	async decreaseCartItemQuantity(userToken: string, cartItemId: string) {
		return await publicApi.patch(API.CART.DECREASE(cartItemId), {
			params: { userToken }
		})
	},
	async removeCartItem(userToken: string, cartItemId: string) {
		return await publicApi.delete(API.CART.REMOVE_CART_ITEM(cartItemId), {
			params: { userToken }
		})
	}
}
