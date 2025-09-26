import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder)=>({
        getProducts: builder.query({
            query:()=> '/products',
        }),
        getProductsById: builder.query({
            query:(id)=> `/products/${id}`
        }),
    }),
});

export const { useGetProductsQuery,useGetProductsByIdQuery } = productsApiSlice