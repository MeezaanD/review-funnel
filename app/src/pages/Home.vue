<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
	<div class="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
		<div class="max-w-md w-full bg-white rounded-lg shadow-sm p-8">
			<!-- Logo/Title -->
			<div class="text-center mb-8">
				<h1 class="text-2xl font-semibold text-gray-900">
					Review Funnel
				</h1>
				<p class="text-gray-600 mt-2">
					Generate review links and collect customer feedback
				</p>
			</div>

			<!-- Action Buttons -->
			<div class="space-y-4">
				<RouterLink to="/create" class="block">
					<UButton class="w-full justify-center py-3" size="lg">
						Create Business
					</UButton>
				</RouterLink>

				<RouterLink to="/admin" class="block">
					<UButton variant="outline" class="w-full justify-center py-3" size="lg">
						View Businesses
					</UButton>
				</RouterLink>
			</div>

			<!-- Optional Footer Note -->
			<p class="text-gray-500 text-sm text-center mt-8">
				Simple review collection for your business
			</p>
		</div>
	</div>
</template>