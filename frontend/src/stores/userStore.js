import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import router from '@/router'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)

  const isLoggedIn = computed(() => !!token.value)
  const role = computed(() => user.value?.role || null)

  // Save login info
  const setUser = (payload) => {
    token.value = payload.token
    user.value = payload.user
    localStorage.setItem('token', token.value)
    localStorage.setItem('user', JSON.stringify(user.value))
  }

  // Logout and clear data
  const logout = () => {
    token.value = ''
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  }

  return {
    token,
    user,
    role,
    isLoggedIn,
    setUser,
    logout,
  }
})
