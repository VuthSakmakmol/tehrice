// src/plugins/axios.js
import axios from 'axios'
import { useUserStore } from '@/stores/userStore'

const api = axios.create({
  baseURL: 'http://localhost:4789/api',
  headers: { 'Content-Type': 'application/json' }
})

// Attach token
api.interceptors.request.use((config) => {
  const userStore = useUserStore()
  if (userStore.token) {
    config.headers.Authorization = `Bearer ${userStore.token}`
    console.log('✅ Token attached:', userStore.token)
  } else {
    console.warn('⚠️ No token found')
  }
  return config
})

export default api
