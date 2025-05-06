<template>
    <v-app>
      <v-app-bar app color="primary" dark>
        <v-toolbar-title>eCommerce</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text to="/">Home</v-btn>
        <v-btn v-if="!isLoggedIn" text to="/login">Login</v-btn>
        <v-btn v-else text to="/dashboard">Dashboard</v-btn>
      </v-app-bar>
  
      <v-main>
        <router-view />
      </v-main>
    </v-app>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const isLoggedIn = computed(() => {
    return !!localStorage.getItem('token'); // basic check
  });
  </script>
  