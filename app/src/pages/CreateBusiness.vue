<script setup lang="ts">
import { ref } from "vue";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../services/firebase";
import { useRouter } from "vue-router";
import { uploadLogo } from "../services/cloudinary";

const router = useRouter();

const name = ref("");
const email = ref("");
const googleProfileUrl = ref("");
const logoFile = ref<File | null>(null);
const bannerFile = ref<File | null>(null);

const primaryColor = ref("#2563eb");
const secondaryColor = ref("#1e293b");
const pageBackgroundColor = ref("#d6d3d1");
const contentCardColor = ref("#ffffff");
const starContainerColor = ref("#f5f5f4");

const loading = ref(false);
const error = ref("");

const onLogoChange = (e: Event) => {
	const target = e.target as HTMLInputElement;
	logoFile.value = target.files?.[0] ?? null;
};

const onBannerChange = (e: Event) => {
	const target = e.target as HTMLInputElement;
	bannerFile.value = target.files?.[0] ?? null;
};

const getLogoPreview = () => {
	return logoFile.value ? URL.createObjectURL(logoFile.value) : null;
};

const getBannerPreview = () => {
	return bannerFile.value ? URL.createObjectURL(bannerFile.value) : null;
};

const onSubmit = async () => {
	if (!name.value || !email.value || !googleProfileUrl.value) {
		error.value = "All fields are required.";
		return;
	}

	loading.value = true;
	error.value = "";

	try {
		const logoUrl = logoFile.value ? await uploadLogo(logoFile.value) : null;
		const bannerUrl = bannerFile.value ? await uploadLogo(bannerFile.value) : null;

		const docRef = await addDoc(collection(db, "businesses"), {
			name: name.value,
			email: email.value,
			googleProfileUrl: googleProfileUrl.value,
			logoUrl,
			displayBanner: bannerUrl,
			primaryColor: primaryColor.value,
			secondaryColor: secondaryColor.value,
			pageBackgroundColor: pageBackgroundColor.value,
			contentCardColor: contentCardColor.value,
			starContainerColor: starContainerColor.value,
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
	<div class="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 py-6 sm:py-10 px-4 sm:px-6">
		<!-- Header -->
		<div class="max-w-2xl mx-auto mb-6 sm:mb-10">
			<div class="bg-white/95 backdrop-blur rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8 lg:p-10">
				<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
					<div>
						<p class="text-xs uppercase tracking-[0.3em] text-slate-400 mb-2">Create</p>
						<h1 class="text-2xl sm:text-3xl font-semibold text-slate-900">Create Business</h1>
						<p class="text-sm sm:text-base text-slate-500">Add branding and create shareable review funnels
						</p>
					</div>
					<RouterLink to="/admin" class="self-start sm:self-auto inline-flex">
						<button class="btn btn-ghost text-sm px-4 py-2">
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M10 19l-7-7m0 0l7-7m-7 7h18" />
							</svg>
							Back to Admin
						</button>
					</RouterLink>
				</div>
			</div>
		</div>

		<!-- Form -->
		<div class="max-w-2xl mx-auto">
			<div class="bg-white/95 backdrop-blur rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
				<form @submit.prevent="onSubmit" class="p-6 sm:p-8 lg:p-10">
					<div class="space-y-6">
						<!-- Logo Upload Section -->
						<div class="pb-6 border-b border-slate-100">
							<label class="block text-sm font-semibold text-slate-800 mb-4">Business Logo</label>
							<div class="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
								<div class="shrink-0 mx-auto sm:mx-0">
									<div v-if="getLogoPreview()" class="relative group">
										<img :src="getLogoPreview()!" alt="Logo preview"
											class="h-20 w-20 sm:h-24 sm:w-24 object-cover rounded-2xl border border-slate-200 shadow-sm" />
										<div
											class="absolute inset-0 bg-black bg-opacity-40 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
											<span class="text-white text-xs font-medium">Change</span>
										</div>
									</div>
									<div v-else
										class="h-20 w-20 sm:h-24 sm:w-24 bg-linear-to-br from-slate-200 to-slate-300 rounded-2xl flex items-center justify-center">
										<svg class="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" fill="none"
											stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
												d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
										</svg>
									</div>
								</div>
								<div class="flex-1">
									<p class="text-sm text-slate-500 mb-2">Upload your business logo (PNG, JPG, or SVG)
									</p>
									<input type="file" accept="image/*" @change="onLogoChange" :disabled="loading"
										class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-2xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" />
								</div>
							</div>
						</div>

						<!-- Banner Upload Section -->
						<div class="pb-6 border-b border-slate-100">
							<label class="block text-sm font-semibold text-slate-800 mb-4">Display Banner</label>
							<div class="space-y-4">
								<div v-if="getBannerPreview()" class="relative group">
									<img :src="getBannerPreview()!" alt="Banner preview"
										class="w-full h-48 object-cover rounded-2xl border border-slate-200 shadow-sm" />
									<div
										class="absolute inset-0 bg-black bg-opacity-40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
										<span class="text-white text-sm font-medium">Change Banner</span>
									</div>
								</div>
								<div v-else
									class="w-full h-48 bg-linear-to-br from-slate-200 to-slate-300 rounded-2xl flex items-center justify-center">
									<svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor"
										viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
									</svg>
								</div>
								<input type="file" accept="image/*" @change="onBannerChange" :disabled="loading"
									class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-2xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" />
								<p class="text-xs text-slate-500">Recommended size: 800x400px for best display</p>
							</div>
						</div>

						<!-- Business Information -->
						<div class="space-y-6">
							<div class="grid sm:grid-cols-2 gap-4 sm:gap-6">
								<div>
									<label class="block text-sm font-medium text-slate-700 mb-2">Business Name</label>
									<UInput v-model="name" placeholder="Enter business name" :disabled="loading"
										:ui="{ base: 'bg-white/80 text-slate-900 border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500' }" />
								</div>
								<div>
									<label class="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
									<UInput v-model="email" type="email" placeholder="business@example.com"
										:disabled="loading"
										:ui="{ base: 'bg-white/80 text-slate-900 border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500' }" />
								</div>
							</div>

							<div>
								<label class="block text-sm font-medium text-slate-700 mb-2">Google Profile URL</label>
								<UInput v-model="googleProfileUrl" placeholder="https://g.page/your-business"
									:disabled="loading"
									:ui="{ base: 'bg-white/80 text-slate-900 border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500' }" />
							</div>
						</div>

						<!-- Brand Colors -->
						<div class="pt-6 border-t border-slate-100">
							<label class="block text-sm font-semibold text-slate-800 mb-4">Brand Colors</label>
							<div class="grid sm:grid-cols-2 gap-4 sm:gap-6">
								<div>
									<label class="block text-xs text-slate-500 mb-2">Primary Color</label>
									<div class="flex items-center gap-3">
										<input type="color" v-model="primaryColor" :disabled="loading"
											class="h-12 w-12 rounded-2xl cursor-pointer border border-slate-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed" />
										<span class="text-sm font-mono text-gray-600">{{ primaryColor }}</span>
									</div>
								</div>
								<div>
									<label class="block text-xs text-slate-500 mb-2">Secondary Color</label>
									<div class="flex items-center gap-3">
										<input type="color" v-model="secondaryColor" :disabled="loading"
											class="h-12 w-12 rounded-2xl cursor-pointer border border-slate-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed" />
										<span class="text-sm font-mono text-gray-600">{{ secondaryColor }}</span>
									</div>
								</div>
							</div>
							<div class="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
								<p class="text-xs text-slate-600">
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

						<!-- Background Colors -->
						<div class="pt-6 border-t border-slate-100">
							<label class="block text-sm font-semibold text-slate-800 mb-4">Background Colors</label>
							<div class="grid sm:grid-cols-3 gap-4 sm:gap-6">
								<div>
									<label class="block text-xs text-slate-500 mb-2">Page Background</label>
									<div class="flex items-center gap-3">
										<input type="color" v-model="pageBackgroundColor" :disabled="loading"
											class="h-12 w-12 rounded-2xl cursor-pointer border border-slate-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed" />
										<span class="text-sm font-mono text-gray-600">{{ pageBackgroundColor }}</span>
									</div>
								</div>
								<div>
									<label class="block text-xs text-slate-500 mb-2">Content Card</label>
									<div class="flex items-center gap-3">
										<input type="color" v-model="contentCardColor" :disabled="loading"
											class="h-12 w-12 rounded-2xl cursor-pointer border border-slate-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed" />
										<span class="text-sm font-mono text-gray-600">{{ contentCardColor }}</span>
									</div>
								</div>
								<div>
									<label class="block text-xs text-slate-500 mb-2">Star Container</label>
									<div class="flex items-center gap-3">
										<input type="color" v-model="starContainerColor" :disabled="loading"
											class="h-12 w-12 rounded-2xl cursor-pointer border border-slate-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed" />
										<span class="text-sm font-mono text-gray-600">{{ starContainerColor }}</span>
									</div>
								</div>
							</div>
							<div class="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
								<p class="text-xs text-slate-600">
									<svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor"
										viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
									These colors control the background appearance of your review funnel page.
								</p>
							</div>
						</div>

						<!-- Error Message -->
						<div v-if="error" class="p-4 bg-red-50 border border-red-200 rounded-2xl">
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
						<div class="pt-6 border-t border-slate-100">
							<button type="submit" :disabled="loading" class="btn btn-primary w-full justify-center">
								<svg v-if="!loading" class="w-5 h-5" fill="none" stroke="currentColor"
									viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M12 4v16m8-8H4" />
								</svg>
								{{ loading ? "Creating Business..." : "Create Business" }}
							</button>
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