<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { submitFeedback } from '../controllers/feedbackController'

const route = useRoute()
const router = useRouter()

const message = ref('')
const email = ref('')

const loading = ref(false)
const error = ref('')

const onSubmit = async () => {
  if (!message.value) {
    error.value = 'Please provide feedback'
    return
  }

  loading.value = true
  error.value = ''

  try {
    await submitFeedback(route.params.businessId as string, message.value, email.value)
    router.push('/thank-you')
  } catch (err) {
    console.error(err)
    error.value = 'Failed to submit feedback.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <UCard class="max-w-md w-full p-8 shadow-lg">
      <h1 class="text-2xl font-bold mb-4 text-center">We value your feedback!</h1>
      <p class="text-gray-600 mb-6 text-center">Let us know how we can improve.</p>

      <div class="flex flex-col gap-4">
        <UTextarea v-model="message" placeholder="Your feedback..." :rows="5" />
        <UInput v-model="email" placeholder="Your email (optional)" type="email" />

        <UButton type="button" :disabled="loading" @click="onSubmit">
          {{ loading ? 'Submitting...' : 'Submit Feedback' }}
        </UButton>

        <p v-if="error" class="text-red-500 text-center">{{ error }}</p>
      </div>
    </UCard>
  </div>
</template>
