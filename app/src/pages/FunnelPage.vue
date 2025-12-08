<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getBusiness } from "../controllers/businessController";
import { handleRating } from "../controllers/ratingController";

const route = useRoute();
const router = useRouter();

const business = ref<any>(null);
const loading = ref(true);

onMounted(async () => {
	const businessData = await getBusiness(route.params.businessId as string);
	if (!businessData) {
		alert("Business not found!");
		router.push("/");
		return;
	}
	business.value = { id: route.params.businessId, ...businessData };
	loading.value = false;
});

const onRate = async (stars: number) => {
	const action = await handleRating(route.params.businessId as string, stars);

	if (action === "redirect") {
		window.location.href = business.value.googleProfileUrl;
	} else {
		router.push(`/${business.value.id}/feedback`);
	}
};

// computed styles
const primaryStyle = computed(() => ({
	backgroundColor: business.value?.primaryColor || "#2563eb",
	color: "#fff",
}));

const secondaryStyle = computed(() => ({
	backgroundColor: business.value?.secondaryColor || "#1e293b",
	color: "#fff",
}));
</script>

<template>
	<div class="min-h-screen p-4" :style="{ backgroundColor: business?.secondaryColor || '#f0f0f0' }">
		<div class="max-w-md mx-auto">
			<div v-if="loading" class="animate-pulse space-y-4 p-6 bg-white rounded-lg shadow">
				<div class="h-12 w-12 rounded-full bg-gray-200 mx-auto"></div>
				<div class="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
				<div class="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
			</div>

			<div v-else class="bg-white rounded-lg shadow-sm p-6 mb-6">
				<!-- Business Logo -->
				<div class="text-center mb-6">
					<img v-if="business?.logoUrl" :src="business.logoUrl" alt="Business Logo"
						class="mx-auto h-20 w-20 rounded-full object-cover border-2 border-gray-200 shadow-sm" />
					<h1 class="text-2xl font-semibold mt-3">{{ business?.name }}</h1>
					<p class="text-gray-600 mt-1">Please rate your experience</p>
				</div>

				<!-- Star Rating Buttons -->
				<div class="flex justify-center gap-3 flex-wrap">
					<UButton v-for="i in 5" :key="i" variant="outline" :style="primaryStyle"
						class="min-w-[60px] py-4 text-lg hover:opacity-90 transition-all duration-150"
						@click="onRate(i)">
						<div class="flex items-center gap-1 justify-center">
							<span class="text-xl">⭐</span>
							<span class="font-medium">{{ i }}</span>
						</div>
					</UButton>
				</div>

				<!-- Rating Scale Info -->
				<div class="border-t pt-6 mt-6 text-center text-gray-500 text-sm">
					<div class="grid grid-cols-5 gap-2 mb-2">
						<span class="text-xs">Poor</span>
						<span class="text-xs">Fair</span>
						<span class="text-xs">Good</span>
						<span class="text-xs">Very Good</span>
						<span class="text-xs">Excellent</span>
					</div>
					<p>Tap a star to submit your rating</p>
				</div>
			</div>

			<!-- Back Button -->
			<div class="text-center mt-4">
				<RouterLink to="/">
					<UButton :style="secondaryStyle" size="sm">← Back to Home</UButton>
				</RouterLink>
			</div>
		</div>
	</div>
</template>
