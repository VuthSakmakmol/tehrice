<template>
  <v-container class="mt-10">
    <h2 class="text-h5 font-weight-bold mb-4">Super Admin Dashboard</h2>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Manage Users</v-card-title>
          <v-card-text>View, add, and remove Admins and Delivery accounts.</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>System Settings</v-card-title>
          <v-card-text>Manage global configurations and roles.</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-btn color="error" @click="logout">Logout</v-btn>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
  localStorage.removeItem('token');
  router.push('/');
};
</script>
