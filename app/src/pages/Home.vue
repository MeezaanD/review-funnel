<script setup lang="ts">
import { RouterLink } from "vue-router";
import { user, logout } from "../services/auth";
</script>

<template>
	<div
		class="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-4 sm:py-8 px-3 sm:px-4 flex items-center justify-center">
		<div class="max-w-2xl w-full">
			<!-- Main Card -->
			<div class="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
				<div class="p-6 sm:p-8 lg:p-12">
					<!-- Header -->
					<div class="text-center mb-8 sm:mb-10">
						<div class="mb-4 sm:mb-6">
							<div
								class="mx-auto h-16 w-16 sm:h-20 sm:w-20 bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
								<svg class="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor"
									viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
								</svg>
							</div>
						</div>
						<h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">Review Funnel
						</h1>
						<p class="text-sm sm:text-base lg:text-lg text-gray-600 mb-3 sm:mb-4">Generate review links and
							collect customer feedback</p>

						<!-- User Welcome -->
						<div v-if="user"
							class="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-lg sm:rounded-xl mt-2">
							<svg class="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor"
								viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
							</svg>
							<span class="text-sm sm:text-base text-blue-900 font-medium">Welcome, {{ user.displayName ||
								user.email }}</span>
						</div>
					</div>

					<!-- Action Buttons -->
					<div class="space-y-3 sm:space-y-4">
						<!-- Authenticated User Actions -->
						<template v-if="user">
							<RouterLink to="/create" class="block">
								<button
									class="w-full flex items-center justify-center gap-2 px-6 py-3 sm:py-4 bg-blue-600 text-white rounded-lg sm:rounded-xl shadow-sm hover:bg-blue-700 hover:shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base font-medium">
									<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M12 4v16m8-8H4" />
									</svg>
									Create Business
								</button>
							</RouterLink>

							<RouterLink to="/admin" class="block">
								<button
									class="w-full flex items-center justify-center gap-2 px-6 py-3 sm:py-4 bg-white text-gray-900 border-2 border-gray-200 rounded-lg sm:rounded-xl shadow-sm hover:bg-gray-50 hover:shadow-md hover:border-gray-300 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base font-medium">
									<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
									</svg>
									View Businesses
								</button>
							</RouterLink>

							<div class="pt-4 sm:pt-6 border-t border-gray-100">
								<button @click="logout()"
									class="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white text-red-600 border-2 border-red-200 rounded-lg sm:rounded-xl shadow-sm hover:bg-red-50 hover:shadow-md hover:border-red-300 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base font-medium">
									<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
									</svg>
									Logout
								</button>
							</div>
						</template>

						<!-- Guest User Actions -->
						<template v-else>
							<RouterLink to="/login" class="block">
								<button
									class="w-full flex items-center justify-center gap-2 px-6 py-3 sm:py-4 bg-blue-600 text-white rounded-lg sm:rounded-xl shadow-sm hover:bg-blue-700 hover:shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base font-medium">
									<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
									</svg>
									Login to Get Started
								</button>
							</RouterLink>
						</template>
					</div>

					<!-- Footer Text -->
					<div class="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-100">
						<div class="flex items-center justify-center gap-2 text-gray-500">
							<svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M13 10V3L4 14h7v7l9-11h-7z" />
							</svg>
							<p class="text-xs sm:text-sm text-center">Simple review collection for your business</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Feature Cards (Optional) -->
			<div class="grid sm:grid-cols-3 gap-4 mt-6">
				<div class="bg-white rounded-xl border border-gray-100 p-4 text-center">
					<div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-3">
						<svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M13 10V3L4 14h7v7l9-11h-7z" />
						</svg>
					</div>
					<p class="text-xs sm:text-sm text-gray-600 font-medium">Quick Setup</p>
				</div>
				<div class="bg-white rounded-xl border border-gray-100 p-4 text-center">
					<div class="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-3">
						<svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
					<p class="text-xs sm:text-sm text-gray-600 font-medium">Easy to Use</p>
				</div>
				<div class="bg-white rounded-xl border border-gray-100 p-4 text-center">
					<div class="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mx-auto mb-3">
						<svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
						</svg>
					</div>
					<p class="text-xs sm:text-sm text-gray-600 font-medium">More Reviews</p>
				</div>
			</div>
		</div>
	</div>
</template>