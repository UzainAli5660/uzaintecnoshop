import React, { useEffect, useState } from "react";
import { Row, Col } from "antd"; // Import Col
import { useLocation } from "react-router-dom"; // Import useLocation
import ProductCards from "../Components/ProductCards";

const categories = [
  "Smartphones",
  "Laptops",
  "Mobile-accessories",
  "Mens-watches",
  "Womens-watches",
  "Tablets",
];

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation(); 

  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category");

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
        setProducts(allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Function to scroll to specific category
  const handleScrollToCategory = (category) => {
    const section = document.getElementById(category);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    handleScrollToCategory(selectedCategory);
  };

  return (
    <div className="container mx-auto">
      {loading ? (
        <h1 className="text-center my-2 text-2xl font-extrabold text-teal-600">
          Loading...
        </h1>
      ) : (
        <>
          {/* Conditionally render Category List only if no category is selected */}
          {!selectedCategory && (
            <>
              {/* Dropdown for small screens */}
              <div className="block sm:hidden text-center my-5">
                <select
                  className="px-4 py-2 text-teal-600 border-2 border-black font-serif font-semibold bg-white rounded-lg hover:bg-teal-500  hover:text-teal-50 transition-colors"
                  onChange={handleCategoryChange}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Buttons for larger screens */}
              <div className="hidden sm:flex justify-center my-5 space-x-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    className="px-4 py-2 text-black border-2 border-black font-serif font-semibold bg-white rounded-lg hover:bg-teal-500  hover:text-black transition-colors"
                    onClick={() => handleScrollToCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Display products */}
          {selectedCategory ? (
            <div id={selectedCategory} className="my-10">
              <h2 className="text-3xl text-center font-bold font-serif underline mb-4">{selectedCategory}</h2>
              <Row gutter={[16, 16]} justify={"center"} className="flex-wrap">
                {products[categories.indexOf(selectedCategory)]?.map((data) => (
                  <Col xs={12} sm={12} md={8} lg={6} key={data.id}>
                    <ProductCards item={data} />
                  </Col>
                ))}
              </Row>
            </div>
          ) : (
            categories.map((category, index) => {
              const displayedProducts = products[index];

              return (
                <div key={category} id={category} className="my-10">
                  <h2 className="text-3xl text-center font-bold font-serif underline mb-4">{category}</h2>
                  <Row gutter={[16, 16]} justify={"center"} className="flex-wrap">
                    {displayedProducts?.map((data) => (
                      <Col xs={12} sm={12} md={8} lg={6} key={data.id}>
                        <ProductCards item={data} />
                      </Col>
                    ))}
                  </Row>
                </div>
              );
            })
          )}
        </>
      )}
    </div>
  );
}

export default Products;
