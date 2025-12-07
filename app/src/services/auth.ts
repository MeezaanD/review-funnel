import { ref } from "vue";
import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import type { User as FirebaseUser } from "firebase/auth";

export const user = ref<FirebaseUser | null>(null);

// Listen for auth state changes (persist login)
onAuthStateChanged(auth, (u) => {
  user.value = u;
  if (u) localStorage.setItem("token", u.uid);
  else localStorage.removeItem("token");
});

export const login = async (email: string, password: string) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  user.value = result.user;
  localStorage.setItem("token", result.user.uid);
};

export const logout = async () => {
  await signOut(auth);
  user.value = null;
  localStorage.removeItem("token");
};

export const isLoggedIn = () => !!user.value || !!localStorage.getItem("token");
