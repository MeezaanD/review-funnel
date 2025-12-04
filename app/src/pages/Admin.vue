<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore'
import { db } from '../services/firebase'
import { RouterLink } from 'vue-router'

interface Business {
  id: string
  name: string
  email: string
  googleProfileUrl: string
  createdAt: number
}

const businesses = ref<Business[]>([])
const loading = ref(false)
const editingId = ref<string | null>(null)
const editName = ref('')
const editEmail = ref('')
const editGoogle = ref('')

const loadBusinesses = async () => {
  loading.value = true
  const querySnapshot = await getDocs(collection(db, 'businesses'))
  businesses.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Business))
  loading.value = false
}

onMounted(loadBusinesses)

const startEdit = (b: Business) => {
  editingId.value = b.id
  editName.value = b.name
  editEmail.value = b.email
  editGoogle.value = b.googleProfileUrl
}

const saveEdit = async () => {
  if (!editingId.value) return
  const docRef = doc(db, 'businesses', editingId.value)
  await updateDoc(docRef, {
    name: editName.value,
    email: editEmail.value,
    googleProfileUrl: editGoogle.value
  })
  editingId.value = null
  await loadBusinesses()
}

const cancelEdit = () => {
  editingId.value = null
}

const copyLink = (id: string) => {
  navigator.clipboard.writeText(`${window.location.origin}/${id}`)
  alert('Link copied to clipboard!')
}
</script>

<template>
  <div class="min-h-screen p-6 bg-gray-50 flex flex-col items-center gap-6">
    <UCard class="max-w-4xl w-full p-6 shadow-lg">
      <h1 class="text-2xl font-bold mb-4 text-center">All Businesses</h1>

      <table class="min-w-full border">
        <thead>
          <tr class="border-b bg-gray-100">
            <th class="p-2 text-left">Name</th>
            <th class="p-2 text-left">Email</th>
            <th class="p-2 text-left">Google Profile</th>
            <th class="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="b in businesses" :key="b.id" class="border-b">
            <td class="p-2">
              <div v-if="editingId === b.id">
                <UInput v-model="editName" />
              </div>
              <div v-else>{{ b.name }}</div>
            </td>

            <td class="p-2">
              <div v-if="editingId === b.id">
                <UInput v-model="editEmail" />
              </div>
              <div v-else>{{ b.email }}</div>
            </td>

            <td class="p-2">
              <div v-if="editingId === b.id">
                <UInput v-model="editGoogle" />
              </div>
              <div v-else>{{ b.googleProfileUrl }}</div>
            </td>

            <td class="p-2 flex gap-2 flex-wrap">
              <div v-if="editingId === b.id">
                <UButton size="sm" @click="saveEdit">Save</UButton>
                <UButton size="sm" variant="secondary" @click="cancelEdit">Cancel</UButton>
              </div>
              <div v-else class="flex gap-2 flex-wrap">
                <UButton size="sm" @click="startEdit(b)">Edit</UButton>
                <UButton size="sm" variant="secondary" @click="() => copyLink(b.id)">Copy Link</UButton>
                <RouterLink :to="`/${b.id}`">
                  <UButton size="sm" variant="secondary">View Funnel</UButton>
                </RouterLink>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </UCard>
  </div>
</template>
