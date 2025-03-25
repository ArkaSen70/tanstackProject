import { Cookies } from "react-cookie";
import { create } from "zustand";

const cookies = new Cookies();

interface UserState {
  token: string | null;
  setToken: (token: string | null) => void;
  user: { id: string } | null;
  setUser: (user: { id: string } | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  token: cookies.get("token") || null,
  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null,

  setToken: (token) => {
    if (token) {
      cookies.set("token", token, {
        path: "/",
        secure: process.env.NODE_ENV === "production",
      });
    } else {
      cookies.remove("token", { path: "/" });
    }
    console.log("Token Updated:", token);
    set({ token });
  },

  setUser: (user) => {
    if (typeof window !== "undefined") {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
    }
    console.log("User Updated:", user);
    set({ user });
  },

  logout: () => {
    cookies.remove("token", { path: "/" });
    localStorage.clear();
    set({ token: null, user: null });
  },
}));
