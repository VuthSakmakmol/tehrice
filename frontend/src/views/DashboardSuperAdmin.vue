<template>
  <v-container class="mt-10">
    <h2 class="text-h5 font-weight-bold mb-4">Super Admin Dashboard</h2>

    <v-row>
      <v-col cols="12" md="6">
        <v-card @click="view = 'admins'" class="pa-4" elevation="2">
          <v-card-title>Manage Admins</v-card-title>
          <v-card-subtitle>View, add, or remove admin users</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card color="red-lighten-5" class="pa-4" @click="logout" elevation="2">
          <v-card-title>Logout</v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <v-divider class="my-4" />

    <!-- Conditional rendering of AdminManager component -->
    <AdminManager v-if="view === 'admins'" />
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AdminManager from './components/AdminManager.vue'; // ✅ import it

const router = useRouter();
const view = ref(null);

const logout = () => {
  localStorage.removeItem('token');
  router.push('/');
};
</script>
