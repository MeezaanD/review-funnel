<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 gap-6">
    <UCard class="max-w-lg w-full p-6">
      <h1 class="text-3xl font-bold mb-4 text-center">Review Funnel Generator</h1>
      <p class="text-center mb-6">
        Generate shareable review links for your business and collect customer feedback instantly.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <RouterLink to="/create">
          <UButton class="w-full sm:w-auto">Create Business</UButton>
        </RouterLink>

        <RouterLink to="/admin">
          <UButton variant="secondary" class="w-full sm:w-auto">View Businesses</UButton>
        </RouterLink>
      </div>
    </UCard>
  </div>
</template>
