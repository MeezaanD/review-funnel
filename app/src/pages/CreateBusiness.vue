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
	<div class="min-h-screen bg-gray-50 p-4">
		<div class="max-w-md mx-auto">
			<div class="bg-white rounded-lg shadow-sm p-6 mb-6">
				<div class="text-center mb-8">
					<h1 class="text-2xl font-semibold text-gray-900 mb-2">Create Business</h1>
					<p class="text-gray-600">Add branding and create shareable review funnels</p>
				</div>

				<form @submit.prevent="onSubmit" class="space-y-5">
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
						<UInput v-model="name" placeholder="Enter business name" size="lg" />
					</div>

					<div>
						<label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
						<UInput v-model="email" type="email" placeholder="business@example.com" size="lg" />
					</div>

					<div>
						<label class="block text-sm font-medium text-gray-700 mb-2">Google Profile URL</label>
						<UInput v-model="googleProfileUrl" placeholder="https://g.page/your-business" size="lg" />
					</div>

					<!-- Logo Upload -->
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-2">Logo</label>
						<input type="file" accept="image/*" @change="onFileChange" class="block w-full text-sm" />
					</div>

					<!-- Color Pickers -->
					<div class="grid grid-cols-2 gap-4">
						<div>
							<label class="block text-sm">Primary Color</label>
							<input type="color" v-model="primaryColor" class="w-full h-10 rounded" />
						</div>

						<div>
							<label class="block text-sm">Secondary Color</label>
							<input type="color" v-model="secondaryColor" class="w-full h-10 rounded" />
						</div>
					</div>

					<div v-if="error" class="p-3 bg-red-50 border border-red-200 rounded-lg">
						<p class="text-red-600 text-sm text-center">{{ error }}</p>
					</div>

					<UButton :loading="loading" class="w-full justify-center" size="lg" type="submit">
						{{ loading ? "Creating..." : "Create Business" }}
					</UButton>
				</form>
			</div>
		</div>
	</div>
</template>
