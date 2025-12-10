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

const backgroundGradient = computed(() => {
	const primary = business.value?.primaryColor || "#2563eb";
	const secondary = business.value?.secondaryColor || "#1e293b";
	return `linear-gradient(135deg, ${secondary}15 0%, ${primary}10 100%)`;
});
</script>

<template>
	<div class="min-h-screen py-6 sm:py-10 px-4 sm:px-6" :style="{ background: backgroundGradient }">
		<div class="max-w-2xl mx-auto space-y-4 sm:space-y-6">
			<!-- Loading State -->
			<div v-if="loading"
				class="bg-white/95 backdrop-blur rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
				<div class="animate-pulse p-6 sm:p-8 lg:p-12 space-y-6">
					<div class="flex flex-col items-center space-y-6">
						<div class="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-gray-200"></div>
						<div class="space-y-3 w-full">
							<div class="h-8 bg-gray-200 rounded-lg w-3/4 mx-auto"></div>
							<div class="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
						</div>
						<div class="flex gap-3 w-full justify-center">
							<div v-for="i in 5" :key="i" class="h-16 w-16 sm:h-20 sm:w-20 bg-gray-200 rounded-xl"></div>
						</div>
					</div>
				</div>
			</div>

			<!-- Content -->
			<div v-else class="space-y-4 sm:space-y-6">
				<!-- Main Rating Card -->
				<div class="bg-white/95 backdrop-blur rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
					<div class="p-6 sm:p-8 lg:p-12 space-y-8">
						<!-- Business Header -->
						<div class="text-center space-y-6">
							<div>
								<img v-if="business?.logoUrl" :src="business.logoUrl" alt="Business Logo"
									class="mx-auto h-20 w-20 sm:h-24 sm:w-24 rounded-full object-cover border-4 border-gray-100 shadow-lg" />
								<div v-else
									class="mx-auto h-20 w-20 sm:h-24 sm:w-24 bg-linear-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center border-4 border-gray-100 shadow-lg">
									<svg class="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" fill="none"
										stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
									</svg>
								</div>
							</div>
							<h1 class="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900">{{ business?.name
							}}</h1>
							<p class="text-sm sm:text-base text-slate-500">How was your experience?</p>
						</div>

						<!-- Star Rating Buttons -->
						<div>
							<div class="flex justify-center gap-3 flex-wrap">
								<button v-for="i in 5" :key="i" :style="primaryStyle"
									class="flex flex-col items-center justify-center min-w-[60px] sm:min-w-20 h-20 sm:h-24 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white/60"
									@click="onRate(i)">
									<span class="text-2xl sm:text-3xl mb-1">⭐</span>
									<span class="text-base sm:text-lg font-bold">{{ i }}</span>
								</button>
							</div>
						</div>

						<!-- Rating Scale Labels -->
						<div class="pt-6 sm:pt-8 border-t border-slate-100">
							<div class="grid grid-cols-5 gap-1 sm:gap-2 mb-4">
								<div class="text-center">
									<span class="text-xs sm:text-sm text-gray-500 font-medium">Poor</span>
								</div>
								<div class="text-center">
									<span class="text-xs sm:text-sm text-gray-500 font-medium">Fair</span>
								</div>
								<div class="text-center">
									<span class="text-xs sm:text-sm text-gray-500 font-medium">Good</span>
								</div>
								<div class="text-center">
									<span class="text-xs sm:text-sm text-gray-500 font-medium">Very Good</span>
								</div>
								<div class="text-center">
									<span class="text-xs sm:text-sm text-gray-500 font-medium">Excellent</span>
								</div>
							</div>
							<div class="flex items-center justify-center gap-2 text-gray-600">
								<svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
								</svg>
								<p class="text-xs sm:text-sm">Tap a star to submit your rating</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Back Button -->
				<div class="text-center">
					<RouterLink to="/">
						<button :style="secondaryStyle"
							class="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl shadow-sm hover:shadow-md transition focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white/60 text-sm sm:text-base font-semibold">
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M10 19l-7-7m0 0l7-7m-7 7h18" />
							</svg>
							Back to Home
						</button>
					</RouterLink>
				</div>
			</div>
		</div>
	</div>
</template>