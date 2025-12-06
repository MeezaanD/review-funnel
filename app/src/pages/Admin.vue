<script setup lang="ts">
import { ref, onMounted } from "vue";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { RouterLink } from "vue-router";

interface Business {
	id: string;
	name: string;
	email: string;
	googleProfileUrl: string;
	createdAt: number;
}

const businesses = ref<Business[]>([]);
const loading = ref(false);
const editingId = ref<string | null>(null);
const editName = ref("");
const editEmail = ref("");
const editGoogle = ref("");

const loadBusinesses = async () => {
	loading.value = true;
	const querySnapshot = await getDocs(collection(db, "businesses"));
	businesses.value = querySnapshot.docs.map(
		(doc) => ({ id: doc.id, ...doc.data() }) as Business,
	);
	loading.value = false;
};

onMounted(loadBusinesses);

const startEdit = (b: Business) => {
	editingId.value = b.id;
	editName.value = b.name;
	editEmail.value = b.email;
	editGoogle.value = b.googleProfileUrl;
};

const saveEdit = async () => {
	if (!editingId.value) return;
	const docRef = doc(db, "businesses", editingId.value);
	await updateDoc(docRef, {
		name: editName.value,
		email: editEmail.value,
		googleProfileUrl: editGoogle.value,
	});
	editingId.value = null;
	await loadBusinesses();
};

const cancelEdit = () => {
	editingId.value = null;
};

const copyLink = (id: string) => {
	navigator.clipboard.writeText(`${window.location.origin}/${id}`);
	alert("Link copied to clipboard!");
};
</script>

<template>
	<div class="min-h-screen bg-gray-50 p-4">
		<!-- Header Card (Consistent with home page) -->
		<div class="max-w-4xl mx-auto mb-6">
			<div class="bg-white rounded-lg shadow-sm p-6">
				<div class="text-center">
					<h1 class="text-2xl font-semibold text-gray-900 mb-2">
						Businesses
					</h1>
					<p class="text-gray-600">
						Manage your business profiles and review links
					</p>
				</div>

				<!-- Back to Home Link -->
				<div class="mt-6 text-center">
					<RouterLink to="/">
						<UButton variant="ghost" size="sm" class="text-gray-600">
							← Back to Home
						</UButton>
					</RouterLink>
				</div>
			</div>
		</div>

		<!-- Loading State -->
		<div v-if="loading" class="max-w-4xl mx-auto">
			<div class="bg-white rounded-lg shadow-sm p-8 text-center">
				<div class="animate-pulse">
					<div class="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
					<div class="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
				</div>
			</div>
		</div>

		<!-- Empty State -->
		<div v-else-if="!businesses.length" class="max-w-4xl mx-auto">
			<div class="bg-white rounded-lg shadow-sm p-8 text-center">
				<div class="text-gray-500 mb-4">
					No businesses found
				</div>
				<RouterLink to="/create">
					<UButton>
						Create First Business
					</UButton>
				</RouterLink>
			</div>
		</div>

		<!-- Business List (Mobile: Cards, Desktop: Table) -->
		<div v-else class="max-w-4xl mx-auto space-y-4">
			<!-- Desktop Table (hidden on mobile) -->
			<div class="hidden lg:block bg-white rounded-lg shadow-sm overflow-hidden">
				<div class="overflow-x-auto">
					<table class="min-w-full divide-y divide-gray-200">
						<thead class="bg-gray-50">
							<tr>
								<th
									class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Business
								</th>
								<th
									class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Contact
								</th>
								<th
									class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Actions
								</th>
							</tr>
						</thead>
						<tbody class="bg-white divide-y divide-gray-200">
							<tr v-for="b in businesses" :key="b.id">
								<td class="px-6 py-4">
									<div v-if="editingId === b.id" class="space-y-2">
										<UInput v-model="editName" placeholder="Business Name" />
										<UInput v-model="editGoogle" placeholder="Google Profile URL" />
									</div>
									<div v-else>
										<div class="font-medium text-gray-900">{{ b.name }}</div>
										<div class="text-sm text-gray-500 truncate max-w-xs">
											{{ b.googleProfileUrl }}
										</div>
									</div>
								</td>

								<td class="px-6 py-4">
									<div v-if="editingId === b.id">
										<UInput v-model="editEmail" placeholder="Email" type="email" />
									</div>
									<div v-else class="text-gray-900">{{ b.email }}</div>
								</td>

								<td class="px-6 py-4">
									<div v-if="editingId === b.id" class="space-x-2">
										<UButton size="sm" @click="saveEdit">Save</UButton>
										<UButton size="sm" variant="ghost" @click="cancelEdit">Cancel</UButton>
									</div>
									<div v-else class="flex gap-2 flex-wrap">
										<UButton size="sm" variant="outline" @click="startEdit(b)">
											Edit
										</UButton>
										<UButton size="sm" variant="outline" @click="() => copyLink(b.id)">
											Copy Link
										</UButton>
										<RouterLink :to="`/${b.id}`">
											<UButton size="sm">
												View
											</UButton>
										</RouterLink>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<!-- Mobile Cards (visible on mobile) -->
			<div class="lg:hidden space-y-4">
				<div v-for="b in businesses" :key="b.id" class="bg-white rounded-lg shadow-sm p-4">

					<div v-if="editingId === b.id" class="space-y-4">
						<UInput v-model="editName" placeholder="Business Name" />
						<UInput v-model="editEmail" placeholder="Email" type="email" />
						<UInput v-model="editGoogle" placeholder="Google Profile URL" />

						<div class="flex gap-2 pt-2">
							<UButton size="sm" @click="saveEdit" class="flex-1">
								Save
							</UButton>
							<UButton size="sm" variant="ghost" @click="cancelEdit" class="flex-1">
								Cancel
							</UButton>
						</div>
					</div>

					<div v-else>
						<div class="space-y-3">
							<div>
								<h3 class="font-semibold text-gray-900">{{ b.name }}</h3>
								<p class="text-sm text-gray-600 mt-1">{{ b.email }}</p>
								<p class="text-sm text-gray-500 truncate mt-1">{{ b.googleProfileUrl }}</p>
							</div>

							<div class="flex gap-2 pt-2">
								<UButton size="sm" variant="outline" @click="startEdit(b)" class="flex-1">
									Edit
								</UButton>
								<UButton size="sm" variant="outline" @click="() => copyLink(b.id)" class="flex-1">
									Copy Link
								</UButton>
								<RouterLink :to="`/${b.id}`" class="flex-1">
									<UButton size="sm" class="w-full">
										View
									</UButton>
								</RouterLink>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>