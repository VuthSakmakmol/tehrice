<template>
  <v-container class="mt-10">
    <h2 class="text-h5 font-weight-bold mb-4">Super Admin Dashboard</h2>

    <v-row dense>
      <v-col cols="12" md="4">
        <v-card
          class="pa-4"
          elevation="2"
          @click="currentView = 'admins'"
          :color="currentView === 'admins' ? 'blue-lighten-4' : ''"
        >
          <v-card-title>Manage Admins</v-card-title>
          <v-card-subtitle>View, add, or remove Admin users</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card
          class="pa-4"
          elevation="2"
          @click="currentView = 'deliveries'"
          :color="currentView === 'deliveries' ? 'green-lighten-4' : ''"
        >
          <v-card-title>Manage Deliveries</v-card-title>
          <v-card-subtitle>View, add, or remove Delivery users</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card
          class="pa-4"
          color="red-lighten-5"
          elevation="2"
          @click="logout"
        >
          <v-card-title>Logout</v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <v-divider class="my-4" />

    <!-- Conditional view -->
    <component :is="currentComponent" />
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import AdminManager from './components/AdminManager.vue';
import DeliveryManager from './components/DeliveryManager.vue';

const router = useRouter();
const currentView = ref('admins');

const currentComponent = computed(() => {
  switch (currentView.value) {
    case 'admins':
      return AdminManager;
    case 'deliveries':
      return DeliveryManager;
    default:
      return null;
  }
});

const logout = () => {
  localStorage.removeItem('token');
  router.push('/');
};
</script>
