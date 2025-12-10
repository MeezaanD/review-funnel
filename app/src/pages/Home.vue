<script setup lang="ts">
import { RouterLink } from "vue-router";
import { user, logout } from "../services/auth";
</script>


<template>
	<div
		class="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 py-6 sm:py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
		<div class="w-full max-w-3xl">
			<!-- Main Card -->
			<div class="bg-white/95 backdrop-blur rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
				<div class="p-6 sm:p-10 lg:p-12 space-y-8">
					<!-- Header -->
					<div class="text-center space-y-6">
						<div>
							<div
								class="mx-auto h-16 w-16 sm:h-20 sm:w-20 bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
								<svg class="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor"
									viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
								</svg>
							</div>
						</div>
						<h1 class="text-3xl sm:text-4xl font-semibold text-slate-900">Review Funnel
						</h1>
						<p class="text-base sm:text-lg text-slate-500">Generate review links and
							collect customer feedback</p>

						<!-- User Welcome -->
						<div v-if="user"
							class="inline-flex items-center gap-2 px-4 py-2 bg-blue-50/90 border border-blue-100 rounded-2xl font-medium text-blue-900">
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
								<button class="btn btn-primary w-full">
									<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M12 4v16m8-8H4" />
									</svg>
									Create Business
								</button>
							</RouterLink>

							<RouterLink to="/admin" class="block">
								<button class="btn btn-secondary w-full">
									<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
									</svg>
									View Businesses
								</button>
							</RouterLink>

							<div class="pt-4 sm:pt-6 border-t border-slate-100">
								<button @click="logout()" class="btn btn-danger w-full">
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
								<button class="btn btn-primary w-full">
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
					<div class="pt-6 sm:pt-8 border-t border-slate-100">
						<div class="flex items-center justify-center gap-2 text-slate-500 text-sm">
							<svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M13 10V3L4 14h7v7l9-11h-7z" />
							</svg>
							<p class="text-xs sm:text-sm text-center">Simple review collection for your business</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>