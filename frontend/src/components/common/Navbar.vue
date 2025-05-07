<template>
  <v-app-bar flat app>
    <v-toolbar-title>
      <v-icon start>mdi-cart</v-icon>
      <span class="font-weight-bold text-primary">MyShop</span>
    </v-toolbar-title>

    <v-spacer />

    <template v-if="isLoggedIn">
      <v-btn text disabled>Hi, {{ roleLabel }}</v-btn>
      <v-btn text @click="logout">Logout</v-btn>
    </template>

    <template v-else>
      <v-btn text to="/login">Login</v-btn>
    </template>
  </v-app-bar>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const isLoggedIn = computed(() => userStore.isLoggedIn)
const roleLabel = computed(() => {
  const role = userStore.role
  return role ? role.charAt(0).toUpperCase() + role.slice(1) : ''
})

const logout = () => {
  userStore.logout()
}
</script>
