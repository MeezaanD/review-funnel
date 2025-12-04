import { addDoc, collection } from "firebase/firestore";
import { db } from "../services/firebase";

export const handleRating = async (businessId: string, stars: number) => {
	await addDoc(collection(db, "ratings"), {
		businessId,
		stars,
		timestamp: Date.now(),
	});

	return stars >= 3 ? "redirect" : "feedback";
};
