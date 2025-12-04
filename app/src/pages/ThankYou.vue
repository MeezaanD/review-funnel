<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 gap-6">
    <UCard class="max-w-md w-full p-8 shadow-lg text-center">
      <h1 class="text-3xl font-bold mb-2">Thank You!</h1>
      <p class="text-gray-600 mb-4">Your feedback has been submitted successfully.</p>
      <RouterLink to="/">
        <UButton>Go Home</UButton>
      </RouterLink>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
