const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL as string;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string;

/**
 * Uploads a file to Cloudinary and returns the URL
 * @param file File to upload
 * @returns string | null URL of uploaded image, or null if failed
 */
export const uploadLogo = async (file: File): Promise<string | null> => {
	try {
		const formData = new FormData();
		formData.append("file", file);
		formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

		const res = await fetch(CLOUDINARY_URL, {
			method: "POST",
			body: formData,
		});

		if (!res.ok) {
			const errorData = await res.json();
			console.error("Cloudinary error:", errorData);
			return null;
		}

		const data = await res.json();
		return data.secure_url as string;
	} catch (err) {
		console.error("Cloudinary upload failed:", err);
		return null;
	}
};

