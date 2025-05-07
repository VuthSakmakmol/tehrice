<template>
    <v-container class="py-6">
      <h2 class="text-h5 font-weight-bold mb-4">🚚 Manage Delivery Users</h2>
  
      <v-btn color="primary" class="mb-4" @click="toggleForm">
        {{ showForm ? 'Cancel' : 'Add Delivery User' }}
      </v-btn>
  
      <v-expand-transition>
        <div v-show="showForm">
          <v-card class="pa-4 mb-4" elevation="2" rounded="lg">
            <v-form @submit.prevent="submitForm" v-model="valid">
              <v-text-field
                v-model="form.name"
                label="Name"
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
                label="Password"
                type="password"
                prepend-inner-icon="mdi-lock"
                :rules="[v => !!v || 'Password is required']"
                dense
              />
  
              <div class="d-flex justify-end gap-2 mt-4">
                <v-btn color="success" type="submit">
                  {{ selectedIndex !== null ? 'Update' : 'Create' }}
                </v-btn>
                <v-btn variant="text" @click="resetForm">Cancel</v-btn>
              </div>
            </v-form>
          </v-card>
        </div>
      </v-expand-transition>
  
      <v-table density="compact">
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Phone</th>
            <th class="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in deliveryUsers" :key="index">
            <td>{{ user.name }}</td>
            <td>{{ user.phone }}</td>
            <td>
              <v-btn icon color="blue" @click="editUser(index)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon color="red" @click="deleteUser(index)">
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
  
  const showForm = ref(false)
  const valid = ref(true)
  const selectedIndex = ref(null)
  
  const form = ref({
    name: '',
    phone: '',
    password: ''
  })
  
  const deliveryUsers = ref([
    { name: 'Dara', phone: '012345678' },
    { name: 'Pich', phone: '098765432' }
  ])
  
  const toggleForm = () => {
    showForm.value = !showForm.value
    if (!showForm.value) resetForm()
  }
  
  const submitForm = () => {
    if (!valid.value) return
  
    if (selectedIndex.value !== null) {
      deliveryUsers.value[selectedIndex.value] = { ...form.value }
    } else {
      deliveryUsers.value.push({ ...form.value })
    }
  
    Swal.fire({
      icon: 'success',
      title: selectedIndex.value !== null ? 'User Updated' : 'User Created',
      timer: 1500,
      showConfirmButton: false
    })
  
    resetForm()
  }
  
  const editUser = (index) => {
    selectedIndex.value = index
    form.value = { ...deliveryUsers.value[index] }
    showForm.value = true
  }
  
  const deleteUser = (index) => {
    Swal.fire({
      title: 'Delete this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((res) => {
      if (res.isConfirmed) {
        deliveryUsers.value.splice(index, 1)
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
    form.value = { name: '', phone: '', password: '' }
    selectedIndex.value = null
    showForm.value = false
  }
  </script>
  