<template>
  <v-container class="mt-8">
    <h2 class="text-h5 font-weight-bold mb-4">Manage Admin Accounts</h2>

    <v-btn color="primary" class="mb-4" @click="toggleForm">
      {{ formVisible ? 'Close Form' : (selectedAdmin ? 'Edit Admin' : 'Create Admin') }}
    </v-btn>

    <!-- Inline Admin Form -->
    <v-expand-transition>
      <div v-show="formVisible" class="mb-6">
        <v-card class="pa-4" elevation="2">
          <h3 class="text-h6 font-weight-medium mb-3">
            {{ selectedAdmin ? 'Edit Admin' : 'Add New Admin' }}
          </h3>
          <v-text-field v-model="form.name" label="Name" />
          <v-text-field v-model="form.phone" label="Phone Number" />
          <v-text-field v-model="form.password" label="Password" type="password" />
          <v-btn color="success" class="mt-2" @click="submitForm">
            {{ selectedAdmin ? 'Update Admin' : 'Create Admin' }}
          </v-btn>
        </v-card>
      </div>
    </v-expand-transition>

    <!-- Admin Table -->
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
            <v-btn size="small" color="blue" @click="editAdmin(admin)">Edit</v-btn>
            <v-btn size="small" color="error" @click="deleteAdmin(admin._id)">Delete</v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const admins = ref([]);
const formVisible = ref(false);
const selectedAdmin = ref(null);
const token = localStorage.getItem('token');

const form = ref({
  name: '',
  phone: '',
  password: ''
});

const fetchAdmins = async () => {
  const res = await axios.get('http://localhost:4789/api/users/admins', {
    headers: { Authorization: `Bearer ${token}` }
  });
  admins.value = res.data;
};

const toggleForm = () => {
  if (!formVisible.value) {
    resetForm();
  }
  formVisible.value = !formVisible.value;
};

const resetForm = () => {
  selectedAdmin.value = null;
  form.value = { name: '', phone: '', password: '' };
};

const editAdmin = (admin) => {
  selectedAdmin.value = admin;
  form.value = {
    name: admin.name,
    phone: admin.phone,
    password: ''
  };
  formVisible.value = true;
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
    fetchAdmins();
    toggleForm();
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
