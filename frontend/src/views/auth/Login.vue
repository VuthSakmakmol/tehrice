<template>
    <v-container class="d-flex align-center justify-center" style="min-height: 100vh;">
      <v-card class="pa-6" width="420" elevation="10" rounded="lg">
        <v-card-title class="text-h6 font-weight-bold mb-4 text-center">
          🔐 Login to Your Account
        </v-card-title>
  
        <v-form @submit.prevent="handleLogin" ref="loginForm" v-model="valid">
          <v-text-field
            v-model="form.phone"
            label="Phone Number"
            prepend-inner-icon="mdi-phone"
            required
            :rules="[v => !!v || 'Phone is required']"
            dense
          />
          <v-text-field
            v-model="form.password"
            label="Password"
            type="password"
            prepend-inner-icon="mdi-lock"
            required
            :rules="[v => !!v || 'Password is required']"
            dense
          />
  
          <v-btn
            color="primary"
            type="submit"
            class="mt-4"
            :loading="loading"
            block
          >
            Login
          </v-btn>
        </v-form>
  
        <v-card-actions class="justify-center mt-3">
          <small class="text-muted">Don't have an account?</small>
          <v-btn text class="ms-1" @click="router.push('/register')">Register</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/stores/userStore'
  import api from '@/plugins/axios'
  import Swal from 'sweetalert2'
  
  const router = useRouter()
  const userStore = useUserStore()
  const loginForm = ref(null)
  const valid = ref(true)
  
  const form = ref({
    phone: '',
    password: ''
  })
  
  const loading = ref(false)
  
  const handleLogin = async () => {
    if (!valid.value) return
    loading.value = true
    try {
      const res = await api.post('/auth/login', form.value)
      userStore.setUser(res.data)
      await Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        timer: 1500,
        showConfirmButton: false
      })
  
      // Redirect based on role
      const role = res.data.user.role
      if (role === 'superadmin') router.push('/superadmin/dashboard')
      else if (role === 'admin') router.push('/admin/dashboard')
      else if (role === 'delivery') router.push('/admin/delivery')
      else router.push('/customer/dashboard')
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: err.response?.data?.message || 'Something went wrong',
      })
    } finally {
      loading.value = false
    }
  }
  </script>
  