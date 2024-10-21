// src/context/AuthContext.js
import { createContext, useEffect, useState } from "react";
import { auth } from "../utils/firebase"; 
import {
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router";

const AuthContext = createContext();

function AuthContextProvider({ children, clearCart }) {
  const [user, setUser] = useState({
    isLogin: false,
    userInfo: {},
  });
  const [loading, setLoading] = useState(true);
const navigate = useNavigate
  // Handle Firebase Auth Changes
  function onAuthChanged(user) {
    if (user) {
      setUser({
        isLogin: true,
        userInfo: {
          uid: user.uid, // Store user UID
          name: user.displayName,
          photoUrl: user.photoURL,
          email: user.email,
        },
      });
    } else {
      setUser({ isLogin: false, userInfo: {} });
    }
    setLoading(false);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthChanged);
    return subscriber; // Unsubscribe on unmount
  }, []);

  const handleLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const handleSignup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const handleGoogleLogin = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const handleLogout = async () => {
    localStorage.removeItem("uid");
    await signOut(auth);
    clearCart();
    navigate("/");
    };

  // Function to check if the user is an admin
  const isAdmin = () => user.isLogin && user.userInfo.email === "admin@tecnoshop.com";

  return (
    <AuthContext.Provider value={{ user, setUser, handleLogin, handleSignup, handleGoogleLogin, handleLogout, isAdmin }}>
      {loading ? (
        <div className="w-full h-96 flex justify-center items-center">
          <h1>...Loading</h1>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
