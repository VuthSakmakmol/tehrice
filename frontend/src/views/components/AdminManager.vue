<template>
    <v-container class="mt-8">
      <h2 class="text-h5 font-weight-bold mb-4">Manage Admin Accounts</h2>
  
      <v-btn color="primary" class="mb-4" @click="openDialog()">Add New Admin</v-btn>
  
      <v-table density="compact" class="elevation-1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="admin in admins" :key="admin._id">
            <td>{{ admin.name }}</td>
            <td>{{ admin.phone }}</td>
            <td>
              <v-btn size="small" color="blue" @click="openDialog(admin)">Edit</v-btn>
              <v-btn size="small" color="error" @click="deleteAdmin(admin._id)">Delete</v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
  
      <!-- Admin Dialog -->
      <v-dialog v-model="dialog" width="400">
        <v-card>
          <v-card-title>{{ selectedAdmin ? 'Edit Admin' : 'Add Admin' }}</v-card-title>
          <v-card-text>
            <v-text-field v-model="form.name" label="Name" />
            <v-text-field v-model="form.phone" label="Phone Number" />
            <v-text-field v-model="form.password" label="Password" type="password" />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn text @click="dialog = false">Cancel</v-btn>
            <v-btn color="primary" @click="submitForm">{{ selectedAdmin ? 'Update' : 'Create' }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import Swal from 'sweetalert2';
  
  const admins = ref([]);
  const dialog = ref(false);
  const selectedAdmin = ref(null);
  
  const form = ref({
    name: '',
    phone: '',
    password: ''
  });
  
  const token = localStorage.getItem('token');
  
  const fetchAdmins = async () => {
    const res = await axios.get('http://localhost:4789/api/users/admins', {
      headers: { Authorization: `Bearer ${token}` }
    });
    admins.value = res.data;
  };
  
  const openDialog = (admin = null) => {
    selectedAdmin.value = admin;
    if (admin) {
      form.value = {
        name: admin.name,
        phone: admin.phone,
        password: ''
      };
    } else {
      form.value = {
        name: '',
        phone: '',
        password: ''
      };
    }
    dialog.value = true;
  };
  
  const submitForm = async () => {
    try {
      if (selectedAdmin.value) {
        // Update
        await axios.put(
          `http://localhost:4789/api/users/admins/${selectedAdmin.value._id}`,
          form.value,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        Swal.fire('Updated', 'Admin updated successfully', 'success');
      } else {
        // Create
        await axios.post(
          'http://localhost:4789/api/users/admins',
          form.value,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        Swal.fire('Created', 'New admin added', 'success');
      }
      dialog.value = false;
      fetchAdmins();
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'Operation failed', 'error');
    }
  };
  
  const deleteAdmin = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    });
    if (confirm.isConfirmed) {
      await axios.delete(`http://localhost:4789/api/users/admins/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      Swal.fire('Deleted', 'Admin account removed', 'success');
      fetchAdmins();
    }
  };
  
  onMounted(() => {
    fetchAdmins();
  });
  </script>
  