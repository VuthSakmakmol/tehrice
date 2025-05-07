<template>
    <v-container class="py-6">
      <h2 class="text-h5 font-weight-bold mb-4">👤 Your Profile</h2>
  
      <v-card class="pa-6" elevation="3" rounded="lg">
        <v-form @submit.prevent="submitProfile" v-model="valid">
          <v-text-field
            v-model="form.name"
            label="Full Name"
            prepend-inner-icon="mdi-account"
            :rules="[v => !!v || 'Name is required']"
            dense
          />
          <v-text-field
            v-model="form.phone"
            label="Phone Number"
            prepend-inner-icon="mdi-phone"
            :rules="[v => !!v || 'Phone is required']"
            dense
          />
          <v-text-field
            v-model="form.password"
            label="New Password"
            type="password"
            prepend-inner-icon="mdi-lock"
            :rules="[v => v.length >= 6 || 'Min 6 characters']"
            dense
          />
  
          <div class="d-flex justify-end mt-4">
            <v-btn color="primary" type="submit">Update Profile</v-btn>
          </div>
        </v-form>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useUserStore } from '@/stores/userStore'
  import Swal from 'sweetalert2'
  
  const valid = ref(true)
  const userStore = useUserStore()
  
  const form = ref({
    name: userStore.user?.name || '',
    phone: userStore.user?.phone || '',
    password: ''
  })
  
  const submitProfile = () => {
    if (!valid.value) return
  
    // Simulate update
    Swal.fire({
      icon: 'success',
      title: 'Profile Updated',
      text: 'Changes have been saved.',
      timer: 1500,
      showConfirmButton: false
    })
  
    // Future: send form.value to backend
  }
  </script>
  