import { ref } from 'vue'

export const businesses = ref<Array<{ id: string; name: string; email: string; googleProfileUrl: string }>>([])

export const addBusiness = (business: { id: string; name: string; email: string; googleProfileUrl: string }) => {
  businesses.value.push(business)
}
