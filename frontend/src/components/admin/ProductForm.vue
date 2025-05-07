<template>
    <v-card class="pa-6 mb-6" elevation="3" rounded="lg">
      <v-card-title class="text-h6 font-weight-bold mb-4">
        {{ product ? '✏️ Edit Product' : '➕ Add New Product' }}
      </v-card-title>
  
      <v-form @submit.prevent="submitForm" v-model="valid">
        <v-text-field
          v-model="form.name"
          label="Product Name"
          prepend-inner-icon="mdi-cube"
          :rules="[v => !!v || 'Name is required']"
          dense
        />
        <v-text-field
          v-model="form.price"
          label="Price"
          type="number"
          prepend-inner-icon="mdi-currency-usd"
          :rules="[v => v >= 0 || 'Must be positive']"
          dense
        />
        <v-text-field
          v-model="form.category"
          label="Category"
          prepend-inner-icon="mdi-shape"
          :rules="[v => !!v || 'Category is required']"
          dense
        />
  
        <div class="d-flex justify-end gap-2 mt-4">
          <v-btn color="success" type="submit">
            {{ product ? 'Update' : 'Save' }}
          </v-btn>
          <v-btn variant="text" @click="$emit('cancel')">Cancel</v-btn>
        </div>
      </v-form>
    </v-card>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue'
  
  const props = defineProps({
    product: Object
  })
  
  const emit = defineEmits(['submit', 'cancel'])
  
  const valid = ref(true)
  const form = ref({
    name: '',
    price: 0,
    category: ''
  })
  
  onMounted(() => {
    if (props.product) {
      form.value = { ...props.product }
    }
  })
  
  const submitForm = () => {
    if (!valid.value) return
    emit('submit', { ...form.value })
  }
  </script>
  