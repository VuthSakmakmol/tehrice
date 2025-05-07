<template>
  <v-navigation-drawer
    expand-on-hover
    rail
    app
    class="elevation-1"
  >
    <!-- User Info -->
    <v-list>
      <v-list-item
        :prepend-avatar="userAvatar"
        :title="userName"
        :subtitle="userEmail"
      />
    </v-list>

    <v-divider />

    <!-- Navigation Menu -->
    <v-list density="compact" nav>
      <!-- Dashboard -->
      <v-list-item
        v-if="dashboardPath"
        :to="dashboardPath"
        prepend-icon="mdi-view-dashboard"
        title="Dashboard"
        value="dashboard"
      />

      <!-- Home -->
      <v-list-item
        to="/"
        prepend-icon="mdi-home"
        title="Home"
        value="home"
      />

      <!-- Products -->
      <v-list-item
        to="/guest/product-list"
        prepend-icon="mdi-cart"
        title="Products"
        value="products"
      />
    </v-list>
    <!-- Admin Panel Link (only for admin) -->
    <v-list-item
      v-if="role === 'admin'"
      to="/admin/dashboard"
      prepend-icon="mdi-shield-account"
      title="Admin Panel"
      value="admin"
    />
  </v-navigation-drawer>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const dashboardPath = computed(() => {
  const role = userStore.role
  if (role === 'superadmin') return '/superadmin/dashboard'
  if (role === 'admin') return '/admin/dashboard'
  if (role === 'customer') return '/customer/dashboard'
  return null
})

const userName = computed(() => userStore.user?.name || 'Guest')
const userEmail = computed(() => userStore.user?.phone || '')
const userAvatar = computed(() =>
  userStore.user
    ? 'https://randomuser.me/api/portraits/lego/1.jpg'
    : 'https://cdn.vuetifyjs.com/images/profiles/default-avatar.png'
)
</script>

<style scoped>
.v-navigation-drawer {
  border-right: 1px solid #e0e0e0;
}
</style>
