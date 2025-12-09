<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../services/firebase";
import { type Business } from "../models/Business";
import { sendFeedbackEmail } from "../services/emailService";

const route = useRoute();
const router = useRouter();

const message = ref("");
const userEmail = ref("");
const loading = ref(false);
const error = ref("");
const success = ref("");

const businessEmail = ref<string | null>(null);

// Load the business email dynamically from Firestore
const loadBusinessEmail = async () => {
	loading.value = true;
	error.value = "";

	const businessId = route.params.businessId as string;
	if (!businessId) {
		error.value = "Invalid business ID.";
		loading.value = false;
		return;
	}

	try {
		const q = query(
			collection(db, "businesses"),
			where("__name__", "==", businessId)
		);
		const snap = await getDocs(q);
		const doc = snap.docs[0];

		if (!doc) {
			error.value = "Business not found.";
			return;
		}

		const data = doc.data() as Business;
		businessEmail.value = data.email;
	} catch (err) {
		console.error(err);
		error.value = "Failed to load business email.";
	} finally {
		loading.value = false;
	}
};

onMounted(loadBusinessEmail);

// Submit feedback using emailService
const onSubmit = async () => {
	error.value = "";
	success.value = "";

	if (!message.value) {
		error.value = "Please write a message.";
		return;
	}

	if (!businessEmail.value) {
		error.value = "Business email missing.";
		return;
	}

	loading.value = true;

	try {
		await sendFeedbackEmail({
			businessEmail: businessEmail.value,
			message: message.value,
			userEmail: userEmail.value,
			businessId: route.params.businessId as string,
		});

		// Redirect to thank you page
		router.push("/thank-you");
	} catch (err) {
		console.error(err);
		error.value = "Failed to send message. Please try again.";
	} finally {
		loading.value = false;
	}
};
</script>

<template>
	<div class="min-h-screen bg-gray-50 p-4">
		<div class="max-w-md mx-auto">
			<div class="bg-white rounded-lg shadow-sm p-6 mb-6">
				<h1 class="text-2xl font-semibold text-gray-900 text-center mb-3">
					Share Your Feedback
				</h1>
				<p class="text-gray-700 text-center mb-6">
					Help us improve by sharing your thoughts
				</p>

				<form @submit.prevent="onSubmit" class="space-y-6">
					<div>
						<label class="block text-sm font-medium text-gray-900 mb-2">
							Your Feedback
						</label>
						<textarea v-model="message" rows="5"
							class="w-full border border-gray-400 rounded-md p-2 resize-none text-gray-900"
							placeholder="What did you like or how can we improve?" />
					</div>

					<div>
						<label class="block text-sm font-medium text-gray-900 mb-2">
							Your Email (Optional)
						</label>
						<input v-model="userEmail" type="email"
							class="w-full border border-gray-400 rounded-md p-2 text-gray-900"
							placeholder="you@example.com" />
					</div>

					<div v-if="error" class="p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-center">
						{{ error }}
					</div>

					<div v-if="success"
						class="p-3 bg-green-50 text-green-700 border border-green-200 rounded-lg text-center">
						{{ success }}
					</div>

					<button type="submit" :disabled="loading"
						class="w-full py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
						{{ loading ? "Sending..." : "Submit Feedback" }}
					</button>
				</form>
			</div>
		</div>
	</div>
</template>