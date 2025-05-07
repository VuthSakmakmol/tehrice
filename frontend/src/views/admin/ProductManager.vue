<template>
    <v-container class="py-6">
      <h2 class="text-h5 font-weight-bold mb-4">📦 Product Manager</h2>
  
      <!-- Toggle Add/Edit Form -->
      <v-btn color="primary" class="mb-4" @click="toggleForm">
        {{ showForm ? 'Cancel' : 'Add New Product' }}
      </v-btn>
  
      <v-expand-transition>
        <div v-show="showForm">
          <ProductForm
            :product="selectedProduct"
            @submit="handleSave"
            @cancel="resetForm"
          />
        </div>
      </v-expand-transition>
  
      <!-- Product Table -->
      <v-table density="compact" class="mt-4">
        <thead>
          <tr>
            <th class="text-left">Product</th>
            <th class="text-left">Price</th>
            <th class="text-left">Category</th>
            <th class="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in products" :key="index">
            <td>{{ product.name }}</td>
            <td>${{ product.price.toFixed(2) }}</td>
            <td>{{ product.category }}</td>
            <td>
              <v-btn icon color="blue" @click="editProduct(product)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon color="red" @click="deleteProduct(index)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import Swal from 'sweetalert2'
  import ProductForm from '@/components/admin/ProductForm.vue'
  
  const showForm = ref(false)
  const selectedProduct = ref(null)
  
  const products = ref([
    { name: 'Smart Watch', price: 89.99, category: 'Electronics' },
    { name: 'Sneakers', price: 59.99, category: 'Shoes' },
  ])
  
  const toggleForm = () => {
    showForm.value = !showForm.value
    if (!showForm.value) resetForm()
  }
  
  const editProduct = (product) => {
    selectedProduct.value = { ...product }
    showForm.value = true
  }
  
  const handleSave = (newProduct) => {
    const i = products.value.findIndex(p => p.name === newProduct.name)
    if (i !== -1 && selectedProduct.value) {
      products.value[i] = { ...newProduct }
    } else {
      products.value.push({ ...newProduct })
    }
  
    Swal.fire({
      icon: 'success',
      title: 'Product Saved',
      timer: 1500,
      showConfirmButton: false
    })
  
    resetForm()
  }
  
  const deleteProduct = (index) => {
    Swal.fire({
      title: 'Delete this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it'
    }).then(res => {
      if (res.isConfirmed) {
        products.value.splice(index, 1)
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          timer: 1000,
          showConfirmButton: false
        })
      }
    })
  }
  
  const resetForm = () => {
    selectedProduct.value = null
    showForm.value = false
  }
  </script>
  