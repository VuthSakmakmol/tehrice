<template>
  <v-app-bar flat app color="white" class="px-4">
    <v-toolbar-title class="d-flex align-center">
      <v-icon start class="mr-2">mdi-cart</v-icon>
      <span class="font-weight-bold text-primary">MyShop</span>
    </v-toolbar-title>

    <v-spacer />

    <template v-if="isLoggedIn">
      <v-btn text disabled>Hi, {{ roleLabel }}</v-btn>
      <v-btn text @click="handleLogout">Logout</v-btn>
    </template>

    <template v-else>
      <v-btn text to="/login">Login</v-btn>
    </template>
  </v-app-bar>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const router = useRouter()
const userStore = useUserStore()

const isLoggedIn = computed(() => userStore.isLoggedIn)
const roleLabel = computed(() => {
  const role = userStore.role
  return role ? role.charAt(0).toUpperCase() + role.slice(1) : ''
})

const handleLogout = () => {
  userStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.v-app-bar {
  border-bottom: 1px solid #eee;
}
</style>
