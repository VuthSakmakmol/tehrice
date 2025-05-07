import axios from 'axios'
import { useUserStore } from '@/stores/userStore'
import { pinia } from '@/main'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4789/api',
  timeout: 10000
})

api.interceptors.request.use(
  (config) => {
    const store = useUserStore(pinia)
    const token = store.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default api
