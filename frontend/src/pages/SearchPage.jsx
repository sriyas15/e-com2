import { useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import ProductCard from "./ProductCard";

const SearchPage = () => {

    const [ searchParams ] = useSearchParams();
    const keyword = searchParams.get("keyword") || "";

    const { data,isLoading,error } = useGetProductsQuery( keyword );
    const products = data?.products || [];

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container max-w-7xl my-0 mx-auto">
      <h1 className="text-2xl ml-15">{`${products.length} Results for "${keyword}"`}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchPage