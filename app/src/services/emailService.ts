import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

interface FeedbackData {
	businessEmail: string;
	message: string;
	userEmail?: string;
	businessId?: string;
}

export const sendFeedbackEmail = async ({
	businessEmail,
	message,
	userEmail,
	businessId,
}: FeedbackData) => {
	if (!businessEmail) throw new Error("Business email is required.");
	if (!message) throw new Error("Message is required.");

	try {
		const response = await emailjs.send(
			SERVICE_ID,
			TEMPLATE_ID,
			{
				business_email: businessEmail,
				message,
				user_email: userEmail || "Not provided",
				business_id: businessId,
			},
			{ publicKey: PUBLIC_KEY }
		);

		return response;
	} catch (err: any) {
		console.error("EmailJS Error:", err);
		throw err;
	}
};
