<template>
    <v-container class="mt-8">
      <h2 class="text-h5 font-weight-bold mb-4">Manage Delivery Accounts</h2>
  
      <v-btn color="primary" class="mb-4" @click="toggleForm">
        {{ formVisible ? 'Close Form' : (selectedDelivery ? 'Edit Delivery' : 'Create Delivery') }}
      </v-btn>
  
      <v-expand-transition>
        <div v-show="formVisible" class="mb-6">
          <v-card class="pa-4" elevation="2">
            <h3 class="text-h6 font-weight-medium mb-3">
              {{ selectedDelivery ? 'Edit Delivery' : 'Add New Delivery' }}
            </h3>
            <v-text-field v-model="form.name" label="Name" />
            <v-text-field v-model="form.phone" label="Phone Number" />
            <v-text-field v-model="form.password" label="Password" type="password" />
            <v-btn color="success" class="mt-2" @click="submitForm">
              {{ selectedDelivery ? 'Update Delivery' : 'Create Delivery' }}
            </v-btn>
          </v-card>
        </div>
      </v-expand-transition>
  
      <v-table density="compact" class="elevation-1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="delivery in deliveries" :key="delivery._id">
            <td>{{ delivery.name }}</td>
            <td>{{ delivery.phone }}</td>
            <td>
              <v-btn size="small" color="blue" @click="editDelivery(delivery)">Edit</v-btn>
              <v-btn size="small" color="error" @click="deleteDelivery(delivery._id)">Delete</v-btn>
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
  
  const deliveries = ref([]);
  const formVisible = ref(false);
  const selectedDelivery = ref(null);
  const token = localStorage.getItem('token');
  
  const form = ref({
    name: '',
    phone: '',
    password: ''
  });
  
  const fetchDeliveries = async () => {
    const res = await axios.get('http://localhost:4789/api/users/deliveries', {
      headers: { Authorization: `Bearer ${token}` }
    });
    deliveries.value = res.data;
  };
  
  const toggleForm = () => {
    if (!formVisible.value) resetForm();
    formVisible.value = !formVisible.value;
  };
  
  const resetForm = () => {
    selectedDelivery.value = null;
    form.value = { name: '', phone: '', password: '' };
  };
  
  const editDelivery = (delivery) => {
    selectedDelivery.value = delivery;
    form.value = {
      name: delivery.name,
      phone: delivery.phone,
      password: ''
    };
    formVisible.value = true;
  };
  
  const submitForm = async () => {
    try {
      if (selectedDelivery.value) {
        await axios.put(
          `http://localhost:4789/api/users/deliveries/${selectedDelivery.value._id}`,
          form.value,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        Swal.fire('Updated', 'Delivery user updated successfully', 'success');
      } else {
        await axios.post(
          'http://localhost:4789/api/users/deliveries',
          form.value,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        Swal.fire('Created', 'New delivery user added', 'success');
      }
      fetchDeliveries();
      toggleForm();
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'Operation failed', 'error');
    }
  };
  
  const deleteDelivery = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    });
    if (confirm.isConfirmed) {
      await axios.delete(`http://localhost:4789/api/users/deliveries/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      Swal.fire('Deleted', 'Delivery user removed', 'success');
      fetchDeliveries();
    }
  };
  
  onMounted(() => {
    fetchDeliveries();
  });
  </script>
  