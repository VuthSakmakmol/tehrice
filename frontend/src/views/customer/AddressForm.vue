<template>
    <v-card class="pa-6" elevation="3" rounded="lg">
      <v-card-title class="text-h6 font-weight-bold mb-4">
        🏠 Address Information
      </v-card-title>
  
      <v-form v-model="valid" @submit.prevent="submitForm">
        <v-text-field
          v-model="form.fullName"
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
          v-model="form.address"
          label="Street Address"
          prepend-inner-icon="mdi-map-marker"
          :rules="[v => !!v || 'Address is required']"
          dense
        />
        <v-text-field
          v-model="form.city"
          label="City"
          prepend-inner-icon="mdi-city"
          :rules="[v => !!v || 'City is required']"
          dense
        />
        <v-text-field
          v-model="form.zip"
          label="ZIP Code"
          prepend-inner-icon="mdi-mailbox"
          :rules="[v => !!v || 'ZIP is required']"
          dense
        />
  
        <div class="d-flex justify-end mt-4">
          <v-btn color="primary" type="submit">Save Address</v-btn>
        </div>
      </v-form>
    </v-card>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  
  const emit = defineEmits(['submit'])
  
  const valid = ref(true)
  const form = ref({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    zip: ''
  })
  
  const submitForm = () => {
    if (!valid.value) return
    emit('submit', form.value)
  }
  </script>
  