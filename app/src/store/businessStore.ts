import { ref } from "vue";
import type { Business } from "../models/Business";

export const businesses = ref<Business[]>([]);

export const addBusiness = (business: Business) => {
  businesses.value.push(business);
};
