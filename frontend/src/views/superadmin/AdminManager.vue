<template>
    <v-container class="py-6">
      <h2 class="text-h5 font-weight-bold mb-4">👑 Manage Admin Users</h2>
  
      <v-btn color="primary" class="mb-4" @click="toggleForm">
        {{ showForm ? 'Cancel' : 'Add Admin User' }}
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
          <tr v-for="(admin, index) in adminUsers" :key="index">
            <td>{{ admin.name }}</td>
            <td>{{ admin.phone }}</td>
            <td>
              <v-btn icon color="blue" @click="editAdmin(index)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon color="red" @click="deleteAdmin(index)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-container>
  </template>
  
  
  <script setup>
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'
import api from '@/plugins/axios'

const admins = ref([])
const form = ref({ name: '', phone: '', password: '' })
const selectedId = ref(null)
const showForm = ref(false)

const fetchAdmins = async () => {
  try {
    const { data } = await api.get('/admins')
    admins.value = data
  } catch (err) {
    console.error('Failed to fetch admins:', err)
    Swal.fire('Error', 'Failed to fetch admins', 'error')
  }
}

const submitForm = async () => {
  try {
    if (selectedId.value) {
      await api.put(`/admins/${selectedId.value}`, form.value)
      Swal.fire('Updated!', 'Admin updated successfully', 'success')
    } else {
      await api.post('/admins', form.value)
      Swal.fire('Created!', 'Admin created successfully', 'success')
    }
    resetForm()
    fetchAdmins()
  } catch (err) {
    console.error('Failed to save admin:', err)
    Swal.fire('Error', err?.response?.data?.message || 'Failed to save admin', 'error')
  }
}

const deleteAdmin = async (id) => {
  const confirm = await Swal.fire({
    title: 'Delete this admin?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it'
  })

  if (confirm.isConfirmed) {
    try {
      await api.delete(`/admins/${id}`)
      Swal.fire('Deleted', 'Admin deleted', 'success')
      fetchAdmins()
    } catch (err) {
      console.error('Failed to delete admin:', err)
      Swal.fire('Error', 'Failed to delete admin', 'error')
    }
  }
}

const editAdmin = (admin) => {
  form.value = { name: admin.name, phone: admin.phone, password: '' }
  selectedId.value = admin._id
  showForm.value = true
}

const resetForm = () => {
  form.value = { name: '', phone: '', password: '' }
  selectedId.value = null
  showForm.value = false
}

onMounted(fetchAdmins)
</script>


  