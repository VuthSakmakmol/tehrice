import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: null,
    role: null,
    user: null,
    isLoggedIn: false,
  }),

  actions: {
    setUser(data) {
      this.token = data.token
      this.role = data.user.role.toLowerCase()
      this.user = data.user
      this.isLoggedIn = true
      localStorage.setItem('user', JSON.stringify(data))
    },

    initialize() {
      const stored = localStorage.getItem('user')
      if (stored) {
        const data = JSON.parse(stored)
        this.setUser(data)
      }
    },

    logout() {
      this.token = null
      this.role = null
      this.user = null
      this.isLoggedIn = false
      localStorage.removeItem('user')
    }
  }
})
