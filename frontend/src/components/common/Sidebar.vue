<template>
  <v-navigation-drawer expand-on-hover rail app class="elevation-1">
    <!-- User Info -->
    <v-list>
      <v-list-item
        :prepend-avatar="userAvatar"
        :title="userName"
        :subtitle="userPhone"
      />
    </v-list>

    <v-divider class="my-2" />

    <!-- Main Nav -->
    <v-list density="compact" nav>
      <!-- Dashboard (dynamic role-based) -->
      <v-list-item
        v-if="dashboardPath"
        :to="dashboardPath"
        :prepend-icon="dashboardIcon"
        :title="dashboardLabel"
      />

      <!-- Public links -->
      <v-list-item to="/" prepend-icon="mdi-home" title="Home" />
      <v-list-item to="/guest/product-list" prepend-icon="mdi-cart" title="Products" />

      <!-- Superadmin only -->
      <v-list-item
        v-if="role === 'superadmin'"
        to="/superadmin/admins"
        prepend-icon="mdi-account-group"
        title="Manage Admins"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const role = computed(() => userStore.role)

const dashboardPath = computed(() => {
  switch (role.value) {
    case 'superadmin': return '/superadmin/dashboard'
    case 'admin': return '/admin/dashboard'
    case 'customer': return '/customer/dashboard'
    default: return null
  }
})

const dashboardLabel = computed(() => {
  switch (role.value) {
    case 'superadmin': return 'Super Admin Dashboard'
    case 'admin': return 'Admin Dashboard'
    case 'customer': return 'Customer Dashboard'
    default: return 'Dashboard'
  }
})

const dashboardIcon = computed(() => {
  switch (role.value) {
    case 'superadmin': return 'mdi-crown'
    case 'admin': return 'mdi-shield-account'
    case 'customer': return 'mdi-account'
    default: return 'mdi-view-dashboard'
  }
})

const userName = computed(() => userStore.user?.name || 'Guest')
const userPhone = computed(() => userStore.user?.phone || '')
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
