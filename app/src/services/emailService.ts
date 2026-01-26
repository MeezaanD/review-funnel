import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

interface FeedbackData {
	businessEmail: string;
	message: string;
	userEmail: string;
	cellphoneNumber?: string;
	businessId?: string;
}

export const sendFeedbackEmail = async ({
	businessEmail,
	message,
	userEmail,
	cellphoneNumber,
	businessId,
}: FeedbackData) => {
	if (!businessEmail) throw new Error("Business email is required.");
	if (!message) throw new Error("Message is required.");
	if (!userEmail) throw new Error("User email is required.");

	if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
		throw new Error("Email service is not properly configured.");
	}

	try {
		const response = await emailjs.send(
			SERVICE_ID,
			TEMPLATE_ID,
			{
				business_email: businessEmail,
				message,
				user_email: userEmail,
				cellphone_number: cellphoneNumber || "Not provided",
				business_id: businessId,
			},
			{ publicKey: PUBLIC_KEY }
		);

		return response;
	} catch (err: any) {
		console.error("EmailJS Error:", err);
		const errorMessage =
			(err && (err.text || err.message)) ||
			(typeof err === "string" ? err : "") ||
			"Failed to send email. Please try again.";
		throw new Error(errorMessage);
	}
};
