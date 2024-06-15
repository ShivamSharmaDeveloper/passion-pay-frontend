import { create } from "zustand";

const useAuthStore = create((set) => ({
	user: JSON.parse(localStorage.getItem("user-info")),
	isValidAuth: false,
	login: (user) => set({ user }),
	isValid: (status) => set({ isValidAuth: status }),
	logout: () => set({ user: null }),
	setUser: (user) => set({ user }),
}));

export default useAuthStore;
