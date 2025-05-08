<template>
  <v-app>

    <v-main>
      <Navbar />
      <Sidebar />

      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'
import { computed } from 'vue'

import Sidebar from '@/components/common/Sidebar.vue'
import Navbar from '@/components/common/Navbar.vue'

const userStore = useUserStore()

// ✅ Prevent crash on undefined user
const role = computed(() => userStore.user?.role || null)

// ✅ Only show sidebar for admin and superadmin
const showSidebar = computed(() => role.value === 'admin' || role.value === 'superadmin')
</script>
