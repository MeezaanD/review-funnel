<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "../services/auth";

const router = useRouter();
const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");

const inputClasses =
	"w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition";

const handleLogin = async () => {
	loading.value = true;
	error.value = "";
	try {
		await login(email.value, password.value);
		router.push("/");
	} catch (err: any) {
		console.error(err);
		error.value = err.message || "Login failed";
	} finally {
		loading.value = false;
	}
};
</script>

<template>
	<div
		class="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 px-4 py-8 sm:px-6 lg:px-8 flex items-center justify-center">
		<div class="w-full max-w-xl space-y-6">
			<div class="text-center space-y-2">
				<p class="text-sm uppercase tracking-[0.3em] text-slate-400">Review Funnel</p>
				<h1 class="text-3xl font-bold text-slate-900">Welcome back</h1>
				<p class="text-base text-slate-500">Sign in to manage your businesses and review flows.</p>
			</div>

			<div class="bg-white/90 backdrop-blur rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8">
				<form class="space-y-5" @submit.prevent="handleLogin">
					<div class="space-y-2">
						<label class="text-sm font-medium text-slate-700">Email address</label>
						<input v-model="email" type="email" placeholder="you@example.com" :class="inputClasses" />
					</div>
					<div class="space-y-2">
						<label class="text-sm font-medium text-slate-700">Password</label>
						<input v-model="password" type="password" placeholder="••••••••" :class="inputClasses" />
					</div>

					<div class="space-y-3">
						<button type="submit" :disabled="loading" class="btn btn-primary w-full">
							{{ loading ? "Logging in..." : "Sign in" }}
						</button>
						<p v-if="error" class="text-sm text-red-600 text-center">{{ error }}</p>
					</div>
				</form>
			</div>

			<p class="text-center text-sm text-slate-500">
				Need an account? Ask your administrator to invite you.
			</p>
		</div>
	</div>
</template>
