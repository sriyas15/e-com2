import { apiSlice } from "./apiSlice";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchCart: builder.query({
      query: () => "/cart",
      providesTags: ["Cart"],
    }),

    addToCart: builder.mutation({
      query: ({ productId, quantity }) => ({
        url: "/cart",
        method: "POST",
        body: { productId, quantity },
      }),
      invalidatesTags: ["Cart"],
    }),

    updateCartQty: builder.mutation({
      query: ({ productId, quantity }) => ({
        url: `/cart/${productId}`,  // send productId in URL
        method: "PUT",              // PUT request
        body: { quantity },         // only quantity in body
      }),
      invalidatesTags: ["Cart"],
    }),

    removeCartItem: builder.mutation({
      query: (id) => ({
        url: `/cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    
  }),
});

export const {
  useFetchCartQuery,useAddToCartMutation,
  useUpdateCartQtyMutation,useRemoveCartItemMutation,
} = cartApiSlice;
