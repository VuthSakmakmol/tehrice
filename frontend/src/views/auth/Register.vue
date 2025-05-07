<template>
    <v-container class="d-flex align-center justify-center" style="min-height: 100vh;">
      <v-card class="pa-6" width="450" elevation="10" rounded="lg">
        <v-card-title class="text-h6 font-weight-bold mb-4 text-center">
          📝 Create New Account
        </v-card-title>
  
        <v-form @submit.prevent="handleRegister" ref="registerForm" v-model="valid">
          <v-text-field
            v-model="form.name"
            label="Full Name"
            prepend-inner-icon="mdi-account"
            required
            :rules="[v => !!v || 'Name is required']"
            dense
          />
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
          <!-- Optional Approval Code -->
          <!-- <v-text-field
            v-model="form.approvalCode"
            label="Approval Code (optional)"
            prepend-inner-icon="mdi-key"
            dense
          /> -->
  
          <v-btn
            color="success"
            type="submit"
            class="mt-4"
            :loading="loading"
            block
          >
            Register
          </v-btn>
        </v-form>
  
        <v-card-actions class="justify-center mt-3">
          <small class="text-muted">Already have an account?</small>
          <v-btn text class="ms-1" @click="router.push('/login')">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import api from '@/plugins/axios'
  import Swal from 'sweetalert2'
  
  const router = useRouter()
  const registerForm = ref(null)
  const valid = ref(true)
  
  const form = ref({
    name: '',
    phone: '',
    password: '',
    // approvalCode: '' // if needed
  })
  
  const loading = ref(false)
  
  const handleRegister = async () => {
    if (!valid.value) return
    loading.value = true
  
    try {
      await api.post('/auth/register', form.value)
  
      await Swal.fire({
        icon: 'success',
        title: 'Account Created',
        text: 'You can now log in!',
        allowEnterKey: true,
        confirmButtonText: 'Go to Login'
      })
  
      router.push('/login')
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: err.response?.data?.message || 'Something went wrong',
      })
    } finally {
      loading.value = false
    }
  }
  </script>
  