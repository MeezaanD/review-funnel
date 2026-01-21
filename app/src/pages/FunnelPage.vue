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

// Computed styles for dynamic backgrounds
const pageBackgroundStyle = computed(() => ({
	backgroundColor: business.value?.pageBackgroundColor || '#d6d3d1'
}));

const contentCardStyle = computed(() => ({
	backgroundColor: business.value?.contentCardColor || '#ffffff'
}));

const starContainerStyle = computed(() => ({
	backgroundColor: business.value?.starContainerColor || '#f5f5f4'
}));
</script>

<template>
	<div class="min-h-screen relative overflow-hidden py-4 sm:py-8 px-3 sm:px-4">
		<!-- Base concrete gradient with configurable color -->
		<div class="fixed inset-0 -z-10" :style="pageBackgroundStyle"></div>

		<!-- Realistic concrete texture overlay -->
		<div class="fixed inset-0 opacity-40 -z-10"
			style="background-image: url('data:image/svg+xml,%3Csvg width=%22200%22 height=%22200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%221.2%22 numOctaves=%226%22 stitchTiles=%22stitch%22/%3E%3CfeColorMatrix type=%22saturate%22 values=%220%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%220.8%22/%3E%3C/svg%3E'); background-size: 400px 400px;">
		</div>

		<!-- Fine grain texture for realistic concrete feel -->
		<div class="fixed inset-0 opacity-25 -z-10"
			style="background-image: url('data:image/svg+xml,%3Csvg width=%22200%22 height=%22200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%221.2%22 numOctaves=%226%22 stitchTiles=%22stitch%22/%3E%3CfeColorMatrix type=%22saturate%22 values=%220%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%220.8%22/%3E%3C/svg%3E'); background-size: 150px 150px;">
		</div>

		<!-- Subtle mottled variations like real concrete -->
		<div class="fixed inset-0 -z-10"
			style="background-image: radial-gradient(circle at 20% 30%, rgba(0,0,0,0.03) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.04) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(0,0,0,0.02) 0%, transparent 40%), radial-gradient(circle at 90% 20%, rgba(255,255,255,0.03) 0%, transparent 45%);">
		</div>

		<!-- Soft vignette for depth -->
		<div class="fixed inset-0 bg-linear-to-t from-black/8 via-transparent to-white/10 -z-10"></div>

		<!-- Light wash overlay for realism -->
		<div class="fixed inset-0 bg-linear-to-br from-white/5 via-transparent to-black/5 -z-10"></div>

		<!-- Enhanced Sparkle Effects -->
		<div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
			<!-- Glowing orbs in background - warmer tones for concrete feel -->
			<div class="absolute top-[15%] left-[10%] w-96 h-96 bg-amber-200/15 rounded-full blur-3xl"></div>
			<div class="absolute top-[60%] right-[15%] w-md h-112 bg-orange-200/12 rounded-full blur-3xl">
			</div>
			<div class="absolute bottom-[10%] left-[30%] w-80 h-80 bg-yellow-200/10 rounded-full blur-3xl"></div>

			<!-- Sparkle dots with golden tint -->
			<div
				class="absolute top-[10%] left-[15%] w-1 h-1 bg-yellow-100 rounded-full animate-pulse opacity-80 shadow-[0_0_6px_rgba(254,249,195,0.9)]">
			</div>
			<div class="absolute top-[20%] right-[20%] w-1.5 h-1.5 bg-amber-100 rounded-full animate-pulse opacity-90 shadow-[0_0_8px_rgba(254,243,199,1)]"
				style="animation-delay: 0.3s"></div>
			<div class="absolute top-[35%] left-[25%] w-1 h-1 bg-yellow-50 rounded-full animate-pulse opacity-75 shadow-[0_0_6px_rgba(254,252,232,0.8)]"
				style="animation-delay: 0.6s"></div>
			<div class="absolute top-[15%] left-[70%] w-1 h-1 bg-amber-50 rounded-full animate-pulse opacity-85 shadow-[0_0_6px_rgba(255,251,235,0.9)]"
				style="animation-delay: 0.9s"></div>
			<div class="absolute top-[45%] right-[15%] w-1.5 h-1.5 bg-yellow-100 rounded-full animate-pulse opacity-80 shadow-[0_0_7px_rgba(254,249,195,0.9)]"
				style="animation-delay: 1.2s"></div>
			<div class="absolute top-[60%] left-[35%] w-1 h-1 bg-amber-100 rounded-full animate-pulse opacity-90 shadow-[0_0_6px_rgba(254,243,199,0.95)]"
				style="animation-delay: 0.4s"></div>
			<div class="absolute top-[70%] right-[30%] w-1 h-1 bg-yellow-100 rounded-full animate-pulse opacity-85 shadow-[0_0_6px_rgba(254,249,195,0.9)]"
				style="animation-delay: 0.7s"></div>
			<div class="absolute bottom-[15%] left-[20%] w-1.5 h-1.5 bg-amber-50 rounded-full animate-pulse opacity-75 shadow-[0_0_7px_rgba(255,251,235,1)]"
				style="animation-delay: 1s"></div>
			<div class="absolute bottom-[25%] right-[25%] w-1 h-1 bg-yellow-100 rounded-full animate-pulse opacity-90 shadow-[0_0_6px_rgba(254,249,195,1)]"
				style="animation-delay: 0.5s"></div>

			<!-- Star sparkles with golden glow -->
			<div class="absolute top-[12%] left-[10%]">
				<svg class="w-5 h-5 text-yellow-300/80 animate-pulse drop-shadow-[0_0_12px_rgba(253,224,71,1)]"
					fill="currentColor" viewBox="0 0 20 20" style="animation-delay: 0.2s">
					<path
						d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
				</svg>
			</div>
			<div class="absolute top-[8%] right-[12%]">
				<svg class="w-6 h-6 text-amber-200/90 animate-pulse drop-shadow-[0_0_14px_rgba(254,243,199,1)]"
					fill="currentColor" viewBox="0 0 20 20" style="animation-delay: 0.8s">
					<path
						d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
				</svg>
			</div>
			<div class="absolute bottom-[20%] left-[15%]">
				<svg class="w-4 h-4 text-yellow-300/70 animate-pulse drop-shadow-[0_0_10px_rgba(250,204,21,0.9)]"
					fill="currentColor" viewBox="0 0 20 20" style="animation-delay: 1.5s">
					<path
						d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
				</svg>
			</div>
		</div>

		<div class="max-w-lg mx-auto relative pt-12 sm:pt-14">
			<!-- Loading State -->
			<div v-if="loading"
				class="bg-white/50 backdrop-blur-3xl rounded-[2.5rem] sm:rounded-[3rem] shadow-[0_25px_70px_rgba(0,0,0,0.2)] border border-white/70 overflow-visible">
				<div class="animate-pulse p-8 space-y-6">
					<div class="h-24 w-24 rounded-full bg-white/70 mx-auto shadow-lg"></div>
					<div class="space-y-3">
						<div class="h-6 bg-white/70 rounded-lg w-3/4 mx-auto shadow-sm"></div>
						<div class="h-4 bg-white/70 rounded-lg w-1/2 mx-auto shadow-sm"></div>
					</div>
				</div>
			</div>

			<!-- Content -->
			<div v-else
				class="bg-white/50 backdrop-blur-3xl rounded-[2.5rem] sm:rounded-[3rem] shadow-[0_25px_70px_rgba(0,0,0,0.2)] border border-white/70 overflow-visible relative"
				:style="pageBackgroundStyle" style="background-image: url('data:image/svg+xml,%3Csvg width=%22200%22 height=%22200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%221.2%22 numOctaves=%226%22 stitchTiles=%22stitch%22/%3E%3CfeColorMatrix type=%22saturate%22 values=%220%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%220.8%22/%3E%3C/svg%3E'); background-size: 400px 400px;">
				<!-- Logo - Positioned with negative margin at top -->
				<div class="absolute -top-12 sm:-top-14 left-1/2 transform -translate-x-1/2 z-20">
					<div class="relative">
						<!-- Enhanced sparkle decoration with golden glow -->
						<div class="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 z-10">
							<svg class="w-8 h-8 sm:w-10 sm:h-10 text-yellow-300 animate-pulse drop-shadow-[0_0_20px_rgba(253,224,71,1)]"
								fill="currentColor" viewBox="0 0 20 20" style="filter: brightness(1.3)">
								<path
									d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
							</svg>
						</div>

						<img v-if="business?.logoUrl" :src="business.logoUrl" alt="Business Logo"
							class="h-24 w-24 sm:h-28 sm:w-28 rounded-full object-cover border-[6px] sm:border-[7px] border-white shadow-[0_15px_50px_rgba(0,0,0,0.25)]" />
						<div v-else
							class="h-24 w-24 sm:h-28 sm:w-28 bg-white rounded-full flex items-center justify-center border-[6px] sm:border-[7px] border-white shadow-[0_15px_50px_rgba(0,0,0,0.25)]">
							<svg class="w-12 h-12 sm:w-14 sm:h-14 text-gray-400" fill="none" stroke="currentColor"
								viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
							</svg>
						</div>
					</div>
				</div>

				<!-- Content Section -->
				<div class="px-5 sm:px-6 md:px-8 pt-16 sm:pt-20 pb-6 sm:pb-8">
					<!-- Header Text -->
					<div class="text-center mb-5 sm:mb-6">
						<p class="text-base sm:text-lg text-gray-800 mb-1 font-semibold">Thanks for your business!</p>
						<h1 class="text-2xl sm:text-3xl font-bold text-gray-900">How was your experience?</h1>
					</div>

					<!-- Content Card with liquid glass effect -->
					<div class="backdrop-blur-2xl rounded-4xl sm:rounded-[2.5rem] shadow-[0_15px_50px_rgba(0,0,0,0.15)] border border-white/80 overflow-hidden"
						:style="contentCardStyle">
						<!-- Banner Image - Top of Card -->
						<div v-if="business?.displayBanner" class="relative h-32 sm:h-40 overflow-hidden">
							<img :src="business.displayBanner" alt="Banner" class="w-full h-full object-cover" />
							<!-- Gradient overlay for better text contrast -->
							<div class="absolute inset-0 bg-linear-to-b from-black/15 via-transparent to-white/10">
							</div>
						</div>

						<!-- Content Padding Section -->
						<div class="p-5 sm:p-6"
							style="background-image: url('data:image/svg+xml,%3Csvg width=%22200%22 height=%22200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%221.2%22 numOctaves=%226%22 stitchTiles=%22stitch%22/%3E%3CfeColorMatrix type=%22saturate%22 values=%220%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%220.8%22/%3E%3C/svg%3E'); background-size: 400px 400px;">
							<!-- Star Rating Container -->
							<div class="backdrop-blur-lg rounded-2xl p-4 sm:p-5 mb-5 sm:mb-6 shadow-lg border border-white/80"
								:style="starContainerStyle"
								style="background-image: url('data:image/svg+xml,%3Csvg width=%22200%22 height=%22200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%221.2%22 numOctaves=%226%22 stitchTiles=%22stitch%22/%3E%3CfeColorMatrix type=%22saturate%22 values=%220%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%220.8%22/%3E%3C/svg%3E'); background-size: 400px 400px;">
								<div class="flex justify-center items-end gap-2.5 sm:gap-3.5">
									<button v-for="i in 5" :key="i" @click="onRate(i)"
										class="flex flex-col items-center justify-end transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none group">
										<!-- Add shadow to the star -->
										<div class="text-4xl sm:text-5xl mb-1.5 transition-all duration-200
         drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]
         group-hover:drop-shadow-[0_0_18px_rgba(250,204,21,0.9)]"
											style="filter: brightness(1.2) contrast(1.15) saturate(1.3)">
											⭐
										</div>

										<span
											class="text-base sm:text-lg font-bold text-gray-900 group-hover:text-gray-700 transition-colors">{{
												i }}</span>
									</button>
								</div>
							</div>

							<!-- Benefits List -->
							<div class="space-y-3 sm:space-y-3.5 mb-5 sm:mb-6">
								<div class="flex items-center gap-3">
									<div
										class="shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-linear-to-br from-green-400 to-green-500 flex items-center justify-center shadow-[0_4px_16px_rgba(34,197,94,0.5)]">
										<svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none"
											stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
												d="M5 13l4 4L19 7" />
										</svg>
									</div>
									<p class="text-sm sm:text-base text-gray-900 font-semibold">Takes less than 10
										seconds
									</p>
								</div>
								<div class="flex items-center gap-3">
									<div
										class="shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-linear-to-br from-green-400 to-green-500 flex items-center justify-center shadow-[0_4px_16px_rgba(34,197,94,0.5)]">
										<svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none"
											stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
												d="M5 13l4 4L19 7" />
										</svg>
									</div>
									<p class="text-sm sm:text-base text-gray-900 font-semibold">Helps local businesses
										improve</p>
								</div>
								<div class="flex items-center gap-3">
									<div
										class="shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-linear-to-br from-green-400 to-green-500 flex items-center justify-center shadow-[0_4px_16px_rgba(34,197,94,0.5)]">
										<svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none"
											stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
												d="M5 13l4 4L19 7" />
										</svg>
									</div>
									<p class="text-sm sm:text-base text-gray-900 font-semibold">Your feedback matters
									</p>
								</div>
							</div>

							<!-- Submit Button - Fully rounded/circular -->
							<button @click="onRate(5)"
								class="w-full bg-linear-to-r from-orange-500 via-orange-600 to-orange-500 hover:from-orange-600 hover:via-orange-700 hover:to-orange-600 active:scale-[0.98] text-white font-bold py-4 sm:py-4.5 px-6 rounded-full shadow-[0_10px_35px_rgba(249,115,22,0.5)] hover:shadow-[0_14px_45px_rgba(249,115,22,0.6)] transition-all duration-200 text-base sm:text-lg">
								Submit Feedback
							</button>

							<!-- Footer -->
							<div class="mt-4 sm:mt-5 text-center">
								<p class="text-xs sm:text-sm text-gray-700 font-medium">
									Securely powered by <span class="font-bold text-gray-900">QSync</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Back Button with liquid glass effect -->
			<div class="text-center mt-6 sm:mt-7">
				<RouterLink to="/">
					<button
						class="inline-flex items-center gap-2 px-6 py-3 bg-white/45 backdrop-blur-xl hover:bg-white/55 text-gray-900 rounded-full shadow-[0_8px_28px_rgba(0,0,0,0.15)] hover:shadow-[0_10px_35px_rgba(0,0,0,0.2)] border border-white/70 transition-all duration-200 text-sm font-bold">
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
</template>