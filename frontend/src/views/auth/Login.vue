<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh">
    <v-card class="pa-6" max-width="400" elevation="6">
      <h2 class="text-h5 text-center mb-4">Login</h2>

      <v-form @submit.prevent="handleLogin" ref="loginForm" lazy-validation>
        <v-text-field
          v-model="form.phone"
          label="Phone Number"
          type="text"
          required
          dense
        />
        <v-text-field
          v-model="form.password"
          label="Password"
          type="password"
          required
          dense
        />

        <v-btn
          type="submit"
          color="primary"
          block
          class="mt-4"
          :loading="loading"
        >
          Login
        </v-btn>
      </v-form>

      <div class="mt-3 text-center">
        Don't have an account?
        <RouterLink to="/register">Register</RouterLink>
      </div>
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
const loading = ref(false)

const form = ref({
  phone: '',
  password: ''
})

const handleLogin = async () => {
  if (!form.value.phone || !form.value.password) {
    Swal.fire('Missing Fields', 'Please enter both phone and password.', 'warning')
    return
  }

  loading.value = true

  try {
    const { data } = await api.post('/auth/login', form.value)
    userStore.setUser(data) // save token and user in store

    // Redirect based on role
    switch (data.user.role) {
      case 'superadmin':
        router.push('/superadmin/dashboard')
        break
      case 'admin':
        router.push('/admin/dashboard')
        break
      case 'customer':
        router.push('/customer/dashboard')
        break
      default:
        router.push('/')
    }

    Swal.fire('Success', 'Login successful!', 'success')
  } catch (err) {
    console.error('Login error:', err)
    Swal.fire('Login Failed', err?.response?.data?.message || 'Something went wrong', 'error')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>
