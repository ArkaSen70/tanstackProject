import { MutationFunction } from "@tanstack/react-query"
import axiosInstance from "../axios/axios"
import { endPoints } from "../endPoints/endPoints"
import { loginProps, otpProps, profileProps, registerProps, updatePasswordProps } from "@/typescript/auth.interface"
import Cookies from "js-cookie";
export const registerFn : MutationFunction<registerProps>= async(payload)=>{
    const res= await axiosInstance.post<registerProps>(endPoints.auth.register,payload)
    console.log("regRes", res)
    return res.data
}
export const verify_emailFn:MutationFunction<otpProps>= async (payload)=>{
    const res =  await axiosInstance.post<otpProps>(endPoints.auth.verify_email,payload)
    return res.data
}

export const loginFn:MutationFunction<loginProps> = async (payload)=>{
    const res = await axiosInstance.post<loginProps>(endPoints.auth.login,payload)
    console.log("loginres", res)
    return res.data
}

export const updatePaasswordFn:MutationFunction<updatePasswordProps>= async (payload)=>{
    const res = await axiosInstance.post<updatePasswordProps>(endPoints.auth.update_password,payload)
    console.log("updatePassword", res)
    return res.data
}
export const dashboardFn: MutationFunction<
  profileProps,
  unknown
> = async () => {
  const { data } = await axiosInstance.get(endPoints.auth.dashboard, {
    headers: {
      "x-access-token": Cookies.get("token") || "",
    },
  });
  return data;
};