<script setup lang="ts">
import { RouterLink } from "vue-router";
import { user, logout } from "../services/auth";
</script>

<template>
	<div class="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
		<div class="max-w-md w-full bg-white rounded-lg shadow-sm p-8">
			<div class="text-center mb-8">
				<h1 class="text-2xl font-semibold text-gray-900">Review Funnel</h1>
				<p class="text-gray-800 mt-2">Generate review links and collect customer feedback</p>
				<p v-if="user" class="mt-2 text-gray-900">Welcome, {{ user.displayName || user.email }}</p>
			</div>

			<div class="space-y-4">
				<RouterLink v-if="user" to="/create" class="block">
					<UButton class="w-full justify-center py-3" size="lg">Create Business</UButton>
				</RouterLink>

				<RouterLink v-if="user" to="/admin" class="block">
					<UButton variant="outline" class="w-full justify-center py-3" size="lg">View Businesses</UButton>
				</RouterLink>

				<RouterLink v-else to="/login" class="block">
					<UButton class="w-full justify-center py-3" size="lg">Login</UButton>
				</RouterLink>

				<button v-if="user" @click="logout()"
					class="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600">
					Logout
				</button>
			</div>

			<p class="text-gray-500 text-sm text-center mt-8">Simple review collection for your business</p>
		</div>
	</div>
</template>