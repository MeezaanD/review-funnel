<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { handleRating } from "../controllers/ratingController";
import { getBusiness } from "../controllers/businessController";

const route = useRoute();
const router = useRouter();

const business = ref<any>(null);
const loading = ref(true);

onMounted(async () => {
	const businessData = await getBusiness(route.params.businessId as string);
	business.value = businessData;
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
</script>

<template>
	<div class="min-h-screen bg-gray-50 p-4">
		<div class="max-w-md mx-auto">
			<!-- Main Rating Card -->
			<div class="bg-white rounded-lg shadow-sm p-6 mb-6">
				<!-- Business Header -->
				<div class="text-center mb-8">
					<div v-if="loading" class="animate-pulse space-y-4">
						<div class="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
						<div class="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
					</div>

					<template v-else>
						<h1 class="text-2xl font-semibold text-gray-900 mb-3">
							{{ business?.name }}
						</h1>
						<p class="text-gray-600">
							Please rate your experience
						</p>
					</template>
				</div>

				<!-- Star Rating -->
				<div class="space-y-8">
					<div class="text-center">
						<p class="text-gray-700 mb-6">
							How would you rate your experience?
						</p>

						<div class="flex justify-center gap-3 flex-wrap">
							<UButton v-for="i in 5" :key="i" variant="outline"
								class="min-w-[60px] py-4 text-lg hover:bg-yellow-50 hover:border-yellow-200 transition-all duration-200"
								:class="{
									'border-yellow-400 text-yellow-700 hover:bg-yellow-100': true
								}" @click="onRate(i)" :disabled="loading">
								<div class="flex items-center gap-1">
									<span class="text-xl">⭐</span>
									<span class="font-medium">{{ i }}</span>
								</div>
							</UButton>
						</div>
					</div>

					<!-- Rating Scale Info -->
					<div class="border-t pt-6">
						<div class="text-center text-gray-500 text-sm">
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
				</div>
			</div>

			<!-- Navigation -->
			<div class="text-center">
				<p class="text-gray-500 text-sm mb-4">
					Powered by Review Funnel
				</p>
				<RouterLink to="/">
					<UButton variant="ghost" size="sm" class="text-gray-600">
						← Back to Home
					</UButton>
				</RouterLink>
			</div>
		</div>
	</div>
</template>