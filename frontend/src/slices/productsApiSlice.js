import { apiSlice } from "./apiSlice";
import { PRODUCTS_URL } from "../constant";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder)=>({
        getProducts: builder.query({
            query:()=>({
                url: PRODUCTS_URL
            })
        }),
        getProductById: builder.query({
            query:(id)=> `${PRODUCTS_URL}/${id}`
        }),
    }),
});

export const { useGetProductsQuery,useGetProductByIdQuery } = productsApiSlice