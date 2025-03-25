// auth.query.hooks.ts
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { dashboardFn, loginFn, registerFn, updatePaasswordFn, verify_emailFn } from "@/api/functions/auth.api";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useGlobalHooks } from "../globalHooks/globalHooks";
import { loginProps, otpProps, profileProps, registerProps, updatePasswordProps } from "@/typescript/auth.interface";
import {  useUserStore } from "@/toolkit/store/store";

// Register Mutation
export const registerMutation = (): UseMutationResult<
  registerProps,
  Error,
  { name: string; email: string; password: string },
  unknown
> => {
  const { queryClient } = useGlobalHooks();
  const [cookies, setCookie] = useCookies(["token"]);
  const router = useRouter();
  const { setToken, setUser } = useUserStore.getState();

  return useMutation<registerProps, Error, { name: string; email: string; password: string }, unknown>({
    mutationFn: registerFn,
    onSuccess: (res) => {
        // setCookie("token", res?.token, { path: "/", secure: process.env.NODE_ENV === "production" });
        // localStorage.setItem("user", JSON.stringify(res?.user));
        // setToken(res?.token);
        // setUser(res?.user);
        toast.success("Registration Successful! Please verify your email.");
        router.push("/auth/verify_email");
    
      queryClient.invalidateQueries({ queryKey: ["Register"] });
    },
    onError: (error) => {
      toast.error("Registration Failed");
      queryClient.invalidateQueries({ queryKey: ["Register"] });
    },
  });
};

// Verify Email Mutation
export const verify_emailMutation = (): UseMutationResult<
  otpProps,
  Error,
  { email: string, otp: number },
  unknown
> => {
  const { queryClient } = useGlobalHooks();
  const [cookies, setCookie] = useCookies(["token"]);
  const router = useRouter();

  return useMutation<otpProps, Error, { email: string, otp: number }, unknown>({
    mutationFn: verify_emailFn,
    onSuccess: (res) => {
        // setCookie("token", res?.token, { path: "/", secure: process.env.NODE_ENV === "production" });
        toast.success(res?.message);
      
      router.push("/auth/login");
      queryClient.invalidateQueries({ queryKey: ["VerifyEmailOtp"] });
    },
    onError: (error: any) => {
      toast.error("Verification Failed");
      queryClient.invalidateQueries({ queryKey: ["VerifyEmailOtp"] });
    }
  });
};

// Login Mutation
// export const loginMutation = (): UseMutationResult<
//   loginProps,
//   Error,
//   { email: string; password: string },
//   unknown
// > => {
//   const { queryClient } = useGlobalHooks();
//   const [cookies, setCookie] = useCookies(["token"]);
//   const router = useRouter();
//   const { setToken, setUser } = useAuthStore.getState();

//   return useMutation<loginProps, Error, { email: string; password: string }, unknown>({
//     mutationFn: loginFn,
//     onSuccess: (res) => {
//       const { token, status, message, user } = res || {};
//       if (status==200) {
//         setCookie("token", token, { path: "/", secure: process.env.NODE_ENV === "production" });
//         localStorage.setItem("user", JSON.stringify(user));
//         setToken(token);
//         setUser(user);
//         toast.success(message);
//       } else {
//         toast.error(message || "Login Failed");
//       }
//       queryClient.invalidateQueries({ queryKey: ["Login"] });
//       // router.push("/cms/list");
//     },
//     onError: (error: any) => {
//       toast.error("Login Failed");
//       queryClient.invalidateQueries({ queryKey: ["Login"] });
//     }
//   });
// };

export const loginMutation = (): UseMutationResult<
  any,
  loginProps
> => {
  const { setToken, setUser } = useUserStore();
  const router = useRouter();
  return useMutation({
    mutationFn: loginFn,
    onSuccess: (res) => {
        setToken(res.token);
        setUser(res.user);
        toast.success("Login successful! Welcome back.");
        router.push("/cms/list")
      
    },
    onError: () => {
      toast.error("Login failed. Please check your credentials and try again.");
    },
  });
};

// Update Password Mutation
export const updatePasswordMutation = (): UseMutationResult<
  updatePasswordProps,
  Error,
  { user_id: string; password: string },
  unknown
> => {
  const { queryClient } = useGlobalHooks();
  // Include removeCookie in the hook call
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const router = useRouter();

  return useMutation<updatePasswordProps, Error, { user_id: string; password: string }, unknown>({
    mutationFn: updatePaasswordFn,
    onSuccess: (res) => {
      const { token, message } = res || {};
      removeCookie("token", { path: "/" });
      toast.success( "Password updated successfully. Please login again.");
      queryClient.invalidateQueries({ queryKey: ["UpdatePassword"] });
      router.push("/auth/login");
    },
    onError: (error) => {
      toast.error("Password update operation Failed");
      queryClient.invalidateQueries({ queryKey: ["UpdatePassword"] });
    },
  });
};

export const profileQuery = (): UseQueryResult<any, unknown> => {
  return useQuery({
    queryKey: ["PROFILE"],
    queryFn: dashboardFn,
  });
};