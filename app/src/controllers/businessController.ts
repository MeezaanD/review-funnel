import { doc, getDoc } from "firebase/firestore"
import { db } from "../services/firebase"

export const getBusiness = async (id: string) => {
  const snap = await getDoc(doc(db, "businesses", id))
  if (!snap.exists()) return null
  return snap.data()
}
