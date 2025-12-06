<script setup lang="ts">
import { ref } from "vue";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../services/firebase";
import { useRouter } from "vue-router";

const router = useRouter();
const name = ref("");
const email = ref("");
const googleProfileUrl = ref("");
const loading = ref(false);
const error = ref("");

const onSubmit = async () => {
	if (!name.value || !email.value || !googleProfileUrl.value) {
		error.value = "All fields are required.";
		return;
	}

	loading.value = true;
	error.value = "";

	try {
		const docRef = await addDoc(collection(db, "businesses"), {
			name: name.value,
			email: email.value,
			googleProfileUrl: googleProfileUrl.value,
			createdAt: Date.now(),
		});
		alert(
			`Business created! Shareable link: ${window.location.origin}/${docRef.id}`,
		);
		router.push(`/admin`);
	} catch (err) {
		console.error(err);
		error.value = "Failed to create business.";
	} finally {
		loading.value = false;
	}
};
</script>

<template>
	<div class="min-h-screen bg-gray-50 p-4">
		<div class="max-w-md mx-auto">
			<!-- Main Card -->
			<div class="bg-white rounded-lg shadow-sm p-6 mb-6">
				<!-- Header -->
				<div class="text-center mb-8">
					<h1 class="text-2xl font-semibold text-gray-900 mb-2">
						Create Business
					</h1>
					<p class="text-gray-600">
						Add a new business to generate review links
					</p>
				</div>

				<!-- Form -->
				<form @submit.prevent="onSubmit" class="space-y-5">
					<!-- Business Name -->
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-2">
							Business Name
						</label>
						<UInput v-model="name" placeholder="Enter business name" size="lg" :disabled="loading" />
					</div>

					<!-- Email -->
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-2">
							Email Address
						</label>
						<UInput v-model="email" type="email" placeholder="business@example.com" size="lg"
							:disabled="loading" />
					</div>

					<!-- Google Profile -->
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-2">
							Google Profile URL
						</label>
						<UInput v-model="googleProfileUrl" placeholder="https://g.page/your-business" size="lg"
							:disabled="loading" />
						<p class="text-xs text-gray-500 mt-2">
							Customers will be directed to this Google review page
						</p>
					</div>

					<!-- Error Message -->
					<div v-if="error" class="p-3 bg-red-50 border border-red-200 rounded-lg">
						<p class="text-red-600 text-sm text-center">{{ error }}</p>
					</div>

					<!-- Submit Button -->
					<div class="pt-2">
						<UButton type="submit" :loading="loading" :disabled="loading" class="w-full justify-center py-3"
							size="lg">
							{{ loading ? "Creating..." : "Create Business" }}
						</UButton>
					</div>
				</form>
			</div>

			<!-- Back to Admin Link -->
			<div class="text-center">
				<RouterLink to="/admin">
					<UButton variant="ghost" size="sm" class="text-gray-600">
						← View All Businesses
					</UButton>
				</RouterLink>
				<RouterLink to="/" class="ml-4">
					<UButton variant="ghost" size="sm" class="text-gray-600">
						← Back to Home
					</UButton>
				</RouterLink>
			</div>
		</div>
	</div>
</template>