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
        :subtitle="userPhone"
      />
    </v-list>

    <v-divider class="my-2" />

    <!-- Dashboard -->
    <v-list density="compact" nav>
      <v-list-item
        v-if="dashboardPath"
        :to="dashboardPath"
        prepend-icon="mdi-view-dashboard"
        title="Dashboard"
      />

      <!-- Public links -->
      <v-list-item
        to="/"
        prepend-icon="mdi-home"
        title="Home"
      />
      <v-list-item
        to="/guest/product-list"
        prepend-icon="mdi-cart"
        title="Products"
      />

      <!-- Admin-only -->
      <v-list-item
        v-if="role === 'admin'"
        to="/admin/dashboard"
        prepend-icon="mdi-shield-account"
        title="Admin Panel"
      />

      <!-- Superadmin-only -->
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
