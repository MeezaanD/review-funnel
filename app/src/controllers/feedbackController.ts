import { addDoc, collection } from "firebase/firestore";
import { db } from "../services/firebase";

export const submitFeedback = async (
	businessId: string,
	message: string,
	email?: string
) => {
	return await addDoc(collection(db, "feedback"), {
		businessId,
		message,
		email,
		timestamp: Date.now(),
	});
};
