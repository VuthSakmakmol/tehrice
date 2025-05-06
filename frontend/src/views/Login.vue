<template>
  <v-container class="mt-10" max-width="400">
    <v-card elevation="3">
      <v-card-title class="text-h6 font-weight-bold">Login</v-card-title>
      <v-card-text>
        <v-text-field v-model="phone" label="Phone Number" />
        <v-text-field v-model="password" label="Password" type="password" />
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="primary" @click="login" :loading="loading">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

const phone = ref('');
const password = ref('');
const loading = ref(false);
const router = useRouter();

const login = async () => {
  if (!phone.value || !password.value) {
    Swal.fire('Missing fields', 'Please enter both phone and password', 'warning');
    return;
  }

  loading.value = true;
  try {
    const res = await axios.post('http://localhost:4789/api/auth/login', {
      phone: phone.value,
      password: password.value
    });

    const { token, user } = res.data;
    localStorage.setItem('token', token);

    Swal.fire({
      icon: 'success',
      title: 'Login Successful',
      timer: 1500,
      showConfirmButton: false
    });

    if (user.role === 'SuperAdmin') {
      router.push('/dashboard/superadmin');
    } else if (user.role === 'Admin') {
      router.push('/dashboard/admin');
    } else if (user.role === 'Delivery') {
      router.push('/dashboard/delivery');
    } else {
      router.push('/dashboard/guest');
    }

  } catch (err) {
    Swal.fire('Login Failed', err.response?.data?.message || 'Incorrect credentials', 'error');
  } finally {
    loading.value = false;
  }
};
</script>
