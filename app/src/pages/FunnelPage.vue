<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { handleRating } from "../controllers/ratingController";
import { getBusiness } from "../controllers/businessController";

const route = useRoute();
const router = useRouter();

const business = ref<any>(null);

onMounted(async () => {
	business.value = await getBusiness(route.params.businessId as string);
});

const onRate = async (stars: number) => {
	const action = await handleRating(route.params.businessId as string, stars);

	if (action === "redirect") {
		window.location.href = business.value.googleProfileUrl;
	} else {
		router.push(`/${business.value.id}/feedback`);
	}
};
</script>

<template>
	<div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
		<UCard class="max-w-md w-full p-8 shadow-lg">
			<div class="text-center">
				<h1 class="text-3xl font-bold mb-2">{{ business?.name }}</h1>
				<p class="text-gray-600 mb-6">
					How would you rate your experience with us?
				</p>

				<div class="flex justify-center gap-4">
					<UButton v-for="i in 5" :key="i" variant="outlined" size="lg"
						class="text-2xl hover:bg-yellow-100 transition" @click="onRate(i)">
						⭐ {{ i }}
					</UButton>
				</div>
			</div>
		</UCard>
	</div>
</template>
