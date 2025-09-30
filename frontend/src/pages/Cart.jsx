import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useFetchCartQuery,
  useUpdateCartQtyMutation,
  useRemoveCartItemMutation,
} from "../slices/cartApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const { data: cartData, refetch } = useFetchCartQuery();
  const [updateCartQty] = useUpdateCartQtyMutation();
  const [removeCartItem] = useRemoveCartItemMutation();

  if (!userInfo) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-gray-100 px-4">
        <h1 className="text-3xl font-bold mb-4">Please Log In to view your Cart</h1>
        <a
          href="/login"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          Log In
        </a>
      </div>
    );
  }

  const cartItems = cartData?.items || [];

  const handleQtyChange = async (productId, newQty) => {
    try {
      await updateCartQty({ productId, quantity: Number(newQty) }).unwrap();
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const removeCartItemHandler = async (productId) => {
    try {
      await removeCartItem(productId).unwrap();
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const itemPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;
  const shippingPrice = itemPrice > 499 ? 0 : 40;
  const taxPrice = Number((0.18 * itemPrice).toFixed(0));
  const totalPrice = itemPrice + shippingPrice + taxPrice;

  const checkoutHandler = () => {
    navigate(userInfo ? "/shipping" : "/login?redirect=/shipping");
  };

  return (
    <main className="p-6 bg-gray-900 text-gray-100 min-h-screen">
      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-5">
            {cartItems.map((item) => (
              <div
                key={item.product}
                className="bg-gray-800 p-4 lg:p-6 rounded-xl shadow-xl flex flex-col lg:flex-row items-start lg:items-center gap-6 hover:bg-gray-700 transition"
              >
                <img
                  src={item.image}
                  className="w-36 lg:w-40 rounded-lg shadow-lg object-cover"
                  alt={item.name}
                />
                <div className="flex-1 relative">
                  <h2 className="text-2xl font-semibold mb-2">{item.name}</h2>
                  <div className="flex items-center mb-2">
                    <img
                      src={`/ratings/rating-${item.rating}.png`}
                      className="w-24"
                      alt="Rating"
                    />
                    <span className="ml-3 text-gray-300 text-sm">{item.numOfReviews} Reviews</span>
                  </div>
                  <p className={`mb-2 ${item.countInStock > 0 ? "text-green-400" : "text-red-500"}`}>
                    {item.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </p>
                  <p className="my-3 font-bold text-lg">₹{item.price}</p>

                  {item.countInStock > 0 && (
                    <div className="flex items-center gap-3 mb-3">
                      <label htmlFor="quantity" className="font-medium">Quantity:</label>
                      <select
                        name="quantity"
                        value={item.quantity}
                        className="bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => handleQtyChange(item.product, e.target.value)}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <button
                    onClick={() => removeCartItemHandler(item.product)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-600 text-lg"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-xl h-fit flex flex-col gap-4">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <p className="flex justify-between text-gray-200">
              <span>Items Price:</span> <span>₹{itemPrice?.toFixed(0)}</span>
            </p>
            <p className="flex justify-between text-gray-200">
              <span>Shipping:</span> <span>₹{shippingPrice}</span>
            </p>
            <p className="flex justify-between text-gray-200">
              <span>GST (18%):</span> <span>₹{taxPrice}</span>
            </p>
            <hr className="border-gray-600 my-2" />
            <p className="flex justify-between font-bold text-lg">
              <span>Total:</span> <span>₹{totalPrice.toFixed(0)}</span>
            </p>
            <button
              onClick={checkoutHandler}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-gray-100 px-4 text-center">
          <h1 className="text-3xl font-bold mb-3">Your Cart is Empty</h1>
          <p className="text-gray-400 mb-6 max-w-md">
            Looks like you haven't added any items to your cart yet. Start shopping to find your favorites!
          </p>
          <a
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            Shop Now
          </a>
        </div>
      )}
    </main>
  );
};

export default Cart;
