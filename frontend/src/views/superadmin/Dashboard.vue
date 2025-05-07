<!-- src/views/superadmin/Dashboard.vue -->
<template>
  <v-container>
    <h2 class="text-h5 font-weight-bold mb-4">Super Admin Dashboard</h2>

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
  </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import api from '@/plugins/axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const totalAdmins = ref(0)

const fetchAdminCount = async () => {
  try {
    const res = await api.get('/auth/admin-count') // ⬅️ You must create this backend route
    totalAdmins.value = res.data.count
  } catch (err) {
    console.error('Failed to load admin count', err)
  }
}

const goToAdminManager = () => {
  router.push('/superadmin/admins')
}

onMounted(fetchAdminCount)
</script>
