import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constant";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder=>({

        registerUser: builder.mutation({
            query:(data)=>({
                url: `${USERS_URL}/register`,
                method:`POST`,
                body:data,
            }),
        }),
    
        login: builder.mutation({
            query: (data)=>({
                url: `${USERS_URL}/login`,
                method:`POST`,
                body:data,
            }),
        }),

        logout: builder.mutation({
            query:(data)=>({
                url: `${USERS_URL}/logout`,
                method:"POST",
                body:data,
            }),
        }),
    }),
});

export const { useRegisterUserMutation,useLoginMutation,useLogoutMutation } = userApiSlice;