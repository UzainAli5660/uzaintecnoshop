import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Button, message } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import CheckOutModal from "../Components/Checkout";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../utils/firebase";

function Cart() {
  const { cartItems, removeItemFromCart, addItemToCart, lessQuanityFromCart, clearCart } =
    useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPrice = cartItems.reduce(
    (value, item) => value + item.quantity * item.price,
    0
  );

  const openModal = () => {
    // Check if cart is empty before opening the modal
    if (cartItems.length === 0) {
      message.warning("Your cart is empty! Please add items to the cart before proceeding to checkout.");
      return; // Exit the function without opening the modal
    }
    setIsModalOpen(true);
  };

  const checkoutOrder = async (values) => {
    const checkoutObj = {
      ...values,
      totalPrice,
      status: "pending",
      user: auth.currentUser ? auth.currentUser.uid : "guest",
      items: cartItems.map((data) => `Item: ${data.title}, Price: ${data.price} (${data.quantity})`),
    };

    const docRef = collection(db, "orders");
    await addDoc(docRef, checkoutObj);
    message.success("Your order is placed");

    const encodedTxt = encodeURIComponent(JSON.stringify(checkoutObj));
    window.open(`https://wa.me/923428067928?text=${encodedTxt}`);
    clearCart();
    setIsModalOpen(false);
  };

  return (
    <div className="bg-black p-10 mx-auto my-8">
      <CheckOutModal
        isModalOpen={isModalOpen}
        handleOk={() => setIsModalOpen(false)}
        handleCancel={() => setIsModalOpen(false)}
        checkoutOrder={checkoutOrder}
      />
      <h1 className=" text-3xl font-bold font-serif underline text-center text-teal-400 mb-6">Your Cart</h1>

      <div className="flex justify-center mb-8">
        <div className="flex flex-col text-center">
          <h2 className="text-teal-300 font-semibold font-serif text-2xl">Total Amount</h2>
          <span className="text-4xl font-mono text-white">${Math.round(totalPrice)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cartItems.length === 0 ? (
          <div className="text-center text-teal-300 text-lg col-span-3 font-serif">
            Your cart is empty! Please add items to the cart.
          </div>
        ) : (
          cartItems.map((data) => (
            <div key={data.id} className="border border-teal-400 rounded-lg h-auto p-4 bg-black text-white">
              <div className="w-full h-36 mb-4">
                <img
                  src={data.thumbnail}
                  className="rounded-lg bg-white w-full h-full object-cover"
                  alt={data.title}
                />
              </div>
              <h3 className="text-teal-300 text-lg font-serif mb-2">{data.title}</h3>
              <p className="text-teal-400 text-lg  font-bold mb-4">Price: ${data.price}</p>
              <div className="flex items-center justify-between mb-4">
                <Button
                  onClick={() => addItemToCart(data)}
                  className="bg-teal-500  text-black hover:bg-teal-700"
                  icon={<PlusOutlined />}
                />
                <span className="text-lg font-semibold">{data.quantity}</span>
                <Button
                  onClick={() => lessQuanityFromCart(data.id)}
                  className="bg-teal-400 text-black font-bold"
                  icon={<MinusOutlined />}
                  disabled={data.quantity === 1}
                />
              </div>
              <button
                onClick={() => removeItemFromCart(data.id)}
                className="w-full font-semibold p-2 w-ful font-serif rounded-xl mt-4 text-teal-400 border-2 border-teal-500 bg-black hover:bg-teal-500 hover:text-black transition duration-300"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={openModal}
          className="font-semibold  p-4 font-serif rounded-xl mt-4 text-teal-400 border-2 border-teal-500 bg-black hover:bg-teal-500 hover:text-black transition duration-300"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
