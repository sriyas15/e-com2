import { useGetProductByIdQuery } from "../slices/productsApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { addItemToCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import { useAddToCartMutation } from "../slices/cartApiSlice";


const ProductDetails = () => {
  const { id: productId } = useParams();
  const { data, error, isLoading } = useGetProductByIdQuery(productId);
  const product = data?.product;

  const [qty, setQty] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [addToCartApi, { isLoading: adding }] = useAddToCartMutation();

  const addToCartHandler = async() => {
    try{
      const cartItem = await addToCartApi( { productId:product._id,quantity:qty } ).unwrap();
      console.log(cartItem)
    }
    catch(e){
      console.error(e);
      
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!product) return <p>No product found</p>;

  return (
    <div className="relative hero bg-base-200 min-h-screen">
      <button
        onClick={() => navigate("/")}
        className="absolute top-5 left-18 btn btn-outline btn-sm"
      >
        &larr; Back
      </button>
      <div className="hero-content flex-col lg:flex-row">
        <img
          src={product.images?.[0]?.url || "/images/placeholder.png"}
          alt={product.name}
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">{product.name}</h1>
          <img
            src={`/ratings/rating-${product.ratings}.png`}
            className="w-25 my-5 inline-block"
            alt="rating"
          />
          
          <span className="ml-3">{product.numOfReviews} Reviews</span>

          <p className="py-6">{product.description}</p>
          <p>{product.stock > 0 ? "In Stock" : "Out of Stock"}</p>
          <p className="my-4 font-bold text-md">${product.price}</p>

          {product.stock > 0 && (
            <div>
              <label htmlFor="quantity">Quantity</label>
              <select
                name="quantity"
                onChange={(e) => setQty(Number(e.target.value))}
                className="select select-primary w-20 ml-2"
              >
                {[...Array(product.stock).keys()].map((count) => (
                  <option key={count + 1} value={count + 1}>
                    {count + 1}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            onClick={addToCartHandler}
            disabled={product.stock === 0 || adding}
            className="btn btn-primary my-3 block"
          >
            { adding ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
