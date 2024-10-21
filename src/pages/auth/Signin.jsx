import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../../utils/firebase"; // Import your Firestore database instance
import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions
import { message, Input, Button } from "antd"; // Import Ant Design components
import { MailOutlined, LockOutlined, GoogleOutlined } from "@ant-design/icons"; // Import Ant Design icons

const Signin = () => {
  const { handleLogin, handleGoogleLogin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await handleLogin(email, password); // Assuming this returns userCredential
      const user = userCredential.user;

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        
      });

      // Save user UID in local storage
      localStorage.setItem("uid", user.uid);

      // Check if the logged-in user is the admin
      if (user.email === "admin@tecnoshop.com") {
        message.success("Login successful! Redirecting to admin panel...");
        navigate("/Admin"); // Redirect to the admin panel
      } else {
        message.success("Login successful!"); // Show success message for normal user
        navigate("/"); // Redirect to the home page after successful login
      }
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        message.error("User not found. Please create an account."); // Show error message
        navigate("/auth/signup"); // Redirect to the signup page
      } else {
        message.error("Login error: " + error.message); // Show error message
        console.error("Login error:", error.message);
      }
    }
  };

  const handleGoogle = async () => {
    try {
      const userCredential = await handleGoogleLogin();
      const user = userCredential.user;

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        // Add any additional user information you want to save
      });

      // Save user UID in local storage
      localStorage.setItem("uid", user.uid);

      // Check if the logged-in user is the admin
      if (user.email === "admin@tecnoshop.com") {
        message.success("Login successful with Google! Redirecting to admin panel...");
        navigate("/admin"); // Redirect to the admin panel
      } else {
        message.success("Login successful with Google!"); // Show success message for normal user
        navigate("/"); // Redirect to the home page after successful Google login
      }
    } catch (error) {
      message.error("Google login error: " + error.message); // Show error message
      console.error("Google login error:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-black border-2 border-teal-400 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-teal-500 text-center mb-6">Login </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-teal-500 text-sm font-semibold font-serif mb-2" htmlFor="email">
              Email
            </label>
            <Input
              prefix={<MailOutlined />}
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-teal-500 font-serif text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="primary"
            htmlType="submit"
            className="w-full font-semibold p-2 font-serif text-teal-400 border-2 border-teal-500 bg-black hover:bg-teal-500 mb-4 hover:text-black transition duration-300"
          >
            Login
          </button>
          <button
            type="default"
            onClick={handleGoogle}
            className="w-full font-semibold p-2 font-serif text-teal-400 border-2 border-teal-500 bg-black hover:bg-teal-500 mb-4 hover:text-black transition duration-300"
          >
            Login with Google
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="/auth/Signup" className="text-sm font-serif text-teal-400 hover:text-teal-600 transition">
            Don’t have an account? Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signin;
