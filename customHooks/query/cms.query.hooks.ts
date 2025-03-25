import { createProps, detailsProps, updateProps } from "@/typescript/cms.interface";
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query";
import { useGlobalHooks } from "../globalHooks/globalHooks";
import { Cookies } from "react-cookie";
import { allProductDetails, allProductsAPICall, createProductFn, deleteProductFn, updateProductFn } from "@/api/functions/cms.api";
import toast from "react-hot-toast";

export const createProductMutation = (): UseMutationResult<createProps, Error, {name: string, description: string, price: number, category: string}, unknown> => {
  const { queryClient } = useGlobalHooks();
  const cookie = new Cookies();

  return useMutation<createProps, Error, {name: string, description: string, price: number, category: string}, unknown>({
    mutationFn: createProductFn,
    onSuccess: (res) => {
      const { token, status, message, data } = res || {};
      if (status === 200 && token) {
        localStorage.setItem("data", JSON.stringify(data));
        cookie.set("token", token);
        toast.success(message || "Product created Successfully");
      } else {
        toast.success(message);
      }
      queryClient.invalidateQueries({ queryKey: ["CREATE"] });
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });
};



export const allProductsQuery = (page: number, perPage: number) =>
    useQuery({
      queryKey: ["LISTPRODUCTS", page, perPage],
      queryFn: () => allProductsAPICall(page, perPage),
      select: (data) => ({
        products: data.products || [],
        totalCount: data.totalCount || 0,
        keepPreviousData: false,
      }),
    });
  
  export const fetchProductQuery = (
    id: string | undefined
  ): UseQueryResult<detailsProps, unknown> => {
    return useQuery({
      queryKey: ["PRODUCTDETAILS", id],
      queryFn: async () => {
        if (!id) throw new Error("Product ID is required");
        const data = await allProductDetails(id);
        if (!data) throw new Error("No product data found");
        return data;
      },
      enabled: !!id,
      retry: 1,
    });
  };
  

  
  export const deleteMutation = (): UseMutationResult<void, unknown, string> => {
    const { queryClient } = useGlobalHooks();
  
    return useMutation<void, unknown, string>({
      mutationFn: deleteProductFn,
      onSuccess: (_, id) => {
        toast.success("Product deleted successfully!");
        queryClient.invalidateQueries({ queryKey: ["LISTPRODUCTS"] });
      },
      onError: (error) => {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product!");
      },
    });
  };
  
  export const updateMutation = (): UseMutationResult<
    updateProps,
    unknown,
    unknown
  > => {
    const { queryClient } = useGlobalHooks();
    const cookie = new Cookies();
  
    return useMutation<updateProps, unknown, unknown>({
      mutationFn: updateProductFn,
      onSuccess: (res) => {
        const { status, user, token } = res || {};
        if (status === 200 && token) {
          alert("Product updated successfully!");
        }
        queryClient.invalidateQueries({ queryKey: ["UPDATE"] });
      },
      onError: (error) => {
        console.error("Error updating product:", error);
      },
    });
  };
  



