import { createProps, detailsProps, listProps, updateProps } from "@/typescript/cms.interface";
import { MutationFunction } from "@tanstack/react-query";
import axiosInstance from "../axios/axios";
import { endPoints } from "../endPoints/endPoints";

export const createProductFn: MutationFunction<createProps>=async (payload)=>{
    const res= await axiosInstance.post<createProps>(endPoints.pages.create,payload)
    return res.data;
}

export const productListFn :MutationFunction<listProps>=async ()=>{
    const res= await axiosInstance.get<listProps>(endPoints.pages.list)
    return res.data
}

export const allProductsAPICall = async (page: number, perPage: number) => {
    const res = await axiosInstance.get<{
      status: boolean;
      message: string;
      product: listProps[];
      totalCount: number;
    }>(endPoints.pages.list, { params: { page, perPage } });
    console.log("API Response:", res.data);
    return { products: res.data.product, totalCount: res.data.totalCount };
  };
  
  export const allProductDetails = async (
    id: string
  ): Promise<detailsProps | null> => {
    try {
      const res = await axiosInstance.get<{
        status: boolean;
        message: string;
        product: detailsProps;
      }>(`${endPoints.pages.details}/${id}`);
  
      if (!res.data || !res.data.product) {
        throw new Error("Product details not found.");
      }
  
      return res.data.product;
    } catch (error) {
      console.error("Error fetching product details:", error);
      return null;
    }
  };


  export const deleteProductFn: MutationFunction<void, string> = async (id) => {
    try {
      const res = await axiosInstance.delete(`${endPoints.pages.delete}/${id}`);
      console.log("Delete Response:", res.data);
      return res.data;
    } catch (error) {
      console.error("Delete API Error:", error);
      throw new Error("Failed to delete product");
    }
  };


  export const updateProductFn: MutationFunction<updateProps> = async (
    variables: unknown
  ) => {
    const payload = variables as updateProps;
    if (!payload._id) {
      throw new Error("Product ID is required for update.");
    }
  
    const res = await axiosInstance.put<updateProps>(
      `${endPoints.pages.update}/${payload._id}`,
      payload
    );
    return res.data;
  };
  