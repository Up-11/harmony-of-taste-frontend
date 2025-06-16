import { privateApi, publicApi } from './interceptors'
import {
	removeTokenFromStorage,
	saveToStorage,
	type IAuthData
} from './auth.helpers'
import { API } from '../config/api'

export const AuthService = {
	async login(email: string, password: string) {
		const res = await publicApi.post<IAuthData>(API.AUTH.LOGIN, {
			email,
			password
		})
		if (res.data) {
			saveToStorage(res.data)
		}
		return res.data
	},
	async register(
		email: string,
		name: string,
		password: string,
		userToken: string
	) {
		const response = await publicApi.post<IAuthData>(API.AUTH.REGISTER, {
			email,
			name,
			password,
			userToken
		})
		if (response.data.accessToken) saveToStorage(response.data)
		return response.data
	},

	async editProfile(
		dto: { email?: string; password?: string },
		userId: string
	) {
		return await privateApi.patch<IAuthData>(API.AUTH.EDIT_PROFILE(userId), {
			dto
		})
	},

	logout() {
		removeTokenFromStorage()
		localStorage.removeItem('user')
	}
}
