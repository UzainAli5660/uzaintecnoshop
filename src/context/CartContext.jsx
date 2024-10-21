import { createContext, useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore"; // Import Firestore functions

export const CartContext = createContext();

function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const userId = localStorage.getItem("uid"); // Get user ID from local storage

  // Load cart from Firestore when user logs in
  useEffect(() => {
    const loadCart = async () => {
      if (userId) {
        const cartDoc = await getDoc(doc(db, "carts", userId));
        if (cartDoc.exists()) {
          setCartItems(cartDoc.data().items || []);
        }
      }
      setIsLoaded(true); // Set this to true after loading
    };

    loadCart();
  }, [userId]);

  // Save cart to Firestore whenever it changes
  useEffect(() => {
    const saveCartToFirestore = async () => {
      if (isLoaded && userId) {
        await setDoc(doc(db, "carts", userId), {
          items: cartItems,
        });
      }
    };

    saveCartToFirestore();
  }, [cartItems, isLoaded, userId]);

  function addItemToCart(item) {
    const arr = [...cartItems]; // Clone cart items
    const itemIndex = cartItems.findIndex((data) => data.id === item.id);
    if (itemIndex === -1) {
      // Item not found, add it
      arr.push({ ...item, quantity: 1 });
    } else {
      // Item found, increase quantity
      arr[itemIndex].quantity++;
    }
    setCartItems(arr);
  }

  function lessQuanityFromCart(id) {
    const arr = [...cartItems]; // Clone cart items
    const itemIndex = cartItems.findIndex((data) => data.id === id);
    if (itemIndex !== -1 && arr[itemIndex].quantity > 1) {
      arr[itemIndex].quantity--;
      setCartItems(arr);
    }
  }

  function clearCart() {
    setCartItems([]); // Clear the cart
  }

  function removeItemFromCart(id) {
    const arr = cartItems.filter((item) => item.id !== id);
    setCartItems(arr); // Remove item by id
  }

  function isItemAdded(id) {
    return cartItems.find((data) => data.id === id) || null;
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        lessQuanityFromCart,
        removeItemFromCart,
        isItemAdded,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
