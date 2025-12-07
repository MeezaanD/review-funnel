<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../services/firebase";
import { type Business } from "../models/Business";

const route = useRoute();

const message = ref("");
const email = ref(""); // Optional, could be prefilled by user
const loading = ref(false);
const error = ref("");

const businessEmail = ref<string | null>(null);

const loadBusinessEmail = async () => {
	loading.value = true;
	error.value = "";

	const businessId = route.params?.businessId;
	if (!businessId || typeof businessId !== "string") {
		error.value = "Invalid business ID.";
		loading.value = false;
		return;
	}

	try {
		const businessQuery = query(
			collection(db, "businesses"),
			where("__name__", "==", businessId)
		);
		const querySnapshot = await getDocs(businessQuery);

		const firstDoc = querySnapshot.docs[0];
		if (!firstDoc) {
			error.value = "Business not found.";
			return;
		}

		const docData = firstDoc.data() as Business | undefined;
		if (!docData?.email) {
			error.value = "Business email not found.";
			return;
		}

		businessEmail.value = docData.email;
	} catch (err) {
		console.error(err);
		error.value = "Failed to load business email.";
	} finally {
		loading.value = false;
	}
};


onMounted(loadBusinessEmail);

const onSubmit = () => {
	if (!message.value) {
		error.value = "Please provide feedback.";
		return;
	}

	if (!businessEmail.value) {
		error.value = "Business email not found.";
		return;
	}

	// Construct mailto link
	const subject = encodeURIComponent("Feedback for your business");
	const body = encodeURIComponent(message.value + (email.value ? `\n\nFrom: ${email.value}` : ""));
	window.location.href = `mailto:${businessEmail.value}?subject=${subject}&body=${body}`;
};
</script>

<template>
	<div class="min-h-screen bg-gray-50 p-4">
		<div class="max-w-md mx-auto">
			<div class="bg-white rounded-lg shadow-sm p-6 mb-6">
				<div class="text-center mb-8">
					<h1 class="text-2xl font-semibold text-gray-900 mb-3">Share Your Feedback</h1>
					<p class="text-gray-800">Help us improve by sharing your thoughts</p>
				</div>

				<form @submit.prevent="onSubmit" class="space-y-6">
					<div>
						<label class="block text-sm font-medium text-gray-900 mb-2">Your Feedback</label>
						<textarea v-model="message" placeholder="What did you like or how can we improve?" rows="5"
							:disabled="loading"
							class="w-full border border-gray-400 rounded-md p-2 resize-none text-gray-900"></textarea>
					</div>

					<div>
						<label class="block text-sm font-medium text-gray-900 mb-2">Your Email (Optional)</label>
						<input v-model="email" placeholder="you@example.com" type="email" :disabled="loading"
							class="w-full border border-gray-400 rounded-md p-2 text-gray-900" />
					</div>

					<div v-if="error" class="p-3 bg-red-50 border border-red-200 rounded-lg">
						<p class="text-red-700 text-sm text-center">{{ error }}</p>
					</div>

					<div class="pt-2">
						<button type="submit" :disabled="loading"
							class="w-full py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
							{{ loading ? "Loading..." : "Submit Feedback" }}
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>