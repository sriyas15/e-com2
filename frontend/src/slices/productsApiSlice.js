import { apiSlice } from "./apiSlice";
import { PRODUCTS_URL } from "../constant";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder)=>({
        getProducts: builder.query({
            query:( keyword="" )=>({
                url: PRODUCTS_URL,
                params: keyword ? { keyword } : {},
            })
        }),
        getProductById: builder.query({
            query:(id)=> `${PRODUCTS_URL}/${id}`
        }),
    }),
});

export const { useGetProductsQuery,useGetProductByIdQuery } = productsApiSlice