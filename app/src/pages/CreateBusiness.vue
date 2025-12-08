<script setup lang="ts">
import { ref } from "vue";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../services/firebase";
import { useRouter } from "vue-router";

const router = useRouter();

const name = ref("");
const email = ref("");
const googleProfileUrl = ref("");
const logoFile = ref<File | null>(null);

const primaryColor = ref("#2563eb");   // default blue
const secondaryColor = ref("#1e293b"); // default slate

const loading = ref(false);
const error = ref("");

// handle file selection
const onFileChange = (e: Event) => {
	const target = e.target as HTMLInputElement;
	const file = target.files?.[0] ?? null;
	logoFile.value = file;
};

// Get preview URL for selected logo
const getLogoPreview = () => {
	return logoFile.value ? URL.createObjectURL(logoFile.value) : null;
};

// upload image to Cloudinary (unsigned)
const uploadLogo = async (): Promise<string | null> => {
	if (!logoFile.value) return null;

	const formData = new FormData();
	formData.append("file", logoFile.value);
	formData.append("upload_preset", "review_funnel"); // replace with your preset name
	formData.append("folder", "logos"); // optional folder

	try {
		const res = await fetch("https://api.cloudinary.com/v1_1/duuyolqrm/upload", {
			method: "POST",
			body: formData,
		});

		const data = await res.json();

		if (!res.ok) {
			console.error("Cloudinary error:", data);
			return null;
		}

		return data.secure_url;
	} catch (err) {
		console.error("Cloudinary upload failed:", err);
		return null;
	}
};

// handle form submission
const onSubmit = async () => {
	if (!name.value || !email.value || !googleProfileUrl.value) {
		error.value = "All fields are required.";
		return;
	}

	loading.value = true;
	error.value = "";

	try {
		const logoUrl = await uploadLogo(); // upload logo first

		const docRef = await addDoc(collection(db, "businesses"), {
			name: name.value,
			email: email.value,
			googleProfileUrl: googleProfileUrl.value,
			logoUrl, // this will now be the Cloudinary URL
			primaryColor: primaryColor.value,
			secondaryColor: secondaryColor.value,
			createdAt: Date.now(),
		});

		alert(`Business created! Shareable link: ${window.location.origin}/${docRef.id}`);
		router.push("/admin");
	} catch (err) {
		console.error(err);
		error.value = "Failed to create business.";
	} finally {
		loading.value = false;
	}
};
</script>

<template>
	<div class="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-4 sm:py-8 px-3 sm:px-4">
		<!-- Header -->
		<div class="max-w-2xl mx-auto mb-4 sm:mb-8">
			<div class="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">
				<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<div>
						<h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Create Business
						</h1>
						<p class="text-sm sm:text-base text-gray-500">Add branding and create shareable review funnels
						</p>
					</div>
					<RouterLink to="/admin" class="self-start sm:self-auto">
						<UButton variant="ghost" size="sm" class="text-gray-600 hover:text-gray-900">
							← Back to Admin
						</UButton>
					</RouterLink>
				</div>
			</div>
		</div>

		<!-- Form -->
		<div class="max-w-2xl mx-auto">
			<div class="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
				<form @submit.prevent="onSubmit" class="p-4 sm:p-6 lg:p-8">
					<div class="space-y-4 sm:space-y-6">
						<!-- Logo Upload Section -->
						<div class="pb-4 sm:pb-6 border-b border-gray-100">
							<label class="block text-sm font-medium text-gray-700 mb-4">Business Logo</label>
							<div class="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
								<div class="shrink-0 mx-auto sm:mx-0">
									<div v-if="getLogoPreview()" class="relative group">
										<img :src="getLogoPreview()!" alt="Logo preview"
											class="h-20 w-20 sm:h-24 sm:w-24 object-cover rounded-xl sm:rounded-2xl border-2 border-gray-200 shadow-sm" />
										<div
											class="absolute inset-0 bg-black bg-opacity-40 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
											<span class="text-white text-xs font-medium">Change</span>
										</div>
									</div>
									<div v-else
										class="h-20 w-20 sm:h-24 sm:w-24 bg-linear-to-br from-gray-200 to-gray-300 rounded-xl sm:rounded-2xl flex items-center justify-center">
										<svg class="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" fill="none"
											stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
												d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
										</svg>
									</div>
								</div>
								<div class="flex-1">
									<p class="text-sm text-gray-500 mb-2">Upload your business logo (PNG, JPG, or SVG)
									</p>
									<input type="file" accept="image/*" @change="onFileChange" :disabled="loading"
										class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" />
								</div>
							</div>
						</div>

						<!-- Business Information -->
						<div class="space-y-4 sm:space-y-6">
							<div class="grid sm:grid-cols-2 gap-4 sm:gap-6">
								<div>
									<label class="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
									<UInput v-model="name" placeholder="Enter business name" :disabled="loading"
										:ui="{ base: 'bg-white text-gray-900 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent' }" />
								</div>
								<div>
									<label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
									<UInput v-model="email" type="email" placeholder="business@example.com"
										:disabled="loading"
										:ui="{ base: 'bg-white text-gray-900 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent' }" />
								</div>
							</div>

							<div>
								<label class="block text-sm font-medium text-gray-700 mb-2">Google Profile URL</label>
								<UInput v-model="googleProfileUrl" placeholder="https://g.page/your-business"
									:disabled="loading"
									:ui="{ base: 'bg-white text-gray-900 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent' }" />
							</div>
						</div>

						<!-- Brand Colors -->
						<div class="pt-4 sm:pt-6 border-t border-gray-100">
							<label class="block text-sm font-medium text-gray-700 mb-4">Brand Colors</label>
							<div class="grid sm:grid-cols-2 gap-4 sm:gap-6">
								<div>
									<label class="block text-xs text-gray-500 mb-2">Primary Color</label>
									<div class="flex items-center gap-3">
										<input type="color" v-model="primaryColor" :disabled="loading"
											class="h-12 w-12 rounded-lg cursor-pointer border-2 border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed" />
										<span class="text-sm font-mono text-gray-600">{{ primaryColor }}</span>
									</div>
								</div>
								<div>
									<label class="block text-xs text-gray-500 mb-2">Secondary Color</label>
									<div class="flex items-center gap-3">
										<input type="color" v-model="secondaryColor" :disabled="loading"
											class="h-12 w-12 rounded-lg cursor-pointer border-2 border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed" />
										<span class="text-sm font-mono text-gray-600">{{ secondaryColor }}</span>
									</div>
								</div>
							</div>
							<div class="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
								<p class="text-xs text-gray-600">
									<svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor"
										viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
									These colors will be used throughout your review funnel pages to match your brand
									identity.
								</p>
							</div>
						</div>

						<!-- Error Message -->
						<div v-if="error" class="p-4 bg-red-50 border border-red-200 rounded-lg">
							<div class="flex items-start gap-3">
								<svg class="w-5 h-5 text-red-600 shrink-0 mt-0.5" fill="none" stroke="currentColor"
									viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<p class="text-red-600 text-sm">{{ error }}</p>
							</div>
						</div>

						<!-- Submit Button -->
						<div class="pt-4 sm:pt-6 border-t border-gray-100">
							<UButton :loading="loading" :disabled="loading" type="submit" size="lg"
								class="w-full justify-center">
								<svg v-if="!loading" class="w-5 h-5 mr-2" fill="none" stroke="currentColor"
									viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M12 4v16m8-8H4" />
								</svg>
								{{ loading ? "Creating Business..." : "Create Business" }}
							</UButton>
							<p class="text-xs text-gray-500 text-center mt-3">
								After creation, you'll receive a shareable link for your review funnel
							</p>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>