import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios for API calls
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
function AdProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
  });

  const categories = [
    "Smartphones",
    "Laptops",
    "Mobile-accessories",
    "Mens-watches",
    "Womens-watches",
    "Tablets",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await Promise.all(
          categories.map((category) =>
            fetch(`https://dummyjson.com/products/category/${category}`)
              .then((res) => res.json())
              .then((data) => data.products)
          )
        );
        setProducts(allProducts.flat()); // Flatten the array of products
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="ad-products p-8 bg-black">
   <div className="flex items-center justify-center  mb-4">
      <Link to="/admin" className="mr-2">
        <ArrowLeftOutlined style={{ fontSize: "24px", color: "white" }} />
      </Link>
      <h2 className="text-2xl font-bold  font-serif text-teal-400 text-center underline">
        Manage Products
      </h2>
    </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-black text-teal-400 shadow-md rounded-lg">
          <thead>
            <tr className="bg-teal-400 text-black">
              <th className="py-3 px-4 font-serif">Image</th>
              <th className="py-3 px-4 font-serif">Title</th>
              <th className="py-3 px-4 font-serif">Price</th>
              <th className="py-3 px-4 font-serif">Category</th>
  
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="py-4 px-4 text-center">Loading...</td>
              </tr>
            ) : products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id} className="border border-teal-400 text-center">
                  <td className="py-2 px-4">
                    <img src={product.thumbnail} alt={product.title} className="h-32 w-24 object-cover m-auto" />
                  </td>
                  <td className="py-2 px-4 text-center  font-serif">{product.title}</td>
                  <td className="py-2 px-4 text-center font-bold">{product.price}</td>
                  <td className="py-2 px-4 text-center  font-serif">{product.category}</td>
                  
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 px-4 text-center">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdProducts;
