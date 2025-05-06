<template>
    <v-container class="mt-10" max-width="400">
      <v-card>
        <v-card-title>Login</v-card-title>
        <v-card-text>
          <v-text-field v-model="phone" label="Phone Number" />
          <v-text-field v-model="password" label="Password" type="password" />
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="login">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  import Swal from 'sweetalert2';
  
  const phone = ref('');
  const password = ref('');
  const router = useRouter();
  
  const login = async () => {
    try {
      const res = await axios.post('http://localhost:4789/api/auth/login', {
        phone: phone.value,
        password: password.value
      });
  
      localStorage.setItem('token', res.data.token);
      Swal.fire('Success', 'Login successful', 'success');
      router.push('/dashboard');
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'Login failed', 'error');
    }
  };
  </script>
  