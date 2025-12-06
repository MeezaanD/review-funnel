<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { submitFeedback } from "../controllers/feedbackController";

const route = useRoute();
const router = useRouter();

const message = ref("");
const email = ref("");

const loading = ref(false);
const error = ref("");

const onSubmit = async () => {
	if (!message.value) {
		error.value = "Please provide feedback";
		return;
	}

	loading.value = true;
	error.value = "";

	try {
		await submitFeedback(
			route.params.businessId as string,
			message.value,
			email.value,
		);
		router.push("/thank-you");
	} catch (err) {
		console.error(err);
		error.value = "Failed to submit feedback.";
	} finally {
		loading.value = false;
	}
};
</script>

<template>
	<div class="min-h-screen bg-gray-50 p-4">
		<div class="max-w-md mx-auto">
			<!-- Main Feedback Card -->
			<div class="bg-white rounded-lg shadow-sm p-6 mb-6">
				<!-- Header -->
				<div class="text-center mb-8">
					<h1 class="text-2xl font-semibold text-gray-900 mb-3">
						Share Your Feedback
					</h1>
					<p class="text-gray-600">
						Help us improve by sharing your thoughts
					</p>
				</div>

				<!-- Form -->
				<form @submit.prevent="onSubmit" class="space-y-6">
					<!-- Feedback Message -->
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-2">
							Your Feedback
						</label>
						<UTextarea v-model="message" placeholder="What did you like or how can we improve?" :rows="5"
							:disabled="loading" class="resize-none" />
						<p class="text-xs text-gray-500 mt-2">
							Your honest feedback helps us serve you better
						</p>
					</div>

					<!-- Optional Email -->
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-2">
							Email Address (Optional)
						</label>
						<UInput v-model="email" placeholder="you@example.com" type="email" :disabled="loading" />
						<p class="text-xs text-gray-500 mt-2">
							Only if you'd like us to follow up with you
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
							{{ loading ? "Submitting..." : "Submit Feedback" }}
						</UButton>
					</div>
				</form>
			</div>

			<!-- Navigation -->
			<div class="text-center">
				<RouterLink :to="`/${route.params.businessId}`">
					<UButton variant="ghost" size="sm" class="text-gray-600">
						← Back to Rating
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