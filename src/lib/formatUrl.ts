import { API } from '../config/api'

export default function formatUrl(path: string) {
	return `${API.BASE_URL}/${path}`
}
