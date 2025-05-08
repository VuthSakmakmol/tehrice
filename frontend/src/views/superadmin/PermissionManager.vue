<template>
    <v-container>
      <h2 class="text-h5 font-weight-bold mb-4">🛡 Admin Permission Manager</h2>
  
      <!-- Select Admin -->
      <v-select
        v-model="selectedAdminId"
        :items="admins"
        item-title="name"
        item-value="_id"
        label="Select Admin"
        outlined
      />
  
      <!-- Permissions Form -->
      <v-expansion-panels v-if="selectedAdminId" class="mt-4" multiple>
        <!-- Delivery Section -->
        <v-expansion-panel>
          <v-expansion-panel-title>
            🚚 Delivery Permissions
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-switch v-for="(val, key) in permissions.delivery" :key="key"
              v-model="permissions.delivery[key]"
              :label="formatLabel(key)" inset class="mb-2"
            />
          </v-expansion-panel-text>
        </v-expansion-panel>
  
        <!-- Product Section -->
        <v-expansion-panel>
          <v-expansion-panel-title>
            🛒 Product Permissions
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-switch v-for="(val, key) in permissions.product" :key="key"
              v-model="permissions.product[key]"
              :label="formatLabel(key)" inset class="mb-2"
            />
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
  
      <v-btn
        v-if="selectedAdminId"
        class="mt-4"
        color="primary"
        @click="savePermissions"
      >
        💾 Save Permissions
      </v-btn>
    </v-container>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue'
  import api from '@/plugins/axios'
  
  const admins = ref([])
  const selectedAdminId = ref(null)
  const permissions = ref({
    delivery: {},
    product: {}
  })
  
  const fetchAdmins = async () => {
    const res = await api.get('/admins')
    admins.value = res.data
  }
  
  const fetchPermissions = () => {
    const selected = admins.value.find(a => a._id === selectedAdminId.value)
    const p = selected?.permissions || {}
  
    permissions.value = {
      delivery: {
        canAccess: p?.delivery?.canAccess ?? false,
        canView: p?.delivery?.canView ?? false,
        canCreate: p?.delivery?.canCreate ?? false,
        canUpdate: p?.delivery?.canUpdate ?? false,
        canDelete: p?.delivery?.canDelete ?? false,
        canExport: p?.delivery?.canExport ?? false,
        canAssignDriver: p?.delivery?.canAssignDriver ?? false,
        canApprove: p?.delivery?.canApprove ?? false,
        canTransferSalary: p?.delivery?.canTransferSalary ?? false,
        canSeeDetail: p?.delivery?.canSeeDetail ?? false
      },
      product: {
        canAccess: p?.product?.canAccess ?? false,
        canView: p?.product?.canView ?? false,
        canCreate: p?.product?.canCreate ?? false,
        canUpdate: p?.product?.canUpdate ?? false,
        canDelete: p?.product?.canDelete ?? false
      }
    }
  }
  
  const savePermissions = async () => {
    await api.put(`/admins/${selectedAdminId.value}/permissions`, {
      permissions: permissions.value
    })
    alert('✅ Permissions updated')
  }
  
  const formatLabel = (key) =>
    key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^can/, '')
      .trim()
      .replace(/\b\w/g, (c) => c.toUpperCase())
  
  watch(selectedAdminId, fetchPermissions)
  onMounted(fetchAdmins)
  </script>
  