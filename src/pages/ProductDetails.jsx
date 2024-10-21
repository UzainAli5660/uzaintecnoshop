import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { Image, Button, message } from "antd";
import { CartContext } from "../context/CartContext";

function ProductDetails() {
  const { cartItems, addItemToCart, isItemAdded } = useContext(CartContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setNotFound(false);
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.message) {
          setProduct(data);
          setLoading(false);
        } else {
          setNotFound(true);
          setLoading(false);
        }
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [id]);

  const handleCheckout = () => {
    const checkoutObj = {
      totalPrice: cartItems.reduce((value, item) => value + item.quantity * item.price, 0),
      totalQuantity: cartItems.reduce((value, item) => value + item.quantity, 0),
      items: cartItems.map(
        (data) => `Item : ${data.title} , Price : ${data.price}  (${data.quantity}) `
      ),
    };
    const encodedText = encodeURIComponent(JSON.stringify(checkoutObj));
    window.open(`https://wa.me/923122088145?text=${encodedText}`);
    message.success("Your order is placed via WhatsApp");
  };

  const handleAddToCart = () => {
    const uid = localStorage.getItem("uid");
    if (!uid) {
      message.error("You should be logged in to add items to the cart!");
    } else {
      addItemToCart(product);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <h1 className="text-center text-4xl text-teal-500 font-serif">Loading...</h1>
      ) : notFound ? (
        <h1 className="text-center text-4xl text-red-500 font-serif">Product Not Found</h1>
      ) : (
        <section className="text-gray-100 body-font overflow-hidden bg-black rounded-lg shadow-lg">
          <div className="container px-5 py-16 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <Image
                preview={true}
                alt="product"
                className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
                src={product.thumbnail}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 text-white">
                <h2 className="text-sm title-font text-teal-400 tracking-widest uppercase font-serif">
                  {product.category}
                </h2>
                <h1 className="text-teal-200 text-4xl title-font font-bold mb-2 font-serif">
                  {product.title}
                </h1>
                <div className="flex mb-4">
                  <span className="flex items-center">
                    {/* Star Rating */}
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        fill={i < product.rating ? "teal" : "none"}
                        stroke="teal"
                        strokeWidth={2}
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                    <span className="ml-3 text-teal-400 font-serif">{product.rating} Reviews</span>
                  </span>
                </div>
                <p className="leading-relaxed text-teal-100 font-serif">{product.description}</p>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-teal-500 mb-5">
                  <div className="flex">
                    <span className="mr-3 text-teal-200">Color</span>
                    <button className="w-6 h-6 font-serif rounded-full border-2 border-gray-300 bg-teal-500 focus:outline-none" />
                    <button className="w-6 h-6 font-serif ml-2 rounded-full border-2 border-gray-300 bg-black focus:outline-none" />
                  </div>
                  <div className="flex ml-6 items-center">
                    <span className="mr-3 text-teal-200 font-serif">Size</span>
                    <select className="rounded-lg border font-serif appearance-none border-teal-500 bg-black text-teal-400 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500">
                      <option>SM</option>
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="title-font font-medium text-3xl text-teal-400">
                    ${product.price}
                  </span>
                  <button
                    className="ml-auto text-teal-300 bg-black border-teal-300 hover:bg-teal-600 border-2 py-2 px-4 focus:outline-none rounded-lg transition-all font-serif font-semibold duration-300"
                    onClick={handleAddToCart} // Use the new handleAddToCart function
                  >
                    {isItemAdded(product.id)
                      ? `Added (${isItemAdded(product.id).quantity})`
                      : `Add to Cart`}
                  </button>
                  <Button
                    className="rounded-full font-serif w-10 h-10 bg-teal-700 hover:bg-teal-800 ml-4 p-0 border-0 inline-flex items-center justify-center text-white transition-all duration-300"
                    onClick={handleCheckout}
                  >
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductDetails;
