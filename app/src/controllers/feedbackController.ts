import { addDoc, collection } from "firebase/firestore";
import { db } from "../services/firebase";

export const submitFeedback = async (
	businessId: string,
	message: string,
	email: string,
	cellphoneNumber?: string
) => {
	return await addDoc(collection(db, "feedback"), {
		businessId,
		message,
		email,
		cellphoneNumber,
		timestamp: Date.now(),
	});
};
