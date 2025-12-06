<template>
	<div class="min-h-screen bg-gray-50 p-4">
		<div class="max-w-md mx-auto">
			<!-- Success Card -->
			<div class="bg-white rounded-lg shadow-sm p-8 text-center mb-6">
				<!-- Success Icon -->
				<div class="mb-6">
					<div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
						<svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7">
							</path>
						</svg>
					</div>
				</div>

				<!-- Success Message -->
				<h1 class="text-2xl font-semibold text-gray-900 mb-3">
					Thank You!
				</h1>
				<p class="text-gray-600 mb-8">
					Your feedback has been submitted successfully.
				</p>

				<!-- Action Button -->
				<RouterLink to="/">
					<UButton class="w-full justify-center py-3" size="lg">
						Return to Home
					</UButton>
				</RouterLink>
			</div>

			<!-- Additional Navigation -->
			<div class="text-center">
				<p class="text-gray-500 text-sm mb-4">
					Your feedback helps businesses improve
				</p>
				<div class="space-x-4">
					<RouterLink to="/admin">
						<UButton variant="ghost" size="sm" class="text-gray-600">
							View Businesses
						</UButton>
					</RouterLink>
					<RouterLink to="/create">
						<UButton variant="ghost" size="sm" class="text-gray-600">
							Create Business
						</UButton>
					</RouterLink>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>