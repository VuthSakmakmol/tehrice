<template>
    <v-container class="mt-10">
      <h2 class="text-h5 font-weight-bold mb-4">Welcome to the Dashboard</h2>
      <p>This area is protected. You are logged in as: <strong>{{ userRole }}</strong></p>
      <v-btn color="error" @click="logout">Logout</v-btn>
    </v-container>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import { ref, onMounted } from 'vue';
  
  const router = useRouter();
  const userRole = ref('Guest');
  
  onMounted(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      const user = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
      userRole.value = user.role || 'Unknown';
    }
  });
  
  const logout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };
  </script>
  