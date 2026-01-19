<script setup lang="ts">
import { ref, onMounted } from "vue";
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
</script>

<template>
	<div class="min-h-screen relative overflow-hidden py-4 sm:py-8 px-3 sm:px-4">
		<!-- Enhanced Gradient Background -->
		<div class="fixed inset-0 bg-linear-to-br from-amber-100/80 via-orange-50/60 to-rose-100/70 -z-10"></div>
		
		<!-- Soft overlay for depth -->
		<div class="fixed inset-0 bg-linear-to-t from-white/20 via-transparent to-white/30 -z-10"></div>

		<!-- Enhanced Sparkle Effects -->
		<div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
			<!-- Glowing orbs in background -->
			<div class="absolute top-[15%] left-[10%] w-64 h-64 bg-yellow-200/20 rounded-full blur-3xl"></div>
			<div class="absolute top-[60%] right-[15%] w-80 h-80 bg-orange-200/15 rounded-full blur-3xl"></div>
			<div class="absolute bottom-[10%] left-[30%] w-72 h-72 bg-rose-200/10 rounded-full blur-3xl"></div>
			
			<!-- Sparkle dots -->
			<div class="absolute top-[10%] left-[15%] w-1 h-1 bg-white rounded-full animate-pulse opacity-70"></div>
			<div class="absolute top-[20%] right-[20%] w-1.5 h-1.5 bg-yellow-300/80 rounded-full animate-pulse opacity-90"
				style="animation-delay: 0.3s"></div>
			<div class="absolute top-[35%] left-[25%] w-1 h-1 bg-white rounded-full animate-pulse opacity-60"
				style="animation-delay: 0.6s"></div>
			<div class="absolute top-[15%] left-[70%] w-1 h-1 bg-yellow-200/70 rounded-full animate-pulse opacity-80"
				style="animation-delay: 0.9s"></div>
			<div class="absolute top-[45%] right-[15%] w-1.5 h-1.5 bg-white rounded-full animate-pulse opacity-70"
				style="animation-delay: 1.2s"></div>
			<div class="absolute top-[60%] left-[35%] w-1 h-1 bg-yellow-300/60 rounded-full animate-pulse opacity-85"
				style="animation-delay: 0.4s"></div>
			<div class="absolute top-[70%] right-[30%] w-1 h-1 bg-white rounded-full animate-pulse opacity-75"
				style="animation-delay: 0.7s"></div>
			<div class="absolute bottom-[15%] left-[20%] w-1.5 h-1.5 bg-yellow-200/80 rounded-full animate-pulse opacity-65"
				style="animation-delay: 1s"></div>
			<div class="absolute bottom-[25%] right-[25%] w-1 h-1 bg-white rounded-full animate-pulse opacity-80"
				style="animation-delay: 0.5s"></div>

			<!-- Star sparkles with glow -->
			<div class="absolute top-[12%] left-[10%]">
				<svg class="w-5 h-5 text-yellow-400/60 animate-pulse drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" fill="currentColor" viewBox="0 0 20 20"
					style="animation-delay: 0.2s">
					<path
						d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
				</svg>
			</div>
			<div class="absolute top-[8%] right-[12%]">
				<svg class="w-6 h-6 text-yellow-300/70 animate-pulse drop-shadow-[0_0_10px_rgba(253,224,71,0.7)]" fill="currentColor" viewBox="0 0 20 20"
					style="animation-delay: 0.8s">
					<path
						d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
				</svg>
			</div>
			<div class="absolute bottom-[20%] left-[15%]">
				<svg class="w-4 h-4 text-yellow-400/50 animate-pulse drop-shadow-[0_0_6px_rgba(250,204,21,0.5)]" fill="currentColor" viewBox="0 0 20 20"
					style="animation-delay: 1.5s">
					<path
						d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
				</svg>
			</div>
		</div>

		<div class="max-w-lg mx-auto relative pt-12 sm:pt-14">
			<!-- Loading State -->
			<div v-if="loading"
				class="bg-white/40 backdrop-blur-2xl rounded-4xl sm:rounded-[2.5rem] shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/60 overflow-visible">
				<div class="animate-pulse p-8 space-y-6">
					<div class="h-24 w-24 rounded-full bg-white/60 mx-auto"></div>
					<div class="space-y-3">
						<div class="h-6 bg-white/60 rounded w-3/4 mx-auto"></div>
						<div class="h-4 bg-white/60 rounded w-1/2 mx-auto"></div>
					</div>
				</div>
			</div>

			<!-- Content -->
			<div v-else
				class="bg-white/40 backdrop-blur-2xl rounded-4xl sm:rounded-[2.5rem] shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/60 overflow-visible relative">
				<!-- Logo - Positioned with negative margin at top -->
				<div class="absolute -top-12 sm:-top-14 left-1/2 transform -translate-x-1/2 z-20">
					<div class="relative">
						<!-- Enhanced sparkle decoration with glow -->
						<div class="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 z-10">
							<svg class="w-7 h-7 sm:w-8 sm:h-8 text-yellow-400 animate-pulse drop-shadow-[0_0_12px_rgba(250,204,21,0.8)]" fill="currentColor"
								viewBox="0 0 20 20">
								<path
									d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
							</svg>
						</div>

						<img v-if="business?.logoUrl" :src="business.logoUrl" alt="Business Logo"
							class="h-24 w-24 sm:h-28 sm:w-28 rounded-full object-cover border-[5px] sm:border-[6px] border-white shadow-[0_8px_24px_rgba(0,0,0,0.15)]" />
						<div v-else
							class="h-24 w-24 sm:h-28 sm:w-28 bg-white rounded-full flex items-center justify-center border-[5px] sm:border-[6px] border-white shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
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
						<p class="text-base sm:text-lg text-gray-700 mb-1 font-medium">Thanks for your business!</p>
						<h1 class="text-2xl sm:text-3xl font-bold text-gray-900">How was your experience?</h1>
					</div>

					<!-- Content Card with enhanced glass effect -->
					<div
						class="bg-white/50 backdrop-blur-xl rounded-[1.75rem] sm:rounded-4xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/70 overflow-hidden">
						<!-- Banner Image - Top of Card -->
						<div v-if="business?.displayBanner" class="relative h-32 sm:h-40 overflow-hidden">
							<img :src="business.displayBanner" alt="Banner" class="w-full h-full object-cover" />
							<!-- Gradient overlay for better text contrast -->
							<div class="absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-transparent"></div>
						</div>

						<!-- Content Padding Section -->
						<div class="p-5 sm:p-6">
							<!-- Star Rating Container with frosted glass -->
							<div class="bg-white/70 backdrop-blur-md rounded-[1.5rem] p-4 sm:p-5 mb-5 sm:mb-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-white/80">
								<div class="flex justify-center items-end gap-2 sm:gap-3">
									<button v-for="i in 5" :key="i" @click="onRate(i)"
										class="flex flex-col items-center justify-end transition-all hover:scale-110 active:scale-95 focus:outline-none group">
										<div
											class="text-4xl sm:text-5xl mb-1 filter drop-shadow-[0_4px_8px_rgba(250,204,21,0.4)] group-hover:drop-shadow-[0_6px_12px_rgba(250,204,21,0.6)] transition-all">
											⭐
										</div>
										<span class="text-base sm:text-lg font-bold text-gray-900">{{ i }}</span>
									</button>
								</div>
							</div>

							<!-- Benefits List -->
							<div class="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6">
								<div class="flex items-center gap-3">
									<div
										class="shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-green-500 flex items-center justify-center shadow-[0_2px_8px_rgba(34,197,94,0.3)]">
										<svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none"
											stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
												d="M5 13l4 4L19 7" />
										</svg>
									</div>
									<p class="text-sm sm:text-base text-gray-900 font-medium">Takes less than 10 seconds
									</p>
								</div>
								<div class="flex items-center gap-3">
									<div
										class="shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-green-500 flex items-center justify-center shadow-[0_2px_8px_rgba(34,197,94,0.3)]">
										<svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none"
											stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
												d="M5 13l4 4L19 7" />
										</svg>
									</div>
									<p class="text-sm sm:text-base text-gray-900 font-medium">Helps local businesses
										improve</p>
								</div>
								<div class="flex items-center gap-3">
									<div
										class="shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-green-500 flex items-center justify-center shadow-[0_2px_8px_rgba(34,197,94,0.3)]">
										<svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none"
											stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
												d="M5 13l4 4L19 7" />
										</svg>
									</div>
									<p class="text-sm sm:text-base text-gray-900 font-medium">Your feedback matters</p>
								</div>
							</div>

							<!-- Submit Button with gradient and glow -->
							<button @click="onRate(5)"
								class="w-full bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 active:scale-[0.98] text-white font-bold py-3.5 sm:py-4 px-6 rounded-xl sm:rounded-[1.25rem] shadow-[0_6px_20px_rgba(249,115,22,0.35)] hover:shadow-[0_8px_28px_rgba(249,115,22,0.45)] transition-all text-base sm:text-lg">
								Submit Feedback
							</button>

							<!-- Footer -->
							<div class="mt-4 sm:mt-5 text-center">
								<p class="text-xs sm:text-sm text-gray-700">
									Securely powered by <span class="font-semibold text-gray-900">QSync</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Back Button with glass effect -->
			<div class="text-center mt-6 sm:mt-7">
				<RouterLink to="/">
					<button
						class="inline-flex items-center gap-2 px-6 py-3 bg-white/30 backdrop-blur-lg hover:bg-white/40 text-gray-900 rounded-xl sm:rounded-[1.25rem] shadow-[0_4px_16px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] border border-white/50 transition-all text-sm font-semibold">
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