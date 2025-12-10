<script setup lang="ts">
import { ref, onMounted } from "vue";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { RouterLink } from "vue-router";
import { type Business } from "../models/Business";
import { uploadLogo } from "../services/cloudinary";

const businesses = ref<Business[]>([]);
const loading = ref(false);
const editingId = ref<string | null>(null);

const editName = ref("");
const editEmail = ref("");
const editGoogle = ref("");
const editLogoFile = ref<File | null>(null);
const editPrimaryColor = ref("#2563eb");
const editSecondaryColor = ref("#1e293b");

const loadBusinesses = async () => {
	loading.value = true;
	const querySnapshot = await getDocs(collection(db, "businesses"));
	businesses.value = querySnapshot.docs.map(
		(doc) => ({ id: doc.id, ...doc.data() }) as Business
	);
	loading.value = false;
};

onMounted(loadBusinesses);

const startEdit = (b: Business) => {
	editingId.value = b.id;
	editName.value = b.name;
	editEmail.value = b.email;
	editGoogle.value = b.googleProfileUrl;
	editPrimaryColor.value = b.primaryColor || "#2563eb";
	editSecondaryColor.value = b.secondaryColor || "#1e293b";
	editLogoFile.value = null;
};

const getLogoSrc = (logo: string | null, file: File | null) => {
	return file ? globalThis.URL.createObjectURL(file) : logo ?? "";
};

const onFileChange = (e: Event) => {
	const target = e.target as HTMLInputElement;
	editLogoFile.value = target.files?.[0] ?? null;
};

const saveEdit = async () => {
	if (!editingId.value) return;

	const docRef = doc(db, "businesses", editingId.value);

	let logoUrlToUpdate: string | undefined = undefined;
	if (editLogoFile.value) {
		const uploaded = await uploadLogo(editLogoFile.value);
		if (uploaded) logoUrlToUpdate = uploaded;
	}

	await updateDoc(docRef, {
		name: editName.value,
		email: editEmail.value,
		googleProfileUrl: editGoogle.value,
		primaryColor: editPrimaryColor.value,
		secondaryColor: editSecondaryColor.value,
		...(logoUrlToUpdate && { logoUrl: logoUrlToUpdate }),
	});

	editingId.value = null;
	editLogoFile.value = null;
	await loadBusinesses();
};

const cancelEdit = () => {
	editingId.value = null;
	editLogoFile.value = null;
};

const deleteBusiness = async (id: string) => {
	if (!confirm("Are you sure you want to delete this business?")) return;
	try {
		const docRef = doc(db, "businesses", id);
		await deleteDoc(docRef);
		await loadBusinesses();
		alert("Business deleted successfully.");
	} catch (error) {
		console.error(error);
		alert("Failed to delete business.");
	}
};

const copyLink = (id: string) => {
	navigator.clipboard.writeText(`${window.location.origin}/${id}`);
	alert("Link copied to clipboard!");
};
</script>

<template>
	<div class="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 py-6 sm:py-10 px-4 sm:px-6">
		<!-- Header -->
		<div class="max-w-6xl mx-auto mb-6 sm:mb-10">
			<div class="bg-white/95 backdrop-blur rounded-3xl shadow-sm border border-slate-100 p-5 sm:p-8 lg:p-10">
				<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<div>
						<p class="text-xs uppercase tracking-[0.3em] text-slate-400 mb-2">Dashboard</p>
						<h1 class="text-2xl sm:text-3xl font-semibold text-slate-900 mb-1 sm:mb-2">Business Management
						</h1>
						<p class="text-sm sm:text-base text-slate-500">Manage your business profiles and review links
						</p>
					</div>
					<RouterLink to="/" class="self-start sm:self-auto inline-flex">
						<button class="btn btn-ghost text-sm px-4 py-2">
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M10 19l-7-7m0 0l7-7m-7 7h18" />
							</svg>
							Back to Home
						</button>
					</RouterLink>
				</div>
			</div>
		</div>

		<!-- Loading -->
		<div v-if="loading" class="max-w-6xl mx-auto">
			<div
				class="bg-white/95 backdrop-blur rounded-3xl shadow-sm border border-slate-100 p-8 sm:p-12 text-center">
				<div class="animate-pulse space-y-4">
					<div class="h-6 sm:h-8 bg-gray-200 rounded-lg w-1/2 sm:w-1/3 mx-auto"></div>
					<div class="h-4 bg-gray-200 rounded w-2/3 sm:w-1/2 mx-auto"></div>
				</div>
			</div>
		</div>

		<!-- Empty state -->
		<div v-else-if="!businesses.length" class="max-w-6xl mx-auto">
			<div
				class="bg-white/95 backdrop-blur rounded-3xl shadow-sm border border-slate-100 p-8 sm:p-12 text-center space-y-6">
				<div class="text-slate-400 text-base sm:text-lg">No businesses found</div>
				<RouterLink to="/create" class="inline-flex">
					<button class="btn btn-primary px-6 py-3 text-base">Create Your First Business</button>
				</RouterLink>
			</div>
		</div>

		<!-- Businesses list -->
		<div v-else class="max-w-6xl mx-auto">
			<div class="grid gap-4 sm:gap-6">
				<div v-for="b in businesses" :key="b.id"
					class="bg-white/95 backdrop-blur rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition">

					<!-- Edit Mode -->
					<div v-if="editingId === b.id" class="p-5 sm:p-7 lg:p-9">
						<div class="space-y-6">
							<!-- Logo Section -->
							<div
								class="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 pb-6 border-b border-slate-100">
								<div class="shrink-0 mx-auto sm:mx-0">
									<div v-if="b.logoUrl || editLogoFile" class="relative group">
										<img :src="getLogoSrc(b.logoUrl, editLogoFile)" alt="Business logo"
											class="h-20 w-20 sm:h-24 sm:w-24 object-cover rounded-2xl border border-slate-200 shadow-sm" />
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
									<label class="block text-sm font-medium text-gray-700 mb-2">Upload Logo</label>
									<input type="file" accept="image/*" @change="onFileChange"
										class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-2xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
								</div>
							</div>

							<!-- Business Info -->
							<div class="grid sm:grid-cols-2 gap-4 sm:gap-6">
								<div>
									<label class="block text-sm font-medium text-slate-700 mb-2">Business Name</label>
									<UInput v-model="editName" placeholder="Enter business name" :disabled="loading"
										:ui="{ base: 'bg-white/80 text-slate-900 border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500' }" />
								</div>
								<div>
									<label class="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
									<UInput v-model="editEmail" type="email" placeholder="business@example.com"
										:disabled="loading"
										:ui="{ base: 'bg-white/80 text-slate-900 border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500' }" />
								</div>
							</div>

							<div>
								<label class="block text-sm font-medium text-slate-700 mb-2">Google Profile URL</label>
								<UInput v-model="editGoogle" placeholder="https://g.page/your-business"
									:disabled="loading"
									:ui="{ base: 'bg-white/80 text-slate-900 border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500' }" />
							</div>

							<!-- Brand Colors -->
							<div class="pt-6 border-t border-slate-100">
								<label class="block text-sm font-semibold text-slate-800 mb-4">Brand Colors</label>
								<div class="grid sm:grid-cols-2 gap-4 sm:gap-6">
									<div>
										<label class="block text-xs text-slate-500 mb-2">Primary Color</label>
										<div class="flex items-center gap-3">
											<input type="color" v-model="editPrimaryColor"
												class="h-12 w-12 rounded-2xl cursor-pointer border border-slate-200 shadow-sm" />
											<span class="text-sm font-mono text-slate-600">{{ editPrimaryColor }}</span>
										</div>
									</div>
									<div>
										<label class="block text-xs text-slate-500 mb-2">Secondary Color</label>
										<div class="flex items-center gap-3">
											<input type="color" v-model="editSecondaryColor"
												class="h-12 w-12 rounded-2xl cursor-pointer border border-slate-200 shadow-sm" />
											<span class="text-sm font-mono text-slate-600">{{ editSecondaryColor
											}}</span>
										</div>
									</div>
								</div>
							</div>

							<!-- Action Buttons -->
							<div class="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-100">
								<button @click="saveEdit" class="btn btn-primary flex-1 w-full justify-center">
									Save Changes
								</button>
								<button @click="cancelEdit" class="btn btn-outline flex-1 w-full justify-center">
									Cancel
								</button>
							</div>
						</div>
					</div>

					<!-- View Mode -->
					<div v-else class="p-5 sm:p-7 lg:p-9">
						<div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-6">
							<!-- Business Info -->
							<div class="flex items-start gap-3 sm:gap-4 lg:gap-6 flex-1 min-w-0">
								<div class="shrink-0">
									<img v-if="b.logoUrl" :src="b.logoUrl" alt="Business logo"
										class="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 object-cover rounded-2xl border border-slate-200 shadow-sm" />
									<div v-else
										class="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 bg-linear-to-br from-gray-200 to-gray-300 rounded-xl sm:rounded-2xl flex items-center justify-center">
										<svg class="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-gray-400" fill="none"
											stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
												d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
										</svg>
									</div>
								</div>

								<div class="flex-1 min-w-0">
									<h3
										class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 wrap-break-word">
										{{ b.name }}</h3>
									<div class="space-y-1.5 sm:space-y-2">
										<div class="flex items-center gap-2 text-gray-600">
											<svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor"
												viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
													d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
											</svg>
											<span class="text-xs sm:text-sm truncate">{{ b.email }}</span>
										</div>
										<div class="flex items-center gap-2 text-gray-600">
											<svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor"
												viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
													d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
											</svg>
											<span class="text-xs sm:text-sm truncate">{{ b.googleProfileUrl }}</span>
										</div>
										<div class="flex items-center gap-3 pt-1 sm:pt-2 flex-wrap">
											<span class="text-xs text-gray-500 font-medium">Brand Colors:</span>
											<div class="flex items-center gap-2">
												<div class="h-6 w-6 sm:h-8 sm:w-8 rounded-xl shadow-sm border border-slate-200"
													:style="{ backgroundColor: b.primaryColor }"
													:title="`Primary: ${b.primaryColor}`"></div>
												<div class="h-6 w-6 sm:h-8 sm:w-8 rounded-xl shadow-sm border border-slate-200"
													:style="{ backgroundColor: b.secondaryColor }"
													:title="`Secondary: ${b.secondaryColor}`"></div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<!-- Actions - Mobile: Grid, Desktop: Vertical Stack -->
							<div
								class="grid grid-cols-2 sm:grid-cols-4 lg:flex lg:flex-col gap-2 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100 lg:border-none shrink-0">
								<button @click="startEdit(b)"
									class="btn btn-outline text-sm whitespace-nowrap justify-center">
									<svg class="w-4 h-4 sm:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
									</svg>
									<span class="hidden sm:inline">Edit</span>
								</button>
								<button @click="() => copyLink(b.id)"
									class="btn btn-outline text-sm whitespace-nowrap justify-center">
									<svg class="w-4 h-4 sm:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
									</svg>
									<span class="hidden sm:inline">Copy Link</span>
								</button>
								<RouterLink :to="`/${b.id}`" class="contents">
									<button class="btn btn-secondary w-full text-sm whitespace-nowrap justify-center">
										<svg class="w-4 h-4 sm:mr-1" fill="none" stroke="currentColor"
											viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
												d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
												d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
										</svg>
										<span class="hidden sm:inline">View</span>
									</button>
								</RouterLink>
								<button @click="() => deleteBusiness(b.id)"
									class="btn btn-danger text-sm whitespace-nowrap justify-center">
									<svg class="w-4 h-4 sm:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
									</svg>
									<span class="hidden sm:inline">Delete</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>