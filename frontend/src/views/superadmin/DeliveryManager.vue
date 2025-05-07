<template>
    <v-container class="py-6">
      <h2 class="text-h5 font-weight-bold mb-4">📦 Manage Delivery Users</h2>
  
      <!-- Search -->
      <v-text-field
        v-model="search"
        label="Search by name or phone"
        prepend-inner-icon="mdi-magnify"
        class="mb-4"
        clearable
      />
  
      <!-- Add Button -->
      <v-btn color="primary" class="mb-4" @click="toggleForm">
        {{ showForm ? 'Cancel' : 'Add Delivery User' }}
      </v-btn>
  
      <!-- Form -->
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
                  {{ selectedId ? 'Update' : 'Create' }}
                </v-btn>
                <v-btn variant="text" @click="resetForm">Cancel</v-btn>
              </div>
            </v-form>
          </v-card>
        </div>
      </v-expand-transition>
  
      <!-- Table -->
      <v-table density="compact">
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Phone</th>
            <th class="text-left">Status</th>
            <th class="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredDeliveries" :key="user._id">
            <td>{{ user.name }}</td>
            <td>{{ user.phone }}</td>
            <td>
              <v-switch
                v-model="user.status"
                :true-value="'Active'"
                :false-value="'Inactive'"
                inset
                @change="updateStatus(user)"
                color="green"
              />
            </td>
            <td>
              <v-btn icon color="blue" @click="editUser(user)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon color="red" @click="deleteUser(user._id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-container>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import Swal from 'sweetalert2'
  import api from '@/plugins/axios'
  
  const deliveries = ref([])
  const form = ref({ name: '', phone: '', password: '', status: 'Active' })
  const selectedId = ref(null)
  const showForm = ref(false)
  const valid = ref(true)
  const search = ref('')
  
  const fetchDeliveries = async () => {
    try {
      const { data } = await api.get('/deliveries')
      deliveries.value = data
    } catch (err) {
      Swal.fire('Error', 'Failed to fetch delivery users', 'error')
      console.error(err)
    }
  }
  
  const filteredDeliveries = computed(() => {
    return deliveries.value.filter(user => {
      const text = `${user.name} ${user.phone}`.toLowerCase()
      return text.includes(search.value.toLowerCase())
    })
  })
  
  const submitForm = async () => {
    try {
      if (selectedId.value) {
        await api.put(`/deliveries/${selectedId.value}`, form.value)
        Swal.fire('Updated!', 'Delivery user updated successfully', 'success')
      } else {
        await api.post('/deliveries', form.value)
        Swal.fire('Created!', 'Delivery user created successfully', 'success')
      }
      resetForm()
      fetchDeliveries()
    } catch (err) {
      Swal.fire('Error', err?.response?.data?.message || 'Failed to save delivery', 'error')
      console.error(err)
    }
  }
  
  const updateStatus = async (user) => {
    try {
      await api.put(`/deliveries/${user._id}`, { status: user.status })
      Swal.fire('Success', `Status updated to ${user.status}`, 'success')
    } catch (err) {
      Swal.fire('Error', 'Failed to update status', 'error')
      console.error(err)
    }
  }
  
  const deleteUser = async (id) => {
    const confirm = await Swal.fire({
      title: 'Delete this delivery user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it'
    })
  
    if (confirm.isConfirmed) {
      try {
        await api.delete(`/deliveries/${id}`)
        Swal.fire('Deleted', 'Delivery user deleted', 'success')
        fetchDeliveries()
      } catch (err) {
        Swal.fire('Error', 'Failed to delete delivery user', 'error')
        console.error(err)
      }
    }
  }
  
  const editUser = (user) => {
    form.value = { name: user.name, phone: user.phone, password: '', status: user.status || 'Active' }
    selectedId.value = user._id
    showForm.value = true
  }
  
  const resetForm = () => {
    form.value = { name: '', phone: '', password: '', status: 'Active' }
    selectedId.value = null
    showForm.value = false
  }
  
  const toggleForm = () => {
    showForm.value = !showForm.value
    if (!showForm.value) resetForm()
  }
  
  onMounted(fetchDeliveries)
  </script>
  