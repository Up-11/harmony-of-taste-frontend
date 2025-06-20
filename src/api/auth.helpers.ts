import Cookies from 'js-cookie'

export interface IUser {
	id: string
	email: string
	userToken: string
	name: string
}

export interface IAuthData {
	user: IUser | null
	accessToken: string
}

export interface IVerifyResponse {
	user: IUser
	accessToken: string
	message: string
}

export interface ILoginResponse {
	authData: IAuthData
	emailData: {
		message: string
		success: boolean
	}
}

export const saveTokenToStorage = (accessToken: string) => {
	Cookies.set('accessToken', accessToken)
}

export const removeTokenFromStorage = () => {
	Cookies.remove('accessToken')
	localStorage.removeItem('like-storage')
}

export const saveToStorage = (data: IAuthData) => {
	saveTokenToStorage(data.accessToken)
	localStorage.setItem('user', JSON.stringify(data.user))
}
