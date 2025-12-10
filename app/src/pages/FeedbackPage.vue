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
	<div class="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 px-4 py-6 sm:px-6">
		<div class="max-w-xl mx-auto space-y-6">
			<div class="text-center space-y-2">
				<p class="text-xs uppercase tracking-[0.3em] text-slate-400">Feedback</p>
				<h1 class="text-3xl font-semibold text-slate-900">Share your thoughts</h1>
				<p class="text-base text-slate-500">Help us improve by sharing your experience.</p>
			</div>

			<div class="bg-white/95 backdrop-blur rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8">
				<form @submit.prevent="onSubmit" class="space-y-6">
					<div class="space-y-2">
						<label class="text-sm font-medium text-slate-700">Your feedback</label>
						<textarea v-model="message" rows="5"
							class="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-slate-900 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 resize-none"
							placeholder="What did you like or how can we improve?" />
					</div>

					<div class="space-y-2">
						<label class="text-sm font-medium text-slate-700">Your email (optional)</label>
						<input v-model="userEmail" type="email"
							class="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-slate-900 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
							placeholder="you@example.com" />
					</div>

					<div v-if="error"
						class="p-4 rounded-2xl border border-red-200 bg-red-50 text-center text-sm text-red-700">
						{{ error }}
					</div>

					<div v-if="success"
						class="p-4 rounded-2xl border border-emerald-200 bg-emerald-50 text-center text-sm text-emerald-700">
						{{ success }}
					</div>

					<button type="submit" :disabled="loading" class="btn btn-primary w-full justify-center">
						{{ loading ? "Sending..." : "Submit feedback" }}
					</button>
				</form>
			</div>
		</div>
	</div>
</template>