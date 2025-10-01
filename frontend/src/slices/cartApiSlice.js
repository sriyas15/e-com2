import { apiSlice } from "./apiSlice";
import { CART_URL } from "../constant";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchCart: builder.query({
      query: () => CART_URL,
      providesTags: ["Cart"],
    }),

    addToCart: builder.mutation({
      query: ({ productId, quantity }) => ({
        url: CART_URL,
        method: "POST",
        body: { productId, quantity },
      }),
      invalidatesTags: ["Cart"],
    }),

    updateCartQty: builder.mutation({
      query: ({ productId, quantity }) => ({
        url: `${CART_URL}/${productId}`,  // send productId in URL
        method: "PUT",              // PUT request
        body: { quantity },         // only quantity in body
      }),
      invalidatesTags: ["Cart"],
    }),

    removeCartItem: builder.mutation({
      query: (id) => ({
        url: `${CART_URL}/${id}`,
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
