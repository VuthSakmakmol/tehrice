<template>
  <v-container>
    <h2 class="text-h5 font-weight-bold mb-4">Super Admin Dashboard</h2>

    <!-- Admin Card -->
    <v-card class="pa-4 mb-4" elevation="2" @click="goToAdminManager" style="cursor: pointer;">
      <v-row align="center" justify="space-between">
        <v-col cols="auto">
          <v-icon color="primary" size="32">mdi-account-group</v-icon>
        </v-col>
        <v-col>
          <div class="text-h6">Total Admins</div>
          <div class="text-subtitle-1 font-weight-bold">{{ totalAdmins }}</div>
        </v-col>
        <v-col cols="auto">
          <v-btn color="primary" variant="text">Manage</v-btn>
        </v-col>
      </v-row>
    </v-card>

    <!-- Delivery Card -->
    <v-card class="pa-4 mb-4" elevation="2" @click="goToDeliveryManager" style="cursor: pointer;">
      <v-row align="center" justify="space-between">
        <v-col cols="auto">
          <v-icon color="green" size="32">mdi-truck-delivery</v-icon>
        </v-col>
        <v-col>
          <div class="text-h6">Total Deliveries</div>
          <div class="text-subtitle-1 font-weight-bold">{{ totalDeliveries }}</div>
        </v-col>
        <v-col cols="auto">
          <v-btn color="green" variant="text">Manage</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const totalAdmins = ref(0)
const totalDeliveries = ref(0)

const fetchAdminCount = async () => {
  try {
    const res = await api.get('/admin-count')
    totalAdmins.value = res.data.count
  } catch (err) {
    console.error('❌ Failed to load admin count:', err.response?.data || err.message)
  }
}

const fetchDeliveryCount = async () => {
  try {
    const res = await api.get('/deliveries') // or create /delivery-count if needed
    totalDeliveries.value = res.data.length
  } catch (err) {
    console.error('❌ Failed to load delivery count:', err.response?.data || err.message)
  }
}

const goToAdminManager = () => {
  router.push('/superadmin/admins')
}

const goToDeliveryManager = () => {
  router.push('/superadmin/deliveries')
}

onMounted(() => {
  fetchAdminCount()
  fetchDeliveryCount()
})
</script>
