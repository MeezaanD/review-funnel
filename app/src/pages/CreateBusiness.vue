<script setup lang="ts">
import { ref } from 'vue'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../services/firebase'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref('')
const email = ref('')
const googleProfileUrl = ref('')
const loading = ref(false)
const error = ref('')

const onSubmit = async () => {
  if (!name.value || !email.value || !googleProfileUrl.value) {
    error.value = 'All fields are required.'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const docRef = await addDoc(collection(db, 'businesses'), {
      name: name.value,
      email: email.value,
      googleProfileUrl: googleProfileUrl.value,
      createdAt: Date.now()
    })
    alert(`Business created! Shareable link: ${window.location.origin}/${docRef.id}`)
    router.push(`/admin`)
  } catch (err) {
    console.error(err)
    error.value = 'Failed to create business.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <UCard class="max-w-md w-full p-8 shadow-lg">
      <h1 class="text-2xl font-bold mb-4 text-center">Create a Business</h1>

      <div class="flex flex-col gap-4">
        <UInput v-model="name" placeholder="Business Name" />
        <UInput v-model="email" type="email" placeholder="Business Email" />
        <UInput v-model="googleProfileUrl" placeholder="Google Profile URL" />

        <UButton type="button" :disabled="loading" @click="onSubmit">
          {{ loading ? 'Creating...' : 'Create & Generate Link' }}
        </UButton>

        <p v-if="error" class="text-red-500 text-center">{{ error }}</p>
      </div>
    </UCard>
  </div>
</template>
