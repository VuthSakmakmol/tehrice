<template>
    <v-container class="py-6">
      <h2 class="text-h5 font-weight-bold mb-4">👥 Manage Customers</h2>
  
      <!-- Search -->
      <v-text-field
        v-model="search"
        label="Search by name or phone"
        prepend-inner-icon="mdi-magnify"
        clearable
        class="mb-4"
      />
  
      <!-- Add Customer -->
      <v-btn color="primary" class="mb-4" @click="toggleForm">
        {{ showForm ? 'Cancel' : 'Add Customer' }}
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
            <th>Name</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredCustomers" :key="user._id">
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
  
  const customers = ref([])
  const form = ref({ name: '', phone: '', password: '', status: 'Active' })
  const selectedId = ref(null)
  const showForm = ref(false)
  const valid = ref(true)
  const search = ref('')
  
  const fetchCustomers = async () => {
    try {
      const { data } = await api.get('/customers') // backend should return role: 'customer'
      customers.value = data
    } catch (err) {
      Swal.fire('Error', 'Failed to fetch customers', 'error')
      console.error(err)
    }
  }
  
  const filteredCustomers = computed(() => {
    return customers.value.filter(user => {
      const text = `${user.name} ${user.phone}`.toLowerCase()
      return text.includes(search.value.toLowerCase())
    })
  })
  
  const submitForm = async () => {
    try {
      if (selectedId.value) {
        await api.put(`/customers/${selectedId.value}`, form.value)
        Swal.fire('Updated!', 'Customer updated successfully', 'success')
      } else {
        await api.post('/customers', form.value)
        Swal.fire('Created!', 'Customer created successfully', 'success')
      }
      resetForm()
      fetchCustomers()
    } catch (err) {
      Swal.fire('Error', err?.response?.data?.message || 'Failed to save customer', 'error')
      console.error(err)
    }
  }
  
  const updateStatus = async (user) => {
    try {
      await api.put(`/customers/${user._id}`, { status: user.status })
      Swal.fire('Success', `Status updated to ${user.status}`, 'success')
    } catch (err) {
      Swal.fire('Error', 'Failed to update status', 'error')
      console.error(err)
    }
  }
  
  const deleteUser = async (id) => {
    const confirm = await Swal.fire({
      title: 'Delete this customer?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it'
    })
  
    if (confirm.isConfirmed) {
      try {
        await api.delete(`/customers/${id}`)
        Swal.fire('Deleted', 'Customer deleted', 'success')
        fetchCustomers()
      } catch (err) {
        Swal.fire('Error', 'Failed to delete customer', 'error')
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
  
  onMounted(fetchCustomers)
  </script>
  