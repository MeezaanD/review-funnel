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

// method to get the logo src safely
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
	<div class="min-h-screen bg-gray-50 p-4">
		<!-- Header -->
		<div class="max-w-4xl mx-auto mb-6">
			<div class="bg-white rounded-lg shadow-sm p-6 text-center">
				<h1 class="text-2xl font-semibold text-gray-900 mb-2">Businesses</h1>
				<p class="text-gray-600">Manage your business profiles and review links</p>
				<div class="mt-6">
					<RouterLink to="/">
						<UButton variant="ghost" size="sm" class="text-gray-600">← Back to Home</UButton>
					</RouterLink>
				</div>
			</div>
		</div>

		<!-- Loading -->
		<div v-if="loading" class="max-w-4xl mx-auto">
			<div class="bg-white rounded-lg shadow-sm p-8 text-center">
				<div class="animate-pulse">
					<div class="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
					<div class="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
				</div>
			</div>
		</div>

		<!-- Empty state -->
		<div v-else-if="!businesses.length" class="max-w-4xl mx-auto">
			<div class="bg-white rounded-lg shadow-sm p-8 text-center">
				<div class="text-gray-500 mb-4">No businesses found</div>
				<RouterLink to="/create">
					<UButton>Create First Business</UButton>
				</RouterLink>
			</div>
		</div>

		<!-- Businesses list -->
		<div v-else class="max-w-4xl mx-auto space-y-4">
			<!-- Desktop Table -->
			<div class="hidden lg:block bg-white rounded-lg shadow-sm overflow-hidden">
				<div class="overflow-x-auto">
					<table class="min-w-full divide-y divide-gray-200">
						<thead class="bg-gray-50">
							<tr>
								<th
									class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Business</th>
								<th
									class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Contact</th>
								<th
									class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Branding</th>
								<th
									class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Actions</th>
							</tr>
						</thead>
						<tbody class="bg-white divide-y divide-gray-200">
							<tr v-for="b in businesses" :key="b.id">
								<!-- Business & Logo -->
								<td class="px-6 py-4">
									<div v-if="editingId === b.id" class="space-y-2">
										<UInput v-model="editName" placeholder="Business Name" />
										<UInput v-model="editGoogle" placeholder="Google Profile URL" />
										<div class="flex items-center gap-2">
											<div v-if="b.logoUrl || editLogoFile">
												<img :src="getLogoSrc(b.logoUrl, editLogoFile)" alt="logo"
													class="h-16 w-16 object-cover rounded-full border-2 border-gray-200 shadow-sm" />
											</div>
											<div v-else class="h-12 w-12 bg-gray-200 rounded-full"></div>
											<input type="file" accept="image/*" @change="onFileChange" />
										</div>
									</div>
									<div v-else class="flex items-center gap-2">
										<img v-if="b.logoUrl" :src="b.logoUrl"
											class="h-16 w-16 object-cover rounded-full border-2 border-gray-200 shadow-sm" />
										<div class="font-medium text-gray-900">{{ b.name }}</div>
									</div>
								</td>

								<!-- Contact -->
								<td class="px-6 py-4">
									<div v-if="editingId === b.id">
										<UInput v-model="editEmail" placeholder="Email" type="email" />
									</div>
									<div v-else class="text-gray-900">{{ b.email }}</div>
								</td>

								<!-- Branding -->
								<td class="px-6 py-4">
									<div v-if="editingId === b.id" class="flex gap-2">
										<input type="color" v-model="editPrimaryColor" class="h-8 w-8 rounded"
											title="Primary Color" />
										<input type="color" v-model="editSecondaryColor" class="h-8 w-8 rounded"
											title="Secondary Color" />
									</div>
									<div v-else class="flex gap-2">
										<div class="h-6 w-6 rounded" :style="{ backgroundColor: b.primaryColor }"></div>
										<div class="h-6 w-6 rounded" :style="{ backgroundColor: b.secondaryColor }">
										</div>
									</div>
								</td>

								<!-- Actions -->
								<td class="px-6 py-4">
									<div v-if="editingId === b.id" class="space-x-2">
										<UButton size="sm" @click="saveEdit">Save</UButton>
										<UButton size="sm" variant="ghost" @click="cancelEdit">Cancel</UButton>
									</div>
									<div v-else class="flex gap-2 flex-wrap">
										<UButton size="sm" variant="outline" @click="startEdit(b)">Edit</UButton>
										<UButton size="sm" variant="outline" @click="() => copyLink(b.id)">Copy Link
										</UButton>
										<RouterLink :to="`/${b.id}`">
											<UButton size="sm">View</UButton>
										</RouterLink>
										<UButton size="sm" variant="outline" color="red"
											@click="() => deleteBusiness(b.id)"
											class="text-red-600 border-red-200 hover:bg-red-50">Delete</UButton>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<!-- Mobile Cards -->
			<div class="lg:hidden space-y-4">
				<div v-for="b in businesses" :key="b.id" class="bg-white rounded-lg shadow-sm p-4">
					<div v-if="editingId === b.id" class="space-y-4">
						<UInput v-model="editName" placeholder="Business Name" />
						<UInput v-model="editEmail" placeholder="Email" type="email" />
						<UInput v-model="editGoogle" placeholder="Google Profile URL" />
						<div class="flex items-center gap-2">
							<div v-if="b.logoUrl || editLogoFile">
								<img :src="getLogoSrc(b.logoUrl, editLogoFile)" alt="logo"
									class="h-16 w-16 object-cover rounded-full border-2 border-gray-200 shadow-sm" />
							</div>
							<div v-else class="h-12 w-12 bg-gray-200 rounded-full"></div>
							<input type="file" accept="image/*" @change="onFileChange" />
						</div>
						<div class="flex gap-2 pt-2">
							<input type="color" v-model="editPrimaryColor" class="h-8 w-8 rounded"
								title="Primary Color" />
							<input type="color" v-model="editSecondaryColor" class="h-8 w-8 rounded"
								title="Secondary Color" />
						</div>
						<div class="flex gap-2 pt-2">
							<UButton size="sm" @click="saveEdit" class="flex-1">Save</UButton>
							<UButton size="sm" variant="ghost" @click="cancelEdit" class="flex-1">Cancel</UButton>
						</div>
					</div>

					<div v-else class="space-y-3">
						<div class="flex items-center gap-2">
							<img v-if="b.logoUrl" :src="b.logoUrl"
								class="h-16 w-16 object-cover rounded-full border-2 border-gray-200 shadow-sm" />
							<h3 class="font-semibold text-gray-900">{{ b.name }}</h3>
						</div>
						<p class="text-sm text-gray-600">{{ b.email }}</p>
						<p class="text-sm text-gray-500 truncate">{{ b.googleProfileUrl }}</p>
						<div class="flex gap-2 pt-2">
							<div class="h-6 w-6 rounded" :style="{ backgroundColor: b.primaryColor }"></div>
							<div class="h-6 w-6 rounded" :style="{ backgroundColor: b.secondaryColor }"></div>
						</div>
						<div class="grid grid-cols-2 gap-2 pt-2">
							<UButton size="sm" variant="outline" @click="startEdit(b)" class="col-span-1">Edit</UButton>
							<UButton size="sm" variant="outline" @click="() => copyLink(b.id)" class="col-span-1">Copy
								Link</UButton>
							<RouterLink :to="`/${b.id}`" class="col-span-1">
								<UButton size="sm">View</UButton>
							</RouterLink>
							<UButton size="sm" variant="outline" color="red" @click="() => deleteBusiness(b.id)"
								class="col-span-1 text-red-600 border-red-200 hover:bg-red-50">Delete</UButton>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
