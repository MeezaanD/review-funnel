<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "../services/auth";

const router = useRouter();
const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");

const handleLogin = async () => {
	loading.value = true;
	error.value = "";
	try {
		await login(email.value, password.value);
		router.push("/"); // redirect to home after login
	} catch (err: any) {
		console.error(err);
		error.value = err.message || "Login failed";
	} finally {
		loading.value = false;
	}
};
</script>

<template>
	<div class="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
		<div class="max-w-md w-full bg-white rounded-lg shadow-sm p-8">
			<h1 class="text-2xl font-semibold text-gray-900 text-center mb-6">Login</h1>

			<div class="space-y-4">
				<input v-model="email" type="email" placeholder="Email"
					class="w-full border border-gray-400 p-2 rounded-md text-gray-900" />
				<input v-model="password" type="password" placeholder="Password"
					class="w-full border border-gray-400 p-2 rounded-md text-gray-900" />

				<button @click="handleLogin" :disabled="loading"
					class="w-full py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
					{{ loading ? "Logging in..." : "Login" }}
				</button>

				<p v-if="error" class="text-red-700 text-sm text-center">{{ error }}</p>
			</div>
		</div>
	</div>
</template>
