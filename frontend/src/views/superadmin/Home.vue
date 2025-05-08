<template>
  <v-container class="py-8">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card elevation="4" class="pa-6 text-center">
          <v-avatar size="96" class="mb-4">
            <img src="https://randomuser.me/api/portraits/lego/1.jpg" alt="avatar" />
          </v-avatar>
          <h2 class="text-h5 font-weight-bold mb-2">Welcome, {{ userName }}</h2>
          <div class="text-subtitle-2 text-grey-darken-1 mb-4">Super Admin Panel</div>

          <v-row class="mt-4" dense>
            <v-col cols="12" sm="6">
              <v-btn block color="primary" @click="goTo('dashboard')">
                📊 View Dashboard
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6">
              <v-btn block color="secondary" @click="goTo('admins')">
                👥 Manage Admins
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6">
              <v-btn block color="green" @click="goTo('deliveries')">
                🚚 Manage Deliveries
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6">
              <v-btn block color="orange" @click="goTo('customers')">
                🧍 Manage Customers
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { computed } from 'vue'

const router = useRouter()
const userStore = useUserStore()

const userName = computed(() => userStore.user?.name || 'Super Admin')

const goTo = (section) => {
  router.push(`/superadmin/${section}`)
}
</script>
